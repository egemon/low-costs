const Connection = require('./db/connection');
const creds = require('./db/.db-creds.js');
module.exports = new Connection(creds).execSingleQuery('select * from flights;').then((data) => {
    console.log('data', data);
});
