var airPollutionClient = require('./airPollution_client.js');
var weatherClient = require('./weather_client.js');

async function runApiClients(city) {
	airPollutionClient.getAirPollution(city.lat, city.lng)
		.then(pollutionData => airPollutionClient.setAirPollution(pollutionData));
	weatherClient.forecastWeather(city.lat, city.lng)
	.then(resultFromServer => weatherClient.setWeather(resultFromServer));
	console.log(city);

	document.querySelector('.city-name-rel h1').innerText = city.city;
	document.querySelector('.city-name-rel p').innerText = city.country;

	document.getElementById('city-country').innerText = city.city;
    document.getElementById('country').innerText = city.country;
}

module.exports.runApiClients = runApiClients;