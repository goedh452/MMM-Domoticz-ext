var NodeHelper = require("node_helper");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = NodeHelper.create({

  start: function () {
    console.log("Starting node_helper for module: " + this.name);
  },

  socketNotificationReceived: function (notification, payload) {
    self = this;

    if (notification == "MMM-DOMO-GET-DATA") {
        var requestData = new XMLHttpRequest();
        requestData.onreadystatechange = function() {
          if (this.readyState === 4) {
            if (this.status === 200) {
              var jsonData = JSON.parse(this.responseText);
              self.sendSocketNotification(payload.returnNotification,  { data: jsonData, roomID: payload.roomID });
            } else {
              console.error("MMM-Domoticz_ext: Could not load data. Returnstatus: " + this.status);
            }
          };
        }
        requestData.open("GET", payload.url, true);

        // Send authentication headers
        if ( payload.authentication != "" ) {
          let buff = Buffer.from(payload.authentication);
          let base64data = buff.toString('base64');
          requestData.setRequestHeader("Authorization", "Basic " + base64data);
        }

        requestData.send();

    } else if (notification == "MMM-DOMO-ACTION") {
        var requestData = new XMLHttpRequest();
        requestData.onreadystatechange = function() {
          if (this.readyState === 4) {
            if (this.status === 200) {
              //Done
            } else {
              console.error("MMM-Domoticz_ext: Action not executed.");
            }
          };
        }
        requestData.open("GET", payload.url, true);

        // Send authentication headers
        if ( payload.authentication != "" ) {
          let buff = Buffer.from(payload.authentication);
          let base64data = buff.toString('base64');
          requestData.setRequestHeader("Authorization", "Basic " + base64data);
        }
        
        requestData.send();
    }
  },
});
