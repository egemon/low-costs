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
  }
};
