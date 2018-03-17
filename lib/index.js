'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (config, callback) {
  if (!config || !callback) {
    throw new Error('Invalid arguments number.');
  } else if (!config.latitude || !config.longitude) {
    throw new Error('Latitude or Longitude not found.');
  }

  var latitude = config.latitude,
      longitude = config.longitude,
      map = config.map;


  delete config.latitude; // eslint-disable-line no-param-reassign
  delete config.longitude; // eslint-disable-line no-param-reassign

  var address = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude;

  switch (map) {
    case 'baidu':
      address = 'https://api.map.baidu.com/geocoder/v2/?output=json&location=' + latitude + ',' + longitude;
      break;
    case 'opencage':
      address = 'https://api.opencagedata.com/geocode/v1/json?q=' + latitude + ',' + longitude;
      break;
    default:
      break;
  }
  delete config.map; // eslint-disable-line no-param-reassign
  address += '&' + _querystring2.default.stringify(config);
  console.log(address);
  try {
    (0, _request2.default)(address, function (error, response, body) {
      if (error) {
        callback(error);
        return;
      }

      var data = JSON.parse(body);

      // be ware, every interface return back data was not same.
      if (data.status === 'OK' || data.status === 0 || data.status.message === 'OK') {
        callback(undefined, data);
      } else {
        callback(data.status);
      }
    });
  } catch (err) {
    callback(err);
  }
};
//# sourceMappingURL=index.js.map