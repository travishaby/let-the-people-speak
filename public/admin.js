$(document).ready(function(){
  var pollUrlLink = $('#poll-url');
  var pollLinkWithRoot = $(location).attr('origin') + "/" + pollUrlLink.text();
  pollUrlLink.text(pollLinkWithRoot);
  pollUrlLink.attr('href', pollLinkWithRoot);

  var adminUrlLink = $('#admin-url');
  var adminLinkWithRoot = $(location).attr('href');
  adminUrlLink.text(adminLinkWithRoot);
  adminUrlLink.attr('href', adminUrlLink.text());
})
