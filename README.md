# MMM-Domoticz-ext

This a module for <strong>MagicMirror</strong><br>
https://magicmirror.builders/<br>
https://github.com/MichMich/MagicMirror

A highly configurable module for displaying domoticz information and performing actions on Domoticz. The module contains the following functionality:
* Switch states per room, type, both or floor
* Utility information
* Weather information
* Buttons to change overview
* Action buttons to perform actions on domoticz
* Integration with touch screen and [MMM-Page-Selector](https://github.com/Veldrovive/MMM-Page-Selector)


## Installation

1. Navigate into your MagicMirror `modules` folder and execute<br>
`git clone https://github.com/goedh452/MMM-Domoticz-ext.git`.
2. Add the module to you config (see below)


## Configuration

### Display types
The module has the ability to show information in several ways, mostly controlled by the config parameter 'DisplayType':
* `All`: display a list of all devices and their states
* `Type`: group devices by type (switches, dimmers,  motion, etc.) and show their states combined
* `Room`: display a list of devices and their states per room
* `Both`: group devices by type and display their combined states per room
* `Floor`: group devices by type and display their combined states per floor
* `Dashboard`: display an icon based summary of the device types and their states combined
* `Actions`: display a set op action buttons to perform actions on Domoticz

If your magic mirror has touch cappability, it is possible to show buttons with the config paramater `showButtons`. Setting this to `true` makes it possible to switch between display types by pressing the buttons.

With the config parameter `alwaysShowDashboard` it is possible to always display the dashboard at the top of the module.
With the config parameter `alwaysShowActions` it is possible to always display the action buttons at the bottom of the module.

### Default
| Key | Description | Default |
| --- | --- | --- |
| `module` | Must be `MMM-Domoticz-ext` | N/A |
| `header` | Name to appear as the header of the module | N/A |
| `position` | Position of the module | N/A |

### Config
| Key | Description | Default |
| --- | --- | --- |
| `apiIP` | IP address of Domoticz | N/A |
| `apiPort` | Domoticz port | N/A |
| `updateInterval` | Time seconds between status checks (if you have a lot of devices, do not set this value too low | `10` |
| `animationSpeed` | Time fade-out/fade-in when DOM is refreshed. With many updates, 0 is the best value. | `0` |
| `displayType` | Set layout for the module (see above for possible values) | `both` |
| `alwaysShowDashboard` | Always show the dashboard at the top | `false` |
| `alwaysShowActions` | Always show action buttons at the bottom | `true` |
| `dashboardPageSelect` | Integration which [MMM-Page-Selector](https://github.com/Veldrovive/MMM-Page-Selector). Name of the page to switch to when dashboard is clicked.  | N/A |
| `showButtons` | Show buttons to switch between layouts | `false` |
| `buttonsRight` | Buttons are displayed right instead of at the bottom of the module | `false` |
| `buttonAllLabel` | Label for layout button All | `All` |
| `buttonTypeLabel` | Label for layout button Type | `Type` |
| `buttonRoomLabel` | Label for layout button Room | `Room` |
| `buttonBothLabel` | Label for layout button Both | `Both` |
| `buttonFloorLabel` | Label for layout button Floor | `Floor` |
| `buttonDashboardLabel` | Label for layout button Dashboard | `Dashboard` |
| `horizontal` | Display rooms/floors horizontally | `false` |
| `columnCount` | Number of columns for horizontal layout | `3` |
| `dashboardColumnCount` | Number of columns for the dashboard | `4` |
| `showIcons` | Show icons | `true` |
| `coloredIcons` | Show colored icons when e.g. a lamp is on | `true` |
| `maxTitleLength` | Maximum numer of characters for strings; longer strings get truncated | `100` |
| `switchLabel` | Label for switches when in a grouped layout | `Switches on` |
| `dimmerLabel` | Label for dimmers when in a grouped layout | `Dimmers on` |
| `contactLabel` | Label for contacts when in a grouped layout| `Contacts open` |
| `doorContactLabel` | Label for door contacts when in a grouped layout | `Doors open` |
| `doorLockLabel` | Label for door locks when in a grouped layout | `Doors unlocked` |
| `temperatureLabel` | Label for temperatures when in a grouped layout | `Avg. temperature` |
| `humidityLabel` | Label for humidity when in a grouped layout | `Avg. humidity` |
| `blindsLabel` |  Label for blinds when in a grouped layout | `Blinds open` |
| `blindsInvertedLabel` | Label for blinds inverted when in a grouped layout | `Blinds closed` |
| `motionLabel` | Label for motion when in a grouped layout | `Motion detected` |
| `luxLabel` | Label for lux when in a grouped layout | `Avg. Lux level` |
| `usageLabel` | Label for energy usage when in a grouped layout | `Usage` |
| `showTotals` | Show the total number of devices in a grouped layout (4/11 indicates 4 out of 11 lamps are on) | `true` |
| `switchIcon` | Icon for switches | `adjust` |
| `dimmerIcon` | Icon for dimmers | `lightbulb` |
| `contactIcon` | Icon for contacts | `th-large` |
| `doorContactIcon` | Icon for door contacts | `door-closed` |
| `doorContactOpenIcon` | Icon for door contacts that are open | `door-open` |
| `lockIcon` | Icon for locks | `lock` |
| `unlockedIcon` | Icon for locks that are unlocked | `unlock-alt` |
| `temperatureIcon` | Icon for temperature | `thermometer-half` |
| `humidityIcon` | Icon for humidity| `water` |
| `blindsIcon` | Icon for blinds | `memory` |
| `blindsInvertedIcon` | Icon for blinds inverted | `align-justify` |
| `motionIcon` | Icon for motion | `running` |
| `luxIcon` | Icon for lux | `sun` |
| `usageIcon` | Icon for energy usage | `tachometer-alt` |
| `rainIcon` | Icon for rain | `cloud-rain` |
| `rooms` | Rooms to display the devices of; see below for config | N/A |
| `floors` | Group rooms by floor; see below for config | N/A |
| `dashboardRooms` | Array of rooms to display in the dashboard. When empty the 'rooms' parameter is used. | N/A |
| `utilities` | Show utility gauges; see below for config | N/A |
| `weather` | Show weather gauges; see below for config | N/A |
| `actions` | Show buttons to perform actions on Domoticz; see below for config | N/A |
| `excludedDevices` | Array of IDX's of devices that should be ignored by the module. The array expects strings. | N/A |

### Rooms
| Key | Description | Default |
| --- | --- | --- |
| `idx` | IDX of room | N/A |
| `name` | Default the room name in Domoticz is used. Use this parameter to override and set your desired name. | Room name in Domoticz |

### Floors
| Key | Description | Default |
| --- | --- | --- |
| `name` | Name of the floor | N/A |
| `rooms` | Array of room IDX's | N/A |

### Utilities
| Key | Description | Default |
| --- | --- | --- |
| `devices` | Array of device IDX's | N/A |
| `utilityLabel` | Header for the utilities layout | `Utilities` |
| `usageLabel` | Label for energy usage | `Usage` |
| `gaugeWidth` | Width of the gauge element | `250` |
| `counterTodayLabel` | Label voor counters | `Today` |
| `gaugeEnergyMinValue` | Minimum value of the gauge for enegry usage (supports return) | `-3000` |
| `gaugeEnergyMaxValue` | Maximum value of the gauge for enegry usage | `3000` |
| `gaugeEnergyAppendText` | Text to append to the gauge value | `Watt` |
| `gaugeGasMaxValue` | Maximum value for gas gauge based on daily usage. Gauge starts at 0. | `25` |
| `gaugeGasAppendText` | Text to append to the gas gauge value | `m3` |
| `gaugeWaterMaxValue` | Maximum value for water gauge based on daily usage. Gauge starts at 0. | `1500` |
| `gaugeWaterAppendText` | Text to append to the water gauge value | `liter` |
| `useColors` | Use colors in the utility layout | `true` |

### Weather
| Key | Description | Default |
| --- | --- | --- |
| `devices` | Array of weather devices | N/A |
| `weatherLabel` | Header for the weather layout | N/A |
| `gaugeWidth` | Width of the gauge element | `250` |
| `gaugeWindAppendText` | Text to append to the wind gauge value | `km/h` |
| `rainSuffix` | Text to append to the rain value | `mm` |
| `barometerSuffix` | Text to append to the barometer value | `hPa` |

### Actions
| Key | Description | Default |
| --- | --- | --- |
| `label` | Button label | N/A |
| `url` | Domoticz URL to call | N/A |


## Sample Configuration
### Minimal configuration

```
{
  module: "MMM-Domoticz-ext",
  header: "Domoticz",
  position: "bottom_left",
  config: {
    apiBase: "192.168.1.114",
    apiPort: "8081",
    rooms: [
      { idx: "11" }
    ]
  }
},
```

### Display dashboard

```
{
  module: "MMM-Domoticz-ext",
  header: "Domoticz",
  position: "bottom_left",
  config: {
    apiBase: "192.168.1.114",
    apiPort: "8081",
    updateInterval: 15,
    animationSpeed: 0,
    displayType: "dashboard",
    horizontal: true,
    dashboardColumnCount: 3,
    showTotals: true,
    dashboardRooms: [ "11", "12", "13", "14" ],
  }
},
```

### Extended setup
```
{
  module: "MMM-Domoticz-ext",
  header: "Domoticz",
  position: "middle_center",
  config: {
    apiBase: "192.168.1.114",
    apiPort: "8081",
    updateInterval: 10,
    displayType: "floor",
    alwaysShowDashboard: true,
    alwaysShowActions: true,
    showButtons: true,
    buttonAllLabel: "Alles",
    buttonTypeLabel: "Type",
    buttonRoomLabel: "Ruimte",
    buttonBothLabel: "Beide",
    buttonFloorLabel: "Verdieping",
    buttonDashboardLabel: "Dashboard",
    horizontal: true,
    columnCount: 5,
    dashboardColumnCount: 12,
    maxTitleLength: 18,
    switchLabel: "Schakelaars aan",
    dimmerLabel: "Lampen aan",
    contactLabel: "Ramen open",
    doorContactLabel: "Deuren open",
    doorLockLabel: "Sloten open",
    temperatureLabel: "Gem. temp",
    humidityLabel: "Gem. luchtvochtigheid",
    blindsLabel: "Zonneschermen omlaag",
    blindsInvertedLabel: "Luxaflex gesloten",
    motionLabel: "Beweging",
    luxLabel: "Gem. lichtsterke",
    usageLabel: "Verbruik",
    rooms: [
      { idx: "11", name: "WK-Achter" },
      { idx: "29" },
      { idx: "12" },
      { idx: "13" },
      { idx: "14", name: "WK-Voor" },
      { idx: "15" },
      { idx: "16" },
      { idx: "17" },
      { idx: "18" },
      { idx: "19" },
      { idx: "20" },
      { idx: "21" },
      { idx: "22" },
      { idx: "23" },
      { idx: "24" },
      { idx: "25" },
      { idx: "26" },
      { idx: "27" },
      { idx: "28" },
    ],
    floors: [
      {
        name: "Beneden",
        rooms: [ "11", "29", "12", "13", "14", "15", "16", "17", "18" ]
      },
      {
        name: "1e verdieping",
        rooms: [ "19", "20", "21", "22", "23" ]
      },
      {
        name: "Zolder",
        rooms: [ "24", "25", "26" ]
      },
      {
        name: "Buiten",
        rooms: [ "27", "28"]
      },
    ],
    utilities: {
      devices: [ "304", "329", "1614" ],
      utilityLabel: "Gas - water - licht",
      counterTodayLabel: "Vandaag",
      gaugeWidth: 200,
      gaugeEnergyMinValue: -3000,
      gaugeEnergyMaxValue: 3000,
      gaugeEnergyAppendText: "Watt",
      gaugeGasMaxValue: 25,
      gaugeGasAppendText: "m3",
      gaugeWaterMaxValue: 1500,
      gaugeWaterAppendText: "liter",
      useColors: true,
    },
    weather: {
      devices: [ "1547", "890", "1588", "1545", "1546", "1736", "1544", "590" ],
      weatherLabel: "Weersinformatie",
      gaugeWidth: 200,
      gaugeWindAppendText: "km/h",
      rainSuffix: "mm",
    },
    actions: [
      {
        label: "Lampen aan",
        url: "http://192.168.1.114:8081/json.htm?type=command&param=switchscene&idx=3&switchcmd=On"
      },
      {
        label: "Lampen uit",
         url: "http://192.168.1.114:8081/json.htm?type=command&param=switchscene&idx=1&switchcmd=On"
      }
    ],
    excludedDevices: [ "277", "1194", "1382", "1611", "1841", "1794", "1795", "886", "1345", "1590", "1140", "715", "716", "1772", "1875" ],
  }
},
```

## Screenshots
### Overview
![Overview](screenshots/overview.png?raw=true "Overview")

### Dashboard
![Dashboard](screenshots/dashboard.png?raw=true "Dashboard")

### Floor
![Floor](screenshots/floor.png?raw=true "Floor")

### Room and type
![Room and type](screenshots/room_type.png?raw=true "Room and type")

### Utilities
![Utilities](screenshots/utilities.png?raw=true "Utilities")

### Weather
![Weather](screenshots/weather.png?raw=true "Weather")











