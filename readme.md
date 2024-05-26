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
SSH: git clone git@github.com:xadamxk/MMM-CHAMPIONSQUEUE-LEADERBOARD.git
HTTPS: git clone https://github.com/xadamxk/MMM-CHAMPIONSQUEUE-LEADERBOARD.git
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
2024 Tournament Ids
| **League** | **Tournament Id** |
| --- | --- |
| Arabian League Spring | `111561311789132563` |
| CBLOL Academy Spring | `111561450266818827` |
| CBLOL Spring | `111687593060275227` |
| EBL Spring | `110418013822985087` |
| Elite Series Spring | `111561264585765889` |
| Greek Legends League Spring | `111561239818866071` |
| Hitpoint Masters Spring | `111561248544664195` |
| LCK Challengers Spring | `111697800628410448` |
| LCK Spring | `111561337005798024` |
| LCL Spring | `107417471555810057` |
| LCO Spring | `111561353913765677` |
| LCS Challengers Spring | `111720047044090655` |
| LCS Spring | `111504625283627681` |
| LEC Spring | `111560983131400452` |
| LFL Spring | `111561126754061496` |
| Liga Portuguesa Spring | `111561294123889145` |
| LJL Academy Spring | `110507407705819578` |
| LJL Spring | `111561344908135976` |
| LLA Spring | `111561378016799834` |
| LOL Italian Tournament Spring | `111561283082842475` |
| LPL Spring | `111561319409710508` |
| NLC Spring | `111561276695573648` |
| PCS Spring | `111561360819956641` |
| Prime League Spring | `111561088092205854` |
| Superliga Spring | `111521474504777719` |
| TCL Spring | `111561232442665448` |
| Ultraliga Spring | `111561077832020188` |
| VCS Spring | `111561368670434346` |
| Worlds | N/A |
