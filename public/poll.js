console.log("poll.js file loaded");

var socket = io();

socket.on('usersConnected', function(count) {
  console.log('Connected users: ' + count);
});
