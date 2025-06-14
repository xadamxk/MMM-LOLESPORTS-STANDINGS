/* Magic Mirror
 * Node Helper: MMM-LOLESPORTS-STANDINGS
 *
 * By xadamxk
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var LolesportsApi = require("esm")(module)("lolesports-js-sdk");
var defaultClient = LolesportsApi.ApiClient.instance;
var api = new LolesportsApi.LeaguesApi();

module.exports = NodeHelper.create({
  // Override socketNotificationReceived method.
  socketNotificationReceived: function (notification, payload) {
    let self = this;
    defaultClient.basePath = payload["basePath"];
    defaultClient.authentications["apiKeyAuth"]["apiKey"] = payload["apiKey"];

    if (notification === "MMM-LOLESPORTS-STANDINGS-GET-STANDINGS") {
      api.getStandings(
        LolesportsApi.Locale.enUS,
        { tournamentId: [payload["tournamentIds"]] },
        function (error, data, response) {
          if (error) {
            console.error(error);
          } else {
            // console.log("API called successfully. Returned data: " + JSON.stringify(data));
            self.sendStandingsNotification(data);
          }
        }
      );
    } else if (notification === "MMM-LOLESPORTS-STANDINGS-GET-TOURNAMENTS") {
      api.getTournamentsForLeague(
        LolesportsApi.Locale.enUS,
        {
          leagueId: payload["leagueId"],
        },
        function (error, data, response) {
          if (error) {
            console.error(error);
          } else {
            // console.log(
            //   "API called successfully. Returned data: " + JSON.stringify(data)
            // );
            self.sendTournamentsNotification(data);
          }
        }
      );
    }
  },
  // Example function send notification test
  sendStandingsNotification: function (payload) {
    this.sendSocketNotification("MMM-LOLESPORTS-STANDINGS-STANDINGS", payload);
  },
  sendTournamentsNotification: function (payload) {
    this.sendSocketNotification(
      "MMM-LOLESPORTS-STANDINGS-TOURNAMENTS",
      payload
    );
  },
});
