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
function createPlayer(index){
    const img = document.createElement("img");
    const boardDiv = document.querySelector("#board");
    img.id = "player" + index ;
    img.src = "../img/fireman.png";
    img.classList.add("player");
    img.style.transform = `transformX(${30 *index}px)`;
    boardDiv.appendChild(img);
    return img;
}

const player = createPlayer(1);



let playerPosition = model.teams[model.activeTeamIndex].score;
console.log(`очки поточної команди: ${model.teams[model.activeTeamIndex].score}`)
function movePlayer(direction){
    if(direction){
        if(playerPosition < Object.keys(map).length){
            playerPosition++;
        }
    }else {
        if(playerPosition > 1){
            playerPosition--;
        }
    }
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
        movePlayer(true);

    });

    skipButton.addEventListener("click", () => {
        controller.addSkip();
        renderWords();
        renderSkipScore();
        movePlayer(false);
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

