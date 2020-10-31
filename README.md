# reverse-geocoding
Reverse Geocoding for a Latitude and Longitude by Async.

[![bitHound Overall Score](https://www.bithound.io/github/zhso/reverse-geocoding/badges/score.svg)](https://www.bithound.io/github/zhso/reverse-geocoding) [![Inline docs](http://inch-ci.org/github/zhso/reverse-geocoding.svg?branch=master&style=shields)](http://inch-ci.org/github/zhso/reverse-geocoding) [![Build Status](https://travis-ci.org/zhso/reverse-geocoding.svg?branch=master)](https://travis-ci.org/zhso/reverse-geocoding) [![Coverage Status](https://coveralls.io/repos/github/zhso/reverse-geocoding/badge.svg?branch=master)](https://coveralls.io/github/zhso/reverse-geocoding?branch=master)

[npm-url]: https://npmjs.org/package/reverse-geocoding

## Features

* Custom Params
* Custom Proxy
* Support for querying Baidu Maps, Google Maps, and the OpenCage Geocoder

## Examples

Basic

```js
var geocoding = new require('reverse-geocoding');
var config = {
    'latitude': 40.00403611111111,
    'longitude': 116.48485555555555,
    'apiKey': ***Your Google Maps API Key***
};
geocoding(config, function (err, data){
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}
});
```

Custom Proxy

```js
var geocoding = new require('reverse-geocoding');
var config = {
    'latitude': 40.00403611111111,
    'longitude': 116.48485555555555,
    'options': {
        'host': 'proxy.zhso.net',
        'port': 8080,
        'protocol': 'http:',
        'method': 'GET',
        'headers': {
            'Proxy-Authorization': 'Basic ' + new Buffer('username:password').toString('base64')
        }
    }
};
geocoding(config, function (err, data){
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}
});
```

Custom Params

```js
var geocoding = new require('reverse-geocoding');
var config = {
    'latitude': 40.00403611111111,
    'longitude': 116.48485555555555,
    'language': 'zh-cn'
};
geocoding(config, (err, data) => {
	console.log(err ? err : data);
});
```

Note: specific geocoding providers may require different authentication parameters:
* OpenCage requires a `key` parameter ([register here](https://geocoder.opencagedata.com))
* Baidu Maps rerequires a `ak` parameter

## Callback Data Format Sample (Based on Google Maps or Baidu Maps API, may differ depending on geocoding provider used)

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
