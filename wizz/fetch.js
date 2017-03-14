const wrappedFetch = require('../common/wrapped-fetch').wrappedFetch;
const WIZZ_URL = 'https://be.wizzair.com/4.1.0/Api/search/timetable';
const headers = require('./headers');
const convertWizzData = require('./converter').convertWizzData;
const payload = {
  flightList:[
    {departureStation: "IEV", arrivalStation: "LCA", from: "2017-03-14", to: "2017-04-30"},
    {departureStation: "LCA", arrivalStation: "IEV", from: "2017-03-14", to: "2017-04-30"}
  ],
  priceType : "wdc"
};
module.exports = {
  makeRequest (from, to, when) {
    return wrappedFetch(WIZZ_URL, headers, "POST", payload).then((data) => {
      return Promise.resolve(convertWizzData([].concat(data.outboundFlights || []).concat(data.returnFlights  || [])));
    });
  }
};
