const appId = 'ace7f80e9d662f6d6fbf5503dcf9bdf6';
let units = 'metric';
let searchMethod = 'q';

async function forecastWeather(lat, lng) {
    return await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&APPID=${appId}&units=${units}`)
    .then(response => response.json())
}

async function setWeather(resultFromServer) {
    console.log(resultFromServer);

    let currentWeatherIcon = document.querySelector('.bigger-icon img');
    let finalIcon = resultFromServer.list[0].weather[0].icon;
    currentWeatherIcon.src = 'http://openweathermap.org/img/wn/' + finalIcon + '@2x.png';

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
    
    document.getElementById('weekday1').innerText = weekday[dayOne];
    document.getElementById('weekday2').innerText = weekday[dayTwo];
    document.getElementById('weekday3').innerText = weekday[dayThree];

    let weatherIconOne = resultFromServer.list[8].weather[0].icon;
    let weatherIconTwo = resultFromServer.list[16].weather[0].icon;
    let weatherIconThree = resultFromServer.list[24].weather[0].icon;

    document.getElementById('icon-day1').src = 'http://openweathermap.org/img/wn/' + weatherIconOne + '@2x.png';
    document.getElementById('icon-day2').src = 'http://openweathermap.org/img/wn/' + weatherIconTwo + '@2x.png';
    document.getElementById('icon-day3').src = 'http://openweathermap.org/img/wn/' + weatherIconThree + '@2x.png';

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

// var isoCountries = {
//     'AF' : 'Afghanistan',
//     'AX' : 'Aland Islands',
//     'AL' : 'Albania',
//     'DZ' : 'Algeria',
//     'AS' : 'American Samoa',
//     'AD' : 'Andorra',
//     'AO' : 'Angola',
//     'AI' : 'Anguilla',
//     'AQ' : 'Antarctica',
//     'AG' : 'Antigua And Barbuda',
//     'AR' : 'Argentina',
//     'AM' : 'Armenia',
//     'AW' : 'Aruba',
//     'AU' : 'Australia',
//     'AT' : 'Austria',
//     'AZ' : 'Azerbaijan',
//     'BS' : 'Bahamas',
//     'BH' : 'Bahrain',
//     'BD' : 'Bangladesh',
//     'BB' : 'Barbados',
//     'BY' : 'Belarus',
//     'BE' : 'Belgium',
//     'BZ' : 'Belize',
//     'BJ' : 'Benin',
//     'BM' : 'Bermuda',
//     'BT' : 'Bhutan',
//     'BO' : 'Bolivia',
//     'BA' : 'Bosnia And Herzegovina',
//     'BW' : 'Botswana',
//     'BV' : 'Bouvet Island',
//     'BR' : 'Brazil',
//     'IO' : 'British Indian Ocean Territory',
//     'BN' : 'Brunei Darussalam',
//     'BG' : 'Bulgaria',
//     'BF' : 'Burkina Faso',
//     'BI' : 'Burundi',
//     'KH' : 'Cambodia',
//     'CM' : 'Cameroon',
//     'CA' : 'Canada',
//     'CV' : 'Cape Verde',
//     'KY' : 'Cayman Islands',
//     'CF' : 'Central African Republic',
//     'TD' : 'Chad',
//     'CL' : 'Chile',
//     'CN' : 'China',
//     'CX' : 'Christmas Island',
//     'CC' : 'Cocos (Keeling) Islands',
//     'CO' : 'Colombia',
//     'KM' : 'Comoros',
//     'CG' : 'Congo',
//     'CD' : 'Congo, Democratic Republic',
//     'CK' : 'Cook Islands',
//     'CR' : 'Costa Rica',
//     'CI' : 'Cote D\'Ivoire',
//     'HR' : 'Croatia',
//     'CU' : 'Cuba',
//     'CY' : 'Cyprus',
//     'CZ' : 'Czech Republic',
//     'DK' : 'Denmark',
//     'DJ' : 'Djibouti',
//     'DM' : 'Dominica',
//     'DO' : 'Dominican Republic',
//     'EC' : 'Ecuador',
//     'EG' : 'Egypt',
//     'SV' : 'El Salvador',
//     'GQ' : 'Equatorial Guinea',
//     'ER' : 'Eritrea',
//     'EE' : 'Estonia',
//     'ET' : 'Ethiopia',
//     'FK' : 'Falkland Islands (Malvinas)',
//     'FO' : 'Faroe Islands',
//     'FJ' : 'Fiji',
//     'FI' : 'Finland',
//     'FR' : 'France',
//     'GF' : 'French Guiana',
//     'PF' : 'French Polynesia',
//     'TF' : 'French Southern Territories',
//     'GA' : 'Gabon',
//     'GM' : 'Gambia',
//     'GE' : 'Georgia',
//     'DE' : 'Germany',
//     'GH' : 'Ghana',
//     'GI' : 'Gibraltar',
//     'GR' : 'Greece',
//     'GL' : 'Greenland',
//     'GD' : 'Grenada',
//     'GP' : 'Guadeloupe',
//     'GU' : 'Guam',
//     'GT' : 'Guatemala',
//     'GG' : 'Guernsey',
//     'GN' : 'Guinea',
//     'GW' : 'Guinea-Bissau',
//     'GY' : 'Guyana',
//     'HT' : 'Haiti',
//     'HM' : 'Heard Island & Mcdonald Islands',
//     'VA' : 'Holy See (Vatican City State)',
//     'HN' : 'Honduras',
//     'HK' : 'Hong Kong',
//     'HU' : 'Hungary',
//     'IS' : 'Iceland',
//     'IN' : 'India',
//     'ID' : 'Indonesia',
//     'IR' : 'Iran, Islamic Republic Of',
//     'IQ' : 'Iraq',
//     'IE' : 'Ireland',
//     'IM' : 'Isle Of Man',
//     'IL' : 'Israel',
//     'IT' : 'Italy',
//     'JM' : 'Jamaica',
//     'JP' : 'Japan',
//     'JE' : 'Jersey',
//     'JO' : 'Jordan',
//     'KZ' : 'Kazakhstan',
//     'KE' : 'Kenya',
//     'KI' : 'Kiribati',
//     'KR' : 'Korea',
//     'KW' : 'Kuwait',
//     'KG' : 'Kyrgyzstan',
//     'LA' : 'Lao People\'s Democratic Republic',
//     'LV' : 'Latvia',
//     'LB' : 'Lebanon',
//     'LS' : 'Lesotho',
//     'LR' : 'Liberia',
//     'LY' : 'Libyan Arab Jamahiriya',
//     'LI' : 'Liechtenstein',
//     'LT' : 'Lithuania',
//     'LU' : 'Luxembourg',
//     'MO' : 'Macao',
//     'MK' : 'Macedonia',
//     'MG' : 'Madagascar',
//     'MW' : 'Malawi',
//     'MY' : 'Malaysia',
//     'MV' : 'Maldives',
//     'ML' : 'Mali',
//     'MT' : 'Malta',
//     'MH' : 'Marshall Islands',
//     'MQ' : 'Martinique',
//     'MR' : 'Mauritania',
//     'MU' : 'Mauritius',
//     'YT' : 'Mayotte',
//     'MX' : 'Mexico',
//     'FM' : 'Micronesia, Federated States Of',
//     'MD' : 'Moldova',
//     'MC' : 'Monaco',
//     'MN' : 'Mongolia',
//     'ME' : 'Montenegro',
//     'MS' : 'Montserrat',
//     'MA' : 'Morocco',
//     'MZ' : 'Mozambique',
//     'MM' : 'Myanmar',
//     'NA' : 'Namibia',
//     'NR' : 'Nauru',
//     'NP' : 'Nepal',
//     'NL' : 'Netherlands',
//     'AN' : 'Netherlands Antilles',
//     'NC' : 'New Caledonia',
//     'NZ' : 'New Zealand',
//     'NI' : 'Nicaragua',
//     'NE' : 'Niger',
//     'NG' : 'Nigeria',
//     'NU' : 'Niue',
//     'NF' : 'Norfolk Island',
//     'MP' : 'Northern Mariana Islands',
//     'NO' : 'Norway',
//     'OM' : 'Oman',
//     'PK' : 'Pakistan',
//     'PW' : 'Palau',
//     'PS' : 'Palestinian Territory, Occupied',
//     'PA' : 'Panama',
//     'PG' : 'Papua New Guinea',
//     'PY' : 'Paraguay',
//     'PE' : 'Peru',
//     'PH' : 'Philippines',
//     'PN' : 'Pitcairn',
//     'PL' : 'Poland',
//     'PT' : 'Portugal',
//     'PR' : 'Puerto Rico',
//     'QA' : 'Qatar',
//     'RE' : 'Reunion',
//     'RO' : 'Romania',
//     'RU' : 'Russian Federation',
//     'RW' : 'Rwanda',
//     'BL' : 'Saint Barthelemy',
//     'SH' : 'Saint Helena',
//     'KN' : 'Saint Kitts And Nevis',
//     'LC' : 'Saint Lucia',
//     'MF' : 'Saint Martin',
//     'PM' : 'Saint Pierre And Miquelon',
//     'VC' : 'Saint Vincent And Grenadines',
//     'WS' : 'Samoa',
//     'SM' : 'San Marino',
//     'ST' : 'Sao Tome And Principe',
//     'SA' : 'Saudi Arabia',
//     'SN' : 'Senegal',
//     'RS' : 'Serbia',
//     'SC' : 'Seychelles',
//     'SL' : 'Sierra Leone',
//     'SG' : 'Singapore',
//     'SK' : 'Slovakia',
//     'SI' : 'Slovenia',
//     'SB' : 'Solomon Islands',
//     'SO' : 'Somalia',
//     'ZA' : 'South Africa',
//     'GS' : 'South Georgia And Sandwich Isl.',
//     'ES' : 'Spain',
//     'LK' : 'Sri Lanka',
//     'SD' : 'Sudan',
//     'SR' : 'Suriname',
//     'SJ' : 'Svalbard And Jan Mayen',
//     'SZ' : 'Swaziland',
//     'SE' : 'Sweden',
//     'CH' : 'Switzerland',
//     'SY' : 'Syrian Arab Republic',
//     'TW' : 'Taiwan',
//     'TJ' : 'Tajikistan',
//     'TZ' : 'Tanzania',
//     'TH' : 'Thailand',
//     'TL' : 'Timor-Leste',
//     'TG' : 'Togo',
//     'TK' : 'Tokelau',
//     'TO' : 'Tonga',
//     'TT' : 'Trinidad And Tobago',
//     'TN' : 'Tunisia',
//     'TR' : 'Turkey',
//     'TM' : 'Turkmenistan',
//     'TC' : 'Turks And Caicos Islands',
//     'TV' : 'Tuvalu',
//     'UG' : 'Uganda',
//     'UA' : 'Ukraine',
//     'AE' : 'United Arab Emirates',
//     'GB' : 'United Kingdom',
//     'US' : 'United States',
//     'UM' : 'United States Outlying Islands',
//     'UY' : 'Uruguay',
//     'UZ' : 'Uzbekistan',
//     'VU' : 'Vanuatu',
//     'VE' : 'Venezuela',
//     'VN' : 'Viet Nam',
//     'VG' : 'Virgin Islands, British',
//     'VI' : 'Virgin Islands, U.S.',
//     'WF' : 'Wallis And Futuna',
//     'EH' : 'Western Sahara',
//     'YE' : 'Yemen',
//     'ZM' : 'Zambia',
//     'ZW' : 'Zimbabwe'
// };

// function getCountryName (countryCodeX) {
//     if (isoCountries.hasOwnProperty(countryCodeX)) {
//         return isoCountries[countryCodeX]
//     }
// }

// function getDayOfWeek(date) {
//     var dayOfWeek = new Date(date).getDay();    
//     return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
//     }

module.exports.forecastWeather = forecastWeather;
module.exports.setWeather = setWeather;