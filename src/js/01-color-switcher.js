const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', startBtnEvent);
stopBtn.addEventListener('click', stopBtnEvent);

let interval;
stopBtn.disabled = true;

function startBtnEvent() {
  console.log('this is startBtnEvent');
  startBtn.disabled = true;
  stopBtn.disabled = false;
  interval = setInterval(() => {
    let color = getRandomHexColor();
    body.style.backgroundColor = color;
  }, 1000);
}

function stopBtnEvent() {
  console.log('this is stopBtn event');
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(interval);
}
