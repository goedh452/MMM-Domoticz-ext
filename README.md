# MMM-Domoticz-ext

This a module for <strong>MagicMirror</strong><br>
https://magicmirror.builders/<br>
https://github.com/MichMich/MagicMirror

A highly configurable module for displaying domoticz information en performing actions on Domoticz. The following information can be displayed:
* Switch states per room, type, both or floor
* Utility information
* Weather information


## Installation

1. Navigate into your MagicMirror `modules` folder and execute<br>
`git clone https://github.com/goedh452/MMM-Domoticz-ext.git`.
2. Add the module to you config (see below)


## Configuration

### Default
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











