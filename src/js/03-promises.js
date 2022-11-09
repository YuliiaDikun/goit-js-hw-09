const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const delay = Number(formEl.elements.delay.value);
  const step = Number(formEl.elements.step.value);
  const amount = Number(formEl.elements.amount.value);
  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      const position = i + 1;
      const delayProm = delay + step * i;
      createPromise(position, delayProm)
        .then(data => console.log(data))
        .catch(error => console.log(error));
    }, delay + step * i);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      return resolve({ position, delay });
    } else {
      reject('Error!');
    }
  });
  return promise;
}
