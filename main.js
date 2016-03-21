"use strict";
var http = require("http");
var url = require("url");
exports.location = function () {
    var latitude, longitude, config = {}, callback;
    if (arguments.length > 2) {
        latitude = arguments[0];
        longitude = arguments[1];
        if (arguments.length === 3) {
            callback = arguments[2];
        }
        if (arguments.length === 4) {
            config = JSON.parse(JSON.stringify(arguments[2]));
            callback = arguments[3]
        }
    } else {
        throw new Error("Invalid params number.");
    }
    if (!callback) {
        throw new Error("Please define callback function.");
    }
    //TODO: Add Other Interface Support
    //TODO: Add Multi Interface Support
    //TODO: Add Cache Support
    //var path = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude;
    var path = "http://api.map.baidu.com/geocoder/v2/?ak=082f344d858ae8483cc931c6624aa2e7&location=" + latitude + "," + longitude + "&output=json";
    config.language ? path += "&language=" + config.language : "";
    config.options = config.options || url.parse(path);
    config.options.path = config.options.path || path;
    new Promise(function (resolve, reject) {
        http.get(config.options, function (response) {
            var bufferList = [];
            response.on("data", function (chunk) {
                bufferList.push(chunk);
            }).on("end", function () {
                var data = JSON.parse(Buffer.concat(bufferList).toString());
                if (data.status === "OK" || data.status === 0) {
                    resolve(data);
                } else {
                    reject(data.status);
                }
            }).on("error", function (error) {
                reject(error);
            });
        });
    }).then(function (data) {
        callback(undefined, data);
    }, function (error) {
        callback(error, undefined);
    }).catch(function (error) {
        callback(error, undefined);
    })
};