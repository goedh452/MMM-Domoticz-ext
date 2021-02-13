class domoFunctions {

  constructor(config) {
    this.config = config;
  }

  translate(language, type, value) {
    var returnValue = "";

    if ( language == "en" ) { returnValue = value; }

    if ( language == "nl" ) {
      if ( type == "humidity" ) {
        if      ( value == "Normal"      ) { returnValue = "Normaal";        }
        else if ( value == "Comfortable" ) { returnValue = "Comfortabel";    }
        else if ( value == "Dry"         ) { returnValue = "Droog";          }
        else if ( value == "Wet"         ) { returnValue = "Nat";            }

      } else if ( type == "barometer" ) {
        if      ( value == "Stable"       ) { returnValue = "Stabiel";       }
        else if ( value == "Sunny"        ) { returnValue = "Zonnig";        }
        else if ( value == "Cloudy"       ) { returnValue = "Bewolkt";       }
        else if ( value == "Unstable"     ) { returnValue = "Instabiel";     }
        else if ( value == "Thunderstorm" ) { returnValue = "Storm";         }
        else if ( value == "Some Clouds"  ) { returnValue = "Enkele wolken"; }
      }
    }

    if ( returnValue == "" ) { returnValue = "Unknown"; }
    return returnValue;
  }

  shortenTitle(title) {
    var returnTitle = "";
    if ( title.length <= this.config.maxTitleLength ) { returnTitle = title; }
    else { returnTitle =  title.trim().slice(0, this.config.maxTitleLength) + "&hellip;" }
    return returnTitle;
  }

  getIcon(type) {
    var icon = "";
    if      ( type == 0   ) { icon = "fa fa-" + this.config.switchIcon;                      }
    else if ( type == 7   ) { icon = "fa fa-" + this.config.dimmerIcon;                      }
    else if ( type == 2   ) { icon = "fa fa-" + this.config.contactIcon;                     }
    else if ( type == 11  ) { icon = "fa fa-" + this.config.doorContactIcon;                 }
    else if ( type == 110 ) { icon = "fa fa-" + this.config.doorContactOpenIcon;             }
    else if ( type == 19 || type == 20 ) { icon = "fa fa-" + this.config.lockIcon;           }
    else if ( type == 111 ) { icon = "fa fa-" + this.config.unlockedIcon;                    }
    else if ( type == 90  ) { icon = "fa fa-" + this.config.temperatureIcon;                 }
    else if ( type == 91  ) { icon = "fa fa-" + this.config.humidityIcon;                    }
    else if ( type == 3  || type == 13 ) { icon = "fa fa-" + this.config.blindsIcon;         }
    else if ( type == 6  || type == 16 ) { icon = "fa fa-" + this.config.blindsInvertedIcon; }
    else if ( type == 8   ) { icon = "fa fa-" + this.config.motionIcon;                      }
    else if ( type == 92  ) { icon = "fa fa-" + this.config.luxIcon;                         }
    else if ( type == 93  ) { icon = "fa fa-" + this.config.usageIcon;                       }
    else if ( type == "temperature" ) { icon = "fa fa-" + this.config.temperatureIcon;       }
    else if ( type == "humidity"    ) { icon = "fa fa-" + this.config.humidityIcon;          }
    else if ( type == "barometer"   ) { icon = "fa fa-" + this.config.barometerIcon;         }
    else if ( type == "rain"        ) { icon = "fa fa-" + this.config.rainIcon               }
    return icon;
  }

  getIconClass(type) {
 	 var iconClass = "";
 	 if      ( type == 0  ) { iconClass = "domoSwitchOn";                         }
 	 else if ( type == 7  ) { iconClass = "domoDimmerOn";                         }
    else if ( type == 2  ) { iconClass = "domoContactOpen";                     }
    else if ( type == 11 ) { iconClass = "domoDoorContactOpen";                 }
    else if ( type == 19 || type == 20 ) { iconClass = "domoDoorLockOpen";      }
 	 else if ( type == 90 ) { iconClass = "domoTemperatureColor";                 }
 	 else if ( type == 91 ) { iconClass = "domoHumidityColor";                    }
    else if ( type == 3 || type == 13 ) { iconClass = "domoBlindsOpen";         }
    else if ( type == 6 || type == 16 ) { iconClass = "domoBlindsInvertedOpen"; }
    else if ( type == 8  ) { iconClass = "domoMotionDetected";                  }
    else if ( type == 92 ) { iconClass = "domoLuxColor";                        }
    else if ( type == 93 ) { iconClass = "domoUsageColor";                      }
    else if ( type == "temperature" ) { iconClass = "domoTemperatureColor";     }
    else if ( type == "humidity"    ) { iconClass = "domoHumidityColor";        }
    else if ( type == "barometer"   ) { iconClass = "domoBarometerColor";       }
    else if ( type == "rain"        ) { iconClass = "domoRainColor";            }
 	 return iconClass;
  }

  getCount(devices, switchTypeVal1, switchTypeVal2, countValue, condition, label, iconClass, colorClass, layout) {

    var totalOn = 0;
    var total   = 0;

    for (d in devices) {
      if ( devices[d].type == switchTypeVal1 || devices[d].type == switchTypeVal2 ) {
        if ( ( condition && devices[d].state == countValue )
          || ( !condition && devices[d].state != countValue ) ) { totalOn += 1; }
        total += 1;
      }
    }

    if ( total > 0 ) {
      // Switch icons for locks en doors when open
      if ( totalOn > 0 ) {
        if ( switchTypeVal1 == 11 ) { switchTypeVal1 = 110 }
        else if ( switchTypeVal1 == 19 || switchTypeVal2 == 20 ) { switchTypeVal1 = 111 }
      }

      if (layout == "type") {
        var row = document.createElement("tr");
        var cellName = document.createElement("td");
        var cellState = document.createElement("td");
        row.className = "normal";
        cellName.className = "title bright domoCell";
        cellState.className = "title light domoCellState";
        cellName.innerHTML = this.shortenTitle(label);
        var text = totalOn;
        if ( this.config.showTotals ) { text += "/" + total; }
        cellState.innerHTML = text;

        // Icon
        if ( this.config.showIcons ) {
          var cellIcon = document.createElement("td");
          cellIcon.className = "domoIconCell";
          var iconDiv  = document.createElement("div");
          iconDiv.className = this.getIcon(switchTypeVal1);
          iconDiv.className += " " + iconClass;

          // Show colored icons
          if ( this.config.coloredIcons && totalOn > 0 ) { iconDiv.className += " " + colorClass; }
          cellIcon.appendChild(iconDiv);
          row.appendChild(cellIcon);
        }

        row.appendChild(cellName);
        row.appendChild(cellState);

        return row;
      } else if ( layout == "dashboard" ) {

        var table     = document.createElement("table");
        var iconRow   = document.createElement("tr");
        var countRow  = document.createElement("tr");
        var iconCell  = document.createElement("td")
        var countCell = document.createElement("td");
        var iconDiv   = document.createElement("div");

        table.className = "small domoDBTable"

        iconCell.className = "domoDBIconCell";
        iconDiv.className = this.getIcon(switchTypeVal1);
        iconDiv.className += " " + iconClass;
        countCell.className = "title light domoDBCellState";

        var text = totalOn;
        if ( this.config.showTotals ) { text += "/" + total; }
        countCell.innerHTML = text;

        // Show colored icons
        if ( this.config.coloredIcons && totalOn > 0 ) { iconDiv.className += " " + colorClass; }
        iconCell.appendChild(iconDiv);
        iconRow.appendChild(iconCell);

        countRow.appendChild(countCell);

        table.appendChild(iconRow);
        table.appendChild(countRow);

        return table;
      }
    } else { return "empty"; }
  }

  getAverage(devices, switchTypeVal, label, suffix, iconClass, colorClass, layout) {

    var sum   = 0;
    var total = 0;
    var avg   = 0;

    for (d in devices) {
      if ( devices[d].type == switchTypeVal ) {
        sum += devices[d].value;
        total += 1;
      }
    }

    if ( total > 0 ) {
      avg = sum / total;

      if (layout == "type") {
        var row = document.createElement("tr");
        var cellName = document.createElement("td");
        var cellState = document.createElement("td");
        row.className = "normal";
        cellName.className = "title bright domoCell";
        cellState.className = "title light domoCellState";
        cellName.innerHTML = this.shortenTitle(label);
        cellState.innerHTML = avg.toFixed(1) + " " + suffix;

        // Icon
        if ( this.config.showIcons ) {
          var cellIcon = document.createElement("td");
          cellIcon.className = "domoIconCell";
          var iconDiv  = document.createElement("div");
          iconDiv.className = this.getIcon(switchTypeVal);
          iconDiv.className += " " + iconClass;

        // Show colored icons
        if ( this.config.coloredIcons ) { iconDiv.className += " " + colorClass; }
        cellIcon.appendChild(iconDiv);
        row.appendChild(cellIcon);
      }

      row.appendChild(cellName);
      row.appendChild(cellState);

      return row;
    } else if ( layout == "dashboard" ) {

      var table     = document.createElement("table");
      var iconRow   = document.createElement("tr");
      var countRow  = document.createElement("tr");
      var iconCell  = document.createElement("td")
      var countCell = document.createElement("td");
      var iconDiv   = document.createElement("div");

      table.className = "small domoDBTable"

      iconCell.className = "domoDBIconCell";
      iconDiv.className = this.getIcon(switchTypeVal);
      iconDiv.className += " " + iconClass;

      countCell.className = "title light domoDBCellState";
      countCell.innerHTML = avg.toFixed(1) + " " + suffix;

      // Show colored icons
      if ( this.config.coloredIcons && sum > 0 ) { iconDiv.className += " " + colorClass; }
      iconCell.appendChild(iconDiv);
      iconRow.appendChild(iconCell);

      countRow.appendChild(countCell);

      table.appendChild(iconRow);
      table.appendChild(countRow);

      return table;
    }
    } else { return "empty"; }
  }

  getSum(devices, switchTypeVal, label, suffix, iconClass, colorClass, layout) {

    var sum = 0;
    var total = 0;

    for (d in devices) {
      if ( devices[d].type == switchTypeVal ) {
        sum   += parseInt(devices[d].value);
        total += 1;
      }
    }

    if ( total > 0 ) {
      if (layout == "type") {
        var row = document.createElement("tr");
        var cellName = document.createElement("td");
        var cellState = document.createElement("td");
        row.className = "normal";
        cellName.className = "title bright domoCell";
        cellState.className = "title light domoCellState";
        cellName.innerHTML = this.shortenTitle(label);
        cellState.innerHTML = sum.toFixed(0) + " " + suffix;

        // Icon
        if ( this.config.showIcons ) {
          var cellIcon = document.createElement("td");
          cellIcon.className = "domoIconCell";
          var iconDiv  = document.createElement("div");
          iconDiv.className = this.getIcon(switchTypeVal);
          iconDiv.className += " " + iconClass;

          // Show colored icons
          if ( this.config.coloredIcons && sum > 0 ) { iconDiv.className += " " + colorClass; }
          cellIcon.appendChild(iconDiv);
          row.appendChild(cellIcon);
        }

        row.appendChild(cellName);
        row.appendChild(cellState);
        return row;
      } else if ( layout == "dashboard" ) {

        var table     = document.createElement("table");
        var iconRow   = document.createElement("tr");
        var countRow  = document.createElement("tr");
        var iconCell  = document.createElement("td")
        var countCell = document.createElement("td");
        var iconDiv   = document.createElement("div");

        table.className = "small domoDBTable"

        iconCell.className = "domoDBIconCell";
        iconDiv.className = this.getIcon(switchTypeVal);
        iconDiv.className += " " + iconClass;

        countCell.className = "title light domoDBCellState";
        countCell.innerHTML = sum.toFixed(0) + " " + suffix;

        // Show colored icons
        if ( this.config.coloredIcons && sum > 0 ) { iconDiv.className += " " + colorClass; }
        iconCell.appendChild(iconDiv);
        iconRow.appendChild(iconCell);

        countRow.appendChild(countCell);

        table.appendChild(iconRow);
        table.appendChild(countRow);

        return table;
      }
    } else { return "empty"; }
  }
}
