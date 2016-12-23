'use strict';
var reverse = require('./../index.js'),
    chai = require('chai'),
    expect = chai.expect;
describe(".location()", function () {
    it("{arguments} number invalid should throw error.", function () {
        expect(reverse.location).to.throw(Error);
    });
    it('{latitude} or {longitude} undefined should throw error.', function () {
        expect(function () {
            reverse.location({}, function () {});
        }).to.throw(Error);
    });
    it('valid gps should return location.', function (done) {
        reverse.location({
            'latitude': 40.00403611111111,
            'longitude': 116.48485555555555
        }, function (err, data) {
            data && done(); //
        });
    });
    it('custom options should be valid.', function (done) {
        reverse.location({
            'latitude': 40.00403611111111,
            'longitude': 116.48485555555555,
            'language': 'zh-cn'
        }, function (err, data) {
            data && done();
        });
    });
    //because baidu maps need private token, so... pass the test;)
});
