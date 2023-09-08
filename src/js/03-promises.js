import Notiflix from "notiflix";

const form = document.querySelector('form');
const inputDelay = form.elements.delay; 
const inputDelayStep = form.elements.step;
const inputAmount = form.elements.amount;
const btnCreatePromise = document.querySelector('button');

btnCreatePromise.addEventListener('click', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  let delay = Number(inputDelay.value); 

  const step = Number(inputDelayStep.value);
  const amount = Number(inputAmount.value);
  let position = 1; 

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3; 
    
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });

    promise
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }

  for (let i = 1; i <= amount; i += 1) {
    createPromise(position, delay);
    delay += step;
    position += 1; 
  }
}
