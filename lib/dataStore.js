const _ = require('lodash');
const Poll = require('./poll');

function DataStore() {
  this.polls = {};
  this.redis = require('redis').createClient();
}

DataStore.prototype.createPoll = function(pollParams) {
  var poll = new Poll(pollParams);
  this.polls[poll.adminId] = poll;
  return poll;
}

DataStore.prototype.findPollByAdminId = function(id) {
  return this.polls[id]
}

DataStore.prototype.findPollByPollId = function(id) {
  return _.find(_.values(this.polls), function(savedPoll) {
    return savedPoll.pollId === id;
  })
}

module.exports = DataStore;
