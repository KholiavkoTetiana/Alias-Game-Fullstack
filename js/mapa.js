export function placePlayer(xPosition, yPosition, player){
    const field = document.querySelector("#game-map");

    const x = field.clientWidth * xPosition;
    const y = field.clientHeight * yPosition;

    player.style.right = `${x}px`;
    player.style.top = `${y}px`;

    console.log("функція");
    console.log(x, y)

}
//
// placePlayer(.78, .24);
// placePlayer(.78, .28);
// placePlayer(.78, .35);

export const map = {
    0:{x: .80, y: .15},
    1:{x: .78, y: .24},
    2:{x: .78, y: .30},
    3:{x: .78, y: .35},
    4:{x: .70, y: .35},
    5:{x: .62, y: .35},
    6:{x: .62, y: .41},
    7:{x: .62, y: .47},
    8:{x: .70, y: .47},
    9:{x: .78, y: .47},
    10:{x: .78, y: .53},
    11:{x: .78, y: .60},
    12:{x: .72, y: .60},
    13:{x: .64, y: .60},
    14:{x: .56, y: .60},
    15:{x: .50, y: .60},
    16:{x: .42, y: .60},


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
//         placePlayer(coords.x, coords.y);
//         await sleep(1000);
//     }
// }
//
// window.onload = () => walkPlayer();
