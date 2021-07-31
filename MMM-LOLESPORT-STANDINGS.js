Module.register("MMM-LOLESPORT-STANDINGS", {
	// Default module config
	defaults: {
		updateInterval: 1 * 30 * 1000, // every 30 seconds
		// lang: config.language,
		apiKey: "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
		basePath: "https://esports-api.lolesports.com/persisted/gw",
		tournamentIds: ["105658534671026792"],
		hl: "en-US",
		useTeamFullName: false,
		showTeamIcons: true
	},

	// Module properties.
	standings: [],

	// Start the module.
	start: function () {
		// Check config for values
		// Set some defaults if not found in config
		// Get initial API data
		this.getData();
		// // Schedule the API data update.
		// this.scheduleUpdate();
		// // Schedule the first UI load
		// var self = this;
		// setTimeout(function() {
		// 	self.rotateStandings();
		// }, this.config.initialLoadDelay);
		// // Schedule the UI load based on normal interval
		// var self = this;
		// setInterval(function() {
		// 	self.rotateStandings();
		// }, this.config.rotateInterval);
	},
	getTranslations() {
		return {
			en: "translations/en.json"
		};
	},
	getStyles: function () {
		return ["MMM-LOLESPORT-STANDINGS.css"];
	},
	getTemplate() {
		return `templates/standings.njk`;
	},
	getTemplateData() {
		return {
			standings: this.standings,
			config: this.config
		};
	},
	// Fetch schedule for provided tournament ids
	getData: function () {
		this.sendSocketNotification("MMM-LOLESPORTS-STANDINGS-GET-STANDINGS", {
			apiKey: this.config.apiKey,
			basePath: this.config.basePath,
			tournamentIds: this.config.tournamentIds,
			hl: this.config.hl
		});
	},

	// Schedule data is coming back
	socketNotificationReceived: function (notification, payload) {
		if (notification === "MMM-LOLESPORTS-STANDINGS-STANDINGS") {
			this.getStandingData(payload);
		}
	},
	// Condense standing data and render it
	getStandingData: function (data) {
		let stageName = "";
		if (!data || !data.hasOwnProperty("data")) {
			return []; // Wrong tournament id most likely
		}
		data["data"]["standings"].forEach((standing) => {
			if (!standing["stages"]) {
				return;
			}
			standing["stages"].forEach((stage) => {
				stageName = stage["name"];
				stage["sections"].forEach((section) => {
					if (!section["rankings"] || !section["rankings"].length) {
						return;
					}
					this.standings = section["rankings"];
					this.updateDom(500);
				});
			});
		});
	}
});
