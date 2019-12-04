var apiController = require('./apiController.js');

async function updateNametags (city, country) {
	document.getElementById('city-country').innerText = city;
	document.getElementById('country').innerText = country;
}

module.exports.updateNametags = updateNametags;