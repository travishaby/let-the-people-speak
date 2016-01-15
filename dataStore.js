const _ = require('lodash');

function DataStore() {
  this.polls = {};
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
