
import puzzle from 'sudoku';

// Generates sudoku board
function generateSudoku() {
    const rawBoard = puzzle.makepuzzle();
    const formattedBoard = rawBoard.map((x) => x !== null ? x + 1 : null);

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
