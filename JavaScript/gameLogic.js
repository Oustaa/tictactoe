let XTurn = true;
const cardS = document.querySelectorAll('.card');
// const playedCard = [false, false, false, false, false, false, false, false, false];

const players = [
    { name: "X", path: [], wins: 0, color: "var(--Xclr)" },
    { name: "O", path: [], wins: 0, color: "var(--Oclr)" }
];
let wins = { X: 0, ties: 0, O: 0 }
let ties = 0;
const winningPaths = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3],
    [1, 5, 9],
    [7, 5, 3]
];
let gameEnd = false;
let playCount = 0;
const results = document.querySelectorAll('.results');
const playerTurn = document.querySelector('.playerTurn');
let posibleMovse = [1, 2, 3, 4, 5, 6, 7, 8, 9];
setPlayerTurn();

function setImage(index) {
    if (!gameEnd) {
        if (cardS[index].dataset.isPlayed == "false") {
            playCount++;
            if (XTurn) {
                cardS[index].style.backgroundImage = "url(./Images/XImage.png)";
                players[0].path.push(index + 1);
                if (playCount >= 5) checkWinnner(players[0])
            } else {
                if (!playWithCPU) {
                    cardS[index].style.backgroundImage = "url(./Images/OImage.png)";
                    players[1].path.push(index + 1);
                    if (playCount >= 5) checkWinnner(players[1])
                }
            }
            XTurn = !XTurn;
            setPlayerTurn();
            cardS[index].dataset.isPlayed = "true";
            posibleMovse.splice(posibleMovse.indexOf(index + 1), 1);
        }
        if (playWithCPU && XTurn === false) {

        }
    }

    if (playCount === 9 && !gameEnd) {
        ties++;
        gameEnd = true;
        manageWining();
    }
}

function checkWinnner(player) {
    let checkCount = 0;
    for (i = 0; i < winningPaths.length; i++) {
        for (j = 0; j < winningPaths[i].length; j++) {
            for (p = 0; p < player.path.length; p++) {
                if (player.path[p] === winningPaths[i][j]) {
                    checkCount++;
                }
            }
        }
        if (checkCount < 3) {
            checkCount = 0;
        } else if (checkCount === 3) {
            break;
        }
    }
    if (checkCount >= 3) {
        gameEnd = true;
        player.wins++;
        manageWining();
        colorWiningPath(winningPaths[i], player)
    }
}

function manageWining() {
    results[0].innerHTML = "X: " + players[0].wins;
    results[1].innerHTML = "Ties: " + ties;
    results[2].innerHTML = "O: " + players[1].wins;
}

function replay() {
    if (gameEnd) {
        for (c = 0; c < cardS.length; c++) {
            cardS[c].dataset.isPlayed = "false";
            cardS[c].style.backgroundImage = "";
        }
        playCount = 0;
        gameEnd = false;
        players[0].path = [];
        players[1].path = [];
        posibleMovse = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        cardS.forEach(item => {
            item.style.backgroundColor = "var(--primary-clr-light)";
        })
    }
}

function setPlayerTurn() {
    if (XTurn) {
        playerTurn.textContent = "XTurn";
        playerTurn.style.color = "var(--Xclr)";
    } else {
        playerTurn.textContent = "OTurn";
        playerTurn.style.color = "var(--Oclr)";
    }
}

setInterval(() => {
    if (XTurn === false && playWithCPU && !gameEnd) {
        playCount++;
        let computerPlay;
        let checkComputerWin = checkComputeWin();
        let checkPlayerWins = checkPlayerWin();

        if (checkComputerWin === null) {
            if (checkPlayerWins === null) {
                computerPlay = randomChois(posibleMovse);
            } else {
                computerPlay = checkPlayerWins;
            }
        } else {
            computerPlay = checkComputerWin;
        }
        cardS[computerPlay - 1].dataset.isPlayed = "true";
        cardS[computerPlay - 1].style.backgroundImage = "url(./Images/OImage.png)";
        posibleMovse.splice(posibleMovse.indexOf(computerPlay), 1);
        players[1].path.push(computerPlay);

        if (playCount >= 5) checkWinnner(players[1])
        XTurn = !XTurn;

        if (playCount === 9 && !gameEnd) {
            ties++;
            gameEnd = true;
            manageWining();
        }
        setPlayerTurn();
    }
}, 100);

function checkPlayerWin() {
    let pointToPlay;
    let count = 0;
    for (var i = 0; i < winningPaths.length; i++) {
        for (var j = 0; j < winningPaths[i].length; j++) {
            if (players[0].path.indexOf(winningPaths[i][j]) !== -1) count++;
            if (count === 2) {
                pointToPlay = specialItem(players[0].path, winningPaths[i]);
                if (players[1].path.indexOf(pointToPlay) === -1) {
                    return pointToPlay;
                } else {
                    count = 0;
                    break;
                }
            }
        }
        count = 0;
    }
    return null;
}

function checkComputeWin() {
    let pointToPlay;
    let count = 0;
    if (posibleMovse.length === 1) {
        return posibleMovse[0];
    }
    for (var i = 0; i < winningPaths.length; i++) {
        for (var j = 0; j < winningPaths[i].length; j++) {
            if (players[1].path.indexOf(winningPaths[i][j]) !== -1) count++;
            if (count === 2) {
                pointToPlay = specialItem(players[1].path, winningPaths[i]);
                if (players[0].path.indexOf(pointToPlay) === -1) {
                    return pointToPlay;
                } else {
                    count = 0;
                    break;
                }
            }
        }
        count = 0;
    }
    return null;
}

function colorWiningPath(path, player) {
    for (i = 0; i < path.length; i++) {
        cardS[path[i] - 1].style.backgroundColor = player.color;
    }
}

function randomChois(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Helper Functions
Array.prototype.removItem = function(item) {
    if (this.indexOf(item) !== -1) {
        this.splice(this.indexOf(item), 1);
    }
}

function specialItem(playerpath, path) {
    for (i = 0; i < path.length; i++) {
        if (playerpath.indexOf(path[i]) === -1) {
            return path[i];
        }
    }
    return null;
}