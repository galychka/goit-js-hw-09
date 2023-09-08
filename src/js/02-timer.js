import '../css/common.css';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector('button[data-start]');
let timerDays = document.querySelector('span[data-days]');
let timerHours = document.querySelector('span[data-hours]');
let timerMinutes = document.querySelector('span[data-minutes]');
let timerSeconds = document.querySelector('span[data-seconds]');
const currentDate = new Date();

startBtn.disabled = true; 
let timerId = null;
let countdownInterval = null; 

const fp = flatpickr(input, {
    enableTime: true,
    time_24hr: true,
    minuteIncrement: 1,
    defaultDate: new Date(),
    onClose: (selectedDates) => { 
        if (selectedDates[0].getTime() <= currentDate.getTime()) { 
            Notiflix.Report.warning("Please choose a date in the future");
        } else {
            startBtn.disabled = false;
            startBtn.addEventListener('click', () => {
                if (countdownInterval) {
                    clearInterval(countdownInterval); 
                }
                countdownInterval = setInterval(() => {
                    const currentTime = new Date();
                    const ms = selectedDates[0].getTime() - currentTime.getTime();
                    const { days, hours, minutes, seconds } = convertMs(ms);
                    timerDays.textContent = addLeadingZero(days);
                    timerHours.textContent = addLeadingZero(hours);
                    timerMinutes.textContent = addLeadingZero(minutes);
                    timerSeconds.textContent = addLeadingZero(seconds);
                    if (ms <= 0) { 
                        clearInterval(countdownInterval);
                        timerDays.textContent = '00';
                        timerHours.textContent = '00';
                        timerMinutes.textContent = '00';
                        timerSeconds.textContent = '00';
                    }
                }, 1000);
            });
        }
    },
});

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor((ms % hour) / minute);
    const seconds = Math.floor((ms % minute) / second);
    return { days, hours, minutes, seconds };
}

function addLeadingZero(number) {
    return number < 10 ? `0${number}` : `${number}`;
}



