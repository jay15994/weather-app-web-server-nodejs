const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/dac52931f84582244f2fe10d883cbd6c/${latitude},${longitude}?units=si`;

  request(
    { url, json: true },
    (error, { body }) => {
      if (error) {
        callback('Unable to connect to weather service!', undefined);
      } else if (body.error) {
        callback('Unable to find location', undefined);
      } else {
        const { currently, daily } = body;
        callback(undefined, daily.data[0].summary + ' It is currently ' + currently.temperature + ' degrees out. This high today is ' + daily.data[0].temperatureHigh + ' with a low of ' + daily.data[0].temperatureLow + '. There is a ' + currently.precipProbability + '% chance of rain');
      }
    }
  );
}

module.exports = forecast;
