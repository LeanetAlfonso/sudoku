
import puzzle from 'sudoku';
import { Buffer } from 'buffer';

// Generate sudoku board
export function generateSudoku(fill) {
    // console.log("inside generate");

    // sudoku board from url
    const fromURL = getURLdata();
    if (fromURL) {
        return fromURL.rawBoard; // already formatted
    }

    // generate random sudoku board if no url data
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

    return formattedBoard;
}


// convert sudoku board from 1D to 2D array (from arr[81] to arr[9][9])
export function convertBoard(rawBoard) {
    // console.log("inside convert");

    const finalBoard = {
        rows: []
    };

    for (let i = 0; i < 9; i++) {

        const row = { cols: [], index: i };

        for (let j = 0; j < 9; j++) {
            const value = rawBoard[i * 9 + j];
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


// Generate url using game data
export function generateURL(rawBoard, time, moves, mode) {
    // console.log("inside generate url");
    const data = {
        rawBoard: rawBoard,
        time: time,
        moves: moves,
        mode: mode
    };
    const query = Buffer.from(JSON.stringify(data)).toString('base64');
    return window.location.href.replace(/\?.+$/, "") + `?sudoku=${query.replace(/=/, "")}`;
}


// Obtain data from url
export function getURLdata() {
    // console.log("inside get url data");
    const match = window.location.href.match(/sudoku=([^&]+)/);
    if (match) {
        return JSON.parse(Buffer.from(match[1], 'base64'));
    }
    return null;
}
