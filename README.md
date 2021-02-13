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

```
{
  module: "MMM-DarkSkyForecast",
  header: "Weather",
  position: "top_right",
  classes: "default everyone",
  disabled: false,
  config: {
    apikey: "SUPER SECRET!!!",
    latitude: "51.506130",
    longitude: "-0.090270",      
    iconset: "4c",
    concise: false,
    forecastLayout: "table"
  }
},
```

## Screenshots
### Overview
![Overview](overview.png?raw=true "Overview")

### Dashboard
![Dashboard](dashboard.png?raw=true "Dashboard")

### Floor
![Floor](floor.png?raw=true "Floor")

### Room and type
![Room and type](room_type.png?raw=true "Room and type")

### Utilities
![Utilities](utilities.png?raw=true "Utilities")

### Weather
![Weather](weather.png?raw=true "Weather")











