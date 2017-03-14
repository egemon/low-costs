const fetch = require('isomorphic-fetch');
module.exports = {
  wrappedFetch(url, headers, method, payload) {
    console.log('arguments', arguments);

    return fetch(url, {
      headers,
      method,
      body: JSON.stringify(payload)
    }).then((response) => {
      console.log('response', response.status, response.statusText);
      return response.json();
    }).catch((err) => {
      console.log('err', err.status, err.statusText);
    })
  }
};
