const fetch = require('isomorphic-fetch');
module.exports = {
  wrappedFetch(url, headers, method, payload) {
    console.log('request for', url, payload);
    return fetch(url, {
      headers,
      method,
      body: JSON.stringify(payload)
    }).catch((err) => {
      console.log('err', err.status, err.statusText);
      return Promise.reject(err);
    }).then((response) => {
      console.log('response', response.status, response.statusText);
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    });
  }
};
