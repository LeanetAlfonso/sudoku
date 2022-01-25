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

// Checks whether a specific box is valid
const isBoxValid = (board, x0, y0) => {
    let dict = {};

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let key = board.rows[x0 + i].cols[y0 + j].value;

            if (key === null) continue;

            if (Object.hasOwnProperty.call(dict, key)) {
                dict[key] += 1;
                if (dict[key] > 1) {
                    return false;
                }
            } else dict[key] = 1;
        }
    }
    return true;
};

// Gets invalid boxes
const getInvalidBoxes = (board) => {
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
        if (!isBoxValid(board, x0, y0)) {
            invalidBoxes.add(box);
        }
    }

    return invalidBoxes;
};

// Gets box number
const getBoxNumber = (x, y) => {
    let x0 = Math.floor(x / 3);
    let y0 = Math.floor(y / 3);
    return [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
    ][x0][y0];
};


// Sets cells invalid according to invalid rows/cols/boxes
const checkBoard = (board) => {

    let invalidRow = getInvalidLines(board, "row");
    let invalidCol = getInvalidLines(board, "col");
    let invalidBoxes = getInvalidBoxes(board);

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
