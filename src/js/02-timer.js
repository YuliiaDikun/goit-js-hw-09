import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timer = document.querySelectorAll('span.value');

startBtn.disabled = true;

let choosenDate;

flatpickr(inputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const today = new Date();
    choosenDate = selectedDates[0];
    if (selectedDates[0].getTime() < today.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future.', {
        timeout: 1000,
        position: 'center-top',
      });
    } else {
      startBtn.disabled = false;
      Notiflix.Notify.success('Please, start the timer!', {
        timeout: 1000,
        position: 'center-top',
      });
    }
  },
});

startBtn.addEventListener('click', startBtnEvent);

function startBtnEvent() {
  startBtn.disabled = true;
  inputEl.disabled = true;

  const timeInterval = setInterval(updateTimer, 1000);

  function updateTimer() {
    const today = new Date();
    const time = choosenDate - today;

    if (time <= 1000) {
      clearInterval(timeInterval);
    }
    const data = convertMs(time);
    Object.entries(data).forEach(([name, value], idx) => {
      timer[idx].textContent = addLeadingZero(value);
    });
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(n) {
  return n.toString().padStart(2, '0');
}
