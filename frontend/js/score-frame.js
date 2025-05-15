import {readStorage, model} from "./model.js";
import {controller} from "./controller.js";
import {initPlayers} from "./mapa.js";

readStorage();



function renderTeamsToPlay(teams) {
    const teamsToPlayDiv = document.querySelector("#team-to-play-div");
    teamsToPlayDiv.innerHTML = '';

    if (!teams || teams.length === 0) {
        console.log("Немає доступних команд.");
        return;
    }

    for (const team of teams) {

        const teamWrapper = document.createElement("div");
        teamWrapper.classList.add("team-item");

        const teamsToPay = document.createElement("p");
        teamsToPay.textContent = team.name + ": ";
        teamsToPay.classList.add("team-name");
        teamWrapper.appendChild(teamsToPay);

        const teamsScore = document.createElement("p");
        teamsScore.textContent = team.score;
        teamsScore.classList.add("score");
        teamsScore.dataset.teamToPlay = team.score; // Додає data-team-name до кнопки
        teamWrapper.appendChild(teamsScore);

        const winner = document.createElement("p");
        winner.textContent = "Winner!";
        winner.classList.add("winner");
        teamWrapper.appendChild(winner);

        if(team.isWinner === true){
            winner.style.visibility = "visible";
            document.querySelector("#go-to-main-menu").style.visibility = "visible";
            document.querySelector("#start-game").style.visibility = "hidden";
            document.querySelector(".bottom-win-massage").textContent = "Команда \"" + team.name + "\" виграла, вітаю!";
        }

        teamsToPlayDiv.appendChild(teamWrapper);
    }
}

function renderActiveTeam() {
    const activeTeam = controller.getActiveTeam();
    if (activeTeam) {
        document.querySelector("#active-team").textContent = activeTeam.name;
    } else {
        console.log("Активна команда не знайдена");
        document.querySelector("#active-team").textContent = "Невідомо";


    }
}


renderActiveTeam();

function renderRound() {
    document.querySelector("#current-round").textContent = model.round;
}

renderRound();


function teamToPlay() {
    renderTeamsToPlay(model.teams); ///??????
}

teamToPlay();

initPlayers();
