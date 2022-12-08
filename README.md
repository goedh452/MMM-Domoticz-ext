# !!! Not maintained anymore !!!
Since I do not use Domoticz anymore, this module is not maintained. Feel free to fork it and make the changes you need.

# MMM-Domoticz-ext

This a module for <strong>MagicMirror</strong><br>
https://magicmirror.builders/<br>
https://github.com/MichMich/MagicMirror

A highly configurable module for displaying domoticz information and performing actions on Domoticz. The module contains the following functionality:
* Switch states per room, type, both or floor
* Utility information
* Weather information
* Custom gauges
* Buttons to change overview
* Action buttons to perform actions on domoticz
* Integration with touch screen and [MMM-Page-Selector](https://github.com/Veldrovive/MMM-Page-Selector)


## Installation

1. Navigate into your MagicMirror `modules` folder and execute
2. `git clone https://github.com/goedh452/MMM-Domoticz-ext.git`
3. `cd MMM-Domoticz-ext`
4. `npm install`
5. Add the module to you config (see below)


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
| `apiBase` | IP address of Domoticz | N/A |
| `apiPort` | Domoticz port | N/A |
| `apiUser` | User for basic authentication of Domoticz | N/A |
| `apiPW` | Password for basic authentication of Domoticz | N/A |
| `updateInterval` | Time in seconds between status checks (if you have a lot of devices, do not set this value too low | `10` |
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
| `customGauges` | Show custom gauges; see below for config | N/A |
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
| `utilityLabel` | Header for the utilities layout | `Utilities` |
| `showLabel` | Display header label | `true` |
| `devices` | Array of devices; see below for config options | N/A |

#### Utility devices
| Key | Description | Default |
| --- | --- | --- |
| `idx` | IDX of the device to display (expects a string) | N/A |
| `deviceHeader` | Header for the specific device | N/A |
| `useHeaderSymbol` | Use a symbol of Font Awesome as header | `false` |
| `headerSymbol` | Font Awesome symbol to display | N/A |
| `enableReturn` | Option to ignore return value for electricity | `true` |
| `counterTodayLabel` | Label for sum of today | `Today` |
| `counterTodayAppendText` | Text to append to the counter today (for energy only) | `kWh` |
| `gaugeMinValue` | Minimum value of the gauge; supports return for energy: negative values are allowed | `0` |
| `gaugeMaxValue` | Maximum value of the gauge | `3000` |
| `gaugeAppendText` | Text to append to the gauge value (e.g. kWh or liter) | N/A |
| `gaugeWidth` | Display width of the gauge | `200` |
| `lineWidth` | Width of the gauge line | `16` |
| `markerWidth` | Width of the gauge marker indicating the value | `16` |
| `markerColor` | Color of the gauge marker indicating the value | `#F4D03F` |

### Custom gauges
| Key | Description | Default |
| --- | --- | --- |
| `headerLabel` | Header for the utilities layout | `Utilities` |
| `showLabel` | Display header label | `true` |
| `devices` | Array of devices; see below for config options | N/A |

#### Custom gauge devices
| Key | Description | Default |
| --- | --- | --- |
| `idx` | IDX of the device to display (expects a string) | N/A |
| `deviceHeader` | Header for the specific device | N/A |
| `useHeaderSymbol` | Use a symbol of Font Awesome as header | `false` |
| `headerSymbol` | Font Awesome symbol to display | N/A |
| `lowerText` | Text to be displayed at the bottom of the gauge (e.g. Today or Voltage) | N/A |
| `gaugeMinValue` | Minimum value of the gauge; supports return for energy: negative values are allowed | `0` |
| `gaugeMaxValue` | Maximum value of the gauge | `1000` |
| `gaugeAppendText` | Text to append to the gauge value (e.g. Volt or cm) | N/A |
| `gaugeWidth` | Display width of the gauge | `200` |
| `lineWidth` | Width of the gauge line | `16` |
| `markerWidth` | Width of the gauge marker indicating the value | `16` |
| `markerColor` | Color of the gauge marker indicating the value | `#F4D03F` |

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
  			pages: {"Domotica": "middle_center"},
  			classes: "known",
  			config: {
  				apiBase: "192.168.1.114",
  				apiPort: "8081",
  				updateInterval: 15,
          displayType: "floor",
          alwaysShowDashboard: true,
          alwaysShowActions: false,
          showButtons: true,
          buttonAllLabel: "Alles",
          buttonTypeLabel: "Type",
          buttonRoomLabel: "Ruimte",
          buttonBothLabel: "Beide",
          buttonFloorLabel: "Verdieping",
          buttonDashboardLabel: "Dashboard",
          horizontal: true,
          columnCount: 4,
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
  					{	idx: "11", name: "WK-Achter" },
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
              name: "Woonkamer",
              rooms: [ "11", "29", "12", "13", "14" ]
            },
            {
              name: "Hallen en toilet",
              rooms: [ "15", "16", "17" ]
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
              name: "Garage",
              rooms: [ "18" ]
            },
            {
              name: "Buiten",
              rooms: [ "27", "28"]
            },
          ],
          utilities: {
            utilityLabel: "Gas - Water - Licht",
            showLabel: true,
            devices: [
              {
                idx: "304",
                deviceHeader: "Elektriciteit",
                useHeaderSymbol: true,
                headerSymbol: "plug",
                counterTodayLabel: "Vandaag",
                counterTodayAppendText: "kWh",
                gaugeMinValue: -3000,
                gaugeMaxValue: 3000,
                gaugeAppendText: "watt",
                gaugeWidth: 200,
                lineWidth: 16,
                markerWidth: 16,
                markerColor: "#F4D03F"
              },
              {
                idx: "1353",
                deviceHeader: "Zonnepanelen",
                useHeaderSymbol: true,
                headerSymbol: "sun",
                counterTodayLabel: "Vandaag",
                counterTodayAppendText: "kWh",
                gaugeMinValue: 0,
                gaugeMaxValue: 3600,
                gaugeAppendText: "watt",
                gaugeWidth: 200,
                lineWidth: 16,
                markerWidth: 16,
                markerColor: "#70db70"
              },
              {
                idx: "329",
                deviceHeader: "Gas",
                useHeaderSymbol: true,
                headerSymbol: "fire",
                counterTodayLabel: "Vandaag",
                gaugeMaxValue: 25,
                gaugeAppendText: "m³",
              },
              {
                idx: "1614",
                deviceHeader: "Water",
                useHeaderSymbol: true,
                headerSymbol: "water",
                counterTodayLabel: "Vandaag",
                gaugeMaxValue: 1500,
                gaugeAppendText: "liter",
              },
            ],
          },
          customGauges: {
            headerLabel: "Overige",
            showLabel: true,
            devices: [
              {
                idx: "1356",
                deviceHeader: "Volt",
                dataReplaceText: "V",
                lowerText: "Voltage",
                gaugeAppendText: "volt",
                gaugeMaxValue: 250,
              },
              {
                idx: "2057",
                deviceHeader: "Afstand",
                dataReplaceText: "cm",
                gaugeAppendText: "cm",
                gaugeMaxValue: 1000,
                markerColor: "#70db70"
              }
            ]
          },
          weather: {
            devices: [ "1547", "1544", "590", "890", "1545", "1546", "1588", "1736" ],
            weatherLabel: "Weersinformatie",
            gaugeWidth: 185,
            gaugeWindAppendText: "km/u",
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
  				excludedDevices: [ "716", "1772", "1875", "304", "329", "1614", "1366", "1987" ],
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











