/* Magic Mirror
 * Node Helper: MMM-LOLESPORTS-STANDINGS
 *
 * By xadamxk
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var https = require("https");

module.exports = NodeHelper.create({
  // Override socketNotificationReceived method.
  socketNotificationReceived: function (notification, payload) {
    let self = this;
    const basePath = payload["basePath"];
    const apiKey = payload["apiKey"];

    if (notification === "MMM-LOLESPORTS-STANDINGS-GET-STANDINGS") {
      const tournamentIds = payload["tournamentIds"];
      const url = `${basePath}/persisted/gw/getStandings?hl=en-US&tournamentId=${tournamentIds}`;

      https
        .get(
          url,
          {
            headers: {
              "x-api-key": apiKey,
            },
          },
          (response) => {
            let data = "";

            // A chunk of data has been received
            response.on("data", (chunk) => {
              data += chunk;
            });

            // The whole response has been received
            response.on("end", () => {
              try {
                const jsonData = JSON.parse(data);
                self.sendStandingsNotification(jsonData);
              } catch (error) {
                console.error("Error parsing response:", error);
              }
            });
          }
        )
        .on("error", (error) => {
          console.error("Error fetching standings:", error);
        });
    } else if (notification === "MMM-LOLESPORTS-STANDINGS-GET-TOURNAMENTS") {
      const leagueId = payload["leagueId"];
      const url = `${basePath}/persisted/gw/getTournamentsForLeague?hl=en-US&leagueId=${leagueId}`;

      https
        .get(
          url,
          {
            headers: {
              "x-api-key": apiKey,
            },
          },
          (response) => {
            let data = "";

            // A chunk of data has been received
            response.on("data", (chunk) => {
              data += chunk;
            });

            // The whole response has been received
            response.on("end", () => {
              try {
                const jsonData = JSON.parse(data);
                self.sendTournamentsNotification(jsonData);
              } catch (error) {
                console.error("Error parsing response:", error);
              }
            });
          }
        )
        .on("error", (error) => {
          console.error("Error fetching tournaments:", error);
        });
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
