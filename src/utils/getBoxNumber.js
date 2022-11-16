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

export default getBoxNumber;
