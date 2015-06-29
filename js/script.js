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

  // functions to create the DOM structure to then appended to the .user-list
  // DOM node
  function redrawUserList(arr){
    var nodeStructure = '';

    arr.forEach(function(userObject) {
      var icon;
      var streamStatus = userObject["streamStatus"];

      // choose correct icon based on streamStatus
      if (streamStatus === "user-on") {
        icon = "fa-check-square-o";
      }
      else {
        icon = "fa-times";
      }

      // verbose in order to make structure of node clear
      nodeStructure += '<div class="col-md-3 user">';
      nodeStructure += '<a href="http://www.twitch.tv/' + userObject["userName"] + '">';
      nodeStructure += '<img src="' + userObject["img"] +'" alt="' + userObject["userName"] + ' Profile">';
      nodeStructure += '<span class="user-name"> ' + userObject["userName"] + '</span> ';
      nodeStructure += '<i class="fa fa-lg ' + icon + ' ' + streamStatus + '"></i>';
      nodeStructure += '</a></div>';
    });

    // find the .user-list element on the DOM,clear it and append newly created node(s) to it
    $(".user-list").empty();
    $(".user-list").append(nodeStructure);
  };

  // add functionality to my #all button
  $("#all").click(function() {
    redrawUserList(allUsers);
  });

  // add functionality to my #online button
  $("#online").click(function() {
    redrawUserList(onlineUsers);
  });

  // add functionality to my #online button
  $("#offline").click(function() {
    redrawUserList(offlineUsers);
  });
});
