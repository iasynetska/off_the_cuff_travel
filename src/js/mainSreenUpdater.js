async function updateWeather(weather) {
    const DEGREE = '&#176;';
    const DEGREE_CELSIUS = 'C';
    const SLASH = '&#47;';
    const PERCENT = '&#37;';


    document.querySelector('.information-weather__icon img').src = weather.pathIcon;
    document.getElementById('degrees').innerHTML = weather.degrees + '&deg;';
    document.getElementById('celsius').innerHTML = DEGREE_CELSIUS;
    document.getElementById('wind-speed').innerHTML = weather.windSpeed + ' km/h';
    document.getElementById('wind-direction').innerHTML = weather.windDirection;
    document.getElementById('humidity').innerHTML ='Humidity: ' + weather.humidity + PERCENT;


    document.getElementById('name-day1').innerText = weather.forecastWeatherThreeDays[0].dayName;
    document.getElementById('name-day2').innerText = weather.forecastWeatherThreeDays[1].dayName;
    document.getElementById('name-day3').innerText = weather.forecastWeatherThreeDays[2].dayName;

    document.getElementById('icon-day1').src = weather.forecastWeatherThreeDays[0].pathIcon;
    document.getElementById('icon-day2').src = weather.forecastWeatherThreeDays[1].pathIcon;
    document.getElementById('icon-day3').src = weather.forecastWeatherThreeDays[2].pathIcon;

    document.getElementById('weather-day1').innerText = weather.forecastWeatherThreeDays[0].weatherDesc.charAt(0).toUpperCase() + weather.forecastWeatherThreeDays[0].weatherDesc.slice(1);
    document.getElementById('weather-day2').innerText = weather.forecastWeatherThreeDays[1].weatherDesc.charAt(0).toUpperCase() + weather.forecastWeatherThreeDays[1].weatherDesc.slice(1);
    document.getElementById('weather-day3').innerText = weather.forecastWeatherThreeDays[2].weatherDesc.charAt(0).toUpperCase() + weather.forecastWeatherThreeDays[2].weatherDesc.slice(1);

    document.getElementById('degrees-day1').innerHTML = weather.forecastWeatherThreeDays[0].degreesDay + DEGREE + SLASH + weather.forecastWeatherThreeDays[0].degreesNight + DEGREE;
    document.getElementById('degrees-day2').innerHTML = weather.forecastWeatherThreeDays[1].degreesDay + DEGREE + SLASH + weather.forecastWeatherThreeDays[1].degreesNight + DEGREE;
    document.getElementById('degrees-day3').innerHTML = weather.forecastWeatherThreeDays[2].degreesDay + DEGREE + SLASH + weather.forecastWeatherThreeDays[2].degreesNight + DEGREE;
}

async function updateAirPollution(airPollution) {
    document.getElementById('air-pollution').innerHTML = airPollution.airPoll;
    document.getElementById('atm-pressure').innerHTML = 'Atmospheric Pressure: ' + airPollution.atmPress + ' hPa';
    document.getElementById('harmfulness').innerHTML = airPollution.descAirPoll;
}

async function updateSights(sights) {
    document.querySelector('.header').style.backgroundImage = `url("${sights.mainImageUrl}")`;

    document.querySelector('.sight1-block').style.backgroundImage = `url("${sights.places[0].placeUrl}")`;
    document.querySelector('.sight2-block').style.backgroundImage = `url("${sights.places[1].placeUrl}")`;
    document.querySelector('.sight3-block').style.backgroundImage = `url("${sights.places[2].placeUrl}")`;

    document.querySelector('.sight1')
        .setAttribute('onclick', `window.open("http://www.google.com/search?q=${sights.places[0].placeName}")`);
    document.querySelector('.sight1-caption').innerHTML = sights.places[0].placeName;

    document.querySelector('.sight2')
        .setAttribute('onclick', `window.open("http://www.google.com/search?q=${sights.places[1].placeName}")`);
    document.querySelector('.sight2-caption').innerHTML = sights.places[1].placeName;

    document.querySelector('.sight3')
        .setAttribute('onclick', `window.open("http://www.google.com/search?q=${sights.places[2].placeName}")`);
    document.querySelector('.sight3-caption').innerHTML = sights.places[2].placeName;
}

//update city name and country name
async function updateCityAndCountry(cityName, countryName) {
    document.querySelector('.header-text__city').innerText = cityName;
    document.querySelector('.header-text__country').innerText = countryName;
    document.getElementById('city-name').innerText = cityName;
    document.getElementById('weather-text').innerText = 'Current Weather';
}

//update currency data
async function updateCurrencyName(cityCurrency, cityCodeCurrency) {
    const LEFT_PARENTHESIS = '&#40;';
    const RIGHT_PARENTHESIS = '&#41;';
    if(cityCodeCurrency !== 'undefined') {
        document.querySelector('.currency-name').innerHTML = cityCurrency;
        document.querySelector('.currency-code').innerHTML = LEFT_PARENTHESIS + cityCodeCurrency + RIGHT_PARENTHESIS;
    } else {
        document.querySelector('.currency-name').innerHTML = "";
        document.querySelector('.currency-code').innerHTML = "no data";
    }
}

//update flag image
async function updateFlagImg(cityCode) {
    let div = document.querySelector('.information-flag__data');
    div.innerHTML = "";
    if(cityCode !== 'undefined') {
        let img = document.createElement("img");
        img.src = "https://www.countryflags.io/"+ cityCode +"/flat/64.png";
        div.appendChild(img);
    } else {
        let span = document.createElement("span");
        span.textContent = "no data";
        div.appendChild(span);
    }
}

module.exports.updateWeather = updateWeather;
module.exports.updateAirPollution = updateAirPollution;
module.exports.updateSights = updateSights;
module.exports.updateCityAndCountry = updateCityAndCountry;
module.exports.updateCurrencyName = updateCurrencyName;
module.exports.updateFlagImg = updateFlagImg;