const appId = 'ace7f80e9d662f6d6fbf5503dcf9bdf6';
let units = 'metric';
let searchMethod = 'q';

async function forecastWeather(lat, lng) {
    return await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&APPID=${appId}&units=${units}`)
    .then(response => response.json())
}

async function setWeather(resultFromServer) {
    //console.log(resultFromServer);

    let currentWeatherIcon = document.querySelector('.bigger-icon img');
    let apiIcon = resultFromServer.list[0].weather[0].icon;
    currentWeatherIcon.src = decideIcon(apiIcon);


    document.getElementById('degrees').innerText = Math.floor(resultFromServer.list[0].main.temp);

    document.getElementById('humidity').innerText = resultFromServer.list[0].main.humidity;

    let windDegree = resultFromServer.list[0].wind.deg;
    let windDirection;
		if(windDegree>=22.5 && windDegree<67.5) {
			windDirection = 'North East';
		} else if(windDegree>=67.5 && windDegree<112.5) {
			windDirection = 'East';
		} else if(windDegree>=112.5 && windDegree<157.5) {
			windDirection = 'South East';
		} else if(windDegree>=157.5 && windDegree<202.5) {
			windDirection = 'South';
		} else if(windDegree>=202.5 && windDegree<247.5) {
			windDirection = 'South West';
		} else if(windDegree>=247.5 && windDegree<292.5) {
            windDirection = 'West';
        } else if(windDegree>=292.5 && windDegree<337.5) {
			windDirection = 'North West';
        } else {windDirection = 'North'}
        document.getElementById('wind-direction').innerText = windDirection;

    document.getElementById('wind-speed').innerText = Math.floor(resultFromServer.list[0].wind.speed);

    let dayOne = new Date(resultFromServer.list[8].dt * 1000).getDay();
    let dayTwo = new Date(resultFromServer.list[16].dt * 1000).getDay();
    let dayThree = new Date(resultFromServer.list[24].dt * 1000).getDay();

    const weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

    let hourOne = new Date(resultFromServer.list[8].dt * 1000).getHours();
    let hourTwo = new Date(resultFromServer.list[16].dt * 1000).getHours();
    let hourThree = new Date(resultFromServer.list[24].dt * 1000).getHours();

    document.getElementById('weekday1').innerText = weekday[dayOne] + ' at ' + hourOne + '.00';
    document.getElementById('weekday2').innerText = weekday[dayTwo] + ' at ' + hourTwo + '.00';
    document.getElementById('weekday3').innerText = weekday[dayThree] + ' at ' + hourThree + '.00';

    let weatherIconOne = resultFromServer.list[8].weather[0].icon;
    let weatherIconTwo = resultFromServer.list[16].weather[0].icon;
    let weatherIconThree = resultFromServer.list[24].weather[0].icon;

    document.getElementById('icon-day1').src = decideIcon(weatherIconOne);
    document.getElementById('icon-day2').src = decideIcon(weatherIconTwo);
    document.getElementById('icon-day3').src = decideIcon(weatherIconThree);

    let descDayOne = resultFromServer.list[8].weather[0].description
    document.getElementById('weather-day1').innerText = descDayOne.charAt(0).toUpperCase() + descDayOne.slice(1);
    let descDayTwo = resultFromServer.list[16].weather[0].description
    document.getElementById('weather-day2').innerText = descDayTwo.charAt(0).toUpperCase() + descDayTwo.slice(1);
    let descDayThree = resultFromServer.list[24].weather[0].description
    document.getElementById('weather-day3').innerText = descDayThree.charAt(0).toUpperCase() + descDayThree.slice(1);

    document.getElementById('degrees-day1').innerText = Math.floor(resultFromServer.list[8].main.temp);
    document.getElementById('degrees-day2').innerText = Math.floor(resultFromServer.list[16].main.temp);
    document.getElementById('degrees-day3').innerText = Math.floor(resultFromServer.list[24].main.temp);

}

function decideIcon(icon) {
    if(icon === '01d') {return '/assets/img/sun.svg';
        } else if(icon === '01n') {return '/assets/img/moon.svg';
        } else if(icon === '02d') {return '/assets/img/cloud-sun.svg';
        } else if(icon === '02n') {return '/assets/img/cloud-moon.svg';
        } else if(icon === '03d' || icon === '03n') {return '/assets/img/cloud.svg';
        } else if(icon === '04d' || icon === '04n') {return '/assets/img/cloud.svg';
        } else if(icon === '09d' || icon === '09n') {return '/assets/img/rain-alt.svg';
        } else if(icon === '10d') {return '/assets/img/rain-sun.svg';
        } else if(icon === '10n') {return '/assets/img/rain-moon.svg';
        } else if(icon === '11d' || icon === '11n') {return '/assets/img/lightning-rain.svg';
        } else if(icon === '13d' || icon === '13n') {return '/assets/img/snow-alt.svg';
        } else if(icon === '50d' || icon === '50n') {return '/assets/img/fog.svg';
        };
    }


module.exports.forecastWeather = forecastWeather;
module.exports.setWeather = setWeather;
