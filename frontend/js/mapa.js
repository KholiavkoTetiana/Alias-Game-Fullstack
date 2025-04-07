import {model} from "./model.js";

export function placePlayer(xPosition, yPosition, player){
    const field = document.querySelector("#game-map");

    const x = field.clientWidth * xPosition;
    const y = field.clientHeight * yPosition;

    player.style.right = `${x}px`;
    player.style.top = `${y}px`;

    console.log("функція");
    console.log(x, y)

}

function createPlayer(index){
    const img = document.createElement("img");
    const boardDiv = document.querySelector("#board");
    img.id = "player" + index ;
    img.src = `../players/${index}.png`; // назва з індексом
    img.classList.add("player");

    img.style.transform = `translateX(${10 * index}px)`;
    boardDiv.appendChild(img);

    let playerPosition = model.teams[index].score;
    let coords = map[playerPosition];
    placePlayer(coords.x, coords.y, img);

    return img;
}
export const players = {};

export function initPlayers() {
    model.teams.forEach((team, index) => {
        players[team.name] = createPlayer(index);
        console.log(`створюємо ${index} гравця ${players[team.name]}`)
    });

}

//
// placePlayer(.78, .24);
// placePlayer(.78, .28);
// placePlayer(.78, .35);

export const map = {
    0:{x: .76, y: .03},
    1:{x: .76, y: .12},
    2:{x: .76, y: .20},
    3:{x: .76, y: .26},
    4:{x: .68, y: .26},
    5:{x: .59, y: .26},
    6:{x: .59, y: .32},
    7:{x: .59, y: .39},
    8:{x: .68, y: .39},
    9:{x: .76, y: .39},
    10:{x: .76, y: .45},
    11:{x: .76, y: .50},
    12:{x: .69, y: .51},
    13:{x: .61, y: .51},
    14:{x: .52, y: .51},
    15:{x: .44, y: .51},
    16:{x: .36, y: .51},
    17:{x: .36, y: .57},
    18:{x: .36, y: .64},
    19:{x: .44, y: .64},
    20:{x: .52, y: .64},
    21:{x: .59, y: .64},
    22:{x: .67, y: .64},
    23:{x: .76, y: .64},
    24:{x: .76, y: .70},

    25:{x: .76, y: .76},
    26:{x: .67, y: .76},
    27:{x: .60, y: .76},
    28:{x: .52, y: .76},
    29:{x: .44, y: .76},
    30:{x: .35, y: .76},

    31:{x: .26, y: .76},
    32:{x: .26, y: .70},
    33:{x: .26, y: .64},
    34:{x: .26, y: .57},
    35:{x: .26, y: .51},

    36:{x: .26, y: .45},
    37:{x: .32, y: .45},
    38:{x: .38, y: .45},

    39:{x: .48, y: .45},
    40:{x: .48, y: .39},
    41:{x: .48, y: .33},

    42:{x: .40, y: .33},
    43:{x: .31, y: .33},

    44:{x: .31, y: .28},
    45:{x: .31, y: .20},

    46:{x: .23, y: .20},
    47:{x: .15, y: .20},

    48:{x: .15, y: .27},
    49:{x: .15, y: .34},
    50:{x: .15, y: .40},
    51:{x: .15, y: .48},
    52:{x: .15, y: .55},
    53:{x: .15, y: .62},
    54:{x: .15, y: .70},
    55:{x: .15, y: .77},
    56:{x: .15, y: .84},

    57:{x: .22, y: .84},
    58:{x: .30, y: .84},
    59:{x: .36, y: .84},
    60:{x: .46, y: .84},



}
//
// async function sleep(ms){
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
//
// async function walkPlayer(){
//     for(let i = 1; i <= Object.keys(map).length; i++){
//         let coords= map[i];
//         console.log(`розміщуємо гравця на ${i} (${coords.x}, ${coords.y})`);
//         placePlayer(coords.x, coords.y, );
//         await sleep(1000);
//     }
// }
// window.onload = () => walkPlayer();
