export const BASEURL = `http://localhost:3000`;
// export const BASEURL = `https://alias-back.valadis.pp.ua`;



export let model = {
    roomId: 0,
    teams: [

    ],
    activeTeamIndex: null,
    round: 1,
    guessed: 0,
    skip: 0,
    winner: null,
    durationSeconds: 0,
}

export const modelExample = {
    teams: [
        {
            id: 29,
            name: 'team1',
            score: 5,
            isWinner: false,
        },
        {
            id: 43,
            name: 'team2',
            score: 7,
            isWinner: false,
        },

    ],
    active: 'team1',
    round: 5,
    guessed: 5,
    skip: 2,

}

export let aliasWords = [];

export const usedWords = [];

export async function getWords(numOfWords){
    return await fetch(`${BASEURL}/get_words/${numOfWords}`, { method: 'get' })
                .then(async res => await res.json())
}

export function readStorage(){
    try {
        const savedData = JSON.parse(localStorage.getItem("room"));
        // const savedData = modelExample;

        if (savedData) {
            model = savedData;
        }else {
            console.log("Дані відсутні у localStorage.");
        }
    }catch (error){
        console.error("не можу дістати данні");
    }

}

export function saveModel(){
    localStorage.setItem("room", JSON.stringify(model));
    console.log(JSON.stringify(model));
}

readStorage();

