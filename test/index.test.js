'use strict';
var reverse = require('./../lib/index.js'),
    chai = require('chai'),
    expect = chai.expect;

var maps = {
  'google': {}
};

if(process.env['BAIDU_KEY']) {
  maps['baidu'] = { 'ak': process.env['BAIDU_KEY'] };
}

if(process.env['OPENCAGE_KEY']) {
  maps['opencage'] = { 'key': process.env['OPENCAGE_KEY'] };
}

var responseCheck = function(done) {
    return function (err, data) {
        if (err) {
            done(new Error(err));
        } else if (!data) {
            done(new Error('No Data'));
        } else {
          done();
        }
    }
};

Object.keys(maps).forEach(function (map) {
    var options = maps[map];
    options['map'] = map;

    describe(map, function() {
        describe("()", function () {
            it("{arguments} number invalid should throw error.", function () {
                expect(reverse).to.throw(Error);
            });
            it('{latitude} or {longitude} undefined should throw error.', function () {
                expect(function () {
                    reverse(options, function () {});
                }).to.throw(Error);
            });
            it('valid gps should return location.', function (done) {
                reverse(Object.assign({}, options, {
                    'latitude': 40.00403611111111,
                    'longitude': 116.48485555555555
                }), responseCheck(done));
            });
            it('custom options should be valid.', function (done) {
                reverse(Object.assign({}, options, {
                    'latitude': 40.00403611111111,
                    'longitude': 116.48485555555555,
                    'language': 'zh-cn'
                }), responseCheck(done));
            });
        });
    });
});
