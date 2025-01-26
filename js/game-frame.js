import {initStorage, model} from "./model.js";
import {wordProcessing} from "./controller.js";

initStorage();

function renderActiveTeam(){
    document.querySelector("#active-team").textContent = model.active;
}
renderActiveTeam();

function renderWords(){
    document.querySelector("#current-word").innerText = wordProcessing();
}
renderWords();

function guessRender(){
    document.querySelector("#guess-score").textContent = "" + model.guessed;
}

function skipRender(){
    document.querySelector("#skip-score").textContent = "" + model.skip;
}

function game(){
    const guessButton = document.querySelector("#guess-btn");
    const skipButton =document.querySelector("#skip-btn");

    guessButton.addEventListener("click", () => {
        model.guessed ++;
        renderWords();
        guessRender();

    });

    skipButton.addEventListener("click", () => {
        model.skip --;
        renderWords();
        skipRender();
    });

}

game();

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