// Alias controller API

import {aliasWords, model, saveModel, usedWords} from "./model.js"


export const controller = {
    ///// Game state /////
    state: {
        // Teams, players, and scores
        // Cards which were played, cards available
        // Game state as a state machine
    },

    ///// API functions /////
    // Start setup
    // Add team
    // Start round

    // Play card
    // Skip active card
    // Correct guess

    // End round (timeout)
    // ... (more)

    removeStartMessage() {
        console.log("removeStartMessage called");
    },


    addTeam(newInputName) {

        if (model.teams.length >= 5) {
            alert("Максимальна кількість команд — 5.");
            return;
        }
        if (model.teams.some(team => team.name === newInputName)) {
            alert("Команда з такою назвою вже існує.");
            return;
        }

        model.teams.push({name: newInputName, score: 0});
        saveModel();
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
        }
        if (activeTeam !== null && activeTeam !== model.teams.length - 1) {
            model.activeTeamIndex++;
            console.log(`команда [${model.activeTeamIndex}]`);
        }
        if (activeTeam !== null && activeTeam === model.teams.length - 1) {
            model.activeTeamIndex = 0;
            console.log(`з останньої на першу [${model.activeTeamIndex}]`);
        }
        saveModel();
    },
    getActiveTeam() {
        return model.teams[model.activeTeamIndex];
    }
    ,
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
        this.getActiveTeam().score = model.guessed - model.skip;
    }
}


// const arry = ["1", "2", "3"];
// arry.splice(1, 1);
// console.log(arry);