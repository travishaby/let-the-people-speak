var pollUrlLink = $('#poll-url');
var pollLinkWithRoot = $(location).attr('origin') + "/" + pollUrlLink.text();
pollUrlLink.text(pollLinkWithRoot);
pollUrlLink.attr('href', pollLinkWithRoot);

var adminUrlLink = $('#admin-url');
var adminLinkWithRoot = $(location).attr('href');
adminUrlLink.text(adminLinkWithRoot);
adminUrlLink.attr('href', adminUrlLink.text());

var socket = io();

socket.on('usersConnected', function(count) {
  console.log('Connected users: ' + count);
});

var pollId = $('#poll-id').text();
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
