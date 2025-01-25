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
        // teamsToPay.classList.add("team");
        teamWrapper.appendChild(teamsToPay);

        const teamsScore = document.createElement("p");
        teamsScore.textContent = team.score;
        teamsScore.classList.add("score");
        teamsScore.dataset.teamToPlay = team.score; // Додає data-team-name до кнопки
        teamWrapper.appendChild(teamsScore);

        teamsToPlayDiv.appendChild(teamWrapper);
    }
}

function teamToPlay(){

    const savedData = localStorage.getItem("model");
    if (savedData) {
        const model = JSON.parse(savedData);
        renderTeamsToPlay(model.teams); ///??????
    }else {
        console.log("Дані відсутні у localStorage.");
    }
}

teamToPlay();

//const savedData = localStorage.getItem("model");
// if (savedData) {
//     const model = JSON.parse(savedData);
//     console.log(model.teams);
// }