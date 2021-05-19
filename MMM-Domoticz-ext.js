/* global Module */
Module.register("MMM-Domoticz-ext",{

	defaults: {
		apiBase: "",
		apiPort: "",
    apiUser: "",
    apiPW: "",
		updateInterval: 10,
		animationSpeed: 0,
    displayType: "both",
    alwaysShowDashboard: false,
    alwaysShowActions: true,
    dashboardPageSelect: "",
    showButtons: false,
    buttonsRight: false,
    buttonAllLabel: "All",
    buttonTypeLabel: "By type",
    buttonRoomLabel: "By room",
    buttonBothLabel: "Both",
    buttonFloorLabel: "Floor",
    buttonDashboardLabel: "Dashboard",
    horizontal: false,
    columnCount: 3,
    dashboardColumnCount: 4,
		showIcons: true,
		coloredIcons: true,
    maxTitleLength: 100,
		switchLabel: "Switches on",
		dimmerLabel: "Dimmers on",
		contactLabel: "Contacts open",
		doorContactLabel: "Doors open",
		doorLockLabel: "Doors unlocked",
		temperatureLabel: "Avg. temperature",
    humidityLabel: "Avg. humidity",
    blindsLabel: "Blinds open",
    blindsInvertedLabel: "Blinds closed",
    motionLabel: "Motion detected",
    luxLabel: "Avg. Lux level",
    usageLabel: "Usage",
		showTotals: true,
		switchIcon: "adjust",
		dimmerIcon: "lightbulb",
		contactIcon: "th-large",
		doorContactIcon: "door-closed",
    doorContactOpenIcon: "door-open",
		lockIcon: "lock",
    unlockedIcon: "unlock-alt",
    temperatureIcon: "thermometer-half",
		humidityIcon: "water",
    blindsIcon: "memory",
    blindsInvertedIcon: "align-justify",
    motionIcon: "running",
    luxIcon: "sun",
    usageIcon: "tachometer-alt",
    rainIcon: "cloud-rain",
    rooms: [],
    floors: [],
    dashboardRooms: [],
    utilities: {
      utilityLabel: "Utilities",
      showLabel: true,
      devices: [],
    },
    weather: {
      devices: [],
      weatherLabel: "Weather",
      gaugeWidth: 250,
      lineWidth: 20,
      markerWidth: 30,
      gaugeWindAppendText: "km/h",
      rainSuffix: "mm",
      barometerSuffix: "hPa",
    },
    actions: [],
    excludedDevices: [],
	},

	// Supported devices (SwitchTypeVal):
	// -> 0: Switch
	// -> 2: Contact
	// -> 3: Blinds
	// -> 6: Blinds inverted
	// -> 7: Dimmer
	// -> 8: Motion
	// -> 11: Door contact
	// -> 13: Blinds percentage
	// -> 16: Blinds percentage inverted
	// -> 19: Door lock
	// -> 20: Door lock inverted

	// Supported devices (Type / SubType)
	// Temperature - dummy SwitchTypeVal: 90
	// Humidity    - dummy SwitchTypeVal: 91
  // Lux         - dummy SwitchTypeVal: 92
  // Usage       - dummy SwitchTypeVal: 93

  domo: "",
  basicURL: "",
  allRoomURLSuffix: "/json.htm?type=plans&order=name&used=true",
  roomURLSuffix: "/json.htm?type=devices&used=true&order=Name&plan=",
  deviceURLSuffix: "/json.htm?type=devices&rid=",
  authentication: "",
  displayType: "",
	supportedDevices: [0, 2, 3, 6, 7, 8, 11, 13, 16, 19, 20],
	supportedTypeDevices: ["Temp", "Temp + Humidity", "Lux"],
  supportedSubTypeDevices: ["kWh"],
  supportedEnergyDevices: ["Energy", "kWh"],
	roomCount: 0,
	roomsProcessed: 0,
  utilityCount: 0,
  utilitiesProcessed: 0,
  weatherCount: 0,
  weatherProcessed: 0,
	rooms: [],
	devices: [],
  dashboardDevices: [],
	switches: [],
	dimmers: [],
	contacts: [],
	doorContacts: [],
	doorLocks: [],
	temperatures: [],
  humidity: [],
  blinds: [],
  blindsInverted: [],
  motion: [],
  lux: [],
  usage: [],
  utilities: [],
  weather: [],
  intervalID: null,
  baroMin: 950,
  baroMax: 1050,
  loadingMessage: "Loading...",
  defaultGaugeUseHeaderSymbol: false,
  defaultGaugeHeaderSymbol: "",
  defaultGaugeCounterTodayLabel: "Today",
  defaultGaugeCounterTodayAppendText: "kWh",
  defaultGaugeMinValue: 0,
  defaultGaugeMaxValue: 3000,
  defaultGaugeAppendText: "",
  defaultGaugeWidth: 200,
  defaultGaugeLineWidth: 16,
  defaultGaugeMarkerWidth: 16,
  defaultGaugeMarkerColor: "#F4D03F",

	start: function() {
		Log.info('Starting module: ' + this.name);
    this.domo = new domoFunctions(this.config);
		this.displayType = this.config.displayType,
		this.loaded = false;

    this.basicURL = "http://" + this.config.apiBase + ":" + this.config.apiPort

    // Build authentication string
    if ( this.config.apiUser != "" ) { this.authentication = this.config.apiUser + ":" + this.config.apihPW; }

    // Check for config errors
    if ( this.config.rooms.length == 0
      && this.config.dashboardRooms.length == 0
      && this.config.utilities.devices.length == 0
      && this.config.weather.devices.length == 0 ) {
        this.loadingMessage = "Specify room(s), dashboardsroom(s), utility device(s) and/or weather device(s) in config.json";
        this.updateDom(this.animationSpeed);
    } else if ( this.config.floors.length > 0 && this.config.rooms.length == 0 ) {
        this.loadingMessage = "Specify room(s) to use floors in config.json";
        this.updateDom(this.animationSpeed);
    } else {

    // Set undefined config variables to defaults
    if (this.config.utilities.utilityLabel          == undefined) { this.config.utilities.utilityLabel          = this.defaults.utilities.utilityLabel;          }
    if (this.config.utilities.showLabel             == undefined) { this.config.utilities.showLabel             = this.defaults.utilities.showLabel;             }
    if (this.config.weather.weatherLabel            == undefined) { this.config.weather.weatherLabel            = this.defaults.weather.weatherLabel;            }
    if (this.config.weather.gaugeWidth              == undefined) { this.config.weather.gaugeWidth              = this.defaults.weather.gaugeWidth;              }
    if (this.config.weather.lineWidth               == undefined) { this.config.weather.lineWidth               = this.defaults.weather.lineWidth;               }
    if (this.config.weather.markerWidth             == undefined) { this.config.weather.markerWidth             = this.defaults.weather.markerWidth;             }
    if (this.config.weather.gaugeWindAppendText     == undefined) { this.config.weather.gaugeWindAppendText     = this.defaults.weather.gaugeWindAppendText;     }
    if (this.config.weather.rainSuffix              == undefined) { this.config.weather.rainSuffix              = this.defaults.weather.rainSuffix;              }
    if (this.config.weather.barometerSuffix         == undefined) { this.config.weather.barometerSuffix         = this.defaults.weather.barometerSuffix;         }

    if ( this.config.dashboardRooms.length == 0 ) {
      for (r in this.config.rooms) { this.config.dashboardRooms.push(this.config.rooms[r].idx) }
    }

		this.roomCount    = this.config.rooms.length + this.config.dashboardRooms.length;
    this.utilityCount = this.config.utilities.devices.length;
    this.weatherCount = this.config.weather.devices.length;

		var roomUrl = this.basicURL + this.allRoomURLSuffix;
		this.sendSocketNotification("MMM-DOMO-GET-DATA", {url: roomUrl, returnNotification: "MMM-DOMO-ROOMS-SEND-" + this.identifier, authentication: this.authentication });
		this.update();

		// Schedule update interval
		this.intervalID = setInterval(
			this.update.bind(this),
			this.config.updateInterval * 1000); }
	},

  suspend: function() {
    console.log("Suspend domoticz-ext - instance: " + this.identifier);
		clearInterval(this.intervalID);
	},

	resume: function() {
    console.log("Resume domoticz-ext - instance: " + this.identifier);

    // Update module
    this.update();

    // Schedule update interval
		this.intervalID = setInterval(
			this.update.bind(this),
			this.config.updateInterval * 1000);
	},

	update: function() {
    console.log("Update domoticz-ext - instance: " + this.identifier);

		this.devices.length          = 0;
    this.dashboardDevices.length = 0;
    this.utilities.length        = 0;
    this.weather.length          = 0;
		this.roomsProcessed          = 0;
    this.utilitiesProcessed      = 0;
    this.weatherProcessed        = 0;

		for ( var r = 0; r < this.config.rooms.length; r++ ) {
			// Get device info per room
			var deviceUrl = this.basicURL + this.roomURLSuffix + this.config.rooms[r].idx;
			this.sendSocketNotification("MMM-DOMO-GET-DATA", { url: deviceUrl, returnNotification: "MMM-DOMO-DEVICES-SEND-" + this.identifier, roomID: this.config.rooms[r].idx, authentication: this.authentication });
		}

    if ( this.config.dashboardRooms.length > 0 ) {
      for ( var db = 0; db < this.config.dashboardRooms.length; db++ ) {
  			// Get device info per dashboard room
  			var deviceDbUrl = this.basicURL + this.roomURLSuffix + this.config.dashboardRooms[db];
  			this.sendSocketNotification("MMM-DOMO-GET-DATA", { url: deviceDbUrl, returnNotification: "MMM-DOMO-DBDEVICES-SEND-"  + this.identifier, roomID: this.config.dashboardRooms[db], authentication: this.authentication });
  		}
    }

    if ( this.config.utilities.devices.length > 0 ) {
      for ( var u = 0; u < this.config.utilities.devices.length; u++ ) {
  			// Get device for utilities
  			var utilityUrl = this.basicURL + this.deviceURLSuffix + this.config.utilities.devices[u].idx;
  			this.sendSocketNotification("MMM-DOMO-GET-DATA", { url: utilityUrl, returnNotification: "MMM-DOMO-UTILITIES-SEND-"  + this.identifier, roomID: -1, authentication: this.authentication });
  		}
    }

    if ( this.config.weather.devices.length > 0 ) {
      for ( var w = 0; w < this.config.weather.devices.length; w++ ) {
        // Get device for weather
        var weatherUrl = this.basicURL + this.deviceURLSuffix + this.config.weather.devices[w];
        this.sendSocketNotification("MMM-DOMO-GET-DATA", { url: weatherUrl, returnNotification: "MMM-DOMO-WEATHER-SEND-"  + this.identifier, roomID: -1, authentication: this.authentication });
      }
    }
	},

  //Import additional scripts
  getScripts: function () {
		return [
			"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js",
			this.file("js/GaugeMeter.js"),
      this.file("js/domo_functions.js"),
		];
	},

	//Import additional CSS Styles
	getStyles: function() {
		return ["MMM-Domoticz-ext.css", "font-awesome.css"]
	},

	socketNotificationReceived: function (notification, payload) {
		try {
			if (notification == "MMM-DOMO-ROOMS-SEND-" + this.identifier) {
        this.rooms.length = 0;
				var jsonRooms = payload.data.result;
				for (var i in jsonRooms) {
					for (var j in this.config.rooms) {
						if (jsonRooms[i].idx == this.config.rooms[j].idx) {
							var currentRoomName = ""
							if (this.config.rooms[j].name === undefined) { currentRoomName = jsonRooms[i].Name; }
							else { currentRoomName = this.config.rooms[j].name; }
							var currentRoom = { roomID: jsonRooms[i].idx, name: currentRoomName};
							this.rooms.push(currentRoom);
						}
					}
				}
			} else if ( notification == "MMM-DOMO-DEVICES-SEND-" + this.identifier || notification == "MMM-DOMO-DBDEVICES-SEND-" + this.identifier ) {
          var dashboardDevice = false;
          if ( notification == "MMM-DOMO-DBDEVICES-SEND-" + this.identifier ) { dashboardDevice = true; }

					var jsonDevices = payload.data.result;
          this.roomsProcessed += 1;
					for (d in jsonDevices) {
						var switchTypeVal = jsonDevices[d].SwitchTypeVal;
						var state         = jsonDevices[d].Status;
						var value         = 0;

						if ( ( this.supportedDevices.includes(jsonDevices[d].SwitchTypeVal )
						    || this.supportedTypeDevices.includes(jsonDevices[d].Type)
                || this.supportedSubTypeDevices.includes(jsonDevices[d].SubType) )
					    && !this.config.excludedDevices.includes(jsonDevices[d].idx) ) {

							// Exceptions converted to dummy SwitchTypeVals
						  if ( jsonDevices[d].SwitchTypeVal == undefined || jsonDevices[d].Type != undefined ) {
								if ( jsonDevices[d].Type == "Temp" ) {
									switchTypeVal = 90;
								  state         = jsonDevices[d].Data;
									value         = jsonDevices[d].Temp;
								} else if ( jsonDevices[d].Type == "Temp + Humidity" ) {
									switchTypeVal    = 90;
                  switchTypeValHum = 91;
									state            = jsonDevices[d].Temp.toFixed(1).toString() + " &#176;C";
                  value            = jsonDevices[d].Temp;
									var humidity     = jsonDevices[d].Humidity.toString() + "%";

                  // Push humidity as seperate device
                  var currentDevice = { roomID: payload.roomID, type: switchTypeValHum, name: jsonDevices[d].Name, state: humidity, value: jsonDevices[d].Humidity, icon: this.domo.getIcon(switchTypeValHum), iconClass: this.domo.getIconClass(switchTypeValHum) };
    							if (!dashboardDevice) { this.devices.push(currentDevice); } else { this.dashboardDevices.push(currentDevice); }

								} else if ( jsonDevices[d].Type == "Lux" ) {
									switchTypeVal = 92;
								  state = jsonDevices[d].Data;
									value = parseInt(jsonDevices[d].Data.replace(" Lux", ""));
                } else if ( jsonDevices[d].SwitchTypeVal == 0 && jsonDevices[d].SubType == "kWh") {
                  switchTypeVal = 93;
                  state = jsonDevices[d].Usage;
                  value = parseInt(jsonDevices[d].Usage.replace(" Watt", ""));
                }
              }
							var currentDevice = { roomID: payload.roomID, type: switchTypeVal, name: jsonDevices[d].Name, state: state, value: value, icon: this.domo.getIcon(switchTypeVal), iconClass: this.domo.getIconClass(switchTypeVal) };
              if (!dashboardDevice) { this.devices.push(currentDevice); } else { this.dashboardDevices.push(currentDevice); }
						}
					}

			} else if (notification == "MMM-DOMO-UTILITIES-SEND-" + this.identifier) {
				var jsonUtilities = payload.data.result;
        var subType       = jsonUtilities[0].SubType
        var returnNow     = "0 Watt";
        var returnToday   = "0 Watt";
        var returnUsage   = "0 Watt";

        if ( jsonUtilities[0].UsageDeliv        != undefined ) { returnNow  = jsonUtilities[0].UsageDeliv;         }
        if ( jsonUtilities[0].CounterDelivToday != undefined ) { returnToday = jsonUtilities[0].CounterDelivToday; }
        if ( jsonUtilities[0].CounterDeliv      != undefined ) { returnUsage = jsonUtilities[0].CounterDeliv;      }
        if ( this.supportedEnergyDevices.includes(jsonUtilities[0].SubType) ) { subType = "Energy"; }

        var utility = { idx: jsonUtilities[0].idx, name: jsonUtilities[0].Name, subType: subType, counter:jsonUtilities[0].Counter, counterToday: jsonUtilities[0].CounterToday, return: returnUsage, returnToday: returnToday, usage: jsonUtilities[0].Usage, returnUsage: returnNow };
        this.utilities.push(utility);
        this.utilitiesProcessed += 1;

      } else if (notification == "MMM-DOMO-WEATHER-SEND-" + this.identifier) {
				var jsonWeather = payload.data.result;
        var type = "";

        if      ( jsonWeather[0].Barometer != undefined   ) { type = "barometer"; }
        else if ( jsonWeather[0].Type      == "Humidity"  ) { type = "humidity";  }
        else if ( jsonWeather[0].Type      == "Rain"      ) { type = "rain";      }
        else if ( jsonWeather[0].Type      == "Wind"      ) { type = "wind";      }
        else    { type = "temperature"; }

        var weatherDevice = { name: jsonWeather[0].Name, type: type, direction: jsonWeather[0].Direction, directionString: jsonWeather[0].DirectionStr, speed: jsonWeather[0].Speed, rain: jsonWeather[0].Rain, barometer: jsonWeather[0].Barometer, baroForecast: jsonWeather[0].ForecastStr, temperature: jsonWeather[0].Temp, humidity: jsonWeather[0].Humidity, humidityStatus: jsonWeather[0].HumidityStatus, icon: this.domo.getIcon(type), iconClass: this.domo.getIconClass(type) };
        this.weather.push(weatherDevice);
        this.weatherProcessed += 1;
      }
      if ( ( this.roomsProcessed == this.roomCount )
        && ( this.utilitiesProcessed == this.utilityCount || this.config.utilities.devices.length == 0 )
        && ( this.weatherProcessed == this.weatherCount   || this.config.weather.devices.length == 0 ) ) {
          this.loaded = true;
          this.updateDom(this.config.animationSpeed);
        }
		} catch (err) { console.log("Error: " + err.message); }
 },

 showAll: function(devices) {
	 var table = document.createElement("table");
	 table.className = "small domoRoomtable";

	 for (d in devices) {
		 if ( devices[d].state != undefined ) {
			 var row = document.createElement("tr");
		   var cellName = document.createElement("td");
		   var cellState = document.createElement("td");
		   row.className = "normal";
		   cellName.className = "title bright domoCell";
		   cellState.className = "title light domoCellState";
		   cellName.innerHTML = this.domo.shortenTitle(devices[d].name);
	 	   cellState.innerHTML = devices[d].state.replace("Set Level: ", "");

		   // Icon
		   if ( this.config.showIcons ) {
			   var cellIcon = document.createElement("td");
			   cellIcon.className = "domoIconCell";
			   var iconDiv  = document.createElement("div");
			   iconDiv.className = devices[d].icon;
			   iconDiv.className += " domoIconDiv";

			   // Show colored icons
			   if ( this.config.coloredIcons ) {
				   if ( devices[d].state == "On"
			       || (devices[d].type == 7 && devices[d].state != "Off")
             || ( ( devices[d].type == 3 || devices[d].type == 13 ) && devices[d].state != "Closed" )
             || ( ( devices[d].type == 6 || devices[d].type == 16 ) && devices[d].state != "Open" )
             || ( devices[d].type != 3
               && devices[d].type != 6
               && devices[d].type != 13
               && devices[d].type != 16
				       && devices[d].state == "Open" )
				     || devices[d].state == "Unlocked"
					   || devices[d].type == 90
					   || devices[d].type == 91
             || devices[d].type == 92
             || devices[d].type == 93 && devices[d].usage > 0 )
			     { iconDiv.className += " " + devices[d].iconClass; }
			   }
			   cellIcon.appendChild(iconDiv);
			   row.appendChild(cellIcon);
		   }

		   row.appendChild(cellName);
	 	   row.appendChild(cellState);
	 	   table.appendChild(row);
		 }
	 }
	 return table;
 },

 groupByType: function(devices) {

  var iconClass = "domoIconDiv";
  var layout    = "type";

  var table = document.createElement("table");
  table.className = "small domoRoomtable";

   // Switches
  var switchesBlock = this.domo.getCount(devices, 0, -1, "On", true, this.config.switchLabel, iconClass, "domoSwitchOn", layout);
  if (switchesBlock != "empty") { table.appendChild(switchesBlock); }

  // Dimmers
  var dimmerBlock = this.domo.getCount(devices, 7, -1, "Off", false, this.config.dimmerLabel, iconClass, "domoDimmerOn", layout);
  if (dimmerBlock != "empty") { table.appendChild(dimmerBlock); }

  // Contacts
  var contactBlock = this.domo.getCount(devices, 2, -1, "Open", true, this.config.contactLabel, iconClass, "domoContactOpen", layout);
  if (contactBlock != "empty") { table.appendChild(contactBlock); }

  // Door contacts
  var doorContactBlock = this.domo.getCount(devices, 11, -1, "Open", true, this.config.doorContactLabel, iconClass, "domoDoorContactOpen", layout);
  if (doorContactBlock != "empty") { table.appendChild(doorContactBlock); }

  // Door locks
  var doorLockBlock = this.domo.getCount(devices, 19, 20, "Unlocked", true, this.config.doorLockLabel, iconClass, "domoDoorLockOpen", layout);
  if (doorLockBlock != "empty") { table.appendChild(doorLockBlock); }

  // Blinds
  var blindsBlock = this.domo.getCount(devices, 3, 13, "Closed", false, this.config.blindsLabel, iconClass, "domoBlindsOpen", layout);
  if (blindsBlock != "empty") { table.appendChild(blindsBlock); }

  // Blinds inverted
  var blindsInvertedBlock = this.domo.getCount(devices, 6, 16, "Open", false, this.config.blindsInvertedLabel, iconClass, "domoBlindsInvertedOpen", layout);
  if (blindsInvertedBlock != "empty") { table.appendChild(blindsInvertedBlock); }

  // Motion
  var motionBlock = this.domo.getCount(devices, 8, -1, "On", true, this.config.motionLabel, iconClass, "domoMotionDetected", layout);
  if (motionBlock != "empty") { table.appendChild(motionBlock); }

  // Temperature
  var temperatureBlock = this.domo.getAverage(devices, 90, this.config.temperatureLabel, " &#176;C", iconClass, "domoTemperatureColor", layout);
  if (temperatureBlock != "empty") { table.appendChild(temperatureBlock); }

  // Humidity
  var humidityBlock = this.domo.getAverage(devices, 91, this.config.humidityLabel, "%", iconClass, "domoHumidityColor", layout);
  if (humidityBlock != "empty") { table.appendChild(humidityBlock); }

  // Lux level
  var luxBlock = this.domo.getAverage(devices, 92, this.config.luxLabel, " lux", iconClass, "domoLuxColor", layout);
  if (luxBlock != "empty") { table.appendChild(luxBlock); }

  // Usage
  var usageBlock = this.domo.getSum(devices, 93, this.config.usageLabel, " Watt", iconClass, "domoUsageColor", layout);
  if (usageBlock != "empty") { table.appendChild(usageBlock); }

  return table;
 },

 groupByRoomType: function(devices, displayType) {

   var columnCount = 0;
	 var roomDevices = [];

	 var table = document.createElement("table");
   var row   = document.createElement("tr");
   table.className = "small";

	 // Fill array with devices per room
	 for (r in this.rooms) {
     roomDevices.length = 0;
		 for (d in devices) {
			 if (devices[d].roomID == this.rooms[r].roomID) {
				 roomDevices.push(devices[d]);
			 }
		 }

     if ( columnCount == this.config.columnCount || !this.config.horizontal ) {
       var row = document.createElement("tr");
       columnCount = 0;
     }

     var cell        = document.createElement("td");
		 var roomDiv     = document.createElement("div");
		 var roomTitle   = document.createElement("p");
		 var divider     = document.createElement("hr");
		 var deviceTable = document.createElement("table");

     cell.className      = "domoRoomCell";
		 roomTitle.innerHTML =  this.rooms[r].name;;
		 roomTitle.className =  "title bright";
		 divider.className   += " domoDivider";

		 if ( displayType == "both" ) { deviceTable = this.groupByType(roomDevices, "type"); }
		 else { deviceTable = this.showAll(roomDevices); }

		 roomDiv.appendChild(roomTitle);
		 roomDiv.appendChild(divider);
		 roomDiv.appendChild(deviceTable);
     cell.appendChild(roomDiv);
     row.appendChild(cell);
		 table.appendChild(row);

     columnCount += 1;
	 }
	 return table;
 },

 groupByFloor: function(devices) {

   var columnCount = 0;
	 var roomDevices = [];

	 var table = document.createElement("table");
   var row   = document.createElement("tr");
   table.className = "small";

	 // Fill array with devices per floor
   for (f in this.config.floors) {
     roomDevices.length = 0;
     for (r in this.config.floors[f].rooms) {
       for (d in devices) {
         if (devices[d].roomID == this.config.floors[f].rooms[r])
         roomDevices.push(devices[d]);
       }
		 }

     if ( columnCount == this.config.columnCount || !this.config.horizontal ) {
       var row = document.createElement("tr");
       columnCount = 0;
     }

     var cell        = document.createElement("td");
		 var floorDiv     = document.createElement("div");
		 var floorTitle  = document.createElement("p");
		 var divider     = document.createElement("hr");
		 var deviceTable = document.createElement("table");

     cell.className       = "domoRoomCell";
		 floorTitle.innerHTML =  this.config.floors[f].name;
		 floorTitle.className =  "title bright";
		 divider.className   += " domoDivider";

		 deviceTable = this.groupByType(roomDevices, "type");

		 floorDiv.appendChild(floorTitle);
		 floorDiv.appendChild(divider);
		 floorDiv.appendChild(deviceTable);
     cell.appendChild(floorDiv);
     row.appendChild(cell);
		 table.appendChild(row);

     columnCount += 1;
	 }
	 return table;
 },

 getDashboard: function(devices) {

   var iconClass   = "domoDBIconDiv";
   var cellClass   = "domoDBCell";
   var layout      = "dashboard";
   var columnCount = 0;

   var table = document.createElement("table");
   var row = document.createElement("tr");

   // Door locks
   var doorLockBlock = this.domo.getCount(devices, 19, 20, "Unlocked", true, this.config.doorLockLabel, iconClass, "domoDoorLockOpen", layout);
   if (doorLockBlock != "empty") {
     if ( columnCount == this.config.dashboardColumnCount || !this.config.horizontal ) {
       var row = document.createElement("tr");
       columnCount = 1;
     } else {
       columnCount += 1;
     }
     var cell = document.createElement("td");
     cell.className = "domoDBCell";
     cell.appendChild(doorLockBlock);
     row.appendChild(cell);
   }

   // Door contacts
   var doorContactBlock = this.domo.getCount(devices, 11, -1, "Open", true, this.config.doorContactLabel, iconClass, "domoDoorContactOpen", layout);
   if (doorContactBlock != "empty") {
     if ( columnCount == this.config.dashboardColumnCount || !this.config.horizontal ) {
       table.appendChild(row);
       var row = document.createElement("tr");
       columnCount = 1;
     } else {
       columnCount += 1;
     }
     var cell = document.createElement("td");
     cell.appendChild(doorContactBlock);
     row.appendChild(cell);
   }

   // Contacts
   var contactBlock = this.domo.getCount(devices, 2, -1, "Open", true, this.config.contactLabel, iconClass, "domoContactOpen", layout);
   if (contactBlock != "empty") {
     if ( columnCount == this.config.dashboardColumnCount || !this.config.horizontal ) {
       table.appendChild(row);
       var row = document.createElement("tr");
       columnCount = 1;
     } else {
       columnCount += 1;
     }
     var cell = document.createElement("td");
     cell.appendChild(contactBlock);
     row.appendChild(cell);
   }

   // Switches
   var switchesBlock = this.domo.getCount(devices, 0, -1, "On", true, this.config.switchLabel, iconClass, "domoSwitchOn", layout);
   if (switchesBlock != "empty") {
     if ( columnCount == this.config.dashboardColumnCount || !this.config.horizontal ) {
       table.appendChild(row);
       var row = document.createElement("tr");
       columnCount = 1;
     } else {
       columnCount += 1;
     }
     var cell = document.createElement("td");
     cell.appendChild(switchesBlock);
     row.appendChild(cell);
   }

   // Dimmers
   var dimmerBlock = this.domo.getCount(devices, 7, -1, "Off", false, this.config.dimmerLabel, iconClass, "domoDimmerOn", layout);
   if (dimmerBlock != "empty") {
     if ( columnCount == this.config.dashboardColumnCount || !this.config.horizontal ) {
       table.appendChild(row);
       var row = document.createElement("tr");
       columnCount = 1;
     } else {
       columnCount += 1;
     }
     var cell = document.createElement("td");
     cell.appendChild(dimmerBlock);
     row.appendChild(cell);
   }

   // Blinds inverted
   var blindsInvertedBlock = this.domo.getCount(devices, 6, 16, "Open", false, this.config.blindsInvertedLabel, iconClass, "domoBlindsInvertedOpen", layout);
   if (blindsInvertedBlock != "empty") {
     if ( columnCount == this.config.dashboardColumnCount || !this.config.horizontal ) {
       table.appendChild(row);
       var row = document.createElement("tr");
       columnCount = 1;
     } else {
       columnCount += 1;
     }
     var cell = document.createElement("td");
     cell.appendChild(blindsInvertedBlock);
     row.appendChild(cell);
   }

   // Blinds
   var blindsBlock = this.domo.getCount(devices, 3, 13, "Closed", false, this.config.blindsLabel, iconClass, "domoBlindsOpen", layout);
   if (blindsBlock != "empty") {
     if ( columnCount == this.config.dashboardColumnCount || !this.config.horizontal ) {
       table.appendChild(row);
       var row = document.createElement("tr");
       columnCount = 1;
     } else {
       columnCount += 1;
     }
     var cell = document.createElement("td");
     cell.appendChild(blindsBlock);
     row.appendChild(cell);
   }

   // Motion
   var motionBlock = this.domo.getCount(devices, 8, -1, "On", true, this.config.motionLabel, iconClass, "domoMotionDetected", layout);
   if (motionBlock != "empty") {
     if ( columnCount == this.config.dashboardColumnCount || !this.config.horizontal ) {
       table.appendChild(row);
       var row = document.createElement("tr");
       columnCount = 1;
     } else {
       columnCount += 1;
     }
     var cell = document.createElement("td");
     cell.appendChild(motionBlock);
     row.appendChild(cell);
   }

   // Temperature
   var temperatureBlock = this.domo.getAverage(devices, 90, this.config.temperatureLabel, " &#176;C", iconClass, "domoTemperatureColor", layout);
   if (temperatureBlock != "empty") {
     if ( columnCount == this.config.dashboardColumnCount || !this.config.horizontal ) {
       table.appendChild(row);
       var row = document.createElement("tr");
       columnCount = 1;
     } else {
       columnCount += 1;
     }
     var cell = document.createElement("td");
     cell.appendChild(temperatureBlock);
     row.appendChild(cell);
   }

   // Humidity
   var humidityBlock = this.domo.getAverage(devices, 91, this.config.humidityLabel, "%", iconClass, "domoHumidityColor", layout);
   if (humidityBlock != "empty") {
     if ( columnCount == this.config.dashboardColumnCount || !this.config.horizontal ) {
       table.appendChild(row);
       var row = document.createElement("tr");
       columnCount = 1;
     } else {
       columnCount += 1;
     }
     var cell = document.createElement("td");
     cell.appendChild(humidityBlock);
     row.appendChild(cell);
   }

   // Lux level
   var luxBlock = this.domo.getAverage(devices, 92, this.config.luxLabel, " lux", iconClass, "domoLuxColor", layout);
   if (luxBlock != "empty") {
     if ( columnCount == this.config.dashboardColumnCount || !this.config.horizontal ) {
       table.appendChild(row);
       var row = document.createElement("tr");
       columnCount = 1;
     } else {
       columnCount += 1;
     }
     var cell = document.createElement("td");
     cell.appendChild(luxBlock);
     row.appendChild(cell);
   }

   // Usage
   var usageBlock = this.domo.getSum(devices, 93, this.config.usageLabel, " Watt", iconClass, "domoUsageColor", layout);
   if (usageBlock != "empty") {
     if ( columnCount == this.config.dashboardColumnCount || !this.config.horizontal ) {
       table.appendChild(row);
       var row = document.createElement("tr");
       columnCount = 1;
     } else {
       columnCount += 1;
     }
     var cell = document.createElement("td");
     cell.appendChild(usageBlock);
     row.appendChild(cell);
   }

   table.appendChild(row);
   return table;
},

getUtilities: function(devices) {
  var utTable  = document.createElement("table");
  var utRow    = document.createElement("tr");
  var utCell   = document.createElement("td");
  var utDiv    = document.createElement("div");
  var title    = document.createElement("p");
  var divider  = document.createElement("hr");

  var deviceHeader           = "";
  var useHeaderSymbol        = false;
  var headerSymbol           = "";
  var counterTodayLabel      = "";
  var counterTodayAppendText = "kWh";
  var gaugeMinValue          = 0;
  var gaugeMaxValue          = 0;
  var gaugeAppendText        = "";
  var gaugeWidth             = 0;
  var lineWidth              = 0;
  var markerWidth            = 0;
  var markerColor            = "";

  utTable.className =  "small";
  title.className   =  "title bright domoCenterCell";

  if (this.config.utilities.showLabel) {
    divider.className += " domoDivider"
    title.innerHTML   =  this.config.utilities.utilityLabel;

    utDiv.appendChild(title);
    utDiv.appendChild(divider);
  }

  var table    = document.createElement("table");
  var tableRow = document.createElement("tr");
  table.className = "small";

  for ( d in devices ) {

    // Get config properties for device
    for ( var c = 0; c < this.config.utilities.devices.length; c++ ) {
      if ( devices[d].idx == this.config.utilities.devices[c].idx ) {
        if ( this.config.utilities.devices[c].deviceHeader           == undefined ) { deviceHeader           = devices[d].name;                         } else { deviceHeader           = this.config.utilities.devices[c].deviceHeader;           }
        if ( this.config.utilities.devices[c].useHeaderSymbol        == undefined ) { useHeaderSymbol        = this.defaultGaugeUseHeaderSymbol;        } else { useHeaderSymbol        = this.config.utilities.devices[c].useHeaderSymbol;        }
        if ( this.config.utilities.devices[c].headerSymbol           == undefined ) { headerSymbol           = this.defaultGaugeheaderSymbol;           } else { headerSymbol           = this.config.utilities.devices[c].headerSymbol;           }
        if ( this.config.utilities.devices[c].counterTodayLabel      == undefined ) { counterTodayLabel      = this.defaultGaugeCounterTodayLabel;      } else { counterTodayLabel      = this.config.utilities.devices[c].counterTodayLabel;      }
        if ( this.config.utilities.devices[c].counterTodayAppendText == undefined ) { counterTodayAppendText = this.defaultGaugeCounterTodayAppendText; } else { counterTodayAppendText = this.config.utilities.devices[c].counterTodayAppendText; }
        if ( this.config.utilities.devices[c].gaugeMinValue          == undefined ) { gaugeMinValue          = this.defaultGaugeMinValue;               } else { gaugeMinValue          = this.config.utilities.devices[c].gaugeMinValue;          }
        if ( this.config.utilities.devices[c].gaugeMaxValue          == undefined ) { gaugeMaxValue          = this.defaultGaugeMaxValue;               } else { gaugeMaxValue          = this.config.utilities.devices[c].gaugeMaxValue;          }
        if ( this.config.utilities.devices[c].gaugeAppendText        == undefined ) { gaugeAppendText        = this.defaultGaugeAppendText;             } else { gaugeAppendText        = this.config.utilities.devices[c].gaugeAppendText;        }
        if ( this.config.utilities.devices[c].gaugeWidth             == undefined ) { gaugeWidth             = this.defaultGaugeWidth;                  } else { gaugeWidth             = this.config.utilities.devices[c].gaugeWidth;             }
        if ( this.config.utilities.devices[c].lineWidth              == undefined ) { lineWidth              = this.defaultGaugeLineWidth;              } else { lineWidth              = this.config.utilities.devices[c].lineWidth;              }
        if ( this.config.utilities.devices[c].markerWidth            == undefined ) { markerWidth            = this.defaultGaugeMarkerWidth;            } else { markerWidth            = this.config.utilities.devices[c].markerWidth;            }
        if ( this.config.utilities.devices[c].markerColor            == undefined ) { markerColor            = this.defaultGaugeMarkerColor;            } else { markerColor            = this.config.utilities.devices[c].markerColor;            }
      }
    }

    if ( devices[d].subType == "Energy") {
      var tableCell        = document.createElement("td");
      var tableEnergy      = document.createElement("table");
      var rowEnergy        = document.createElement("tr");
      var rowUsage         = document.createElement("tr");
      var cellName         = document.createElement("td");
      var cellUsage        = document.createElement("td");

      tableEnergy.className = "small";

      if ( useHeaderSymbol ) {
        cellName.className = "fa fa-" + headerSymbol;
      } else {
        cellName.className   = "title bright gaugeAlign";
        cellUsage.className  = "gaugeAlign";
        cellName.innerHTML    = deviceHeader;
      }

      // Build gauge
      var usageValue       = parseInt(devices[d].usage.replace(" Watt", ""));
      var returnUsageValue = parseInt(devices[d].returnUsage.replace(" Watt", ""));
      var counterTodayTemp = parseFloat(devices[d].counterToday.replace(" kWh", "")) - parseFloat(devices[d].returnToday.replace(" kWh", ""));
      var counterToday     = counterTodayTemp.toFixed(1);
      var counterTodayText = counterTodayLabel + " " + counterToday + " " + counterTodayAppendText;
      var nettoUsage       = usageValue - returnUsageValue;
      var usageGaugeResult = this.getGauge( devices[d].idx, nettoUsage, counterTodayText, gaugeMinValue, gaugeMaxValue, gaugeAppendText, gaugeWidth, lineWidth, markerWidth, markerColor );

      cellUsage.appendChild(usageGaugeResult);
      rowEnergy.appendChild(cellName);
      rowUsage.appendChild(cellUsage);
      tableEnergy.appendChild(rowEnergy);
      tableEnergy.appendChild(rowUsage);
      tableCell.appendChild(tableEnergy);
      tableRow.appendChild(tableCell);
    }

    if ( devices[d].subType == "Gas") {
      var tableCell = document.createElement("td");
      var tableGas  = document.createElement("table");
      var rowGas    = document.createElement("tr");
      var rowUsage  = document.createElement("tr");
      var cellName  = document.createElement("td");
      var cellUsage = document.createElement("td");

      if ( useHeaderSymbol ) {
        cellName.className = "fa fa-" + headerSymbol;
      } else {
        cellName.className   = "title bright gaugeAlign";
        cellUsage.className  = "gaugeAlign";
        cellName.innerHTML    = deviceHeader;
      }

      // Build gauge
      var usageValue       = parseFloat(devices[d].counterToday.replace(" m3", ""));
      var usageGaugeResult = this.getGauge( devices[d].idx, usageValue, counterTodayLabel, gaugeMinValue, gaugeMaxValue, gaugeAppendText, gaugeWidth, lineWidth, markerWidth, markerColor );

      cellUsage.appendChild(usageGaugeResult);
      rowGas.appendChild(cellName);
      rowUsage.appendChild(cellUsage);
      tableGas.appendChild(rowGas);
      tableGas.appendChild(rowUsage);
      tableCell.appendChild(tableGas);
      tableRow.appendChild(tableCell);
    }

    if ( devices[d].counterToday.indexOf("Liter") > -1 ) {
      var tableCell  = document.createElement("td");
      var tableWater = document.createElement("table");
      var rowWater   = document.createElement("tr");
      var rowUsage   = document.createElement("tr");
      var cellName   = document.createElement("td");
      var cellUsage  = document.createElement("td");

      if ( useHeaderSymbol ) {
        cellName.className = "fa fa-" + headerSymbol;
      } else {
        cellName.className   = "title bright gaugeAlign";
        cellUsage.className  = "gaugeAlign";
        cellName.innerHTML    = deviceHeader;
      }

      // Build gauge
      var usageValue       = parseFloat(devices[d].counterToday.replace(" Liter", ""));
      var usageGaugeResult = this.getGauge( devices[d].idx, usageValue, counterTodayLabel, gaugeMinValue, gaugeMaxValue, gaugeAppendText, gaugeWidth, lineWidth, markerWidth, markerColor );

      cellUsage.appendChild(usageGaugeResult);
      rowWater.appendChild(cellName);
      rowUsage.appendChild(cellUsage);
      tableWater.appendChild(rowWater);
      tableWater.appendChild(rowUsage);
      tableCell.appendChild(tableWater);
      tableRow.appendChild(tableCell);
    }
  }

  table.appendChild(tableRow);
  utDiv.appendChild(table)
  utCell.appendChild(utDiv);
  utRow.appendChild(utCell);
  utTable.appendChild(utRow);

  return utTable;
},

getGauge: function( idx, usage, counterTodayText, gaugeMinValue, gaugeMaxValue, gaugeAppendText, gaugeWidth, lineWidth, markerWidth, markerColor ) {

  // Variables for usage
  var percentage    = Math.floor((usage / gaugeMaxValue) * 100);
  var color         = markerColor;
  var antiClockwise = false;
  var centerZero    = false;

  if ( gaugeMinValue < 0 ) { centerZero = true; }

  // Variables for return
  if (usage < 0) {
    percentage    = Math.floor((Math.abs(usage / gaugeMinValue)) * 100);
    color         = "#70db70";
    antiClockwise = true;
  }

  var spanSelector = "#" + idx + " span";
  var gaugeTable = jQuery(document.createElement("div")).addClass("GaugeMeter").attr("id", idx);
  var obj = {
    percent: percentage,
    size: gaugeWidth,
    append: " " + gaugeAppendText,
    color: color,
    back: "rgba(255,255,255,.3)",
    width: lineWidth,
    markerWidth: markerWidth,
    style: "Arch",
    stripe: 0,
    animationstep: 0,
    animate_gauge_colors: false,
    animate_text_colors: false,
    label: counterTodayText,
    label_color: "#ffffff",
    text: usage,
    text_size: .11,
    centerZero: centerZero,
    antiClockwise: antiClockwise
  }

  gaugeTable.data(obj);
  gaugeTable.gaugeMeter();
  return gaugeTable[0];
},

getWeather: function(devices) {
  var firstRun     = true;
  var weatherTable = document.createElement("table");
  var weatherRow   = document.createElement("tr");
  var weatherCell  = document.createElement("td");
  var weatherDiv   = document.createElement("div");
  var deviceTable  = document.createElement("table");
  var deviceRow    = document.createElement("tr");

  var titleDiv     = document.createElement("div");
  var title        = document.createElement("p");
  var divider      = document.createElement("hr");

  weatherTable.className =  "small";
  title.className        =  "title bright domoCenterCell";
  divider.className      += " domoDivider"
  title.innerHTML        =  this.config.weather.weatherLabel;

  weatherDiv.appendChild(title);
  weatherDiv.appendChild(divider);

  // Mappinfg function
  Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
  }

  for (d in devices) {
    if (devices[d].type == "wind") {
      var cellWeatherWind = document.createElement("td");
      var tableWind = document.createElement("table");
      var rowName   = document.createElement("tr");
      var rowWind   = document.createElement("tr");
      var cellName  = document.createElement("td");
      var cellWind  = document.createElement("td");

      tableWind.className = "small";
      cellName.className  = "title bright gaugeAlign";
      cellWind.className  = "gaugeAlign";
      cellName.innerHTML  = devices[d].name;

      var label           = devices[d].speed + " " + this.config.weather.gaugeWindAppendText;
      var direction       = devices[d].direction + "&#176; " + this.translate(devices[d].directionString);
      var directionInt    = parseInt(direction);
      var color           = "#1a75ff";
      var pi              = Math.PI;
      var mappedDirection = 0;
      var variation       = 0.05;

      // Transform wind degrees to HTML arc
      // North: 0 degrees = -0.5
      // East: 90 degrees = 0
      // South: 180 degrees = 0.5
      // West: 270 degress = 1 / -1

      if      ( directionInt >= 0   && directionInt < 90  ) { mappedDirection = directionInt.map(0, 89, -0.5, 0);     }
      else if ( directionInt >= 90  && directionInt < 270 ) { mappedDirection = directionInt.map(90, 269, 0, 1);      }
      else if ( directionInt >= 270 && directionInt < 360 ) { mappedDirection = directionInt.map(270, 359, -1, -0.5); }

      var startPoint = (mappedDirection * pi) + variation;
      var endPoint   = (mappedDirection * pi) - variation;
      var spanSelector = "#Wind span";

      var gaugeTable = jQuery(document.createElement("div")).addClass("GaugeMeter").attr("id", "Wind");
      var obj = {
        startPoint: startPoint,
        endPoint: endPoint,
        size: this.config.weather.gaugeWidth,
        color: color,
        back: "rgba(255,255,255,.3)",
        width: this.config.weather.lineWidth,
        markerWidth: this.config.weather.markerWidth,
        style: "Full",
        stripe: 5,
        animationstep: 0,
        animate_gauge_colors: false,
        animate_text_colors: false,
        label: label,
        label_color: "#ffffff",
        text: direction,
        text_size: .11,
        centerZero: false,
        antiClockwise: true
      }

      gaugeTable.data(obj);
      gaugeTable.gaugeMeter();

      cellWind.appendChild(gaugeTable[0]);
      rowName.appendChild(cellName);
      rowWind.appendChild(cellWind);
      tableWind.appendChild(rowName);
      tableWind.appendChild(rowWind);
      cellWeatherWind.appendChild(tableWind);
      deviceRow.appendChild(cellWeatherWind);

    } else if ( devices[d].type == "barometer" ) {
      var cellWeatherBaro = document.createElement("td");
      var tableBaro = document.createElement("table");
      var rowName   = document.createElement("tr");
      var rowBaro   = document.createElement("tr");
      var cellName  = document.createElement("td");
      var cellBaro  = document.createElement("td");

      tableBaro.className = "small";
      cellName.className  = "title bright gaugeAlign";
      cellBaro.className  = "gaugeAlign";
      cellName.innerHTML  = devices[d].name;

      var label           = this.domo.translate(config.language, "barometer", devices[d].baroForecast);
      var pressure        = devices[d].barometer.toFixed(0) + " hPa";
      var pressureInt     = parseInt(pressure);
      var mappedPressure  = 0;
      var color           = "#1a75ff";
      var pi              = Math.PI;
      var variation       = 0.05;

      // Transform hPa to HTML arc
      // 950 -> 999 hPa: 1 -> -0.5
      // 1000 -> 1050 hPa: -0.5 -> 0
      if      ( pressureInt < 1000  ) { mappedPressure = pressureInt.map(this.baroMin, 999, -1, -0.5);  }
      else if ( pressureInt >= 1000 ) { mappedPressure = pressureInt.map(1000, this.baroMax, -0.5, 0); }

      var startPoint = (mappedPressure * pi) + variation;
      var endPoint   = (mappedPressure * pi) - variation;
      var spanSelector = "#Baro span";

      var gaugeTable = jQuery(document.createElement("div")).addClass("GaugeMeter").attr("id", "Baro");
      var obj = {
        startPoint: startPoint,
        endPoint: endPoint,
        size: this.config.weather.gaugeWidth,
        color: color,
        back: "rgba(255,255,255,.3)",
        width: this.config.weather.lineWidth,
        markerWidth: this.config.weather.markerWidth,
        style: "Full",
        stripe: 5,
        animationstep: 0,
        animate_gauge_colors: false,
        animate_text_colors: false,
        label: label,
        label_color: "#ffffff",
        text: pressure,
        text_size: .11,
        centerZero: false,
        antiClockwise: true
      }

      gaugeTable.data(obj);
      gaugeTable.gaugeMeter();

      cellBaro.appendChild(gaugeTable[0]);
      rowName.appendChild(cellName);
      rowBaro.appendChild(cellBaro);
      tableBaro.appendChild(rowName);
      tableBaro.appendChild(rowBaro);
      cellWeatherBaro.appendChild(tableBaro);
      deviceRow.appendChild(cellWeatherBaro);

    } else if ( devices[d].type == "humidity" ) {
        var cellWeatherHum = document.createElement("td");
        var tableHum  = document.createElement("table");
        var rowName   = document.createElement("tr");
        var rowHum    = document.createElement("tr");
        var cellName  = document.createElement("td");
        var cellHum   = document.createElement("td");

        tableHum.className  = "small";
        cellName.className  = "title bright gaugeAlign";
        cellHum.className   = "gaugeAlign";
        cellName.innerHTML  = devices[d].name;

        var label           = this.domo.translate(config.language, "humidity", devices[d].humidityStatus);
        var humidity        = devices[d].humidity + " %";
        var humidityInt     = parseInt(devices[d].humidity);
        var mappedHumidity  = 0;
        var color           = "#1a75ff";
        var pi              = Math.PI;
        var variation       = 0.05;

        // Transform percentage to HTML arc
        // 0 -> 49 hPa: 1 -> -0.5
        // 50 -> 100 hPa: -0.5 -> 0
        if      ( humidityInt < 49  ) { mappedHumidity = humidityInt.map(0, 49, -1, -0.5);  }
        else if ( humidityInt >= 50 ) { mappedHumidity = humidityInt.map(50, 100, -0.5, 0); }

        var startPoint = (mappedHumidity * pi) + variation;
        var endPoint   = (mappedHumidity * pi) - variation;
        var spanSelector = "#Humidity span";

        var gaugeTable = jQuery(document.createElement("div")).addClass("GaugeMeter").attr("id", "Humidity");
        var obj = {
          startPoint: startPoint,
          endPoint: endPoint,
          size: this.config.weather.gaugeWidth,
          color: color,
          back: "rgba(255,255,255,.3)",
          width: this.config.weather.lineWidth,
          markerWidth: this.config.weather.markerWidth,
          style: "Full",
          stripe: 5,
          animationstep: 0,
          animate_gauge_colors: false,
          animate_text_colors: false,
          label: label,
          label_color: "#ffffff",
          text: humidity,
          text_size: .11,
          centerZero: false,
          antiClockwise: true
        }

        gaugeTable.data(obj);
        gaugeTable.gaugeMeter();

        cellHum.appendChild(gaugeTable[0]);
        rowName.appendChild(cellName);
        rowHum.appendChild(cellHum);
        tableHum.appendChild(rowName);
        tableHum.appendChild(rowHum);
        cellWeatherHum.appendChild(tableHum);
        deviceRow.appendChild(cellWeatherHum);

    } else {

      if (firstRun) {
        var cellWeatherRest = document.createElement("td");
        var tableRest       = document.createElement("table");
        tableRest.className = "small";
      }
      var row       = document.createElement("tr");
      var cellName  = document.createElement("td");
      var cellValue = document.createElement("td");
      var value     = "";

      cellName.className  = "title bright domoWeatherCell";
      cellValue.className = "title light domoWeatherCellState";
      cellName.innerHTML  = this.domo.shortenTitle(devices[d].name);

      if      ( devices[d].type == "temperature" ) { value = devices[d].temperature + " &#176;C" }
      else if ( devices[d].type == "rain"        ) { value = devices[d].rain + " " + this.config.weather.rainSuffix }

      cellValue.innerHTML  = value;

      // Icon
      if ( this.config.showIcons ) {
        var cellIcon = document.createElement("td");
        cellIcon.className = "domoIconCell";
        var iconDiv        = document.createElement("div");
        iconDiv.className  = devices[d].icon;
        iconDiv.className  += " domoIconDiv";

        // Show colored icons
        if ( this.config.coloredIcons ) { iconDiv.className += " " + devices[d].iconClass; }
        cellIcon.appendChild(iconDiv);
        row.appendChild(cellIcon);
      }

      row.appendChild(cellName);
      row.appendChild(cellValue);
      tableRest.appendChild(row);
      firstRun = false;
    }
  }

  if ( cellWeatherRest != undefined ) {
    cellWeatherRest.appendChild(tableRest);
    deviceRow.appendChild(cellWeatherRest);
  }

  deviceTable.appendChild(deviceRow);
  weatherDiv.appendChild(deviceTable)
  weatherCell.appendChild(weatherDiv);
  weatherRow.appendChild(weatherCell);
  weatherTable.appendChild(weatherRow);

  return weatherTable;
},

getActions: function() {

  var actionTable = document.createElement("table");
  var actionRow   = document.createElement("tr");
  actionTable.className = "small";

  for (let a = 0; a < this.config.actions.length; a++) {
    var actionCell = document.createElement("td");
    var actionDiv  = document.createElement("div");

    actionDiv.className  = "title bright domoButton";
    actionDiv.innerHTML  = this.config.actions[a].label;

    actionDiv.addEventListener("click", (e) =>  {
      this.sendSocketNotification ("MMM-DOMO-ACTION", { url: this.config.actions[a].url, authentication: this.authentication })
    });

    actionCell.appendChild(actionDiv);
    actionRow.appendChild(actionCell);
  }

  actionTable.appendChild(actionRow);
  return actionTable;
},

getButtons: function() {

  var buttonTable = document.createElement("table");

  if (this.config.buttonsRight) {
    var allContainer     = document.createElement("tr");
    var typeContainer    = document.createElement("tr");
    var roomContainer    = document.createElement("tr");
    var bothContainer    = document.createElement("tr");
    var floorContainer   = document.createElement("tr");
    var dashContainer    = document.createElement("tr");
  } else {
    var allContainer     = document.createElement("td");
    var typeContainer    = document.createElement("td");
    var roomContainer    = document.createElement("td");
    var bothContainer    = document.createElement("td");
    var floorContainer   = document.createElement("td");
    var dashContainer    = document.createElement("td");
  }

  var allButton         = document.createElement("div");
  var typeButton        = document.createElement("div");
  var roomButton        = document.createElement("div");
  var bothButton        = document.createElement("div");
  var floorButton       = document.createElement("div");
  var dashButton        = document.createElement("div");

  buttonTable.className = "small";

  allButton.className   = "title bright domoTopButton";
  typeButton.className  = "title bright domoButton";
  roomButton.className  = "title bright domoButton";
  bothButton.className  = "title bright domoButton";
  floorButton.className = "title bright domoButton";
  dashButton.className  = "title bright domoButton";

  allButton.innerHTML   = this.config.buttonAllLabel;
  typeButton.innerHTML  = this.config.buttonTypeLabel;
  roomButton.innerHTML  = this.config.buttonRoomLabel;
  bothButton.innerHTML  = this.config.buttonBothLabel;
  floorButton.innerHTML = this.config.buttonFloorLabel;
  dashButton.innerHTML  = this.config.buttonDashboardLabel;

  allButton.addEventListener("click", () =>  {
   this.displayType = "all";
   this.updateDom(1000);
  });

  typeButton.addEventListener("click", () => {
   this.displayType = "type";
   this.updateDom(1000);
  });

  roomButton.addEventListener("click", () => {
   this.displayType = "room";
   this.updateDom(1000);
  });

  bothButton.addEventListener("click", () => {
   this.displayType = "both";
   this.updateDom(1000);
  });

  floorButton.addEventListener("click", () => {
   this.displayType = "floor";
   this.updateDom(1000);
  });

  dashButton.addEventListener("click", () => {
   this.displayType = "dashboard";
   this.updateDom(1000);
  });

  allContainer.appendChild(allButton);
  typeContainer.appendChild(typeButton);
  roomContainer.appendChild(roomButton);
  bothContainer.appendChild(bothButton);
  floorContainer.appendChild(floorButton);
  dashContainer.appendChild(dashButton);

  buttonTable.appendChild(allContainer);
  buttonTable.appendChild(typeContainer);
  buttonTable.appendChild(roomContainer);
  buttonTable.appendChild(bothContainer);
  if (this.config.floors.length > 0) { buttonTable.appendChild(floorContainer); }
  // Do not show dashboard button when dashboard is always displayed
  if (!this.config.alwaysShowDashboard) { buttonTable.appendChild(dashContainer) };

  return buttonTable;
},

 // Override dom generator
 getDom: function() {
	 var wrapper = document.createElement("div");
   wrapper.className = "domoMasterDiv";

	 if (!this.loaded) {
		 wrapper.innerHTML = this.loadingMessage;
		 wrapper.className = "dimmed light small";
		 return wrapper;
	 }

   // Master table as container for all layouts
   var masterTable       = document.createElement("table");

	 // Get layouts
   if      ( this.displayType == "all"       ) { var table = this.showAll(this.devices);                 }
   else if ( this.displayType == "type"      ) { var table = this.groupByType(this.devices);             }
   else if ( this.displayType == "floor"     ) { var table = this.groupByFloor(this.devices);            }
   else if ( this.displayType == "room"      ) { var table = this.groupByRoomType(this.devices, "room"); }
   else if ( this.displayType == "both"      ) { var table = this.groupByRoomType(this.devices, "both"); }
   else if ( this.displayType == "dashboard" ) { var table = this.getDashboard(this.dashboardDevices);   }
   else if ( this.displayType == "actions"   ) { var table = this.getActions(this.getActions);           }

   // Get dashboard if alwaysShowDashboard is true
   if ( this.displayType != "dashboard" && this.config.alwaysShowDashboard ) {
     var dashboardTable = this.getDashboard(this.dashboardDevices);
     dashboardTable.className = "dashboardTable";
     masterTable.appendChild(dashboardTable);
   }

   // Seperate table for utilities and weather
   var masterTableUtWe   = document.createElement("table");
   var masterRowUtWe     = document.createElement("tr");
   var masterRow         = document.createElement("tr");
   var masterRowActions  = document.createElement("tr");
   var masterCellResult  = document.createElement("td");
   masterRow.className   = "domoCenterCell";

   // Get utility layout
   if ( this.utilities.length > 0 ) {
     var utilityTable = this.getUtilities(this.utilities);
     var masterCellUt = document.createElement("td");
     masterCellUt.appendChild(utilityTable);
     masterRowUtWe.appendChild(masterCellUt);
   }

   // Get weather layout
   if ( this.weather.length > 0 ) {
     var weatherTable = this.getWeather(this.weather);
     var masterCellWe = document.createElement("td");
     masterCellWe.appendChild(weatherTable);
     masterRowUtWe.appendChild(weatherTable);
   }

   masterTableUtWe.appendChild(masterRowUtWe);
   masterTable.appendChild(masterTableUtWe);

  if ( this.config.showButtons && this.config.rooms.length > 0 ) {
    var masterRowButton  = document.createElement("tr");
    var masterCellButton = document.createElement("td");
    masterRowButton.className   = "domoCenterCell";
    masterCellButton.className  = "domoMasterCell";
    masterCellButton.appendChild(this.getButtons());

    if (!this.config.buttonsRight) { masterRowButton.appendChild(masterCellButton); }
   }

   masterCellResult.appendChild(table);
   masterRow.appendChild(masterCellResult);

   if (this.config.showButtons && this.config.rooms.length > 0 ) {
     if (this.config.buttonsRight) {
       masterRow.appendChild(masterCellButton);
       masterTable.appendChild(masterRow);
     } else {
       masterTable.appendChild(masterRow);
       masterTable.appendChild(masterRowButton);
     }
   } else {
     masterTable.appendChild(masterRow);
   }

   // Get custom action button layout
   if ( this.config.alwaysShowActions && this.config.actions.length > 0 ) {
     var rowActions  = document.createElement("tr");
     var cellActions = document.createElement("td");
     cellActions.className  = "domoMasterCell";
     cellActions.appendChild(this.getActions());

     masterRowActions.appendChild(cellActions);
     masterTable.appendChild(masterRowActions);
   }

   wrapper.appendChild(masterTable);

   if ( this.config.dashboardPageSelect != "" ) {
     var pageSelectButton = document.createElement("div");
     pageSelectButton.className = "domoPageSelect";
     pageSelectButton.addEventListener("click", () => this.sendNotification("PAGE_SELECT", this.config.dashboardPageSelect));
     wrapper.appendChild(pageSelectButton);
   }

	 return wrapper;
 },
});
