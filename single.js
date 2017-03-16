const wizz = require('./wizz/fetch');

wizz.getAllFlightsFromTo(...process.argv.slice(2))
.then(result => console.log(result))
.catch((err) => {
  console.warn('Error during wizz fetching', err.status, err.statusText);
});
