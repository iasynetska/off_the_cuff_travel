// SEARCH FUNCTIONALITY

let appId = 'ace7f80e9d662f6d6fbf5503dcf9bdf6';
let units = 'metric';
let searchMethod = 'q';

document.querySelector('.search-icon').addEventListener('click', () => {
    let searchTerm = document.getElementById('search-box').value;
    if(searchTerm)
    forecastWeather(searchTerm);
})

// CURRENT WEATHER & FORECAST API FETCH

function forecastWeather(searchTerm) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
    .then(response => response.json())
    .then(response => init(response))
}

// WEATHER DATA SUBSTITUTION

function init(resultFromServer) {
    console.log(resultFromServer);

    document.querySelector('.city-name-rel h1').innerText = resultFromServer.city.name;

    // CURRENT WEATHER

    let currentWeatherIcon = document.querySelector('.bigger-icon img');
    let finalIcon = resultFromServer.list[0].weather[0].icon;
    currentWeatherIcon.src = 'http://openweathermap.org/img/wn/' + finalIcon + '@2x.png';

    document.getElementById('degrees').innerText = Math.floor(resultFromServer.list[0].main.temp);
    document.getElementById('city-country').innerText = resultFromServer.city.name;
    document.getElementById('humidity').innerText = resultFromServer.list[0].main.humidity;
    document.getElementById('wind-speed').innerText = Math.floor(resultFromServer.list[0].wind.speed);

    // FORECAST

    let weatherIconOne = resultFromServer.list[6].weather[0].icon;
    let weatherIconTwo = resultFromServer.list[14].weather[0].icon;
    let weatherIconThree = resultFromServer.list[22].weather[0].icon;

    document.getElementById('icon-day1').src = 'http://openweathermap.org/img/wn/' + weatherIconOne + '@2x.png';
    document.getElementById('icon-day2').src = 'http://openweathermap.org/img/wn/' + weatherIconTwo + '@2x.png';
    document.getElementById('icon-day3').src = 'http://openweathermap.org/img/wn/' + weatherIconThree + '@2x.png';

    let descDayOne = resultFromServer.list[6].weather[0].description
    document.getElementById('weather-day1').innerText = descDayOne.charAt(0).toUpperCase() + descDayOne.slice(1);
    let descDayTwo = resultFromServer.list[14].weather[0].description
    document.getElementById('weather-day2').innerText = descDayTwo.charAt(0).toUpperCase() + descDayTwo.slice(1);
    let descDayThree = resultFromServer.list[22].weather[0].description
    document.getElementById('weather-day3').innerText = descDayThree.charAt(0).toUpperCase() + descDayThree.slice(1);

    document.getElementById('degrees-day1').innerText = Math.floor(resultFromServer.list[6].main.temp);
    document.getElementById('degrees-day2').innerText = Math.floor(resultFromServer.list[14].main.temp);
    document.getElementById('degrees-day3').innerText = Math.floor(resultFromServer.list[22].main.temp);

}