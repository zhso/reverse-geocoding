/*global JSON*/
'use strict';
const http = require('http'), url = require('url'), querystring = require('querystring');
exports.location = (config, callback)=> {
    if (!config || !callback) {
        throw new Error("Invalid arguments number.");
    } else if (!config.latitude || !config.longitude) {
        throw new Error("Latitude or Longitude not found.");
    }
    let {latitude, longitude, map} = config;
    delete config.latitude;
    delete config.longitude;
    let address = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}`;
    switch (map) {
        case'baidu':
            address = `http://api.map.baidu.com/geocoder/v2/?output=json&location=${latitude},${longitude}`;
            break;
        default:
            break;
    }
    delete config.map;
    address += `&${querystring.stringify(config)}`;
    let options = config.options || url.parse(address);
    options.path = options.path || address;
    new Promise((resolve, reject) => {
        http.get(options, response=> {
            let bufferList = [];
            response.on("data", chunk=> {
                bufferList.push(chunk);
            }).on("end", () => {
                let data = JSON.parse(Buffer.concat(bufferList).toString());
                if (data.status === "OK" || data.status === 0) {
                    resolve(data);
                } else {
                    reject(data.status);
                }
            }).on("error", error=> {
                reject(error);
            });
        });
    }).then(data=> {
        callback(undefined, data);
    }, error=> {
        callback(error);
    }).catch(error=> {
        callback(error);
    })
};