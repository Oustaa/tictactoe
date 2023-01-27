const home = document.querySelector('.home');
const playArea = document.querySelector('.playArea');
let playWithCPU = false;
playArea.style.display = "none";
let playersName;

let start = true;
const helper = ["X", "O"];

function startTheGame() {
    playArea.style.display = "flex";
    home.style.display = "none";
    // playersName = document.playersNames.playerName.value;
    // console.log(playersName);
    // for (i = 0; i < playersName.length; i++) {
    //     playersName[i].value = (playersName[i] = "") ? helper[i] : playersName[i].value;
    //     console.log(playersName[i]);
    // }
}

function exitGame() {
    home.style.display = "block";
    playArea.style.display = "none";
}

function playWithComputer() {
    playWithCPU = true;
    playArea.style.display = "flex";
    home.style.display = "none";
    playWithCPU = true;
}