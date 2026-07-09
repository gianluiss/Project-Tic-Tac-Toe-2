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

    return {getBoard, displayBoard, placeMarker, isOccupied};
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
        //console.log(actualBoard[row][col].getMarker());        
        //board.displayBoard(); //console debugging

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

    hasMatchingDiagonal = () => {

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

    return {switchPlayerTurn, getActivePlayer, playNewRound, playRound, hasMatches};
})();

/*
while(true) {
    let playerMarker = gameController.getActivePlayer().marker

    gameController.playNewRound();
    gameController.playRound();

    if(gameController.hasMatches()) {
        console.log(`${playerMarker} has won!!!`);
        gameBoard.displayBoard();
        alert(`${playerMarker} has won!!!`);
        break;
    };

    //gameController.switchPlayerTurn();

    /*
    if(prompt("Continue [0] to exit") === '0') {
        break;
    };
    */
//}

// gameController
// gameBoard

// Event for placing marker
const grid = document.querySelector(".grid-container");

grid.addEventListener('click', (e) => {
    const target = e.target.closest(".box");

    console.log(target.dataset.row, target.dataset.col);

    //console.log(target.dataset.marker);

    console.log(target.dataset.marker === "");

    if(target.dataset.marker === "") {
        const img = document.createElement("img");
        
        //img.src = "./cross-svgrepo-com.svg"; //for x
        img.src =  "./shape-oval-svgrepo-com.svg"//for o

        target.append(img);
        target.dataset.marker = "1";
    }
});