const airPollutionClient = require('./airPollution_client.js');
const weatherClient = require('./weather_client.js');
const sightsClient = require('./places_client.js');
const mainScreenUpdater = require('./mainSreenUpdater.js');

async function runApiClients(city) {
	Promise.all([
		weatherClient.forecastWeather(city),
		airPollutionClient.getAirPollution(city.lat, city.lon).catch(airPollutionClient.lackData),
		sightsClient.getSights(city.lat, city.lon).catch(sightsClient.lackData)])
	.then(
		response => {
			mainScreenUpdater.updateWeather(response[0]);
			mainScreenUpdater.updateAirPollution(response[1]);
			mainScreenUpdater.updateSights(response[2]);
			mainScreenUpdater.updateCityAndCountry(city.city, city.country);
			mainScreenUpdater.updateCurrencyName(city.currency, city.codeCurrency);
			mainScreenUpdater.updateFlagImg(city.codeCountry);
		}
	)
}

module.exports = runApiClients;