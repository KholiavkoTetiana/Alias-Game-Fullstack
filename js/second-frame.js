import {model} from "./model.js";
import {controller} from "./controller.js";

function renderTeams(teams) {
    const teamsDiv = document.querySelector("#teams-div");
    teamsDiv.innerHTML = '';

    for (let i = 0; i < teams.length; i++) {
        let team = teams[i];

        const teamWrapper = document.createElement("div");
        teamWrapper.classList.add("team-item");

        const newTeam = document.createElement("p");
        newTeam.textContent = team.name;
        teamWrapper.appendChild(newTeam);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "×";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.dataset.teamName = team.name; // Додає data-team-name до кнопки
        teamWrapper.appendChild(deleteBtn);

        teamsDiv.appendChild(teamWrapper);
    }

    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) =>
        btn.addEventListener("click", deleteTeam)
    );
}

function addTeam() {
    const teamsDiv = document.querySelector("#teams-div");
    const teamCount = teamsDiv.querySelectorAll("p").length;
    const newInputName = document.querySelector("#new-team-inp").value;
    if (newInputName.length <= 0) {
        alert("введіть назву команди")
        return;
    }

    controller.addTeam(newInputName);
    renderTeams(model.teams);
    document.querySelector("#new-team-inp").value = ""; // Очищаємо поле вводу
    removeStartMessage();
}

function deleteTeam(e) {
    const teamName = e.target.dataset.teamName;
    controller.deleteTeam(teamName);
    renderTeams(model.teams);

    removeStartMessage();
    document.querySelector("#new-team-inp").value = ""; // Очищаємо поле вводу

}

renderTeams(model.teams)

document.querySelector("#add-team-btn").addEventListener("click", addTeam);

function removeStartMessage() {
    if (model.teams.length >= 2) {
        document.querySelector("#start-message").remove();
    }
    controller.removeStartMessage();
}

removeStartMessage();

