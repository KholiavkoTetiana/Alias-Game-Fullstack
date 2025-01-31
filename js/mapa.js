function placePlayer(xPosition, yPosition){
    const field = document.querySelector("#game-map");
    const player = document.querySelector("#player");

    const x = field.clientWidth * xPosition;
    const y = field.clientHeight * yPosition;

    player.style.right = `${x}px`;
    player.style.top = `${y}px`;

    console.log("функція");
    console.log(x, y);

}
//
// placePlayer(.78, .24);
// placePlayer(.78, .28);
// placePlayer(.78, .35);

const map = {
    1:{x: .78, y: .24},
    2:{x: .78, y: .28},
    3:{x: .78, y: .35},

}

async function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function walkPlayer(){
    for(let i = 1; i <= Object.keys(map).length; i++){
        let coorder= map
    }
}