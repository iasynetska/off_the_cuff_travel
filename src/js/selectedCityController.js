const updateHeaderWithCityAndCountry = require('./headerCityName.js');
const updateCurrencyName = require('./currencyName.js');
const updateFlagImg = require('./flagEditor.js');

async function setSelectedCity(city) {
    Promise.all([
        updateHeaderWithCityAndCountry(city.city, city.country),
        updateCurrencyName(city.currency, city.codeCurrency),
        updateFlagImg(city.codeCountry)
    ]);
}

module.exports = setSelectedCity;

