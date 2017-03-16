const ROLLOVER_TIMES = 1;

module.exports = {
  allAnyway(promisesArr) {
    return promisesArr.reduce((chain, promise) => {
      return chain.then(
        prevData => promise.then(
          currentData => Promise.resolve(prevData.concat(currentData)),
          err => Promise.resolve(prevData)
        )
      );
    }, Promise.resolve([]))
  },
  rolloverFailed(callback, args) {
    const promise = callback.apply(null, args);
    for (let i = 0; i< ROLLOVER_TIMES; i++ ) {
      promise.then((data) => {
        console.log('Promise resolved during rollover', data);
        return Promise.resolve(data);
      }, (err) => {
        console.log('Error during rollover ', i, err.statusText, err.status);
        return callback.apply(null, args);
      })
    }
    return promise.catch((err) => {
      console.log('Request for ', args, 'was unsuccessfull. Data might be not full.');
      return Promise.resolve();
    });
  },
};
