require('./common/logger');

const json2xls = require('json2xls');
const fs = require('fs');
const _ = require('lodash');
const wizz = require('./wizz/fetch');
const allAnyway = require('./common/helpers').allAnyway;
// const rolloverFailed = require('./common/helpers').rolloverFailed;
const START_DATE = "2017-03-24";
const END_DATE = "2017-12-31";
const BANCH_SIZE = 100;


wizz.getAllConnections().then((cities) => {
  return _.uniqWith(_.flatten(cities.map((city) => {
    return city.connections.map((connectedCity) => {
      return {
        from: city.iata,
        to: connectedCity.iata,
        priceType: connectedCity.isWdcDisabled ? 'regular' : 'wdc'
      };
    });
  })), (val1, val2) => val1.from + val1.to === val2.to + val2.from);
}).then((connections) => {
  console.log('connections.length', connections.length);
  let handledEdge = 0;
  let step = 0;
  let banch = [];
  while (handledEdge <= connections.length) {
    banch = connections.slice(handledEdge, handledEdge + BANCH_SIZE);
    setTimeout(makeBanchRequest.bind(null, [...banch], handledEdge), (step + 1) * 2000);
    step++;
    handledEdge += BANCH_SIZE;
  }
});


function makeBanchRequest (innerBanch, handledEdge) {
  const lostConnections = [];
  return allAnyway(innerBanch.map(({from, to, priceType}) => {
    return wizz.getAllFlightsFromTo(from, to, START_DATE, END_DATE, priceType).catch((err) => {
      console.warn('Error during wizz fetching', err.status, err.statusText, from, to, priceType);
      lostConnections.push({from, to, priceType});
      return Promise.resolve({});
    });
  })).then((results) => {
    console.log('lostConnections', lostConnections);
    const xls = json2xls(results);
    fs.writeFileSync(`./results/wizz.${handledEdge}.${Date.now()}.xlsx`, xls, 'binary');
  });
}
