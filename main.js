/**
 * Created by s@zhso.net on 2015/10/20.
 */
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
    var path = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude;
    config.language?path+="&language="+config.language:"";
    config.options = config.options || url.parse(path);
    config.options.path = config.options.path || path;
    new Promise(function (resolve, reject) {
        http.get(config.options, function (response) {
            var bufferList = [];
            response.on("data", function (chunk) {
                bufferList.push(chunk);
            }).on("end", function () {
                var data = Buffer.concat(bufferList).toString();
                resolve(JSON.parse(data));
            }).on("error", function (error) {
                reject(error);
            });
        });
    }).then(function (data) {
            var result = data.results[0];
            var addressComponents = result["address_components"];
            var obj = {};
            obj.formattedAddress = result["formatted_address"];
            for (var i = 0; i < addressComponents.length; i++) {
                var address = addressComponents[i];
                var type = address.types[0];
                /*API Auto Translate*/
                if (type.indexOf("_") > 0) {
                    type = type.replace(/_\w{1}/g, function (char) {
                        return char.substring(1).toUpperCase();
                    });
                }
                obj[type] = address["long_name"];
            }
            callback(undefined, obj);
        }, function (error) {
            callback(error, undefined);
        }).catch(function (error) {
            callback(error, undefined);
        })
}