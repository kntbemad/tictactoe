const gameBoard = (function () {
    const board = [[".", ".", "."], [".", ".", "."], [".", ".", "."]];

    // build board on html page
    const divBoard = document.getElementById("board");

    const boardRows = [document.createElement("div"), document.createElement("div"), document.createElement("div")];

    for (i = 0; i < 3; i++) {
        boardRows[i].classList.add("boardrow");
        for (j = 0; j < 3; j++) {
            let square = document.createElement("button");
            square.textContent = board[i][j];
            square.id = "square" + i + j
            square.classList.add("squarebtn");
            square.addEventListener("click", e => {
                
            });
            boardRows[i].appendChild(square);
        }
        divBoard.appendChild(boardRows[i]);
    }
    // update function

    const update = () => {
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                let square = document.getElementById("square" + i + j);
                console.log("WHWHW" + square.value);
                square.textContent = board[i][j];
            }
        }
    };


    return { board, update };
})();

function createPlayer(number, type) {
    if (type != "X" && type != "O") {
        console.log("player type error");
        return;
    }
    if (number > 2 || number < 1) {
        console.log("pnum error");
        return;
    }
    return { number, type };
}


const gameController = (function () {
    let gameWon = false;

    const printBoard = (a) => {
        for (i = 0; i < 3; i++) {
            console.log(a[i][0] + "|" +
                a[i][1] + "|" +
                a[i][2]
            );
        }
    };

    const playTurn = (gboard, a, b, player) => {
        if (a > 2 || a < 0 || b > 2 || b < 0) {
            console.log("invalid move try again");
            return;
        }
        if (gboard[a][b] === "X" || gboard[a][b] === "O") {
            console.log("that square is already taken");
            return;
        }
        gboard[a][b] = player.type;

        //check row
        let wonGame = true;
        for (i = 0; i < 3; i++) {
            if (gboard[i][b] !== player.type) {
                wonGame = false;
            }
        }
        if (wonGame) {
            console.log(player.number + " has won the game!");
            gameWon = true;
            return;
        }
        //check column
        wonGame = true;
        for (i = 0; i < 3; i++) {
            if (gboard[a][i] !== player.type) {
                wonGame = false;
            }
        }
        if (wonGame) {
            console.log(player.number + " has won the game!");
            gameWon = true;
            return;
        }
        //check diag
        wonGame = true;
        for (i = 0; i < 3; i++) {
            if (gboard[i][i] !== player.type) {
                wonGame = false;
            }
        }
        if (wonGame) {
            console.log(player.number + " has won the game!");
            gameWon = true;
            return;
        }
        //check other diag
        wonGame = true;
        for (i = 0; i < 3; i++) {
            if (gboard[i][2 - i] !== player.type) {
                wonGame = false;
            }
        }
        if (wonGame) {
            console.log(player.number + " has won the game!");
            gameWon = true;
            return;
        }
    }

    const playGame = (gBoard) => {
        const player1 = createPlayer(1, "X");
        const player2 = createPlayer(2, "O");

        //gameloop
        let count = 0;
        while (!gameWon) {

            gBoard.update();
            printBoard(gBoard.board);
            playTurn(gBoard.board, 0, 2, player1);
            playTurn(gBoard.board, 1, 1, player1);
            playTurn(gBoard.board, 2, 0, player1);

            if (count > 20) {
                gameWon = true;
                return;
            }
            count++;
            gBoard.update();
        }

    }

    return { playGame };
})();

gameController.playGame(gameBoard);