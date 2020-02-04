const apiToken = 'd3e7use8ge18l28twgh3dnsxtn24jwwu';
const accountId = '6HWC7RRK';

async function getSights(lat, lon){
	return await fetch(`https://www.triposo.com/api/20190906/local_highlights.json?tag_labels=sightseeing&poi_fields=name,images,location_id&max_distance=20000&latitude=${lat}&longitude=${lon}&account=${accountId}&token=${apiToken}`)
		.then(res => res.json())
		.then((json) => prepareResponseSights(json));
}

function prepareResponseSights(sightsData) {
	let sightsPlaces = sightsData.results[0].pois.filter(element => element.images.length > 0);
	console.log(sightsPlaces);
	return {
		mainImageUrl: sightsPlaces[0].images[0].sizes.original.url,
		places: [
			{
				placeName: sightsPlaces[1].name,
				placeUrl: sightsPlaces[1].images[0].sizes.medium.url
			},
			{
				placeName: sightsPlaces[2].name,
				placeUrl: sightsPlaces[2].images[0].sizes.medium.url
			},
			{
				placeName: sightsPlaces[3].name,
				placeUrl: sightsPlaces[3].images[0].sizes.medium.url
			}
		]
	};
}

let lackData = function() {
	return {
		mainImageUrl: '/assets/img/pegasus.jpg',
		places: [
			{
				placeName: '',
				placeUrl: '/assets/img/unicorn1.jpg'
			},
			{
				placeName: '',
				placeUrl: '/assets/img/unicorn2.jpg'
			},
			{
				placeName: '',
				placeUrl: '/assets/img/unicorn3.jpg'
			}
		]
	};
};

module.exports.getSights = getSights;
module.exports.lackData = lackData;
