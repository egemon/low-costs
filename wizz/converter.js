const convertRates = require('../data/rates').convertRates;
const moment = require('moment');

module.exports = {
  convertWizzData (wizzFligths) {
    return wizzFligths.map((flight) => {
      return {
        departureairport: flight.departureStation,
        destinationairport: flight.arrivalStation,
        departuretime: moment(flight.departureDates[0]).valueOf(),
        cost: flight.price ? convertRates(flight.price) : 'unknown',
        requesttime: moment().valueOf()
      }
    });
  }
};
