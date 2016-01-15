'use strict';
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
const Poll = require('../poll');

var pollParams = { name: 'test poll',
  questions: {
    question1: 'question1'
  }
}
var poll = new Poll(pollParams)

describe('Poll', function () {
  it('has an id 24 characters long', function (done) {
    expect(poll.id).be.a('string');
    expect(poll.id.length).eql(24);
    done();
  });
  it('has an admin_id 24 characters long', function (done) {
    expect(poll.admin_id).be.a('string');
    expect(poll.admin_id.length).eql(24);
    done();
  });
  it('has an poll_id 24 characters long', function (done) {
    expect(poll.poll_id).be.a('string');
    expect(poll.poll_id.length).eql(24);
    done();
  });
  it('poll has a name when correct params are passed in', function (done) {
    expect(poll.name).eql('test poll');
    done();
  });
})
