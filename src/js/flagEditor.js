//update currency data
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

module.exports = updateFlagImg;