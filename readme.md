# MMM-LOLESPORTS-STANDINGS
An Esports standings module for a provided League of Legends league id.
Module for <a href="https://github.com/MichMich/MagicMirror">MagicMirror</a>.

Other league related modules:
- <a href="https://github.com/xadamxk/MMM-CHAMPIONSQUEUE-LEADERBOARD">MMM-CHAMPIONSQUEUE-LEADERBOARD</a>: Display LOL Champions Queue standings
- <a href="https://github.com/xadamxk/MMM-LOLESPORTS-SCHEDULES">MMM-LOLESPORTS-SCHEDULES</a>: Display LOL Esports league schedules 

## Previews with Configuration Samples
#### Default
<img src="https://github.com/xadamxk/MMM-LOLESPORTS-STANDINGS/blob/master/screenshots/screenshot_default.png?raw=true" title="Preview"  />

<details> 
  <summary>Team Codes Format:</summary>
  <img src="https://github.com/xadamxk/MMM-LOLESPORTS-STANDINGS/blob/master/screenshots/screenshot_teamCodes.png?raw=true" title="Preview Team Codes"  />
	<pre><code>
config: {
    useTeamFullName: false
}
	</code></pre>
</details>
<details> 
  <summary>2-Column Format (LPL):</summary>
  <img src="https://raw.githubusercontent.com/xadamxk/MMM-LOLESPORTS-STANDINGS/master/screenshots/screenshot_2column_offset.png" title="Preview 2-Column Layout"  />
	<pre><code>
		{
			module: "MMM-LOLESPORTS-STANDINGS",
			position: "bottom_left",
			config: {
				"tournamentIds": ["111561319409710508"], // LPL 2024 Spring
				"useTeamFullName": false,
				"trimResults": 9, // Trim the results to show only 9
				"trimOffset": 0
			}
		},
		{
			module: "MMM-LOLESPORTS-STANDINGS",
			position: "bottom_right",
			config: {
				"tournamentIds": ["111561319409710508"], // LPL 2024 Spring
				"showStageName": false,
				"useTeamFullName": false,
				"trimResults": 10, // Required for 2-column layout
				"trimOffset": 9 // Offset the results to skip the first 9
			}
		}
	</code></pre>
</details>

## Installation
In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
SSH: git clone git@github.com:xadamxk/MMM-LOLESPORTS-STANDINGS.git
HTTPS: git clone https://github.com/xadamxk/MMM-LOLESPORTS-STANDINGS.git
````

Install/Update Dependencies:
````
npm install
````

## Configuration
Add `MMM-LOLESPORTS-STANDINGS` module to the `modules` array in the `config/config.js` file:
````javascript
modules: [
	{
		module: "MMM-LOLESPORTS-STANDINGS",
		position: "bottom_left",
		config: {}
	}
]
````
### Configuration Options

| **Option** | **Type** | **Default** | **Description** |
| --- | --- | --- | --- |
| `leagueId` | string | '113470291645289904' | Defaults to LTA North. If provided, the module will look up tournaments and automatically select the active or upcoming tournament. If provided, any specified tournamentId will be ignored. |
| `updateInterval` | integer | 60 | Number of minutes to poll api for updates. |
| `useTeamFullName` | boolean  | true | Set `false` to show team codes rather than team names. |
| `showTeamIcons` | boolean  | true | Set `false` to hide team icons. |
| `showStageName` | boolean  | true | Set `false` to hide the stage name above standings list (ie. Regular Season, Playoffs, etc) |
| `trimResults` | boolean / integer | false | Set to number to trim results - useful for 2-column LPL layout |
| `trimOffset` | integer | 0 | Number of results to skip - useful for 2-column LPL layout |
| `tournamentId` | string | null | Provided tournament id. Unless you have a desired tournament in mind, you probably want to use leagueId instead. Remove leagueId if providing an explicit tournamentId. |
| `apiKey` | string | '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z' | Api key used to query esports API - all users' api key is the default key. |
| `basePath` | string | https://esports-api.lolesports.com/persisted/gw' | Base bath used to query the esports api. |
| `hl` | string | 'en-US' | Host language/ locale to use when requesting esports data. |

### League Ids
League Ids can be obtained in two ways:
1. With the following CURL: `curl --location 'https://esports-api.lolesports.com/persisted/gw/getLeagues?hl=en-US' \
--header 'x-api-key: 0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z'`
2. Navigate to `https://lolesports.com/en-US/leagues`, opening dev tools, selecting a league filter, and finding the league id in the network panel in the `/api/gql` request.

| Name                      | League Id             |
|---------------------------|-----------------------|
| LTA North                 | `113470291645289904`  |
| LTA Cross-Conference      | `113475149040947852`  |
| LTA South                 | `113475181634818701`  |
| LEC                       | `98767991302996019`   |
| LCK                       | `98767991310872058`   |
| LPL                       | `98767991314006698`   |
| LCP                       | `113476371197627891`  |
| NACL                      | `109511549831443335`  |
| EMEA Masters              | `100695891328981122`  |
| First Stand               | `113464388705111224`  |
| MSI                       | `98767991325878492`   |
| Worlds                    | `98767975604431411`   |
| LJL                       | `98767991349978712`   |
| TCL                       | `98767991343597634`   |
| NLC                       | `105266098308571975`  |
| La Ligue Française        | `105266103462388553`  |
| Road of Legends           | `107407335299756365`  |
| Liga Portuguesa           | `105266101075764040`  |
| LoL Italian Tournament    | `105266094998946936`  |
| Rift Legends              | `113673877956508505`  |
| SuperLiga                 | `105266074488398661`  |
| Prime League              | `105266091639104326`  |
| Hitpoint Masters          | `105266106309666619`  |
| Esports Balkan League     | `105266111679554379`  |
| Hellenic Legends League   | `105266108767593290`  |
| Arabian League            | `109545772895506419`  |
| LCK Challengers           | `98767991335774713`   |
| Circuito Desafiante       | `105549980953490846`  |
| PCS                       | `104366947889790212`  |
| LRN                       | `110371976858004491`  |
| LRS                       | `110372322609949919`  |
| TFT Esports               | `108001239847565215`  |
| LLA                       | `101382741235120470`  |
| LCO                       | `105709090213554609`  |
| VCS                       | `107213827295848783`  |
| Worlds Qualifying Series  | `110988878756156222`  |
| King's Duel               | `111102022734849553`  |
| LCS                       | `98767991299243165`   |
| CBLOL                     | `98767991332355509`   |
| LCL                       | `98767991355908944`   |

