import { model} from "./model.js";
import {controller} from "./controller.js";
import {startTimer} from "./timer-logic.js";
import {updateTimerDisplay, handleEnd} from "./timer.js"
import {initPlayers, map, placePlayer, players} from "./mapa.js";
import * as events from "node:events";


function renderWords() {
    document.querySelector("#current-word").innerText = controller.getNexWord();
}

function renderGuessScore() {
    document.querySelector("#guess-score").textContent = "" + model.guessed;
}

function renderSkipScore() {
    document.querySelector("#skip-score").textContent = "" + model.skip;
}


function renderActiveTeam() {
    document.querySelector("#active-team").textContent = model.teams[model.activeTeamIndex].name;
}

function setupStartButton(){
    const startBtn = document.querySelector("#current-word");
    startBtn.addEventListener("click", StartGame);

}
//
// function ofGuessAndSkip(
//
// )

function movePlayer(){
    const activeTeam = model.teams[model.activeTeamIndex]; // Отримуємо активну команду
    const player = players[activeTeam.name]; // Повертаємо гравця відповідної команди


    let playerPosition = model.teams[model.activeTeamIndex].score + model.guessed - model.skip;
    console.log(`очки поточної команди: ${model.teams[model.activeTeamIndex].score}`)

    let coords = map[playerPosition];
    console.log(`розміщуємо гравця на ${playerPosition} (${coords.x}, ${coords.y})`);
    placePlayer(coords.x, coords.y, player);
}

let roundContinue = true;
function StartGame() {
    roundContinue = true; // запускаємо раунд заново

    const startBtn = document.querySelector("#current-word");
    startBtn.removeEventListener("click", StartGame);
    startTimer(updateTimerDisplay, handleEnd);
    updateTimerDisplay();

    const guessButton = document.querySelector("#guess-btn");
    const skipButton = document.querySelector("#skip-btn");

    function handleGuess() {
        if (!roundContinue) return;

        controller.addGuess();
        renderWords();
        renderGuessScore();
        movePlayer();
        if (controller.win()) {
            roundContinue = false;     // зупиняємо раунд
            handleEnd();               // викликаємо завершення
        }
    }

    function handleSkip() {
        controller.addSkip();
        renderWords();
        renderSkipScore();
        movePlayer();

        if (!roundContinue) {
            handleEnd();               // викликаємо завершення
        }
    }


    guessButton.addEventListener("click", handleGuess);
    skipButton.addEventListener("click", handleSkip);

    document.addEventListener("keydown", (event) => {
        if(event.key === "ArrowLeft"){
            handleGuess();
        }else if(event.key === "ArrowRight"){
            handleSkip();
        }
    });


    renderWords();
    //намалювати стоп

}

controller.loadWords();

renderGuessScore();
renderSkipScore();

setupStartButton();

// renderWords();
// startGame();

renderActiveTeam();
initPlayers();

