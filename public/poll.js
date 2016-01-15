var socket = io();

socket.on('usersConnected', function(count) {
  console.log('Connected users: ' + count);
});

$(document).ready(function(){
  $('.poll-question').on('click', function() {
    var pollResponse = $(this).text();
    sendPollResponse(pollResponse);
  });
});

Array.prototype.last = function(){
  return this[this.length - 1];
};

function sendPollResponse(pollResponse) {
  var pollId = window.location.pathname.split('/').last();
  socket.send('voteCast', {
          pollId: pollId,
    pollResponse: pollResponse,
       responder: socket.id
  });
}
