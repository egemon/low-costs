const Connection = require('./db/connection');
const creds = require('./db/.db-creds.js');
console.log('creds', creds);
module.exports = new Connection('select * from flights;', creds).execQuery().then((data) => {
    console.log('data', data);
});
