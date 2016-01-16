var socket = io();

socket.on('usersConnected', function(count) {
  console.log('Connected users: ' + count);
});

$('.poll-question').on('click', function() {
  var pollResponse = $(this).text();
  sendPollResponse(pollResponse);
});

Array.prototype.last = function(){
  return this[this.length - 1];
};

var pollId = window.location.pathname.split('/').last();

function sendPollResponse(pollResponse) {
  socket.send('voteCast', {
          pollId: pollId,
    pollResponse: pollResponse,
       responder: socket.id
  });
};

socket.on('pollResponse-' + pollId, function(pollResponses){
  updatePollResultsOnPage(pollResponses);
});

function updatePollResultsOnPage(pollResponses) {
  var rows = $.map(pollResponses, function(value, key){
    return '<tr><td>' + key + '</td><td>' + value + '</td></tr>'
  });
  var pollTable = '<table><thead><tr>'
    + '<th data-field="id">Choices</th>'
    + '<th data-field="name">Votes Cast</th>'
    + '</tr></thead><tbody>'
    + rows
    + '</tbody></table>';
  $('#poll-results').empty().append(pollTable);
}
