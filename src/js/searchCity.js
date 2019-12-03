import 'core-js';
const regeneratorRuntime = require("regenerator-runtime");

var apiController = require('./apiController.js');
let cities;

// Fetch list of cities and assign to variable
fetch('/assets/data/cities.json').then(response => response.json()).then(result => cities = result);

// Add listener to search-box, which searches cities
document.getElementById('search-box').addEventListener('input', (e) => {
		if(e.target.value.length >= 3) {
			searchCities(e.target.value);			
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
	apiController.runApiClients(city);
});


//Search cities from full list of cities
async function searchCities(value){
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
				"lng":${cityObject.lng}}'
				>
				${cityObject.city}, ${cityObject.country}
			</option>`)
		.join('');
    document.getElementById('cityList').innerHTML = listHtml;
	}
};