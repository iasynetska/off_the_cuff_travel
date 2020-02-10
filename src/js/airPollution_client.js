const vsprintf = require('sprintf-js').vsprintf;
const KEY = 'e3611d69-4a6a-4ea3-9dc7-d5ed3c21b0be';

async function getAirPollution(lat, lon){
	return await fetch(vsprintf('https://api.airvisual.com/v2/nearest_city?lat=%s&lon=%s&key=%s', [lat, lon, KEY]))
		.then(response => response.json())
		.then((json) => prepareResponseAirPollution(json));
}

function prepareResponseAirPollution(airPollutionData) {
	return {
		airPoll: airPollutionData.data.current.pollution.aqius,
		descAirPoll: getDescAirPollution(airPollutionData.data.current.pollution.aqius),
		atmPress: airPollutionData.data.current.weather.pr
	};
}

function getDescAirPollution(airPoll){
	if(airPoll>=0 && airPoll<=50) {
		return 'Good';
	} else if(airPoll>50 && airPoll<=100) {
		return 'Moderate';
	} else if(airPoll>100 && airPoll<=150) {
		return 'Unhealthy for sensitives';
	} else if(airPoll>150 && airPoll<=200) {
		return 'Unhealthy';
	} else if(airPoll>201 && airPoll<=300) {
		return 'Very Unhealthy';
	} else if(airPoll>301 && airPoll<=500) {
		return 'Hazardous';
	} else {
		return 'Lack of data';
	}
}

function lackData() {
	return  {
		airPoll: '',
		descAirPoll: 'no data',
		atmPress: 'no data'
	};
}

module.exports.getAirPollution = getAirPollution;
module.exports.lackData = lackData;