require('core-js');
require('regenerator-runtime');

const updateHeaderWithCityAndCountry = require('./headerCityName.js');
const runApiClients = require('./apiController.js');

function setSearchBarListeners(cities) {
	// Add listener to search-box, which found cities
	document.getElementById('search-box').addEventListener('input', (e) => {
		if(e.target.value.length >= 3) {
			searchCities(e.target.value, cities);			
		}
	});

	// Add listener to search-box, which picks selected city and run APIs
	document.getElementById('search-box').addEventListener('change', (e) => {
		let selectedOption;
		let options = document.querySelectorAll('.city-el');
		options.forEach(option => {
			if(option.text === e.target.value) {
				selectedOption = option;
			}
		})
		let city = JSON.parse(selectedOption.getAttribute('data-city'));
		updateHeaderWithCityAndCountry(city.city, city.country);
		runApiClients(city);
	});
}

//Search cities from full list of cities
async function searchCities(value, cities) {
	//Get match cities
	let matchCities = cities.filter(cityObject => {
		const regex = new RegExp(`^${value}`, 'gi');
		return cityObject.city.match(regex);
	});

	setCityOptionTags(matchCities);
};


// show list of match cities in HTML
function setCityOptionTags(matchCities) {
	if (matchCities.length > 0) {
		const listHtml = matchCities.map(cityObject => 
			`<option class='city-el' data-city='{
				"city":"${cityObject.city}", 
				"country":"${cityObject.country}", 
				"lat":${cityObject.lat},
				"lon":${cityObject.lon},
				"currency":"${cityObject.currency}",
				"codeCurrency":"${cityObject.codeCurrency}"}'
			>
				${cityObject.city}, ${cityObject.country}
			</option>`)
		.join('');
    document.getElementById('cityList').innerHTML = listHtml;
	}
};

module.exports = setSearchBarListeners;