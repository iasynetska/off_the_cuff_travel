const assignNearestCity = require('./geo.js');
const setSearchBarListeners = require('./searchCity.js');

// Fetch list of cities and run geo and search function
fetch('assets/data/cities.json').then(response => response.json()).then(result => {
	assignNearestCity(result);
	setSearchBarListeners(result);
});