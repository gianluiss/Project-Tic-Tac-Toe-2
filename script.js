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
        for(let i = 0; i < size; i++) {
            for(let j = 0; j < size; j++) {
                process.stdout.write( String(board[i][j].getMarker()) );
                //console.log(board[i][j].getMarker());
            }
            console.log();
        }
    }

    // Make function to place a marker
    const placeMarker = (row, col, playerMarker) => {
        board[row][col].markCell(playerMarker);
    }

    return {getBoard, displayBoard, placeMarker};
})();

//gameBoard.placeMarker(2,1, 1);
//console.log(gameBoard.getBoard());
//gameBoard.displayBoard();

/*
for(let i = 0; i < 5; i++) {
    for(let j = 0; j < 5; j++) {
        process.stdout.write('*');
    }
    console.log();
}
*/


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
const cell = createCell();

console.log(cell.getMarker());
*/

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
        board.displayBoard();
        console.log(`Now it is ${activePlayer}'s turn...`);
    }

    // Will put a (row, column, player) parameter in the future, for now prompt
    const playRound = () => {
        let row = prompt("Enter Row");
        let col = prompt("Enter Column");

        // Make a checker if current position is occupied

        board.placeMarker(row, col, activePlayer.marker);

        // Check if player won
    }

    return {switchPlayerTurn, getActivePlayer};
})();

/*
console.log(gameController.getActivePlayer());
gameController.switchPlayerTurn();
console.log(gameController.getActivePlayer());
*/