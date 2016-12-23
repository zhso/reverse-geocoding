/*global JSON,Buffer,require,exports*/
'use strict';
var http = require('http'),
    url = require('url'),
    querystring = require('querystring');
exports.location = function (config, callback) {
    if (!config || !callback) {
        throw new Error('Invalid arguments number.');
    } else if (!config.latitude || !config.longitude) {
        throw new Error('Latitude or Longitude not found.');
    }
    var latitude = config.latitude,
        longitude = config.longitude,
        map = config.map;
    delete config.latitude;
    delete config.longitude;
    var address = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude;
    switch (map) {
    case 'baidu':
        address = 'http://api.map.baidu.com/geocoder/v2/?output=json&location=' + latitude + ',' + longitude;
        break;
    default:
        break;
    }
    delete config.map;
    //build interface address
    address += '&' + querystring.stringify(config);
    var options = config.options || url.parse(address);
    options.path = options.path || address;
    try {
        http.get(options, function (response) {
            var bufferList = [];
            response.on('data', function (chunk) {
                bufferList.push(chunk);
            }).on('end', function () {
                var data = JSON.parse(Buffer.concat(bufferList).toString());
                //be ware, every interface return back data was not same.
                if (data.status === 'OK' || data.status === 0) {
                    callback(undefined, data);
                } else {
                    callback(data.status);
                }
            }).on('error', function (error) {
                callback(error);
            });
        });
    }catch(err){
        callback(err);
    }
};
