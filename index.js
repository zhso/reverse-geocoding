/*global JSON,require,exports*/
'use strict';

const request     = require('request')
    , url         = require('url')
    , querystring = require('querystring')

const CONSTANTS = {
  BAIDU    : 'baidu',
  OPENCAGE : 'opencage'
}

function location(config, callback) {
  if (!config) 
    throw new Error('Invalid arguments number.')
  else if (!config.latitude || !config.longitude)
    throw new Error('Latitude or Longitude not found.')

  const map       = config.map
      , latitude  = config.latitude
      , longitude = config.longitude

  let prefix
  switch (map) {
  case CONSTANTS.BAIDU:
    prefix = `http://api.map.baidu.com/geocoder/v2/?output=json&location=`
    break

  case CONSTANTS.OPENCAGE:
    prefix = `https://api.opencagedata.com/geocode/v1/json?q=`
    break

  default: 
    prefix = `https://maps.googleapis.com/maps/api/geocode/json?latlng=`
    break

  }
  
  delete config.latitude
  delete config.longitude
  delete config.map

  const address = `${prefix}${latitude},${longitude}&${querystring.stringify(config)}`

    
  if (callback) {
    try {
      request(address, (error, response, body) => {
        if (error) {
          callback(error)
          return
        }

        let data 
        try {
          data = JSON.parse(body)
        } catch(err) {
          callback(body)
          return
        }

        //be ware, every interface return back data was not same.
        if (data.status === 'OK' || data.status === 0 || data.status.message === 'OK') {
          callback(undefined, data)
        } else {
          callback(data.status)
        }
      })
    } catch(err) {
      callback(err)
    }
  } else {
    return new Promise((resolve, reject) => {
      request(address, (error, response, body) => {
        if(error) reject(error)

        let data 
        try {
          data = JSON.parse(body)
        } catch(err) {
          reject(body)
        }

        //be ware, every interface return back data was not same.
        if (data.status === 'OK' || data.status === 0 || data.status.message === 'OK') {
          resolve(data)
        } else {
          reject(data.status)
        }
      })
    })
  } 
}

exports.location = location
