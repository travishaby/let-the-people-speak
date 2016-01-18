'use strict';
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var moment = require('moment');
const Poll = require('../lib/poll');

var pollParams = { question: 'test poll',
  choices: {
    choice1: 'choice1'
  }
}
var poll = new Poll(pollParams)

describe('Poll', function () {
  it('has an id 24 characters long', function (done) {
    expect(poll.id).be.a('string');
    expect(poll.id.length).eql(24);
    done();
  });
  it('has an adminId 24 characters long', function (done) {
    expect(poll.adminId).be.a('string');
    expect(poll.adminId.length).eql(24);
    done();
  });
  it('has an pollId 24 characters long', function (done) {
    expect(poll.pollId).be.a('string');
    expect(poll.pollId.length).eql(24);
    done();
  });
  it('has a question when correct params are passed in', function (done) {
    expect(poll.question).eql('test poll');
    done();
  });
  it('stores choices when correct params are passed in', function (done) {
    expect(poll.choices).eql({ choice1: 'choice1' });
    done();
  });
  it('has empty object literal to store responses', function (done) {
    expect(poll.responses).eql({});
    done();
  });
  it('has empty object literal to keep track of respondants', function (done) {
    expect(poll.respondants).eql({});
    done();
  });
  it('logs response for new respondant', function (done) {
    var message = {
      pollId: '5baabd046553065919eceffc',
      pollResponse: 'response',
      responder: '2K89a_ClwNQeN2QsAAAC'
    }
    poll.recordResponseIfNewResponder(message)

    expect(poll.respondants).eql({ '2K89a_ClwNQeN2QsAAAC': true });
    expect(poll.responses).eql({ 'response': 1 });
    done();
  });
  it('doesnt log response for known respondant', function (done) {
    expect(poll.respondants).eql({ '2K89a_ClwNQeN2QsAAAC': true });
    expect(poll.responses).eql({ 'response': 1 });

    var message = {
      pollId: '5baabd046553065919eceffc',
      pollResponse: 'response',
      responder: '2K89a_ClwNQeN2QsAAAC'
    }
    poll.recordResponseIfNewResponder(message)

    expect(poll.respondants).eql({ '2K89a_ClwNQeN2QsAAAC': true });
    expect(poll.responses).eql({ 'response': 1 });
    done();
  });
  it('has a show respondants field that defaults to false', function (done) {
    expect(poll.showRespondants).eql(false);
    done();
  });
  it('has a createdAt moment.js object, set when poll object is created', function (done) {
    expect(poll.createdAt.toString()).eql(moment().toString());
    done();
  });
  it('has a poll timeout period that defaults to one hour', function (done) {
    expect(moment().to(poll.timeout)).eql("one hour");
    done();
  });
})
