const fetch = require('isomorphic-fetch');
module.exports = {
  wrappedFetch(url, headers, method, payload) {
    return fetch(url, {
      headers,
      method,
      body: JSON.stringify(payload)
    }).catch((err) => {
      console.log('err', err.status, err.statusText);
      return Promise.resolve({})
    }).then((response) => {
      console.log('response', response.status, response.statusText);
      return response.json();
    });
  }
};
