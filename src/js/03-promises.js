import Notiflix from 'notiflix';

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
        .then(({ position, delay }) =>
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`,
            {
              position: 'center-top',
            }
          )
        )
        .catch(({ position, delay }) =>
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`,
            {
              position: 'center-top',
            }
          )
        );
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
