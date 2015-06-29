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

      // img & streamInfo
      if (user["streamStatus"] === "user-on") {
        user["img"] = data["stream"]["channel"]["logo"];
        user["streamInfo"] = data["stream"]["channel"]["status"];
      }
      else {
        user["img"] = "http://static-cdn.jtvnw.net/jtv-static/404_preview-300x300.png";
        user["streamInfo"] = null;
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

      // add stream info if stream is on
      if (streamStatus === "user-on") {
          nodeStructure += '<p class="info">' + userObject["streamInfo"] + '</p>';
      }

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

  // functionality for the search bar
  // Note that the below CSS selector is called an attribute selector
  $('input[type="search"]').keyup(function() {
      var searchTerm = $(this).val();

      // normalize searchTerm;
      searchTerm = searchTerm.toLowerCase();

      // clear the current .user-list
      $(".user-list").empty();

      // filter the allUsers array
      var searchResults = allUsers.filter(function(userObj) {
          var found = userObj["userName"].toLowerCase();
          found = found.indexOf(searchTerm);

          return (found > -1);
      });

      // append searchResults to DOM
      redrawUserList(searchResults);
  });
});
