'use strict';
var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var server = require('../server.js');
describe('server.js', function () {
  it('GET "/" should return a 200 response', function (done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
  it('GET "/dontgohere" should return a 404 response', function (done) {
    request(server)
      .get('/dontgohere')
      .expect(404, done);
  });
  it('POST "/" without data returns a 500 internal server error', function (done) {
    request(server)
      .post('/')
      .expect(500, done);
  });
  it('POST "/youcantsendmeinfo" should return a 404 response', function (done) {
    request(server)
      .post('/youcantsendmeinfo')
      .expect(404, done);
  });
  it('POST "/" with poll params creates a poll and redirects', function (done) {
    request(server)
      .post('/')
      .type('form')
      .send( { poll: {
          name: 'test poll',
          questions: {
            question1: 'question1'
          }
        }
      } )
      .end(function(error, response){
        expect(response.header['location']).to.include('/admin/');
        done();
      })
  });
});
