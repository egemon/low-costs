'use strict';
var pg = require('pg');
pg.defaults.ssl = true;
function promisifyCall (object, methodName) {
  return new Promise((resolve, reject) => {
    object[methodName]((err, data) => {
      if(err) {
        reject(`Could not call ${methodName} because of error: ${err}`);
      }
      resolve(data);
    });
  });
}

module.exports = class Connection {
  constructor(creds){
    let dbName = creds.dbName;
    let dbHost = creds.dbHost;
    let dbUser = creds.dbUser;
    let dbPassword = creds.dbPassword;

    let conString = `postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;
    this.client = new pg.Client(conString);
  };

  openConnection() {
    return promisifyCall(this.client, 'connect');
  }

  closeConnection(data) {
    return promisifyCall(this.client, 'end').then(() => {
        return Promise.resolve(data);
    });
  }

  runStatement(sqlString){
    return new Promise((resolve, reject) => {
      console.log('SQL query: ', sqlString);
      this.client.query(sqlString, (err, result) => {
        if(err) {
          console.log('Unable to execute SQL: ', sqlString);
          reject(`Error: ${err}`);
        }

        resolve(result);

      });
    });
  };

  execSingleQuery(sqlString){
    return this.openConnection()
      .then(() => this.runStatement(sqlString))
      .then((data) => this.closeConnection(data));
  };
};

