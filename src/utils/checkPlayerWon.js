import makeAllReadOnly from "./makeAllReadOnly";

// Checks if player won
const checkPlayerWon = (board) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board.rows[i].cols[j].value === null || board.rows[i].cols[j].isInvalid === true) {
                return false;
            }
        }
    }
    makeAllReadOnly(board);
    return true;
};

export default checkPlayerWon;
