const currencyCache = {};

module.exports function convertCurrency (from, to) {
  return currencyCache[`from${to}`]
}

