$(document).ready(function(){
  var pollUrlLink = $('#poll-url');
  var pollLinkWithRoot = $(location).attr('origin') + "/" + pollUrlLink.text();
  pollUrlLink.text(pollLinkWithRoot);
  pollUrlLink.attr('href', pollLinkWithRoot);

  var adminUrlLink = $('#admin-url');
  var adminLinkWithRoot = $(location).attr('href');
  adminUrlLink.text(adminLinkWithRoot);
  adminUrlLink.attr('href', adminUrlLink.text());
});

var socket = io();

var pollId = $('#poll-id').text();
socket.on('pollResponse-' + pollId, function(pollResponses){
  updatePollResultsOnPage(pollResponses);
});

Array.prototype.last = function(){
  return this[this.length - 1];
};

var adminId = window.location.pathname.split('/').last();
socket.on('pollResponse-' + adminId, function(pollResponses){
  updatePollResultsOnPage(pollResponses);
});

$('#close-poll').on('click', function(){
  socket.send('closePoll', {
          adminId: adminId,
        responder: socket.id
  });
  socket.on('closePoll-' + pollId, function(closedNotification){
    closePollAndReplaceButtonWithMessage(this, closedNotification);
  }.bind(this));
})

function closePollAndReplaceButtonWithMessage(button, closedNotification) {
  $(button).after('<h3 class="poll-closed">'
                + closedNotification
                + '</h3>').remove();
}

function updatePollResultsOnPage(pollResponses) {
  var rows = $.map(pollResponses, function(value, key){
    return '<tr><td>' + key + '</td><td>' + value + '</td></tr>'
  });
  var pollTable = '<table><thead><tr>'
    + '<th data-field="id">Choice</th>'
    + '<th data-field="choice">Votes Cast</th>'
    + '</tr></thead><tbody>'
    + rows
    + '</tbody></table>';
  $('#poll-results').empty().append(pollTable);
}
