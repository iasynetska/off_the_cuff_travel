const updateHeaderWithCityAndCountry = require('./headerCityName.js');
const updateFlagImg = require('./flagEditor.js');
const updateCurrencyName = require('./currencyName.js');
const runApiClients = require('./apiController.js');

function assignNearestCity(cities) {
  navigator.geolocation.getCurrentPosition(
    position => findAndAssignCity(position.coords.latitude, position.coords.longitude, cities),
    error => findAndAssignCity(51.1104, 17.03, cities)
  );
}

// find nearest city, assign it to header and run all apis
function findAndAssignCity(lat, lon, cities) {
  let city = cities[0];
  let distance = getDistance(city.lat, city.lon, lat, lon);
  
  for (let i=1; i<cities.length; i++) {
    let distance2 = getDistance(cities[i].lat, cities[i].lon, lat, lon);
    if(distance2 < distance) {
      city = cities[i];
      distance = distance2;
    }
  }
  updateCurrencyName(city.currency, city.codeCurrency);
  updateFlagImg(city.codeCountry);
  updateHeaderWithCityAndCountry(city.city, city.country);
  runApiClients(city);
}

// calclate distance between two coordinates
function getDistance(lat1, lon1, lat2, lon2) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    let radlat1 = Math.PI * lat1/180;
    let radlat2 = Math.PI * lat2/180;
    let theta = lon1-lon2;
    let radtheta = Math.PI * theta/180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist;
  }
}

module.exports = assignNearestCity;