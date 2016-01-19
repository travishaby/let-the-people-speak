var socket = io();

$(document).ready(function(){
  $('.poll-choice').on('click', function() {
    var pollResponse = $(this).text();
    sendPollResponse(pollResponse);
  });
})

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

socket.on('closePoll-' + pollId, function(message){
  $('#poll-choice-buttons').remove();
  $('#poll-message').addClass("alert alert-danger").text(message);
});

function updatePollResultsOnPage(pollResponses) {
  var rows = $.map(pollResponses, function(value, key){
    return '<tr><td>' + key + '</td><td>' + value + '</td></tr>'
  });
  var pollTable = '<div class="container row">'
    + '<table class="table table-striped">'
    + '<thead class="thead-default table-striped"><tr>'
    + '<th data-field="id">Choices</th>'
    + '<th data-field="question">Votes Cast</th>'
    + '</tr></thead><tbody>'
    + rows
    + '</tbody></table></div>';
  $('#poll-results').empty().append(pollTable);
}
