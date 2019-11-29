var airPollutionClient = require('./airPollution_client.js');

async function runApiClients(city) {
	airPollutionClient.getAirPollution(city.lat, city.lng)
		.then(pollutionData => airPollutionClient.setAirPollution(pollutionData));
}

module.exports.runApiClients = runApiClients;