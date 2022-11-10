import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  let delay = Number(formEl.elements.delay.value);
  const step = Number(formEl.elements.step.value);
  const amount = Number(formEl.elements.amount.value);
  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay)
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
    delay += step;
  }
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
