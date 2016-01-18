var Nightmare = require('nightmare');
var expect = require('chai').expect;

describe('test filling out a form', function() {
  it('should be redirected to poll page when poll is submitted', function*() {
    var nightmare = Nightmare()
    var formInput = yield nightmare
      .goto('http://localhost:8080')
      .evaluate(function () {
        return document.getElementsById('timeout-number');
      });
    expect(formInput).to.equal('https://github.com/segmentio/nightmare');
  });
});
