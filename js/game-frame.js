import { model} from "./model.js";
import {controller} from "./controller.js";
import {startTimer} from "./timer.js";
import {initPlayers, map, placePlayer, players} from "./mapa.js";


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




function movePlayer(){
    const activeTeam = model.teams[model.activeTeamIndex]; // Отримуємо активну команду
    const player = players[activeTeam.name]; // Повертаємо гравця відповідної команди


    let playerPosition = model.teams[model.activeTeamIndex].score + model.guessed - model.skip;
    console.log(`очки поточної команди: ${model.teams[model.activeTeamIndex].score}`)

    let coords = map[playerPosition];
    console.log(`розміщуємо гравця на ${playerPosition} (${coords.x}, ${coords.y})`);
    placePlayer(coords.x, coords.y, player);
}

function StartGame() {
    const startBtn = document.querySelector("#current-word");
    startBtn.removeEventListener("click", StartGame);

    const guessButton = document.querySelector("#guess-btn");
    const skipButton = document.querySelector("#skip-btn");

    guessButton.addEventListener("click", () => {
        controller.addGuess();
        renderWords();
        renderGuessScore();
        movePlayer();

    });

    skipButton.addEventListener("click", () => {
        controller.addSkip();
        renderWords();
        renderSkipScore();
        movePlayer();
    });
    renderWords();
    startTimer();
    //намалювати стоп

}



renderGuessScore();
renderSkipScore();

setupStartButton();

// renderWords();
// startGame();

renderActiveTeam();
initPlayers();

