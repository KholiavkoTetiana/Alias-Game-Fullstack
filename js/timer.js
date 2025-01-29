import {controller} from "./controller.js";

let timeRemaining = 10;
let interval = null;
let isPaused = false;

const timerElement = document.querySelector("#timer");
const stopContinue = document.querySelector("#stop-continue");

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function startTimer() {
    if (!interval) {
        interval = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                updateTimerDisplay();
            } else {
                clearInterval(interval);
                interval = null;
                timerElement.textContent = "Час вийшов!";
                controller.endRound(); //кінець раунду
            }
        }, 1000);
    }
}

stopContinue.addEventListener('click', () => {
    if (interval) {
        // Поставити на паузу
        clearInterval(interval);
        interval = null;
        isPaused = true;
        stopContinue.textContent = "Продовжити";
    } else {
        // Продовжити
        isPaused = false;
        startTimer();
        stopContinue.textContent = "Стоп";
    }
});
updateTimerDisplay();










