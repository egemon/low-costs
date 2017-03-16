const wrappedFetch = require('../common/wrapped-fetch').wrappedFetch;
const WIZZ_URL = 'https://be.wizzair.com/4.1.0/Api/search/timetable';
const WIZZ_URL_SEARCH = 'https://be.wizzair.com/4.1.0/Api/search/search';
const WIZZ_URL_CONNECTIONS = 'https://be.wizzair.com/4.1.0/Api/asset/map?languageCode=en-gb';
const headers = require('./headers');
const convertWizzData = require('./converter').convertWizzData;

module.exports = {
  getAllConnections() {
    return wrappedFetch(WIZZ_URL_CONNECTIONS, "GET").then(data => data.cities);
  },
  getAllFlightsFromTo (from, to, startTime, endTime, priceType) {
    return wrappedFetch(WIZZ_URL, headers, "POST", {
      flightList:[
        {departureStation: from, arrivalStation: to, from: startTime, to: endTime},
        {departureStation: to, arrivalStation: from, from: startTime, to: endTime}
      ],
      priceType
    }).then((data) => {
      return Promise.resolve(convertWizzData([].concat(data.outboundFlights || []).concat(data.returnFlights  || [])));
    });
  }
};
