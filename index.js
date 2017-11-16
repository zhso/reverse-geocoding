/*global JSON,require,exports*/
'use strict';
var request = require('request'),
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
    case 'opencage':
        address = 'https://api.opencagedata.com/geocode/v1/json?q=' + latitude + ',' + longitude;
        break;
    default:
        break;
    }
    delete config.map;
    address += '&' + querystring.stringify(config);

    try {
        request(address, function (error, response, body) {
            if (error) {
              callback(error);
              return;
            }

            var data = JSON.parse(body);

            //be ware, every interface return back data was not same.
            if (data.status === 'OK' || data.status === 0 || data.status.message === 'OK') {
                callback(undefined, data);
            } else {
                callback(data.status);
            }
        });
    }catch(err){
        callback(err);
    }
};
