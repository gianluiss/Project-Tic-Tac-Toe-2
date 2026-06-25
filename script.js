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