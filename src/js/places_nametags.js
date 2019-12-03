var apiController = require('./apiController.js');

async function updateNametags (city, country) {
    document.querySelector('.city-name-rel h1').innerText = city;
	document.querySelector('.city-name-rel p').innerText = country;

	document.getElementById('city-country').innerText = city;
	document.getElementById('country').innerText = country;
}

module.exports.updateNametags = updateNametags;