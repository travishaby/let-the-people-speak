var Nightmare = require('nightmare');
var expect = require('chai').expect;

require('mocha-generators').install()

describe('test filling out a form', function() {

  this.timeout(15000);

  it('should be redirected to poll page when poll is submitted', function*() {
    var nightmare = Nightmare()
    var title = yield nightmare
      .goto('http://turing.io')
      .evaluate(function () {
        return document.title;
      });
    expect(title).to.equal('Nope');
    yield nightmare.end()
  });
});
