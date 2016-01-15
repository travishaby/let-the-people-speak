'use strict';
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
const DataStore = require('../dataStore');
const Poll = require('../poll');

var dataStore = new DataStore

describe('dataStore.js', function () {
  it('has a polls attribute that starts as an empty object', function (done) {
    expect(dataStore.polls).eql({});
    done();
  });
  it('polls are saved in polls by their admin_id', function (done) {
    var pollParams = { name: 'test poll',
      questions: {
        question1: 'question1'
      }
    }
    var poll = new Poll(pollParams);
    dataStore.polls[poll.admin_id] = poll;
    expect(dataStore.findPollByAdminId(poll.admin_id)).eql(poll);
    done();
  });
  it('can find saved polls by the poll_id', function (done) {
    var pollParams = { name: 'test poll',
      questions: {
        question1: 'question1'
      }
    }
    var poll = new Poll(pollParams);
    dataStore.polls[poll.admin_id] = poll;
    expect(dataStore.findPollByPollId(poll.poll_id)).eql(poll);
    done();
  });
})
