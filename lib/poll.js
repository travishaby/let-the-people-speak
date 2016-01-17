const crypto = require('crypto');

function Poll(pollData) {
  this.question = pollData.question;
  this.id = this.generateId(12);
  this.adminId = this.generateId(12);
  this.adminUrl = 'admin/' + this.adminId;
  this.pollId = this.generateId(12);
  this.pollUrl = 'poll/' + this.pollId;
  this.choices = pollData.choices;
  this.responses = {};
  this.respondants = {};
  this.showRespondants = pollData.showRespondants === 'true'; //convert to boolean
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

module.exports = Poll;
