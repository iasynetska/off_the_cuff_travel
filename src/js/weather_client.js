const appId = 'ace7f80e9d662f6d6fbf5503dcf9bdf6';
let units = 'metric';

async function forecastWeather(city) {
    return await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&APPID=${appId}&units=${units}`)
    .then(response => response.json())
    .then((json) => prepareResponseWeather(json));
}

function prepareResponseWeather(weatherData) {
    return {
        pathIcon: pickIcon(weatherData.list[0].weather[0].icon),
        degrees: Math.round(weatherData.list[0].main.temp),
        humidity: weatherData.list[0].main.humidity,
        windDirection: getWindDirection(weatherData.list[0].wind.deg),
        windSpeed: Math.round(weatherData.list[0].wind.speed),
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
        return '/assets/img/lightning-rain.svg';
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
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const forecastWeatherFirstDay = {
        dayName: weekDays[new Date(weatherData.list[8].dt * 1000).getDay()],
        pathIcon: pickIcon(weatherData.list[8].weather[0].icon),
        degrees: Math.round(weatherData.list[8].main.temp),
        weatherDesc: weatherData.list[8].weather[0].description
    };

    const forecastWeatherSecondDay = {
        dayName: weekDays[new Date(weatherData.list[16].dt * 1000).getDay()],
        pathIcon: pickIcon(weatherData.list[16].weather[0].icon),
        degrees: Math.round(weatherData.list[16].main.temp),
        weatherDesc: weatherData.list[16].weather[0].description
    };

    const forecastWeatherThirdDay = {
        dayName: weekDays[new Date(weatherData.list[24].dt * 1000).getDay()],
        pathIcon: pickIcon(weatherData.list[24].weather[0].icon),
        degrees: Math.round(weatherData.list[24].main.temp),
        weatherDesc: weatherData.list[24].weather[0].description
    };

    return [forecastWeatherFirstDay, forecastWeatherSecondDay, forecastWeatherThirdDay];
}

module.exports.forecastWeather = forecastWeather;