// onload event
window.addEventListener('load', () => {
  let lon;
  let lat;

  // HTML5 geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
    });
  } else {
    // default to Wrocław
    lon = 17.03;
    lat = 51.1104;
  }

  // apiController.runApiClients(city);
  // have to change city name to city lon-lat

});
