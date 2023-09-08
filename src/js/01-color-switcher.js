import '../css/common.css';

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.body;
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

btnStart.addEventListener('click', onClickStart);
btnStop.addEventListener('click', onClickStop);


function onClickStart() {
    btnStart.disabled = true;
    btnStop.disabled = false;
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function onClickStop() {
    btnStart.disabled = false;
    btnStop.disabled = true;
    clearInterval(timerId);
}

