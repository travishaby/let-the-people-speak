const crypto = require('crypto');
const moment = require('moment');

function Poll(pollData) {
  this.question = pollData.question;
  this.id = this.generateId(12);
  this.adminId = this.generateId(12) + '*';
  this.adminUrl = 'admin/' + this.adminId;
  this.pollId = this.generateId(12);
  this.pollUrl = 'poll/' + this.pollId;
  this.choices = pollData.choices;
  this.responses = {};
  this.respondants = {};
  this.showRespondants = pollData.showRespondants === 'true'; //convert to boolean
  this.createdAt = moment();
  this.timeout = this.setTimeoutOrDefaultToOneHour(pollData.timeout);
}

Poll.prototype.generateId = function(num) {
  return crypto.randomBytes(12).toString('hex');
}

Poll.prototype.recordResponseIfNewResponder = function(message) {
  if (!this.respondants[message.responder]) {
    this.respondants[message.responder] = true;
    this.incrementOrCreateResponse(message.pollResponse)
  }
}

Poll.prototype.incrementOrCreateResponse = function(pollResponse) {
  if (this.responses[pollResponse]){
    this.responses[pollResponse]++;
  } else {
    this.responses[pollResponse] = 1;
  }
}

Poll.prototype.setTimeoutOrDefaultToOneHour = function(timeout) {
  if (timeout.number && timeout.units) {
    return moment().add(timeout.number, timeout.units);
  } else {
    return moment().add(1, "h");
  }
}

Poll.prototype.isActive = function() {
  return moment().isBefore(this.timeout);
}

module.exports = Poll;
