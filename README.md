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











