import {readStorage, model, BASEURL, saveModel} from "./model.js";
import {controller, getIndexById} from "./controller.js";
import {initPlayers, players} from "./mapa.js";

export let mode = localStorage.getItem('gameMode'); // "new" або "continue"

if (mode === 'new') {
    document.querySelector("#header").textContent = "Команди";
    document.querySelector("#start-message").textContent = "Створіть як мінімум 2 команди";
    document.querySelector("#new-team-inp").placeholder = "Введіть назву команди";
    document.querySelector("#game-id").textContent += model.roomId;
    renderTeams(model.teams) // виводимо команди лише якщо нова гра
    startRound();
    removeStartMessage();


} else if (mode === 'continue') {
    const continueBtn = document.querySelector("#header");
    continueBtn.textContent = "Продовження попередньої гри";
    continueBtn.style.fontSize = "20px";

    document.querySelector("#start-message").style.visibility = "hidden";
    document.querySelector("#new-team-inp").placeholder = "Введіть номер вашої гри";

    const btn = document.querySelector("#add-team-btn");
    btn.textContent = "Підтвердити";
    btn.classList.add("small-plus");
    if (model.roomId) {
        document.querySelector("#game-id").textContent = `№ гри: ${model.roomId}`;
    }
    renderTeams(model.teams);
} else {
    console.log("getMode в localStorage відсутній");
}

readStorage();

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
    initPlayers();

}

function addTeam() {
    const newInputName = document.querySelector("#new-team-inp").value;
    if (newInputName.length <= 0) {
        alert("введіть назву команди")
        return;
    }

    controller.addTeam(newInputName).then(() => {
        renderTeams(model.teams);
        document.querySelector("#new-team-inp").value = ""; // Очищаємо поле вводу
        removeStartMessage();
    });

}

function deleteTeam(e) {
    const teamName = e.target.dataset.teamName;

    if (players[teamName]) {
        players[teamName].remove();
        delete players[teamName];
    }

    controller.deleteTeam(teamName);
    renderTeams(model.teams);

    removeStartMessage();
    document.querySelector("#new-team-inp").value = ""; // Очищаємо поле вводу

}


const addBtn = document.querySelector("#add-team-btn");

if (mode === "new") {
    addBtn.addEventListener("click", addTeam);
} else if (mode === "continue") {
    addBtn.addEventListener("click", checkGameId);
}

function removeStartMessage() {
    if (model.teams.length >= 2) {
        document.querySelector("#start-message").remove();
    }
    controller.removeStartMessage();
}

function startRound() { // визначаємо поточну команду
    const startBtn = document.querySelector("#go-to-score");
    startBtn.addEventListener("click", controller.chooseNextTeam);
}


function checkValidNumOfCommands() {
    document.getElementById("go-to-score").addEventListener("click", function (event) {
        if (model.teams.length < 2) {
            alert("Створіть як мінімум 2 команди");
            event.preventDefault(); // Забороняє перехід, якщо команд недостатньо
        } else {
            window.location.href = "3-score-frame.html";
        }
    });
}


checkValidNumOfCommands();

async function checkGameId() {
    const inputId = document.querySelector("#new-team-inp").value.trim();
    if (!inputId) {
        alert("Введіть номер гри");
        return;
    }

    try {
        const res = await fetch(`${BASEURL}/games/${inputId}`, { method: 'GET' });

        if (!res.ok) {
            if (res.status === 404) {
                alert("Гру не знайдено");
            }else {
                alert("Такої гри не існує");
                console.log(`Помилка сервера: ${res.status}`)
            }
            return;
        }

        // Розпарсити JSON
        const data = await res.json();

        if(data.winnerTeamId){
            alert("Ця гра вже закінчена, її не можна продовжити");
            return;
        }

        if (!Array.isArray(data.teams) || data.teams.length === 0) {
            alert("Гра без команд недоступна. Додайте команди або створіть нову гру.");
            return;
        }
        let teams = data.teams.slice();        // клон, якщо хочете зберегти data.teams
        teams.sort((a, b) => a.id - b.id);     // сортуючи по зростанню id

        //  Записати в модель
        model.roomId       = data.roomId;
        model.teams        = teams;
        model.activeTeamId = data.activeTeamId;
        model.activeTeamIndex = getIndexById(model.teams, model.activeTeamId);
        model.round        = data.round;
        model.guessed      = data.guessed;
        model.skip         = data.skip;
        model.winnerTeamId = data.winnerTeamId;

        document.querySelector("#game-id").textContent = `№ гри: ${model.roomId}`;
        renderTeams(model.teams);
        removeStartMessage();

        saveModel();
    } catch (err) {
        console.error(err);
        alert("Не вдалося завантажити гру: " + err.message);
    }
}

