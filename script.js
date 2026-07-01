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

    /* //For node outputs
    const displayBoard = () => {
        for(let i = 0; i < size; i++) {
            for(let j = 0; j < size; j++) {
                process.stdout.write( String(board[i][j].getMarker()) ); //uncomment if want to see console output
                //console.log(board[i][j].getMarker());
            }
            console.log();
        }
    }
    */

    const displayBoard = () => {
        /*
        console.log(`${board[0][0]} | ${board[0][1]} | ${board[0][2]}`);
        console.log(`${board[1][0]} | ${board[1][1]} | ${board[1][2]}`);
        console.log(`${board[2][0]} | ${board[2][1]} | ${board[2][2]}`);
        */

        for(let i = 0; i < 3; i++) {
            console.log(`${board[i][0].getMarker()} | ${board[i][1].getMarker()} | ${board[i][2].getMarker()}`);
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
        let isWon = true;

        for(let row = 0; row < board.size(); row++) {

            if(!isWon) break;

            for(let col = 0; col < board.size(); col++) {
                if(board[row][col] !== playerMarker) {
                    isWon = false;
                }
            }
        }

        return isWon;
    }

    return {getBoard, displayBoard, placeMarker, isOccupied, isWon};
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

    }

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