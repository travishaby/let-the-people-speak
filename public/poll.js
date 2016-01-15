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

if (!Array.prototype.last){ //create last() method but don't overwrite if extant
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

function sendPollResponse(pollResponse) {
  var pollId = window.location.pathname.split('/').last();
  console.log(pollResponse, pollId);
  socket.send('voteCast', {
          pollId: pollId,
    pollResponse: pollResponse
  });
}
