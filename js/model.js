export let model = {
    teams: [

    ],
    activeTeamIndex: null,
    round: 0,
    guessed: 0,
    skip: 0,

}

export const modelExample = {
    teams: [
        {
            name: 'team1',
            score: 5
        },
        {
            name: 'team2',
            score: 7
        },

    ],
    active: 'team1',
    round: 5,
    guessed: 5,
    skip: 2,

}

export const aliasWords = [
    "сонце", "місяць", "зоря", "веселка", "хмара",
    "вода", "океан", "гору", "ліс", "пустеля",
    "машина", "літак", "потяг", "велосипед", "човен",
    "книга", "зошит", "олівець", "ручка", "гумка",
    "птах", "рибка", "слон", "жираф", "тигр",
    "музика", "піаніно", "гітара", "барабан", "скрипка",
    "друг", "сім'я", "школа", "учень", "вчитель",
    "комп'ютер", "телефон", "екран", "клавіатура", "інтернет",
    "яблуко", "банан", "вишня", "кавун", "груша",
    "спорт", "футбол", "баскетбол", "теніс", "шахи"
];

export const usedWords = [

];

export function readStorage(){
    try {
        const savedData = JSON.parse(localStorage.getItem("model"));
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
    localStorage.setItem("model", JSON.stringify(model));
    console.log(JSON.stringify(model));
}

readStorage();


//

//
// 192Chrome is moving towards a new experience that allows users to choose to browse without third-party cookies.Проаналізувати це попередженняAI
// let mod = J
// VM1329:1 Uncaught ReferenceError: J is not defined
// at <anonymous>:1:11
// (анонімно) @ VM1329:1Проаналізувати цю помилкуAI
// let mod = JSON.stringify({
//     teams: [
//         {
//             name: 'team1',
//             score: 0
//         },
//         {
//             name: 'team2',
//             score: 0
//         },
//         {
//             name: 'team3',
//             score: 0
//         },
//     ],
//     teamNames: [
//         "файл",
//         "абрикос",
//         "миша",
//         "павук",
//         "слон",
//         "тигр",
//         "гепард",
//         "крокодил",
//         "ведмідь",
//         "жаба",
//         "змія"
//     ]
//
// });
// undefined
// mod
// '{"teams":[{"name":"team1","score":0},{"name":"team2","score":0},{"name":"team3","score":0}],"teamNames":["файл","абрикос","миша","павук","слон","тигр","гепард","крокодил","ведмідь","жаба","змія"]}'
// localStorage.setItem("model", mod);
// undefined
// // localStorage.getItem("model");
// // '{"teams":[{"name":"team1","score":0},{"name":"team2","score":0},{"name":"team3","score":0}],"teamNames":["файл","абрикос","миша","павук","слон","тигр","гепард","крокодил","ведмідь","жаба","змія"]}'
// {teams: Array(3), teamNames: Array(11)}teamNames: Array(11)0: "файл"1: "абрикос"2: "миша"3: "павук"4: "слон"5: "тигр"6: "гепард"7: "крокодил"8: "ведмідь"9: "жаба"10: "змія"length: 11[[Prototype]]: Array(0)teams: Array(3)0: {name: 'team1', score: 0}1: {name: 'team2', score: 0}2: {name: 'team3', score: 0}length: 3[[Prototype]]: Array(0)[[Prototype]]: Object
// JSON.parse(localStorage.getItem("model"));
