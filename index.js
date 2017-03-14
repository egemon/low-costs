const wizzFetch = require('./wizz/fetch').makeRequest;
wizzFetch().then((flights) => {
  console.log(flights);
});
