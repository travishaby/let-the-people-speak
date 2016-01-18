'use strict';
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
const DataStore = require('../lib/dataStore');
const Poll = require('../lib/poll');

var dataStore = new DataStore

describe('DataStore', function () {
  it('has a polls attribute that starts as an empty object', function (done) {
    expect(dataStore.polls).eql({});
    done();
  });
  it('creates a poll and finds it by its adminId', function (done) {
    var pollParams = { question: 'test poll',
      choices: {
        choice1: 'choice1'
      },
      timeout: {
        number: null,
        units: null
      }
    }
    var poll = dataStore.createPoll(pollParams);
    expect(dataStore.findPollByAdminId(poll.adminId)).eql(poll);
    done();
  });
  it('can find saved polls by the pollId', function (done) {
    var pollParams = { question: 'test poll',
      choices: {
        choice1: 'choice1'
      },
      timeout: {
        number: null,
        units: null
      }
    }
    var poll = new Poll(pollParams);
    dataStore.polls[poll.adminId] = poll;
    expect(dataStore.findPollByPollId(poll.pollId)).eql(poll);
    done();
  });
})
