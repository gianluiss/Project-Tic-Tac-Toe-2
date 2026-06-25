const gameBoard = (() => {
    let size = 3

    let board = [];

    for(let i = 0; i < size; i++) {
        board[i] = [];

        for(let j = 0; j < size; j++) {
            board[i].push("");
        }
    }

    const getBoard = () => board;

    return {getBoard};
})();

/*
for(let i = 0; i < 5; i++) {
    for(let j = 0; j < 5; j++) {
        process.stdout.write('*');
    }
    console.log();
}
*/

console.log(gameBoard.getBoard());

function createCell() {
    let value = 0;

    const getValue = () => value;
    const markCell = (playerMarker) => {
        value = playerMarker; //will be 1 or 2 for now instead of 'X' & 'O'
        //might change playerMarker to 'player'
    }

    return {getValue, markCell};
}

const cell = createCell();

console.log(cell.getValue());
cell.markCell(2);
console.log(cell.getValue());