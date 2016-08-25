'use strict';
const reverse = require('./../index.js');
const chai = require('chai');
const expect = chai.expect;
describe(".location()", () => {
    it("{arguments} number invalid should throw error.", ()=> {
        expect(reverse.location).to.throw(Error);
    });
    it('{latitude} or {longitude} undefined should throw error.', ()=> {
        expect(()=> {
            reverse.location({}, ()=> {
            });
        }).to.throw(Error);
    });
    it('valid gps should return location.', done=> {
        reverse.location({
            'latitude': 40.00403611111111,
            'longitude': 116.48485555555555
        }, (err, data)=> {
            if (data) {
                done();
            }
        });
    });
    it('custom options should be valid.', done=> {
        reverse.location({
            'latitude': 40.00403611111111,
            'longitude': 116.48485555555555,
            'language': 'zh-cn'
        }, (err, data)=> {
            if (data) {
                done();
            }
        });
    });
});