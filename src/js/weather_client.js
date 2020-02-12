const APP_ID = 'ace7f80e9d662f6d6fbf5503dcf9bdf6';
let UNITS = 'metric';

async function forecastWeather(city) {
    return await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&APPID=${APP_ID}&units=${UNITS}`)
    .then(response => response.json())
    .then((json) => prepareResponseWeather(json));
}

function prepareResponseWeather(weatherData) {
    return {
        pathIcon: pickIcon(weatherData.list[0].weather[0].icon),
        degrees: Math.round(weatherData.list[0].main.temp),
        windSpeed: Math.round(weatherData.list[0].wind.speed),
        windDirection: getWindDirection(weatherData.list[0].wind.deg),
        humidity: weatherData.list[0].main.humidity,
        forecastWeatherThreeDays: getForecastWeatherThreeDays(weatherData)
    };
}

function pickIcon(iconCode) {
    if (iconCode === '01d') {
        return '/assets/img/sun.svg';
    } else if (iconCode === '01n') {
        return '/assets/img/moon.svg';
    } else if (iconCode === '02d') {
        return '/assets/img/cloud-sun.svg';
    } else if (iconCode === '02n') {
        return '/assets/img/cloud-moon.svg';
    } else if (iconCode === '03d' || iconCode === '03n') {
        return '/assets/img/cloud.svg';
    } else if (iconCode === '04d' || iconCode === '04n') {
        return '/assets/img/cloud.svg';
    } else if (iconCode === '09d' || iconCode === '09n') {
        return '/assets/img/rain-alt.svg';
    } else if (iconCode === '10d') {
        return '/assets/img/rain-sun.svg';
    } else if (iconCode === '10n') {
        return '/assets/img/rain-moon.svg';
    } else if (iconCode === '11d' || iconCode === '11n') {
        return '/assets/img/lightning.svg';
    } else if (iconCode === '13d' || iconCode === '13n') {
        return '/assets/img/snow-alt.svg';
    } else if (iconCode === '50d' || iconCode === '50n') {
        return '/assets/img/fog.svg';
    }
}

function getWindDirection(windDegree) {
    if(windDegree>=22.5 && windDegree<67.5) {
        return 'North East';
    } else if(windDegree>=67.5 && windDegree<112.5) {
        return 'East';
    } else if(windDegree>=112.5 && windDegree<157.5) {
        return 'South East';
    } else if(windDegree>=157.5 && windDegree<202.5) {
        return 'South';
    } else if(windDegree>=202.5 && windDegree<247.5) {
        return 'South West';
    } else if(windDegree>=247.5 && windDegree<292.5) {
        return 'West';
    } else if(windDegree>=292.5 && windDegree<337.5) {
        return 'North West';
    } else {
        return 'North'
    }
}

function getForecastWeatherThreeDays(weatherData) {
    return getForecastTime().map((value) => {
        let forecastNight = weatherData.list.find(el => el.dt === value.nightTime);
        let forecastDay = weatherData.list.find(el => el.dt === value.dayTime);
        return  {
            dayName: value.weekDay,
            pathIcon: pickIcon(forecastDay.weather[0].icon),
            degreesNight: Math.round(forecastNight.main.temp),
            degreesDay: Math.round(forecastDay.main.temp),
            weatherDesc: forecastDay.weather[0].description
        };
    });
}

function getForecastTime() {
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let forecastDates = [];

    for (let i = 1; i <= 3; i++) {
        let oneDay = {};
        let date = new Date();

        date.setDate(date.getDate() + i);
        date.setHours(3);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        oneDay.weekDay = weekDays[date.getDay()];
        oneDay.nightTime = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 0, 0, 0) / 1000;

        date.setHours(15);
        oneDay.dayTime = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 0, 0, 0) / 1000;

        forecastDates.push(oneDay);
    }

    return forecastDates;
}

module.exports.forecastWeather = forecastWeather;