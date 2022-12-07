// Checks if board is empty (contains all null values)
const isUndefined = (board) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board.rows[i].cols[j].value === undefined) {
                return true;
            }
        }
    }
    return false;
};

// Checks if cell is valid
const isValidCell = (row, col, value, board) => {

    // checks horizontal lines
    for (let i = 0; i < 9; i++) {
        if (board.rows[row].cols[i].value === value) return false;
    }

    // checks vertical lines
    for (let i = 0; i < 9; i++) {
        if (board.rows[i].cols[col].value === value) return false;
    }

    // checks boxes (diagonal only)
    let box_x = Math.floor(row / 3) * 3;
    let box_y = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board.rows[box_x + i].cols[box_y + j].value === value) return false;
        }
    }

    return true;
};


// Solves sudoku board using backtracking 
const solveSudoku = (board) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board.rows[i].cols[j].value === null) {
                for (let k = 1; k <= 9; k++) {
                    if (isValidCell(i, j, k, board)) {
                        board.rows[i].cols[j].value = k;
                        if (solveSudoku(board)) return true;
                        board.rows[i].cols[j].value = null;
                    }
                }
                return false;
            }
        }
    }
    return !isUndefined(board);
};

export default solveSudoku;
