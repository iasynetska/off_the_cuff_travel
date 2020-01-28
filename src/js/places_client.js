const apiToken = 'd3e7use8ge18l28twgh3dnsxtn24jwwu';
const accountId = '6HWC7RRK';

async function getPoi(lat, lon){
	return await fetch(`https://www.triposo.com/api/20190906/local_highlights.json?tag_labels=sightseeing&poi_fields=name,images,location_id&max_distance=20000&latitude=${lat}&longitude=${lon}&account=${accountId}&token=${apiToken}`)
		.then(res => res.json());
}

// poi images
async function setPoi(poiData) {
	console.log(poiData);
	let poiName1 = poiData.results[0].pois[0].name;
    let poiImage1 = poiData.results[0].pois[0].images[0].sizes.medium.url;
    let poiName2 = poiData.results[0].pois[1].name;
    let poiImage2 = poiData.results[0].pois[1].images[0].sizes.medium.url;
    let poiName3 = poiData.results[0].pois[2].name;
    let poiImage3 = poiData.results[0].pois[2].images[0].sizes.medium.url;
    let poiImageMain = poiData.results[0].pois[3].images[0].sizes.medium.url;

    document.querySelector('.places-to-see-box.box1').style.backgroundImage = `url("${poiImage1}")`;
	document.querySelector('.places-to-see-box.box2').style.backgroundImage = `url("${poiImage2}")`;
	document.querySelector('.places-to-see-box.box3').style.backgroundImage = `url("${poiImage3}")`;

	let image1 = document.querySelector('.places-to-see-box.box1');
	let wrapper1 = document.createElement('a');
	wrapper1.setAttribute('href', `http://www.google.com/search?q=${poiName1}`);
	wrapper1.setAttribute('target', '_blank');
	wrapper1.setAttribute('class', 'change-wrapper');
	wrapper1.appendChild(image1.cloneNode(true));
	image1.parentNode.replaceChild(wrapper1, image1);
	let caption1 = document.querySelector('.fig1');
	caption1.innerHTML = poiName1;

	let image2 = document.querySelector('.places-to-see-box.box2');
	let wrapper2 = document.createElement('a');
	wrapper2.setAttribute('href', `http://www.google.com/search?q=${poiName2}`);
	wrapper1.setAttribute('target', '_blank');
	wrapper2.setAttribute('class', 'change-wrapper2');
	wrapper2.appendChild(image2.cloneNode(true));
	image2.parentNode.replaceChild(wrapper2, image2);
	let caption2 = document.querySelector('.fig2');
	caption2.innerHTML = poiName2;

	let image3 = document.querySelector('.places-to-see-box.box3');
	let wrapper3 = document.createElement('a');
	wrapper3.setAttribute('href', `http://www.google.com/search?q=${poiName3}`);
	wrapper1.setAttribute('target', '_blank');
	wrapper3.setAttribute('class', 'change-wrapper3');
	wrapper3.appendChild(image3.cloneNode(true));
	image3.parentNode.replaceChild(wrapper3, image3);
	let caption3 = document.querySelector('.fig3');
	caption3.innerHTML = poiName3;

	document.querySelector('.header').style.backgroundImage = `url("${poiImageMain}")`;
}

let lackImage = function() {
	let phantomImage1 = '/assets/img/unicorn1.jpg';
	let phantomImage2 = '/assets/img/unicorn2.jpg';
	let phantomImage3 = '/assets/img/unicorn3.jpg';
	let phantomHeader = '/assets/img/pegasus.jpg';

	document.querySelector('.places-to-see-box.box1').style.backgroundImage = `url("${phantomImage1}")`;
	document.querySelector('.places-to-see-box.box2').style.backgroundImage = `url("${phantomImage2}")`;
	document.querySelector('.places-to-see-box.box3').style.backgroundImage = `url("${phantomImage3}")`;
	document.querySelector('.header').style.backgroundImage = `url("${phantomHeader}")`;
};


module.exports.getPoi = getPoi;
module.exports.setPoi = setPoi;
module.exports.lackImage = lackImage;
