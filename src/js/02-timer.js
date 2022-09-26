import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtnRef = document.querySelector('[data-start]');
const dateInputRef = document.querySelector('input#datetime-picker');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.warning('Please choose a date in the future', {
        position: 'center-top',
        backOverlay: true,
        clickToClose: true,
        closeButton: true,
      });
      return;
    }
    startBtnRef.removeAttribute('disabled');
  },
};

startBtnRef.setAttribute('disabled', true);

flatpickr(dateInputRef, options);

startBtnRef.addEventListener('click', onStartHandler);

function onStartHandler() {
  const timerId = setInterval(() => {
    const targetDateInMs = new Date(dateInputRef.value).getTime();
    const currentDateInMs = Date.now();
    const dateCounter = targetDateInMs - currentDateInMs;
    const { days, hours, minutes, seconds } = convertMs(dateCounter);

    if (targetDateInMs <= currentDateInMs) {
      clearInterval(timerId);
      return;
    }

    daysRef.textContent = addLeadingZero(days);
    hoursRef.textContent = addLeadingZero(hours);
    minutesRef.textContent = addLeadingZero(minutes);
    secondsRef.textContent = addLeadingZero(seconds);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}
