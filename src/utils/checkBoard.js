import getBoxNumber from "./getBoxNumber";

// Gets invalid lines (invalid rows and/or columns)
const getInvalidLines = (board, type) => {
    let invalidLines = new Set();

    for (let i = 0; i < 9; i++) {
        let dict = {};

        for (let j = 0; j < 9; j++) {
            let key;
            if (type === "row") key = board.rows[i].cols[j].value;
            else key = board.rows[j].cols[i].value;

            if (key === null) continue;

            if (Object.hasOwnProperty.call(dict, key)) {
                dict[key] += 1;
                if (dict[key] > 1) {
                    invalidLines.add(i);
                    break;
                }
            } else dict[key] = 1;
        }
    }
    return invalidLines;
};

// Checks whether a specific entry causes box to not be valid
const isBoxValid = (board, x0, y0, r, c) => {
    let dict = {};

    // store value counts
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let key = board.rows[x0 + i].cols[y0 + j].value;

            if (key === null) continue;

            if (Object.hasOwnProperty.call(dict, key)) {
                dict[key] += 1;
            } else {
                dict[key] = 1;
            };
        }
    }

    // set cell with duplicated values as invalid value
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let key = board.rows[x0 + i].cols[y0 + j].value;

            if (key === null) {
                board.rows[x0 + i].cols[y0 + j].isInvalidValue = false;
            };

            if (dict[key] > 1) {
                board.rows[x0 + i].cols[y0 + j].isInvalidValue = true;
                if (((x0 + i) === r) && ((y0 + j) === c)) {
                    board.rows[x0 + i].cols[y0 + j].isInvalidValueCause = true;
                }
            }
            else {
                board.rows[x0 + i].cols[y0 + j].isInvalidValue = false;
                board.rows[x0 + i].cols[y0 + j].isInvalidValueCause = false;
            }
        }
    }

    // set box invalid if at least one cell has an invalid value
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let key = board.rows[x0 + i].cols[y0 + j].value;

            if (key === null) continue;

            if (dict[key] > 1) {
                return false;
            }
        }
    }
    return true;
};

// Gets invalid boxes
const getInvalidBoxes = (board, r, c) => {
    let invalidBoxes = new Set();
    let boxValues = {
        0: { x: 0, y: 0 },
        1: { x: 0, y: 3 },
        2: { x: 0, y: 6 },
        3: { x: 3, y: 0 },
        4: { x: 3, y: 3 },
        5: { x: 3, y: 6 },
        6: { x: 6, y: 0 },
        7: { x: 6, y: 3 },
        8: { x: 6, y: 6 },
    };

    // checks all boxes
    for (let box = 0; box < 9; box++) {
        // checks all cells of box
        let x0 = boxValues[box].x;
        let y0 = boxValues[box].y;

        // adds all invalid boxes to invalidBoxes set
        if (!isBoxValid(board, x0, y0, r, c)) {
            invalidBoxes.add(box);
        }
    }

    return invalidBoxes;
};


// Sets cells invalid according to invalid rows/cols/boxes
const checkBoard = (board, newValue, r, c) => {
    let invalidRow = getInvalidLines(board, "row");
    let invalidCol = getInvalidLines(board, "col");
    let invalidBoxes = getInvalidBoxes(board, r, c);

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (invalidRow.has(i) || invalidCol.has(j) || invalidBoxes.has(getBoxNumber(i, j))) {
                board.rows[i].cols[j].isInvalid = true;
            }
            else {
                board.rows[i].cols[j].isInvalid = false;
            }
        }
    }
    return (invalidRow, invalidCol, invalidBoxes);
};

export default checkBoard;
