const btnPomodoro = document.getElementById("botao1");
const btnShortBreak = document.getElementById("botao2");
const btnStart = document.getElementById("botao3");
const btnStop = document.getElementById("botao4");
const btnReset = document.getElementById("botao5");
const minutesEl = document.getElementById("minutos");
const secondsEl = document.getElementById("segundos");
const alarm = new Audio('alarme.mp3');
alarm.loop = true;
let isPaused;
let isShortBreakActive = false;
let interval;
let seconds;
let minutes; 
let milliseconds = 0;
function startTimer(){
    isPaused = false;
    interval = setInterval(() => {
        if(!isPaused){
            milliseconds += 10;
            if(milliseconds === 1000){
                seconds--;
                milliseconds = 0;
            }

            if(seconds < 0){
                seconds += 60;
                minutes--;
            }
            if(minutes === 0 && seconds === 0){
                playAlarm();
            }
            updateDisplay();
        }
    },10)
    disableButton(btnStart);
    enableButton(btnStop);
    enableButton(btnReset);
}

function updateDisplay(){
    secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
    minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
}

function playAlarm(){
    alarm.currentTime = 0;
    alarm.play();
    isPaused = true;
}

function stopTimer(){
    isPaused = true;
    clearInterval(interval);
    enableButton(btnStart);
    disableButton(btnStop);
    alarm.pause();
}

function restartTimer(){
    seconds = -1;
    milliseconds = 0;
    if(!isShortBreakActive){
        minutes = 25;
        minutesEl.textContent = '25';
        secondsEl.textContent = '00';
    }else{
        minutes = 5;
        minutesEl.textContent = '05';
        secondsEl.textContent = '00';
    }
    disableButton(btnReset);
    stopTimer();
}

function activatePomodoroMode(){
    isShortBreakActive = false;
    disableButton(btnPomodoro);
    enableButton(btnShortBreak);
    restartTimer();
}

function activateShortBreakMode(){
    isShortBreakActive = true;
    disableButton(btnShortBreak);
    enableButton(btnPomodoro);
    restartTimer();
}

function enableButton(button){
    button.classList.remove("disable_button");
    button.removeAttribute("disabled");
}

function disableButton(button){
    button.classList.add("disable_button");
    button.setAttribute("disabled",true);
}

btnStart.addEventListener("click",startTimer);
btnStop.addEventListener("click",stopTimer);
btnReset.addEventListener("click",restartTimer);
btnPomodoro.addEventListener("click",activatePomodoroMode);
btnShortBreak.addEventListener("click",activateShortBreakMode);
restartTimer();