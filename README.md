# reverse-geocoding
Reverse Geocoding for a Latitude and Longitude by Async.

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

* Custom language
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