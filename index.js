/*global JSON*/
'use strict';
const http = require('http');
const url = require('url');
exports.location = (config, callback)=> {
    if (!config && !callback) {
        throw new Error("Invalid arguments number.");
    } else if (!config.latitude || !config.longitude) {
        throw new Error("Latitude or Longitude not found.");
    }
    if (!callback) {
        throw new Error("Please define callback function.");
    }
    //TODO: Add Other Interface Support
    //TODO: Add Multi Interface Support
    //TODO: Add Cache Support
    //var path = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude;
    let path = `http://api.map.baidu.com/geocoder/v2/?ak=082f344d858ae8483cc931c6624aa2e7&location=${config.latitude},${config.longitude}&output=json`;
    config['language'] ? path += `&language=${config.language}` : "";
    config.options = config.options || url.parse(path);
    config.options.path = config.options.path || path;
    new Promise((resolve, reject) => {
        http.get(config.options, response=> {
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