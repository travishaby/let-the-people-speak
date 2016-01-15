'use strict';
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
const DataStore = require('../dataStore')

var dataStore = new DataStore

describe('dataStore.js', function () {
  it('has a polls attribute that starts as an empty object', function (done) {
    expect(dataStore.polls).eql({});
    done();
  });
})
