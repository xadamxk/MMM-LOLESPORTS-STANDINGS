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
		position: "middle_center",
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

### Tournament Ids
2022 Tournament Ids
| **League** | **Tournament Id** |
| --- | --- |
| Worlds | N/A |
| LCS Summer | `108206581962155974` |
| LCS Academy Summer | `108471075292469758` |
| LEC Summer | `108176672283976661` |
| LCK Summer | `108195478954601542` |
| LPL Summer | `108431300950695970` |
| TCL Summer | `108197589213750000` |
| CBLOL Summer | `108211865716506571` |
| LLA Summer | `108197521933954516` |
| LCO Summer | `108197674522551242` |
| LJL Summer | `108231751506773283` |
| LCL Summer | `107417471555810057` |
| PCS Summer | `108166997301178190` |
| LCS Spring | `107458367237283414` |
| LCS Academy Spring | `107418086627198298` |
| LEC Spring | `107417059262120466` |
| LCK Spring | `107418445247362001` |
| LPL Spring | `107417779630700437` |
| TCL Spring | `107566408953200568` |
| CBLOL Spring | `107405837336179496` |
| LLA Spring | `106845973122821257` |
| LCO Spring | `107439320897210747` |
| LJL Spring | `106269757536651711` |
| LCL Spring | `106269769724268826` |
| PCS Spring | `106269875362449980` |
| VCS Spring | `107611014996486035` |
