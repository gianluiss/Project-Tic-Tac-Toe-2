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
    const placeMarker = (row, col, player) => {
        board[row][col].markCell(player);
    }

    return {getBoard, displayBoard, placeMarker};
})();

gameBoard.placeMarker(2,1, 1);
//console.log(gameBoard.getBoard());
gameBoard.displayBoard();

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
