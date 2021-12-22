// Finds selected cells
const findSelectedCells = (board, val) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board.rows[i].cols[j].value === val) {
                board.rows[i].cols[j].isSelected = true;
            }
        }
    }
};

export default findSelectedCells;
