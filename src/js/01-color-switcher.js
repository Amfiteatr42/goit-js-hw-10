const body = document.querySelector('body');
const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');
let colorChangeId = null;

startBtnRef.addEventListener('click', onStartClick);

function onStartClick() {
  colorChangeId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtnRef.setAttribute('disabled', true);
}

stopBtnRef.addEventListener('click', onStopClick);

function onStopClick() {
  clearInterval(colorChangeId);
  startBtnRef.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
