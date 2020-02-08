async function updateWeather(weather) {
    const DEGREE = '&#176;';
    const DEGREE_CELSIUS = '&#8451;';
    const PERCENT = '&#37;';


    document.querySelector('.bigger-icon img').src = weather.pathIcon;
    document.getElementById('degrees').innerHTML = weather.degrees;
    document.getElementById('celsius').innerHTML = DEGREE_CELSIUS;
    document.getElementById('humidity').innerHTML = weather.humidity + PERCENT;
    document.getElementById('wind-direction').innerHTML = weather.windDirection;
    document.getElementById('wind-speed').innerHTML = weather.windSpeed + ' km/h';

    document.getElementById('name-day1').innerText = weather.forecastWeatherThreeDays[0].dayName;
    document.getElementById('name-day2').innerText = weather.forecastWeatherThreeDays[1].dayName;
    document.getElementById('name-day3').innerText = weather.forecastWeatherThreeDays[2].dayName;

    document.getElementById('icon-day1').src = weather.forecastWeatherThreeDays[0].pathIcon;
    document.getElementById('icon-day2').src = weather.forecastWeatherThreeDays[1].pathIcon;
    document.getElementById('icon-day3').src = weather.forecastWeatherThreeDays[2].pathIcon;

    document.getElementById('weather-day1').innerText = weather.forecastWeatherThreeDays[0].weatherDesc.charAt(0).toUpperCase() + weather.forecastWeatherThreeDays[0].weatherDesc.slice(1);
    document.getElementById('weather-day2').innerText = weather.forecastWeatherThreeDays[1].weatherDesc.charAt(0).toUpperCase() + weather.forecastWeatherThreeDays[1].weatherDesc.slice(1);
    document.getElementById('weather-day3').innerText = weather.forecastWeatherThreeDays[2].weatherDesc.charAt(0).toUpperCase() + weather.forecastWeatherThreeDays[2].weatherDesc.slice(1);

    document.getElementById('degrees-day1').innerHTML = weather.forecastWeatherThreeDays[0].degrees + DEGREE;
    document.getElementById('degrees-day2').innerHTML = weather.forecastWeatherThreeDays[1].degrees + DEGREE;
    document.getElementById('degrees-day3').innerHTML = weather.forecastWeatherThreeDays[2].degrees + DEGREE;
}

async function updateAirPollution(airPollution) {
    document.getElementById('air-pollution').innerHTML = airPollution.airPoll;
    document.getElementById('atm-pressure').innerHTML = airPollution.atmPress + ' hPa';
    document.getElementById('harmfulness').innerHTML = airPollution.descAirPoll;
}

async function updateSights(sights) {
    document.querySelector('.header').style.backgroundImage = `url("${sights.mainImageUrl}")`;

    document.querySelector('.places-to-see-box.box1').style.backgroundImage = `url("${sights.places[0].placeUrl}")`;
    document.querySelector('.places-to-see-box.box2').style.backgroundImage = `url("${sights.places[1].placeUrl}")`;
    document.querySelector('.places-to-see-box.box3').style.backgroundImage = `url("${sights.places[2].placeUrl}")`;

    let image1 = document.querySelector('.places-to-see-box.box1');
    let wrapper1 = document.createElement('a');
    wrapper1.setAttribute('href', `http://www.google.com/search?q=${sights.places[0].placeName}`);
    wrapper1.setAttribute('target', '_blank');
    wrapper1.setAttribute('class', 'change-wrapper');
    wrapper1.appendChild(image1.cloneNode(true));
    image1.parentNode.replaceChild(wrapper1, image1);
    let caption1 = document.querySelector('.fig1');
    caption1.innerHTML = sights.places[0].placeName;

    let image2 = document.querySelector('.places-to-see-box.box2');
    let wrapper2 = document.createElement('a');
    wrapper2.setAttribute('href', `http://www.google.com/search?q=${sights.places[1].placeName}`);
    wrapper1.setAttribute('target', '_blank');
    wrapper2.setAttribute('class', 'change-wrapper2');
    wrapper2.appendChild(image2.cloneNode(true));
    image2.parentNode.replaceChild(wrapper2, image2);
    let caption2 = document.querySelector('.fig2');
    caption2.innerHTML = sights.places[1].placeName;

    let image3 = document.querySelector('.places-to-see-box.box3');
    let wrapper3 = document.createElement('a');
    wrapper3.setAttribute('href', `http://www.google.com/search?q=${sights.places[2].placeName}`);
    wrapper1.setAttribute('target', '_blank');
    wrapper3.setAttribute('class', 'change-wrapper3');
    wrapper3.appendChild(image3.cloneNode(true));
    image3.parentNode.replaceChild(wrapper3, image3);
    let caption3 = document.querySelector('.fig3');
    caption3.innerHTML = sights.places[2].placeName;
}

//update city name and country name
async function updateCityAndCountry(cityName, countryName) {
    document.querySelector('.header-text__city').innerText = cityName;
    document.querySelector('.header-text__country').innerText = countryName;
    document.getElementById('city-country').innerText = cityName;
    document.getElementById('country').innerText = countryName;
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