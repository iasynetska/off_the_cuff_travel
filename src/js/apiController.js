var airPollutionClient = require('./airPollution_client.js');
var weatherClient = require('./weather_client.js');

async function runApiClients(city) {
	airPollutionClient.getAirPollution(city.lat, city.lng)
		.then(pollutionData => airPollutionClient.setAirPollution(pollutionData));
	weatherClient.forecastWeather(city.city)
	.then(resultFromServer => weatherClient.setWeather(resultFromServer));
}

module.exports.runApiClients = runApiClients;