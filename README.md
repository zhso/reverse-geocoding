# reverse-geocoding
Reverse Geocoding for a Latitude and Longitude by Async.

[![NPM](https://nodei.co/npm/reverse-geocoding.png?downloads=true&downloadRank=true&stars=true)][npm-url][![NPM](https://nodei.co/npm-dl/reverse-geocoding.png?height=3&months=6)][npm-url]

[![npm](https://img.shields.io/npm/v/reverse-geocoding.svg)][npm-url] [![npm](https://img.shields.io/npm/dm/reverse-geocoding.svg)][npm-url] [![npm](https://david-dm.org/zhso/reverse-geocoding.svg)][npm-url] [![npm](https://img.shields.io/npm/l/reverse-geocoding.svg)][npm-url]

[![bitHound Overall Score](https://www.bithound.io/github/zhso/reverse-geocoding/badges/score.svg)](https://www.bithound.io/github/zhso/reverse-geocoding) [![Inline docs](http://inch-ci.org/github/zhso/reverse-geocoding.svg?branch=master&style=shields)](http://inch-ci.org/github/zhso/reverse-geocoding) [![Build Status](https://travis-ci.org/zhso/reverse-geocoding.svg?branch=master)](https://travis-ci.org/zhso/reverse-geocoding) [![Coverage Status](https://coveralls.io/repos/github/zhso/reverse-geocoding/badge.svg?branch=master)](https://coveralls.io/github/zhso/reverse-geocoding?branch=master)

[![GitHub stars](https://img.shields.io/github/stars/zhso/reverse-geocoding.svg?style=social&label=Star)](https://github.com/zhso/reverse-geocoding/stargazers) [![GitHub watchers](https://img.shields.io/github/watchers/zhso/reverse-geocoding.svg?style=social&label=Watch)](https://github.com/zhso/reverse-geocoding/subscription)

[npm-url]: https://npmjs.org/package/reverse-geocoding

```js
var geocoding = require("reverse-geocoding");
geocoding.location(40.00403611111111, 116.48485555555555, function (err, data){
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});
```

## Features

* Custom Language
* Custom Proxy

## Installation

```bash
$ npm install reverse-geocoding
```

## Examples

Custom Proxy

```js
var geocoding = new require("reverse-geocoding");
var config = {
    "options": {
        "host": "proxy.zhso.net",
        "port": 8080,
        "protocol": "http:",
        "method": "GET",
        "headers": {
            "Proxy-Authorization": "Basic " + new Buffer("username:password").toString("base64")
        }
    },
    "language": "zh-cn"
};
geocoding.location(40.00403611111111, 116.48485555555555, config, function (err, data){
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}
});
```

## Callback Data Format

```js
{
	"formattedAddress": "",
	"streetAddress": "",
	"route": "",
	"intersection": "",
	"political": "",
	"country": "",
	"administrativeAreaLevel1": "",
	"administrativeAreaLevel2": "",
	"administrativeAreaLevel3": "",
	"administrativeAreaLevel4": "",
	"administrativeAreaLevel5": "",
	"colloquialArea": "",
	"locality": "",
	"ward": "",
	"sublocality": "",
	"neighborhood": "",
	"premise": "",
	"subpremise": "",
	"postalCode": "",
	"naturalFeature": "",
	"airport": "",
	"park": "",
	"pointOfInterest": ""
}
```