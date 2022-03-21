
import puzzle from 'sudoku';

// Generates sudoku board
function generateSudoku(fill) {

    // generate random sudoku board 
    const rawBoard = puzzle.makepuzzle();

    // solve sudoku board 
    const solution = puzzle.solvepuzzle(rawBoard);

    // format sudoku board (values 1-9)
    const formattedBoard = rawBoard.map((x) => x !== null ? x + 1 : null);

    // format sudoku solution (values 1-9)
    const formattedSolution = solution.map((x) => x !== null ? x + 1 : null);

    // fill empty cells according to mode  
    while (fill > 0) {
        let random = Math.floor(Math.random() * 81);
        if (formattedBoard[random] === null) {
            formattedBoard[random] = formattedSolution[random];
            fill = fill - 1;
        }
    }

    const finalBoard = {
        rows: []
    };

    for (let i = 0; i < 9; i++) {

        const row = { cols: [], index: i };

        for (let j = 0; j < 9; j++) {
            const value = formattedBoard[i * 9 + j];
            const col = {
                row: i,
                col: j,
                value: value,
                readOnly: value !== null,
                isInvalid: false
            };
            row.cols.push(col);
        }
        finalBoard.rows.push(row);
    }
    return finalBoard;
}

export default generateSudoku;
