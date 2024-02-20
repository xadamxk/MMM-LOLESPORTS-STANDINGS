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
2024 Tournament Ids
| **League** | **Tournament Id** |
| --- | --- |
| Arabian League Spring | `109545772895506419` |
| CBLOL Academy Spring | `105549980953490846` |
| CBLOL Spring | `98767991332355509` |
| EBL Spring | `105266108767593290` |
| Elite Series Spring | `107407335299756365` |
| Greek Legends League Spring | `105266108767593290` |
| Hitpoint Masters Spring | `105266106309666619` |
| LCK Challengers Spring | `98767991335774713` |
| LCK Spring | `98767991310872058` |
| LCL Spring | `98767991355908944` |
| LCO Spring | `105709090213554609` |
| LCS Challengers Spring | `109511549831443335` |
| LCS Spring | `98767991299243165` |
| LEC Spring | `98767991302996019` |
| LFL Spring | `105266103462388553` |
| Liga Portuguesa Spring | `105266101075764040` |
| LJL Challengers Spring | `106827757669296909` |
| LJL Spring | `98767991349978712` |
| LLA Spring | `101382741235120470` |
| LOL Italian Tournament Spring | `105266094998946936` |
| LPL Spring | `98767991314006698` |
| NLC Spring | `105266098308571975` |
| PCS Spring | `104366947889790212` |
| Prime League Spring | `105266091639104326` |
| Superliga Spring | `105266074488398661` |
| TCL Spring | `98767991343597634` |
| Ultraliga Spring | `105266088231437431` |
| VCS Spring | `107213827295848783` |
| Worlds | N/A |
