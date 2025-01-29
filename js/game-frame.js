import { model} from "./model.js";
import {controller} from "./controller.js";
import {startTimer} from "./timer.js";


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

function StartGame() {
    const startBtn = document.querySelector("#current-word");
    startBtn.removeEventListener("click", StartGame);

    const guessButton = document.querySelector("#guess-btn");
    const skipButton = document.querySelector("#skip-btn");

    controller.chooseNextTeam();

    guessButton.addEventListener("click", () => {
        controller.addGuess();
        renderWords();
        renderGuessScore();
    });

    skipButton.addEventListener("click", () => {
        controller.addSkip();
        renderWords();
        renderSkipScore();
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

/*

-таймер
-закнчення гри і перехід до рейтингу

-стоп
-відлік

-завдання для отримання більшої кількості очок?

правила
словник


*/


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