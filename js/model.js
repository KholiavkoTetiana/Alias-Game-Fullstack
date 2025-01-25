export const model = {
    teams: [

    ]
}

export const modelExample = {
    teams: [
        {
            name: 'team1',
            score: 0
        },
        {
            name: 'team2',
            score: 0
        },
        {
            name: 'team3',
            score: 0
        },
    ],
    teamNames: [
        "файл",
        "абрикос",
        "миша",
        "павук",
        "слон",
        "тигр",
        "гепард",
        "крокодил",
        "ведмідь",
        "жаба",
        "змія"
    ]
}

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
// localStorage.getItem("model");
// '{"teams":[{"name":"team1","score":0},{"name":"team2","score":0},{"name":"team3","score":0}],"teamNames":["файл","абрикос","миша","павук","слон","тигр","гепард","крокодил","ведмідь","жаба","змія"]}'
// JSON.parse(localStorage.getItem("model"));
// {teams: Array(3), teamNames: Array(11)}teamNames: Array(11)0: "файл"1: "абрикос"2: "миша"3: "павук"4: "слон"5: "тигр"6: "гепард"7: "крокодил"8: "ведмідь"9: "жаба"10: "змія"length: 11[[Prototype]]: Array(0)teams: Array(3)0: {name: 'team1', score: 0}1: {name: 'team2', score: 0}2: {name: 'team3', score: 0}length: 3[[Prototype]]: Array(0)[[Prototype]]: Object
