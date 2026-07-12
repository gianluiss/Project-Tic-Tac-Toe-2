const gameBoard = (() => {
    let size = 3

    let board = createBoard();

    function createBoard() {
        const tempBoard = [];
        for(let i = 0; i < size; i++) {
            tempBoard[i] = [];

            for(let j = 0; j < size; j++) {
                tempBoard[i].push(createCell());
            }
        }
        return tempBoard;
    }

    const resetBoard = () => {
        board = createBoard();
    }

    const getBoard = () => board;

    const displayBoard = () => {
        board.forEach(row => {
            console.log(`${row[0].getMarker()} | ${row[1].getMarker()} | ${row[2].getMarker()}`);
        });
    }

    // Make function to place a marker
    const placeMarker = (row, col, playerMarker) => {
        board[row][col].markCell(playerMarker);
    }

    // Check current position if occupied
    const isOccupied = (row, col) => (board[row][col] !== 0);

    return {getBoard, displayBoard, placeMarker, isOccupied, resetBoard};
})();

function createCell() {
    let marker = 0;

    const getMarker = () => marker;
    const markCell = (playerMarker) => {
        marker = playerMarker; //will be 1 or 2 for now instead of 'X' & 'O'
        //might change playerMarker to 'player'
    }

    return {getMarker, markCell};
}

/*
 ** The gameController will be responsible for controlling the
 ** flow and state of the game's turns, as well as whether
 ** anybody has won the game
*/

const gameController = (() => {

    const board = gameBoard;

    const players = [
        {
            name: "Player One", // default name
            label: "Player One",
            marker: 1, // X
        },
        {
            name: "Player Two",
            label: "Player Two",
            marker: 2, // O
        }
    ]

    let activePlayer = players[0];
    let gameOver = false;

    const isGameOver = () => gameOver;
    const toggleGameOver = () => {
        gameOver = gameOver ? false : true;
    }

    const switchPlayerTurn = () => { 
        players[0] === activePlayer ? activePlayer = players[1] : activePlayer = players[0];
    }

    const getActivePlayer = () => activePlayer;

    // For console debugging
    const playNewRound = () => {
        board.displayBoard(); //Console debugging
        console.log(`Now it is ${activePlayer.label}'s turn...`);
    }

    const playRound = (row, col) => {
        board.placeMarker(row, col, activePlayer.marker);
    }

    // WIN HANDLING
    const hasMatches = () => (hasMatchingRow() || hasMatchingCol() || hasMatchingDiagonal());

    const hasMatchingRow = () => {
        // Check if there's a matching row if none continue
        // if all cells in a row matches playerMarker hasMatchingRow = true;
        // else continue on to the next row

        // Checks horizontal matches
        for(const row of gameBoard.getBoard()) {

            let isMatching = true;

            for(const cell of row) {
                if(cell.getMarker() !== activePlayer.marker) {
                    isMatching = false;
                    break;
                }
            }

            if(isMatching) {
                return true;
            }
        }
        return false;
    }

    const hasMatchingCol = () => {
        let board = gameBoard.getBoard();

        for(let col = 0; col < board.length; col++) {
            
            let isMatching = true;

            for(let row = 0; row < board.length; row++) {
                if(board[row][col].getMarker() !== activePlayer.marker) {
                    isMatching = false;
                    break;
                }
            }

            if(isMatching) {
                return true;
            }
        }
        return false;
    }

    const hasMatchingDiagonal = () => {
        let board = gameBoard.getBoard();

        // Check if center is occupied
        let midIndex = Math.floor(board.length / 2);
        if(board[midIndex][midIndex].getMarker() === 0) {
            return false;
        }

        let hasLeftToRightMatch = true;
        let hasRightToLeftMatch = true;

        for(let i = 0; i < board.length; i++) {
            if(board[i][i].getMarker() !== activePlayer.marker) {
                hasLeftToRightMatch = false;
            }
            
            if(board[i][(board.length-1) - i].getMarker() !== activePlayer.marker) {
                hasRightToLeftMatch = false;
            }
        }

        return (hasLeftToRightMatch || hasRightToLeftMatch);
    }

    const reset = () => {
        board.resetBoard();
    }

    return {switchPlayerTurn, getActivePlayer, playNewRound, playRound, hasMatches, isGameOver, toggleGameOver, reset};
})();

// Event for placing marker
const grid = document.querySelector(".grid-container");

grid.addEventListener('click', (e) => {
    if(gameController.isGameOver()) {
        return;
    }

    const target = e.target.closest(".box");
    if(!target) return;
    let playerMarker = gameController.getActivePlayer().marker;

    if(target.dataset.marker === "") {
        const img = document.createElement("img");
        
        if(playerMarker === 1) {
            img.src = "./cross-svgrepo-com.svg"
            target.dataset.marker = "1";
        }
        else {
            img.src = "./shape-oval-svgrepo-com.svg"
            target.dataset.marker = "2";
        }

        target.append(img);

        const row = Number(target.dataset.row);
        const col = Number(target.dataset.col);

        gameController.playRound(row, col);

        //Win handling
        if(gameController.hasMatches()) {
            //console.log(`${gameController.getActivePlayer().label} has won!`);
            gameController.toggleGameOver();
            addWinIndicator();
            return;
        }

        gameController.switchPlayerTurn();
        changePlayerTurnUI();
        //gameBoard.displayBoard();
    }
});

function addWinIndicator() {
    const indicator = document.createElement("div");
    indicator.classList.add("win-indicator");

    if(gameController.getActivePlayer().label === "Player One") {
        indicator.textContent = "Game Over! Player One has Won!!!";
    }
    else {
        indicator.textContent = "Game Over! Player Two has Won!!!";
    }

    const main = document.querySelector("main");
    main.appendChild(indicator);
}

// Player turn visibility
function changePlayerTurnUI() {
    const player1Span = document.querySelector(".player1-span");
    const player2Span = document.querySelector(".player2-span");

    if(gameController.getActivePlayer().label === "Player One") {
        player2Span.classList.remove("player-turn");
        player1Span.classList.add("player-turn");
    }
    else {
        player1Span.classList.remove("player-turn"); player2Span.classList.add("player-turn");
    }
}