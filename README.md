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
| `apiBase` | Must be `HarmonyTV` | N/A |
| `apiPort` | Name to appear in the Home app | N/A |
| `updateInterval` | Must be `http` (for now) | `http` |
| `animationSpeed` | Must be `http` (for now) | `http` |
| `displayType` | Must be `http` (for now) | `http` |
| `alwaysShowDashboard` | Must be `http` (for now) | `http` |
| `alwaysShowActions` | Must be `http` (for now) | `http` |
| `dashboardPageSelect` | Must be `http` (for now) | `http` |
| `showButtons` | Must be `http` (for now) | `http` |
| `buttonsRight` | Must be `http` (for now) | `http` |
| `buttonAllLabel` | Must be `http` (for now) | `http` |
| `buttonTypeLabel` | Must be `http` (for now) | `http` |
| `buttonRoomLabel` | Must be `http` (for now) | `http` |
| `buttonBothLabel` | Must be `http` (for now) | `http` |
| `buttonFloorLabel` | Must be `http` (for now) | `http` |
| `buttonDashboardLabel` | Must be `http` (for now) | `http` |
| `horizontal` | Must be `http` (for now) | `http` |
| `columnCount` | Must be `http` (for now) | `http` |
| `dashboardColumnCount` | Must be `http` (for now) | `http` |
| `showIcons` | Must be `http` (for now) | `http` |
| `coloredIcons` | Must be `http` (for now) | `http` |
| `maxTitleLength` | Must be `http` (for now) | `http` |
| `switchLabel` | Must be `http` (for now) | `http` |
| `dimmerLabel` | Must be `http` (for now) | `http` |
| `contactLabel` | Must be `http` (for now) | `http` |
| `doorContactLabel` | Must be `http` (for now) | `http` |
| `doorLockLabel` | Must be `http` (for now) | `http` |
| `temperatureLabel` | Must be `http` (for now) | `http` |
| `humidityLabel` | Must be `http` (for now) | `http` |
| `blindsLabel` | Must be `http` (for now) | `http` |
| `blindsInvertedLabel` | Must be `http` (for now) | `http` |
| `motionLabel` | Must be `http` (for now) | `http` |
| `luxLabel` | Must be `http` (for now) | `http` |
| `usageLabel` | Must be `http` (for now) | `http` |
| `showTotals` | Must be `http` (for now) | `http` |
| `switchIcon` | Must be `http` (for now) | `http` |
| `dimmerIcon` | Must be `http` (for now) | `http` |
| `contactIcon` | Must be `http` (for now) | `http` |
| `doorContactIcon` | Must be `http` (for now) | `http` |
| `doorContactOpenIcon` | Must be `http` (for now) | `http` |
| `lockIcon` | Must be `http` (for now) | `http` |
| `unlockedIcon` | Must be `http` (for now) | `http` |
| `temperatureIcon` | Must be `http` (for now) | `http` |
| `humidityIcon` | Must be `http` (for now) | `http` |
| `blindsIcon` | Must be `http` (for now) | `http` |
| `blindsInvertedIcon` | Must be `http` (for now) | `http` |
| `motionIcon` | Must be `http` (for now) | `http` |
| `luxIcon` | Must be `http` (for now) | `http` |
| `usageIcon` | Must be `http` (for now) | `http` |
| `barometerIcon` | Must be `http` (for now) | `http` |
| `rainIcon` | Must be `http` (for now) | `http` |
| `rooms` | Must be `http` (for now) | `http` |
| `floors` | Must be `http` (for now) | `http` |
| `dashboardRooms` | Must be `http` (for now) | `http` |
| `utilities` | Must be `http` (for now) | `http` |
| `weather` | Must be `http` (for now) | `http` |
| `actions` | Must be `http` (for now) | `http` |
| `excludedDevices` | Must be `http` (for now) | `http` |

### Rooms
| Key | Description | Default |
| --- | --- | --- |
| `accessory` | Must be `HarmonyTV` | N/A |
| `name` | Name to appear in the Home app | N/A |
| `connection` | Must be `http` (for now) | `http` |

### Floors
| Key | Description | Default |
| --- | --- | --- |
| `accessory` | Must be `HarmonyTV` | N/A |
| `name` | Name to appear in the Home app | N/A |
| `connection` | Must be `http` (for now) | `http` |

### Utilities
| Key | Description | Default |
| --- | --- | --- |
| `accessory` | Must be `HarmonyTV` | N/A |
| `name` | Name to appear in the Home app | N/A |
| `connection` | Must be `http` (for now) | `http` |

### Weather
| Key | Description | Default |
| --- | --- | --- |
| `accessory` | Must be `HarmonyTV` | N/A |
| `name` | Name to appear in the Home app | N/A |
| `connection` | Must be `http` (for now) | `http` |

### Actions
| Key | Description | Default |
| --- | --- | --- |
| `accessory` | Must be `HarmonyTV` | N/A |
| `name` | Name to appear in the Home app | N/A |
| `connection` | Must be `http` (for now) | `http` |




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











