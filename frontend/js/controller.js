// Alias controller API

import {aliasWords, model, readStorage, saveModel, usedWords} from "./model.js"

function getIndexById(teams, teamId) {
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].id === teamId) {
            console.log('індекс активної команди = ', i)
            return i;
        }
    }
}
async function saveResponse(res) {
    let room = await res.json()
    room.activeTeamIndex = getIndexById(room.teams, room.activeTeamId)
    console.log('room;', room)
    localStorage.setItem('room', JSON.stringify(room))
    readStorage();
}

const scoreToWin = 15;
export const controller = {

    removeStartMessage() {
        console.log("removeStartMessage called");
    },

// let res = await fetch('http://localhost:3000/games/new-room', {method: 'POST'})
//         let room = await res.json()
//         console.log('room;', room)
//         localStorage.setItem('room', JSON.stringify(room))
    async addTeam(newInputName) {

        if (model.teams.length >= 5) {
            alert("Максимальна кількість команд — 5.");
            return;
        }
        if (model.teams.some(team => team.name === newInputName)) {
            alert("Команда з такою назвою вже існує.");
            return;
        }

        // model.teams.push({name: newInputName, score: 0, isWinner: false});
        // saveModel();
        let res = await fetch(`http://localhost:3000/games/${model.roomId}/teams/${newInputName}`, {method: 'POST'})
        await saveResponse(res);

        // await fetch(`http://localhost:3000/games/${model.roomId}/teams/${newInputName}`, {method: 'POST'})
        //     .then((res) => {
        //             saveResponse(res)
        //         }
        //     )
        //
        // await fetch(`http://localhost:3000/games/${model.roomId}/teams/${newInputName}`, {method: 'POST'})
        //     .then(saveResponse)
    },

    deleteTeam(teamName) {
        const teamIndex = model.teams.findIndex((team) => team.name === teamName);

        if (teamIndex !== -1) {
            model.teams.splice(teamIndex, 1);
        } else {
            alert("Команда не знайдена");
        }
        saveModel();
    },

    getNexWord() {
        const randomIndex = Math.floor(Math.random() * aliasWords.length);
        const randomWord = aliasWords[randomIndex];
        usedWords.push(randomWord);
        aliasWords.splice(randomIndex, 1);
        saveModel();

        return randomWord;
    },
    chooseNextTeam() {
        const activeTeam = model.activeTeamIndex;
        if (activeTeam === null || activeTeam === undefined) {
            model.activeTeamIndex = 0;
            console.log(`початок гри, команда 1 [${model.activeTeamIndex}]`);
        } else if (activeTeam !== model.teams.length - 1) {
            model.activeTeamIndex++;
            console.log(`команда [${model.activeTeamIndex}]`);
        } else if (activeTeam !== null && activeTeam === model.teams.length - 1) {
            model.activeTeamIndex = 0;
            console.log(`з останньої на першу [${model.activeTeamIndex}]`);
        }
        model.activeTeamId = model.teams[model.activeTeamIndex].id;
        fetch(`http://localhost:3000/games/${model.roomId}/active-team-id/${model.activeTeamId}`, {method: 'PUT'})
            .then(saveResponse)

        saveModel();
    },
    getActiveTeam() {
        return model.teams[model.activeTeamIndex];
    },
    addGuess() {
        model.guessed++;
        saveModel();
    }
    ,
    addSkip() {
        model.skip++;
        saveModel();
    },
    calculateScore() {
        const activeTeam = this.getActiveTeam();
        console.log('activeTeam',activeTeam);
        const newScore = model.guessed - model.skip;
        activeTeam.score += newScore;
        console.log('activeTeam',activeTeam);

        let name = activeTeam.name;
        fetch(`http://localhost:3000/games/${model.roomId}/teams/${name}/score/${activeTeam.score}`, {method: 'PUT'})
            .then(saveResponse)
    },
    endRound() {
        this.calculateScore();
        model.skip = 0;
        model.guessed = 0;
        model.round++;
        this.chooseNextTeam();

        fetch(`http://localhost:3000/games/${model.roomId}/round/${model.round}`, {method: 'PUT'})
            .then(saveResponse)
        saveModel();
        window.location.href = '3-score-frame.html'

    },
    win() {
        let winMessage = document.querySelector("#win-message");
        const wordDisplay = document.querySelector("#current-word");
        let playerPosition = model.teams[model.activeTeamIndex].score + model.guessed - model.skip;

        if (playerPosition === scoreToWin) {
            winMessage.textContent = model.teams[model.activeTeamIndex].name + " WIN";
            wordDisplay.style.visibility = "hidden";
            winMessage.style.display = "block";

            model.teams[model.activeTeamIndex].isWinner = true;
            console.log(`Виграла команда: ${model.teams[model.activeTeamIndex].name}`);

            let winnerId = model.teams[model.activeTeamIndex].id;
            fetch(`http://localhost:3000/games/${model.roomId}/winner/${winnerId}`, {method: 'PUT'})
                .then(saveResponse)

            setTimeout(() => {
                console.log("Перехід до рейтингу  через 2 секунди");
                controller.endRound();
            }, 4000);
            saveModel();
        }
    }
}


