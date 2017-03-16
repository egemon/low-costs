const json2xls = require('json2xls');
const fs = require('fs');
const _ = require('lodash');
const wizz = require('./wizz/fetch');
const allAnyway = require('./common/helpers').allAnyway;

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
  console.log('connections', connections);
    return allAnyway(connections.map(({from, to, priceType}) => {
      return wizz.getAllFlightsFromTo(from, to, "2017-03-14", "2017-12-31", priceType)
    }));
}).then((results) => {
    const xls = json2xls(results);
    fs.writeFileSync(`./results/wizz.${Date.now()}.xlsx`, xls, 'binary');
});
