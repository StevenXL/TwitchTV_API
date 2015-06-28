$(document).ready(function() {
  // on document ready
  var baseEndpoint = "https://api.twitch.tv/kraken/streams/"
  var users = ["medrybw", "freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","comster404","brunofin","thomasballinger","noobs2ninjas","beohoff"]
  var JSONP = "?callback=?"

  // user arrays
  var allUsers = [];
  var onlineUsers = [];
  var offlineUsers = [];

  // for each user
  users.forEach(function(currUser) {
    // make a request to the API
    $.getJSON(baseEndpoint + currUser + JSONP, function(data) {
      // gather and format information for user
      var user = {};

      // userName
      user["userName"] = currUser;

      // streamStatus
      if (data["stream"] === null) {
        user["streamStatus"] = "user-off";
      }
      else {
        user["streamStatus"] = "user-on";
      }

      // img
      if (user["streamStatus"] === "user-on") {
        user["img"] = data["stream"]["channel"]["logo"];
      }
      else {
        user["img"] = "http://static-cdn.jtvnw.net/jtv-static/404_preview-300x300.png";
      }

      // push to all users
      allUsers.push(user);

      // push to on / off user array as appropriate
      if (user["streamStatus"] === "user-on") {
        onlineUsers.push(user);
      }
      else {
        offlineUsers.push(user);
      }
    });
  });

  console.log(allUsers);

  // TODO
  // functions to create the DOM structure appended to the .user-list DOM node
});
