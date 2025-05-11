import { controller } from "./controller.js";
import {timeRemaining, isPaused, pauseTimer, continueTimer} from "./timer-logic.js";

const timerElement = document.querySelector("#timer");
const stopContinue = document.querySelector("#stop-continue");
const lastWord = document.querySelector("#last-word");

const guessButton = document.querySelector("#guess-btn");
const skipButton = document.querySelector("#skip-btn");

let roundEnded = false;

export function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function handleArrowKeys(event){
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        endRoundHandler();
    }
}

async function endRoundHandler() {
    if (roundEnded) return;
    roundEnded = true;

    showOriginalButtons();
    await controller.endRound();

    guessButton?.removeEventListener("click", endRoundHandler);
    skipButton?.removeEventListener("click", endRoundHandler);
    document.removeEventListener("keydown", handleArrowKeys);
}

export function handleEnd() {
    timerElement.textContent = "Час вийшов!";
    showLastWordButton();


    guessButton?.addEventListener("click", endRoundHandler);
    skipButton?.addEventListener("click", endRoundHandler);
    document.addEventListener("keydown", handleArrowKeys);

}

stopContinue?.addEventListener("click", () => {
    if (isPaused) {
        continueTimer(updateTimerDisplay, handleEnd);
        stopContinue.textContent = "Стоп";
    } else {
        pauseTimer();
        stopContinue.textContent = "Продовжити";
    }
});

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

// запуск дисплею одразу
// updateTimerDisplay();
// startTimer(updateTimerDisplay, handleEnd);
