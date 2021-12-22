// Clears selected cells
const clearSelectedCells = (board) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board.rows[i].cols[j].isSelected === true) {
                board.rows[i].cols[j].isSelected = false;
            }
        }
    }
};

export default clearSelectedCells;
