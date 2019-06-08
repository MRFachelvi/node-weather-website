const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/013ab2dc69ac81ac224e584e6e1cfc0d/" +
    latitude +
    "," +
    longitude +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Cannot connect to the network!", undefined);
    } else if (body.error) {
      callback("Cannot find location", undefined);
    } else {
      callback(
        undefined,
        body.hourly.summary +
          "It is currently " +
          body.currently.temperature +
          " degrees out. there is a " +
          body.currently.precipProbability +
          "% chance to rain"
      );
    }
  });
};

module.exports = forecast;
