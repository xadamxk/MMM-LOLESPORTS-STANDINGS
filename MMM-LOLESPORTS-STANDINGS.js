const STAGE_SLUGS = {
  REGULAR_SEASON: "regular_season",
  PLAYOFFS: "playoffs",
};

const MATCH_STATES = {
  COMPLETED: "completed",
  IN_PROGRESS: "inProgress",
  UNSTARTED: "unstarted",
};

const MATCH_RESULT_OUTCOMES = {
  WIN: "win",
  LOSS: "loss",
};

const UNDECIDED_TEAM_ID = "0";

Module.register("MMM-LOLESPORTS-STANDINGS", {
  // Default module config
  defaults: {
    updateInterval: 60, // minutes
    // lang: config.language,
    apiKey: "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
    basePath: "https://esports-api.lolesports.com/persisted/gw",
    tournamentId: null,
    leagueId: null,
    hl: "en-US",
    trimResults: false, // Number of results to show
    trimOffset: 0, // Number of results to skip - useful for 2-column layouts
    useTeamFullName: true, // Show team's full name rather than team code
    showTeamIcons: true, // Show team's icon
    showStageName: true, // Show the stage name (ie. Regular Season, Playoffs, etc)
  },
  defaultLeagueId: "113470291645289904",

  // Module properties.
  standings: [],
  stageName: "",

  // Start the module.
  start: function () {
    // Get initial API data
    const leagueId = this.config.tournamentId
      ? this.config.leagueId
      : this.defaultLeagueId;
    this.getStandingsData(this.config.tournamentId, leagueId);

    // Schedule update poll
    var self = this;
    setInterval(function () {
      self.getStandingsData(this.config.tournamentId, leagueId);
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
    if (!matches || matches.length === 0) {
      return; // TODO: update dom with error string
    }

    const teamStandings = []; // team[][]
    let ordinal = 1;

    const isTeamInStandings = (teamId) =>
      teamStandings.some((rank) =>
        rank.teams.some((team) => team.id === teamId)
      );

    for (const match of matches.slice().reverse()) {
      if (match.state === MATCH_STATES.COMPLETED) {
        const winningTeam = match.teams.find(
          (team) => team.result.outcome === MATCH_RESULT_OUTCOMES.WIN
        );
        const losingTeam = match.teams.find(
          (team) => team.result.outcome === MATCH_RESULT_OUTCOMES.LOSS
        );
        if (winningTeam && !isTeamInStandings(winningTeam.id)) {
          winningTeam.ordinal = ordinal;
          teamStandings.push({ ordinal: ordinal, teams: [winningTeam] });
          ordinal++;
        }
        if (losingTeam && !isTeamInStandings(losingTeam.id)) {
          losingTeam.ordinal = ordinal;
          teamStandings.push({ ordinal: ordinal, teams: [losingTeam] });
          ordinal++;
        }
      } else if (match.state === MATCH_STATES.UNSTARTED) {
        const team1 = match.teams[0];
        const team2 = match.teams[1];

        const isTeamUndecided = (teamId) => teamId === UNDECIDED_TEAM_ID;
        const tempStanding = [];
        if (!isTeamInStandings(team1.id) && !isTeamUndecided(team1.id)) {
          team1.ordinal = ordinal;
          tempStanding.push(team1);
        }
        if (!isTeamInStandings(team2.id) && !isTeamUndecided(team2.id)) {
          team2.ordinal = ordinal;
          tempStanding.push(team2);
        }
        if (tempStanding.length > 0) {
          teamStandings.push({ ordinal: ordinal, teams: tempStanding });
          ordinal++;
        }
      }
    }
    this.standings = teamStandings;
    this.stageName = "Playoffs";
    this.updateDom(500);
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
    } else {
      // TODO: Check for upcoming splits after June 16, 2025
    }
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

      standing["stages"].forEach((stage, stageIndex) => {
        stageName = stage["name"];
        stage["sections"].forEach((section, sectionIndex) => {
          if (
            section["name"].toLowerCase() === STAGE_SLUGS.PLAYOFFS &&
            arePlayoffsStarted
          ) {
            this.formatPlayoffStandings(section.matches);
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
          } else if (
            standing["stages"].length - 1 === stageIndex &&
            stage["sections"].length - 1 === sectionIndex
          ) {
            // Stage names aren't always playoffs - LCK (113503260417890076) is "Road to MSI"
            // If no known stage was found, assume the last is a playoff
            this.formatPlayoffStandings(section.matches);
          }
        });
      });
    });
  },
});
