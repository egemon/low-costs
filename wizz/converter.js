const convertRates = require('../data/rates').convertRates;

module.exports = {
  convertWizzData (wizzFligths) {
    return wizzFligths.map((flight) => {
      return {
        from: flight.departureStation,
        to: flight.arrivalStation,
        when: flight.departureDates[0],
        price: flight.price ? convertRates(flight.price) : 'unknown'
      }
    });
  }
};
