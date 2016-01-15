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
  console.log(pollResponses);
})
