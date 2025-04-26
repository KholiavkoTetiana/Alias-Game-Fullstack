import {controller} from "./controller.js";

let timeRemaining = 5;
let interval = null;
let isPaused = false;

const timerElement = document.querySelector("#timer");
const stopContinue = document.querySelector("#stop-continue");
const lastWord = document.querySelector("#last-word");

const guessButton = document.querySelector("#guess-btn");
const skipButton = document.querySelector("#skip-btn");

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

async function endRoundHandler() {
    showOriginalButtons();
    await controller.endRound();

    guessButton.removeEventListener("click", endRoundHandler);
    skipButton.removeEventListener("click", endRoundHandler);
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
                showLastWordButton();
                // якщо натиснута кнопка guessButton або skipButton ->
                // -> викликати showOriginalButtons(), controller.endRound(); //кінець раунду
                // Додаємо обробник для кнопок

                guessButton.addEventListener("click", endRoundHandler);
                skipButton.addEventListener("click", endRoundHandler);
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

function showLastWordButton() {
    timerElement.style.visibility = "hidden";
    stopContinue.style.visibility = "hidden";

    lastWord.style.display = "block";
}

function showOriginalButtons() {
    timerElement.style.display = "block";
    stopContinue.style.display = "block";

    lastWord.style.display = "none";
}







