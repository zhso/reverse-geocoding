'use strict';
var reverse = require('./../index.js'),
    chai = require('chai'),
    expect = chai.expect;

var maps = {
  'google': {}
};

if(process.env['BAIDU_KEY']) {
  maps['baidu'] = { 'ak': process.env['BAIDU_KEY'] };
}

Object.keys(maps).forEach(function (map) {
    var options = maps[map];
    options['map'] = map;

    describe(map, function() {
        describe(".location()", function () {
            it("{arguments} number invalid should throw error.", function () {
                expect(reverse.location).to.throw(Error);
            });
            it('{latitude} or {longitude} undefined should throw error.', function () {
                expect(function () {
                    reverse.location(options, function () {});
                }).to.throw(Error);
            });
            it('valid gps should return location.', function (done) {
                reverse.location(Object.assign({}, options, {
                    'latitude': 40.00403611111111,
                    'longitude': 116.48485555555555
                }), function (err, data) {
                    data && done(); //
                });
            });
            it('custom options should be valid.', function (done) {
                reverse.location(Object.assign({}, options, {
                    'latitude': 40.00403611111111,
                    'longitude': 116.48485555555555,
                    'language': 'zh-cn'
                }), function (err, data) {
                    data && done();
                });
            });
        });
    });
});
