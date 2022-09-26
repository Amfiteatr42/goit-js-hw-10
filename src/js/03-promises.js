import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

formRef.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const delayValue = Number(formRef.elements.delay.value);
  const amountValue = Number(formRef.elements.amount.value);
  const stepValue = Number(formRef.elements.step.value);
  let increasingDelay = delayValue;

  for (let i = 1; i <= amountValue; i++) {
    createPromise(i, increasingDelay).then(onSuccess).catch(onReject);
    increasingDelay += stepValue;
  }
}

function onSuccess({ position, delay }) {
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onReject({ position, delay }) {
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
