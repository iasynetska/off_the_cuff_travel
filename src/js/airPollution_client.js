const vsprintf = require('sprintf-js').vsprintf;
const key = 'e3611d69-4a6a-4ea3-9dc7-d5ed3c21b0be';

async function getAirPollution(lat, lon){
	return await fetch(vsprintf('https://api.airvisual.com/v2/nearest_city?lat=%s&lon=%s&key=%s', [lat, lon, key]))
		.then(response => response.json());
}

async function setAirPollution(pollutionData){
		let airPoll = pollutionData.data.current.pollution.aqius;
		document.getElementById('air-pollution').innerHTML = airPoll;
		document.getElementById('atm-pressure').innerHTML = pollutionData.data.current.weather.pr;
		let resultPollution;
		if(airPoll>=0 && airPoll<=50) {
			resultPollution = 'Good';
		} else if(airPoll>50 && airPoll<=100) {
			resultPollution = 'Moderate';
		} else if(airPoll>100 && airPoll<=150) {
			resultPollution = 'Unhealthy for sensitives';
		} else if(airPoll>150 && airPoll<=200) {
			resultPollution = 'Unhealthy';
		} else if(airPoll>201 && airPoll<=300) {
			resultPollution = 'Very Unhealthy';
		} else if(airPoll>301 && airPoll<=500) {
			resultPollution = 'Hazardous';
		} 
		document.getElementById('harmfulness').innerHTML = resultPollution;
}

module.exports.getAirPollution = getAirPollution;
module.exports.setAirPollution = setAirPollution;