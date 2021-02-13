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
              Log.error(self.name + ": Could not load data.");
              console.log("Did not load data");
            }
          };
        }
        requestData.open("GET", payload.url, true);
        requestData.send();

    } else if (notification == "MMM-DOMO-ACTION") {
        var requestData = new XMLHttpRequest();
        requestData.onreadystatechange = function() {
          if (this.readyState === 4) {
            if (this.status === 200) {
              //Done
            } else {
              Log.error(self.name + ": Could not load data.");
              console.log("Action not executed");
            }
          };
        }
        requestData.open("GET", payload.url, true);
        requestData.send();
    }
  },
});
