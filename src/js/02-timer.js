import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputEl = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const dateEl = document.querySelector('[data-days');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

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
          alert('Please choose a date in the future');
      } else { 
          startBtn.disabled = false;          
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
        
        const dateObj = convertMs(time);       
        
        dateEl.innerHTML = addLeadingZero(dateObj.days);
        hoursEl.innerHTML = addLeadingZero(dateObj.hours);
        minutesEl.innerHTML = addLeadingZero(dateObj.minutes);
        secondsEl.innerHTML = addLeadingZero(dateObj.seconds);
        
        if (dateObj <= 0) { 
            clearInterval(timeInterval);
        }
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
    if(n >= 0 && n < 10) {
        return `0${n}`;
    } else {
        return n;
    }
}

