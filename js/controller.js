// Alias controller API

import {model} from "./model.js"


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
        if(model.teams.some(team => team.name === newInputName)){
            alert("Команда з такою назвою вже існує.");
            return;
        }

        model.teams.push({name: newInputName, score: 0});
        localStorage.setItem("model", JSON.stringify(model));

    },

    deleteTeam(teamName) {
        const teamIndex = model.teams.findIndex((team) => team.name === teamName);

        if (teamIndex !== -1) {
            model.teams.splice(teamIndex, 1);
        } else {
            alert("Команда не знайдена");
        }
        localStorage.setItem("model", JSON.stringify(model));
    }


}


