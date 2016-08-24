'use strict';
const reverse = require('./../index.js');
const chai = require('chai');
let should = chai.should();
const expect = chai.expect;
let config = {
    lat: 40.004086111111114,
    lng: 116.48478055555556
};
describe(".location()", () => {
    it("arguments undefined should throw error.", ()=> {
        expect(reverse.location).to.throw(Error);
    });
    it('latitude or longitude undefined should throw error.', ()=> {
        assert.ifError(reverse.location({}, ()=>{}));
    });
});