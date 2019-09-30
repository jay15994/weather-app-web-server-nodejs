const request = require('request');

const geocode = (address, callback) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamF5dXBmb3JjZSIsImEiOiJjazBwYWtmYWYwamp0M2RwZjZzbzliMWYwIn0.aNDOjJF1AlN67FnyCAdcYQ`;

  request(
    { url: geocodeURL, json: true },
    (error, { body }) => {
      if (error) {
        callback('Unable to connect to location service!', undefined);
      } else if (body.features.length === 0) {
        callback('Unable to find location. Try another search.', undefined);
      } else {
        const { features } = body;
        callback(undefined, {
          latitude: features[0].center[1],
          longitude: features[0].center[0],
          location: features[0].place_name,
        });
      }
    }
  );
};

module.exports = geocode;
