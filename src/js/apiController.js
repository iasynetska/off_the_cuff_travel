const airPollutionClient = require('./airPollution_client.js');
const weatherClient = require('./weather_client.js');
const poiClient = require('./places_client.js');

async function runApiClients(city) {
	airPollutionClient.getAirPollution(city.lat, city.lng)
		.then(pollutionData => airPollutionClient.setAirPollution(pollutionData));
	weatherClient.forecastWeather(city)
		.then(resultFromServer => weatherClient.setWeather(resultFromServer));
	poiClient.getPoi(city.lat, city.lng)
		.then(poiData => poiClient.setPoi(poiData));
}

module.exports = runApiClients;