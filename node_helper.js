/* Magic Mirror
 * Node Helper: MMM-LOLESPORTS-STANDINGS
 *
 * By xadamxk
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var LolesportsApi = require("lolesports-js-sdk");
var defaultClient = LolesportsApi.ApiClient.instance;
var api = new LolesportsApi.EventsApi();

module.exports = NodeHelper.create({
	// Override socketNotificationReceived method.
	socketNotificationReceived: function (notification, payload) {
		if (notification === "MMM-LOLESPORTS-STANDINGS-GET-SCHEDULE") {
			defaultClient.basePath = payload["basePath"];
			defaultClient.authentications["apiKeyAuth"]["apiKey"] = payload["apiKey"];

			api.getSchedule(LolesportsApi.Locale.enUS, { leagueId: payload["tournamentIds"] }, function (error, data, response) {
				if (error) {
					console.error(error);
				} else {
					console.log("API called successfully. Returned data: ");
				}
			});
			console.log("Working notification system. Notification:", notification, "payload: ", payload);
			// CALL ESPORTS SDK HERE
			// Send notification
			this.sendNotificationTest({ isWorking: true });
		}
	},
	// Example function send notification test
	sendNotificationTest: function (payload) {
		this.sendSocketNotification("MMM-LOLESPORTS-STANDINGS-SCHEDULE", payload);
	}
});
