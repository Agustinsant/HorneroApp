const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'opencage',

  apiKey: "909b0f6277624ac2b35504dfb4440d6e", 
  formatter: null 
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder