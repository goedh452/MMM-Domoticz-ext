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

## Icon Sets

![Icon Sets](icons/iconsets.png?raw=true "Icon Sets")


## Layouts

![Layouts](/../screenshots/forecast-layouts.png?raw=true "Layouts")


## Styling

This module is set to be 300px wide by default.  If you wish to override it, you can add the following to your `custom.css` file:

```
.MMM-DarkSkyForecast .module-content {
  width: 500px; /* adjust this to taste */
}
```

Most important elements of this module have one or more class names applied. Examine the `MMM-DarkSkyForecast.css` or inspect elements directly with your browser of choice to determine what class you would like to override.


## For Module Developers

This module broadcasts a notification when it recieves a weather update.  The notification is `DARK_SKY_FORECAST_WEATHER_UPDATE` and the payload contains Dark Sky's JSON weather forecast object.  For details on the weather object, see https://darksky.net/dev/docs.


## Attributions

**Skycons - Animated icon set by Dark Sky**<br />
http://darkskyapp.github.io/skycons/<br />
(using the fork created by Maxime Warner
that allows individual details of the icons
to be coloured<br />
https://github.com/maxdow/skycons)

**Climacons by Adam Whitcroft**<br />
http://adamwhitcroft.com/climacons/

**Free Weather Icons by Svilen Petrov**<br />
https://www.behance.net/gallery/12410195/Free-Weather-Icons

**Weather Icons by Thom**<br />
(Designed for DuckDuckGo)<br />
https://dribbble.com/shots/1832162-Weather-Icons

Sets 4 and 5 were found on Graphberry, but I couldn't find
the original artists.<br />
https://www.graphberry.com/item/weather-icons<br />
https://www.graphberry.com/item/weathera-weather-forecast-icons

Some of the icons were modified to better work with the module's
structure and aesthetic.

**Weather data provided by Dark Sky**<br />
https://darksky.net/

