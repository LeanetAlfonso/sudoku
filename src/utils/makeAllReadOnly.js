// Checks if player won
const makeAllReadOnly = (board) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (!board.rows[i].cols[j].readOnly) {
                board.rows[i].cols[j].readOnly = true;
            }
        }
    }
};

export default makeAllReadOnly;
