import { model} from "./model.js";
import {controller} from "./controller.js";
import {startTimer} from "./timer.js";
import {map, placePlayer} from "./mapa.js";


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

const players = {};

function createPlayer(index){
    const img = document.createElement("img");
    const boardDiv = document.querySelector("#board");
    img.id = "player" + index ;
    img.src = `../players/${index}.png`; // назва з індексом
    img.classList.add("player");

    img.style.transform = `translateX(${30 * index}px)`;
    boardDiv.appendChild(img);

    let playerPosition = model.teams[index].score;
    let coords = map[playerPosition];
    placePlayer(coords.x, coords.y, img);

    return img;
}

function initPlayers() {
    model.teams.forEach((team, index) => {
        players[team.name] = createPlayer(index);
        console.log(`створюємо ${index} гравця ${players[team.name]}`)
    });

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

