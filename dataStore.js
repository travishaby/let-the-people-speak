const _ = require('lodash');
const Poll = require('./poll');

function DataStore() {
  this.polls = {};
}

DataStore.prototype.createPoll = function(pollParams) {
  var poll = new Poll(pollParams);
  this.polls[poll.admin_id] = poll;
  return poll;
}

DataStore.prototype.findPollByAdminId = function(id) {
  return this.polls[id]
}

DataStore.prototype.findPollByPollId = function(id) {
  return _.find(_.values(this.polls), function(savedPoll) {
    return savedPoll.poll_id === id;
  })
}

module.exports = DataStore;
