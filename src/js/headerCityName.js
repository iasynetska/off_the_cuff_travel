//update city name and country name inside the 'city-name' container
async function updateHeaderWithCityAndCountry(cityName, countryName) {
  document.querySelector('.city-name-rel h1').innerText = cityName;
  document.querySelector('.city-name-rel p').innerText = countryName;
  document.getElementById('city-country').innerText = cityName;
  document.getElementById('country').innerText = countryName;
}

module.exports = updateHeaderWithCityAndCountry;