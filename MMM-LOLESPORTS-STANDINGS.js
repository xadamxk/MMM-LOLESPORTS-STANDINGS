const STAGE_SLUGS = {
  REGULAR_SEASON: "regular_season",
  PLAYOFFS: "playoffs",
};

const MATCH_STATES = {
  COMPLETED: "completed",
  IN_PROGRESS: "inProgress",
  UNSTARTED: "unstarted",
};

Module.register("MMM-LOLESPORTS-STANDINGS", {
  // Default module config
  defaults: {
    updateInterval: 60, // minutes
    // lang: config.language,
    apiKey: "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
    basePath: "https://esports-api.lolesports.com/persisted/gw",
    tournamentId: "",
    leagueId: "113470291645289904", // LTA North
    hl: "en-US",
    trimResults: false, // Number of results to show
    trimOffset: 0, // Number of results to skip - useful for 2-column layouts
    useTeamFullName: true, // Show team's full name rather than team code
    showTeamIcons: true, // Show team's icon
    showStageName: true, // Show the stage name (ie. Regular Season, Playoffs, etc)
  },

  // Module properties.
  standings: [],
  stageName: "",

  // Start the module.
  start: function () {
    // Get initial API data
    this.getStandingsData(this.config.tournamentId, this.config.leagueId);

    // Schedule update poll
    var self = this;
    setInterval(function () {
      self.getStandingsData(this.config.tournamentId, this.config.leagueId);
    }, self.config.updateInterval * 60 * 1000); //convert to milliseconds
  },
  getTranslations() {
    return {
      en: "translations/en.json",
    };
  },
  getStyles: function () {
    return ["MMM-LOLESPORTS-STANDINGS.css"];
  },
  getTemplate() {
    return `templates/standings.njk`;
  },
  getTemplateData() {
    return {
      standings: this.standings,
      stageName: this.stageName,
      config: this.config,
    };
  },
  // Fetch schedule for provided tournament ids
  getStandingsData: function (tournamentId, leagueId) {
    if (leagueId) {
      this.sendSocketNotification("MMM-LOLESPORTS-STANDINGS-GET-TOURNAMENTS", {
        apiKey: this.config.apiKey,
        basePath: this.config.basePath,
        leagueId: this.config.leagueId,
        hl: this.config.hl,
      });
    } else if (tournamentId) {
      this.sendSocketNotification("MMM-LOLESPORTS-STANDINGS-GET-STANDINGS", {
        apiKey: this.config.apiKey,
        basePath: this.config.basePath,
        tournamentIds: tournamentId || this.config.tournamentId,
        hl: this.config.hl,
      });
    }
  },

  // Schedule data is coming back
  socketNotificationReceived: function (notification, payload) {
    if (notification === "MMM-LOLESPORTS-STANDINGS-STANDINGS") {
      this.formatStandingData(payload);
    } else if (notification === "MMM-LOLESPORTS-STANDINGS-TOURNAMENTS") {
      this.findActiveOrFutureTournament(payload);
    }
  },
  formatPlayoffStandings: function (matches) {
    //
  },
  findActiveOrFutureTournament: function (results) {
    // data.leagues.tournaments {id, slug, startDate (YYY-MM-DD), endDate (YYY-MM-DD)}
    const today = new Date();

    // Check for active tournaments
    const activeTournament = results.data.leagues[0].tournaments.find(
      (tournament) => {
        const tournamentStartDate = new Date(tournament.startDate);
        const tournamentEndDate = new Date(tournament.endDate);
        return tournamentStartDate < today && today < tournamentEndDate;
      }
    );
    if (activeTournament) {
      this.getStandingsData(activeTournament.id, null);
    }
    // TODO: Check for upcoming splits after June 16
  },
  // Condense standing data and render it
  formatStandingData: function (data) {
    let stageName = "";
    if (!data || !data.hasOwnProperty("data")) {
      return []; // Wrong tournament id most likely
    }
    data["data"]["standings"].forEach((standing) => {
      if (!standing["stages"]) {
        return;
      }
      const playoffStage = standing["stages"].find(
        (stage) => stage.slug === STAGE_SLUGS.PLAYOFFS
      );

      const arePlayoffsStarted =
        playoffStage &&
        playoffStage.sections[0].matches[0].state === MATCH_STATES.COMPLETED;

      standing["stages"].forEach((stage) => {
        stageName = stage["name"];
        stage["sections"].forEach((section) => {
          if (
            section["name"].toLowerCase() === STAGE_SLUGS.PLAYOFFS &&
            arePlayoffsStarted
          ) {
            // TODO: do playoff logic
            console.warn("playoffs not yet implemented");
          } else if (
            section["name"] === STAGE_SLUGS.REGULAR_SEASON &&
            section["rankings"] &&
            section["rankings"].length > 0
          ) {
            const offsetIndex = this.config.trimOffset || 0;
            this.standings =
              this.config.trimResults === false
                ? section["rankings"]
                : section["rankings"].slice(
                    offsetIndex,
                    offsetIndex + this.config.trimResults
                  );
            this.stageName = stageName;
            this.updateDom(500);
          }
        });
      });
    });
  },
});
