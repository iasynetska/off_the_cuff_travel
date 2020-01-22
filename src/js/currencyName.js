//update currency data
async function updateCurrencyName(cityCurrency, cityCodeCurrency) {
    document.querySelector('.currency-name').innerText = cityCurrency;
    document.querySelector('.currency-code').innerText = cityCodeCurrency;
}

module.exports = updateCurrencyName;