Module.register("MMM-LOLESPORT-STANDINGS", {
	// Default module config.
	defaults: {
		updateInterval: 30 * 60 * 1000, // every 30 minutes
		// lang: config.language,
		apiKey: "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
		basePath: "https://esports-api.lolesports.com/persisted/gw",
		tournamentIds: [105658534671026792n],
		hl: "en-US"
	},

	// Module properties.
	updateInterval: defaults.updateInterval,
	apiKey: defaults.apiKey,
	basePath: defaults.basePath,
	tournamentIds: defaults.tournamentIds,
	hl: defaults.hl,

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

	// Define required styles.
	// getStyles: function () {
	// 	return ["MMM-MyStandings.css"];
	// },

	// Fetch schedule for provided tournament ids
	getData: function () {
		this.sendSocketNotification("MMM-LOLESPORTS-STANDINGS-GET-SCHEDULE", {
			apiKey: this.config.apiKey,
			basePath: this.config.basePath,
			tournamentIds: this.config.tournamentIds,
			hl: this.config.hl
		});
	},

	// Schedule data is coming back
	socketNotificationReceived: function (notification, payload) {
		if (notification === "MMM-LOLESPORTS-STANDINGS-SCHEDULE") {
			// Manipulate response
			console.log(payload);
		}
	}
});
