const rates = {
  BAM: 1.95583,
  BGN: 1.95495,
  CZK: 27.0231,
  GEL: 2.67508,
  HUF: 309.749,
  ILS: 3.89230,
  MKD: 61.4844,
  NOK: 9.15193,
  PLN: 4.30053,
  RON: 4.55188,
  RSD: 123.926
};

module.exports = {
  convertRates(price) {
    if (price.currencyCode === 'EUR' ) {
      return price.amount;
    } else {
      return Number(price.amount / rates[price.currencyCode]).toFixed(2);
    }
  }
};
