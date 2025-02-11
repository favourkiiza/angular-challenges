addEventListener('message', ({ data }) => {
  const { finalLength } = data;
  let loadingLength = 0;

  for (let num = 2; num <= 10000000; num++) {
    let randomFlag = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        randomFlag = false;
        break;
      }
    }
    if (randomFlag) {
      loadingLength++;
      postMessage({ loadingLength }); // Send progress updates to the main thread
    }
  }
});
