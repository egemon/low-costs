module.exports = {
  convertWizzData (wizzFligths) {
    return wizzFligths.map((flight) => {
      return {
        from: flight.departureStation,
        to: flight.arrivalStation,
        when: flight.departureDates[0],
        price: flight.price && flight.price.amount,
        currency: flight.price && flight.price.currencyCode
      }
    });
  }
};
