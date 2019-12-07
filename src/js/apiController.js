const airPollutionClient = require('./airPollution_client.js');
const weatherClient = require('./weather_client.js');
const poiClient = require('./places_client.js');

async function runApiClients(city) {
	Promise.all([
		airPollutionClient.getAirPollution(city.lat, city.lng),
		weatherClient.forecastWeather(city),
		poiClient.getPoi(city.lat, city.lng)
	]).then(
		response => {
			airPollutionClient.setAirPollution(response[0]).catch(airPollutionClient.lackData);
			weatherClient.setWeather(response[1]).catch(error => console.log(error));
			poiClient.setPoi(response[2]).catch(poiClient.lackImage);
		}
	)
}

module.exports = runApiClients;
