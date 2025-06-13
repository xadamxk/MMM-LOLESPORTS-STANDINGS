# MMM-LOLESPORTS-STANDINGS
An Esports standings module for a provided League of Legends tournament id.
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
| `updateInterval` | integer | 60 | Number of minutes to poll api for updates. |
| `apiKey` | string | '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z' | Api key used to query esports API - all users' api key is the default key. |
| `basePath` | string | 'https://esports-api.lolesports.com/persisted/gw' | Base bath used to query the esports api. |
| `tournamentIds` | array | ["107458335260330212"] | Array of tournament ids to get esport standings. Module is coded to handle one, but multiple tourament ids may be supported. Refer to tournament table below for ids of other leagues. |
| `hl` | string | 'en-US' | Host language/ locale to use when requesting esports data. |
| `useTeamFullName` | boolean  | true | Set `false` to show team codes rather than team names. |
| `showTeamIcons` | boolean  | true | Set `false` to hide team icons. |
| `showStageName` | boolean  | true | Set `false` to hide the stage name above standings list (ie. Regular Season, Playoffs, etc) |
| `trimResults` | boolean / integer | false | Set to number to trim results - useful for 2-column LPL layout |
| `trimOffset` | integer | 0 | Number of results to skip - useful for 2-column LPL layout |

### Tournament Ids
To obtain Tournament Ids for a league, pass the desired League Id into the following request, choose the desired tournament:
```
curl --location 'https://esports-api.lolesports.com/persisted/gw/getTournamentsForLeague?hl=en-US&leagueId=113470291645289904' \
--header 'x-api-key: 0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z'
```

2025 Tournament Ids
| **League** | **Tournament Id** |
| LTA North Split 3 | `113487190604684835` |
| LTA - cross-conference playoffs only, use north/south instead for regular season | `113487258403577480` |
| LTA South Split 3 | `113487198985031867` |
| Worlds | N/A |
