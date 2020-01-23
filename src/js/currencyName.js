//update currency data
async function updateCurrencyName(cityCurrency, cityCodeCurrency) {
    if(cityCodeCurrency !== 'undefined') {
        document.querySelector('.currency-name').innerText = cityCurrency;
        document.querySelector('.currency-code').innerText = cityCodeCurrency;
    } else {
        document.querySelector('.currency-name').innerText = "";
        document.querySelector('.currency-code').innerText = "no data";
    }
}

module.exports = updateCurrencyName;