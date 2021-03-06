import request from 'request';
import querystring from 'querystring';

module.exports = (config, callback) => {
  if (!config || !callback) {
    throw new Error('Invalid arguments number.');
  } else if (!config.latitude || !config.longitude) {
    throw new Error('Latitude or Longitude not found.');
  }

  const {
    latitude, longitude, map,
  } = config;

  delete config.latitude; // eslint-disable-line no-param-reassign
  delete config.longitude; // eslint-disable-line no-param-reassign

  let address = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}`;

  switch (map) {
    case 'baidu':
      address = `https://api.map.baidu.com/geocoder/v2/?output=json&location=${latitude},${longitude}`;
      break;
    case 'opencage':
      address = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}`;
      break;
    default:
      break;
  }
  delete config.map; // eslint-disable-line no-param-reassign
  address += `&${querystring.stringify(config)}`;
  console.log(address);
  try {
    request(address, (error, response, body) => {
      if (error) {
        callback(error);
        return;
      }

      const data = JSON.parse(body);

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
