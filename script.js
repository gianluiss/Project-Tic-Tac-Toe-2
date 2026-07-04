const gameBoard = (() => {
    let size = 3

    let board = [];

    for(let i = 0; i < size; i++) {
        board[i] = [];

        for(let j = 0; j < size; j++) {
            board[i].push(createCell());
        }
    }

    const getBoard = () => board;

    const displayBoard = () => {
        /*
        console.log(`${board[0][0]} | ${board[0][1]} | ${board[0][2]}`);
        console.log(`${board[1][0]} | ${board[1][1]} | ${board[1][2]}`);
        console.log(`${board[2][0]} | ${board[2][1]} | ${board[2][2]}`);
        */
        /*
        for(let i = 0; i < board.length; i++) {
            console.log(`${board[i][0].getMarker()} | ${board[i][1].getMarker()} | ${board[i][2].getMarker()}`);
        }
        */

        for(const row of board) {
            console.log(`${row[0].getMarker()} | ${row[1].getMarker()} | ${row[2].getMarker()}`);
        }
    }

    // Make function to place a marker
    const placeMarker = (row, col, playerMarker) => {
        board[row][col].markCell(playerMarker);
    }

    // Check current position if occupied
    const isOccupied = (row, col) => (board[row][col] !== 0);

    // Win condition (Check if player won)
    const isWonStraight = (playerMarker) => {

        // Check horizontals
        let isWon = false;

        // Check if there's a matching row if none continue

        // if all cells in a row matches playerMarker hasMatchingRow = true;
        // else continue on to the next row
        let hasMatchingRow = false;
        for(const row of board) {

            let isMatching = true;
            for(const cell of row) {
                if(cell.getMarker() !== playerMarker) {
                    isMatching = false;
                    break;
                }
            }

            if(isMatching) {
                hasMatchingRow = true;
                break;
            }
        }
        // WRONG LOGIC CURRENT LOGIC DOES NOT CHECK ALL
        // NEED TO CHECK ALL BEFORE DECIDING TO BREAK

        return isWon;
    }

/*
function hasHorizontalWin(playerMarker) {
    let hasMatchingRow = false;
    for(const row of board) {

        let isMatching = true;
        for(const cell of row) {
            if(cell.getMarker() !== playerMarker) {
                isMatching = false;
                break;
            }
        }

        if(isMatching) {
            hasMatchingRow = true;
            break;
        }
    }

    return hasMatchingRow;
}
*/

    return {getBoard, displayBoard, placeMarker, isOccupied, isWonStraight};
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
            name: "Player One",
            marker: 1, // X
        },
        {
            name: "Player Two",
            marker: 2, // O
        }
    ]

    let activePlayer = players[0];

    const switchPlayerTurn = () => { 
        players[0] === activePlayer ? activePlayer = players[1] : activePlayer = players[0];
    }

    const getActivePlayer = () => activePlayer;

    const playNewRound = () => {
        board.displayBoard(); //Console debugging
        console.log(`Now it is ${activePlayer.name}'s turn...`);
    }

    // Will put a (row, column, player) parameter in the future, for now prompt
    const playRound = () => {

        const actualBoard = board.getBoard();

        let row = Number(prompt("Enter Row"));
        let col = Number(prompt("Enter Column"));

        while(actualBoard[row][col].getMarker() !== 0) {
            console.log((actualBoard[row][col].getMarker()));
            alert(`Please try again... Row: ${row} | Col: ${col} is occupied.`);
            row = Number(prompt("Enter Row"));
            col = Number(prompt("Enter Column"));
        }

        board.placeMarker(row, col, activePlayer.marker);

        // display current mark for debugging
        console.log(actualBoard[row][col].getMarker());        


        //board.displayBoard(); //console debugging

        // Check if player won
        if(board.isWonStraight(activePlayer.marker)) {
            console.log(`${activePlayer.name} has won!!!`);
            alert(`${activePlayer.name} has won!!!`);
        }

    }

    // MIGHT PUT WIN HANDLING FUNCTION HERE

    return {switchPlayerTurn, getActivePlayer, playNewRound, playRound};
})();

/*
console.log(gameController.getActivePlayer());
gameController.switchPlayerTurn();
console.log(gameController.getActivePlayer());
*/

while(true) {
    gameController.playNewRound();
    gameController.playRound();
    gameController.switchPlayerTurn();

    if(prompt("Continue [0] to exit") === '0') {
        break;
    };
}