# MMM-LOLESPORTS-STANDINGS
An Esports standings module for a provided League of Legends tournament id.
Module for <a href="https://github.com/MichMich/MagicMirror">MagicMirror</a>.

## Preview
<img src="https://github.com/xadamxk/MMM-LOLESPORTS-STANDINGS/blob/master/screenshots/screenshot_default.png?raw=true" title="Preview"  />

<details> 
  <summary>Team Codes Format:</summary>
  <img src="https://github.com/xadamxk/MMM-LOLESPORTS-STANDINGS/blob/master/screenshots/screenshot_teamCodes.png?raw=true" title="Preview Team Codes"  />
</details>

## Installation
In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com/xadamxk/MMM-LOLESPORTS-STANDINGS.git
````

## Configuration
Add `MMM-LOLESPORTS-STANDINGS` module to the `modules` array in the `config/config.js` file:
````javascript
modules: [
	{
		module: "MMM-LOLESPORTS-STANDINGS",
		position: "middle_center",
		config: {
			tournamentIds: ["105658534671026792"], // Tournament IDs: Default to 2021 LCS Season
			useTeamFullName: true, // Show team's full name rather than team code
			showTeamIcons: true, // Show team's icon
			showStageName: true // Show the stage name (ie. Regular Season, Playoffs, etc)
		}
	}
]
````
### Configuration Options

| **Option** | **Type** | **Default** | **Description** |
| --- | --- | --- | --- |
| `updateInterval` | integer | 60 | Number of minutes to poll api for updates. |
| `apiKey` | string | '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z' | Api key used to query esports API - all users' api key is the default key. |
| `basePath` | string | 'https://esports-api.lolesports.com/persisted/gw' | Base bath used to query the esports api. |
| `tournamentIds` | array | ["105658534671026792"] | Array of tournament ids to get esport standings. Module is coded to handle one, but multiple tourament ids may be supported. Refer to tournament table below for ids of other leagues. |
| `hl` | string | 'en-US' | Host language/ locale to use when requesting esports data. |
| `useTeamFullName` | boolean  | true | Set `false` to show team codes rather than team names. |
| `showTeamIcons` | boolean  | true | Set `false` to hide team icons. |
| `showStageName` | boolean  | true | Set `false` to hide the stage name above standings list (ie. Regular Season, Playoffs, etc) |

### Tournament Ids

| **League** | **Tournament Id** |
| --- | --- |
| LCS | `105658534671026792` |
| LCS Academy | `106273298442359221` |
| LEC | `106269680921022418` |
| LCK | `106269654659501670` |
| LPL | `106269484328946755` |
| TCL | `106269459003590888` |
| CBLOL | `106297375705058741` |
| LLA | `106269744788213905` |
| LCO | `106273204408903419` |
| LJL | `106269757536651711` |
| LCL | `106269769724268826` |
