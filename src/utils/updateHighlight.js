import getBoxNumber from "./getBoxNumber";

const updateHighlight = (board, r, c) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if ((i === r || j === c || getBoxNumber(i, j) === getBoxNumber(r, c))) {
                board.rows[i].cols[j].isHighlighted = true;
            }
            else {
                board.rows[i].cols[j].isHighlighted = false;
            }
            if (i === r && j === c) {
                board.rows[i].cols[j].isFocused = true;
            }
            else {
                board.rows[i].cols[j].isFocused = false;
            }
        }
    }
};
export default updateHighlight;
