var airPollutionClient = require('./airPollution_client.js');
var weatherClient = require('./weather_client.js');
var placesNametags = require('./places_nametags.js');
var poiClient = require('./places_client.js');

async function runApiClients(city) {
	airPollutionClient.getAirPollution(city.lat, city.lng)
		.then(pollutionData => airPollutionClient.setAirPollution(pollutionData));
	weatherClient.forecastWeather(city.lat, city.lng)
		.then(resultFromServer => weatherClient.setWeather(resultFromServer));
	poiClient.getPoi(city.lat, city.lng)
		.then(poiData => poiClient.setPoi(poiData));
	placesNametags.updateNametags(city.city, city.country);
}

module.exports.runApiClients = runApiClients;
