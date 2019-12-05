const updateHeaderWithCityAndCountry = require('./headerCityName.js');
const runApiClients = require('./apiController.js');

function asignNearestCity(cities) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      findAndAsignCity(position.coords.latitude, position.coords.longitude, cities);
    });
  } else {
    let lat = 51.1104;
    let lon = 17.03;
  }
}

// find nearest city, assign it to header and run all apis
function findAndAsignCity(lat, lon, cities) {
  let city = cities[0];
  let distance = getDistance(city.lat, city.lng, lat, lon);
  
  for (let i=1; i<cities.length; i++) {
    let distance2 = getDistance(cities[i].lat, cities[i].lng, lat, lon);
    if(distance2 < distance) {
      city = cities[i];
      distance = distance2;
    }
  }
  updateHeaderWithCityAndCountry(city.city, city.country);
  runApiClients(city);
}

// calclate distance between two coordinates
function getDistance(lat1, lon1, lat2, lon2) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
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

module.exports = asignNearestCity;