import {readStorage, model} from "./model.js";
import {controller} from "./controller.js";


function renderWords() {
    document.querySelector("#current-word").innerText = controller.getNexWord();
}

function guessScoreRender() {
    document.querySelector("#guess-score").textContent = "" + model.guessed;
}

function skipScoreRender() {
    document.querySelector("#skip-score").textContent = "" + model.skip;
}


function renderActiveTeam() {
    document.querySelector("#active-team").textContent = model.teams[model.activeTeamIndex].name;
}

function game() {
    const guessButton = document.querySelector("#guess-btn");
    const skipButton = document.querySelector("#skip-btn");

    controller.chooseNextTeam();

    guessButton.addEventListener("click", () => {
        controller.addGuess();
        renderWords();
        guessScoreRender();
    });

    skipButton.addEventListener("click", () => {
        controller.addSkip();
        renderWords();
        skipScoreRender();
    });
}

function endRound(){
    controller.calculateScore();
    model.skip = 0;
    model.guessed = 0;
    //chooseNextTeam();
}

renderWords();

game();
renderActiveTeam();


/*
змінювати назву поточної команди

вгадав
- score ++
- слово записується в використані слова
- нове рандомне слово

не вгадав
- score --
- слово записується в використані слова
- нове рандомне слово


новий раунд
- видалити з словника всі використані слова


кінець раунду - змінити рейтинг команди



*/