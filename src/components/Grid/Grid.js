import React, { useState, useEffect } from 'react';
import Cell from "../Cell/Cell";
import KeyPad from "../KeyPad/KeyPad";

import { checkBoard, checkPlayerWon, updateHighlight } from "../../utils/index";
import { cloneDeep } from "lodash";

const Grid = (props) => {
    const {
        startingGrid,
        isPaused,
        highlightOff,
        resetGrid,
        hasWon,
        handleGridCallback,
        handleResetGridCallback,
        pressedSolve,
        cleared,
        handleMovesCallback
    } = props;

    const [grid, setGrid] = useState(startingGrid || null);
    const [movesTaken, setMovesTaken] = useState(0);
    const [solved, setSolved] = useState(false);
    const [selectedCell, setSelectedCell] = useState(null);
    const [pressed, setPressed] = useState(true);

    useEffect(() => {

        if (resetGrid) {
            setPressed(true);
            setGrid(startingGrid);
            handleResetGridCallback(movesTaken);
            if (!cleared) {
                setMovesTaken(0);
                setSolved(false);
            }
            if (pressedSolve && pressed) {
                setPressed(false);
                handleMovesCallback(movesTaken);
            }
        }

    }, [pressed, resetGrid, movesTaken, hasWon, cleared, startingGrid, handleResetGridCallback, pressedSolve, handleMovesCallback]);
    const getCell = (cell) => {

        // if (isPaused)
        if (isPaused || resetGrid)
            return {
                ...cell,
                value: null,
                readOnly: true,
                isInvalid: false,
                isInvalidValue: false,
                isInvalidValueCause: false,
                isHighlighted: false,
                isFocused: false,
            };

        else if (highlightOff) {
            return {
                ...cell,
                isInvalid: false,
                isInvalidValue: false,
                isInvalidValueCause: false,
                isHighlighted: false,
            };
        }
        else return cell;
    };

    // Handle focus (selected cell)
    const handleFocus = (cell) => {
        if (!solved && !hasWon) {
            setSelectedCell(cell);
            const row = cell.row;
            const col = cell.col;
            const newGrid = cloneDeep(grid);
            updateHighlight(newGrid, row, col);
            setGrid(newGrid);
        }
    };

    // Handle cell changes
    const handleChange = (val, cell) => {

        // check if cell is not read-only
        if (selectedCell !== null && !cell.readOnly) {
            // set value to null or parse it into an integer accordingly
            const value = val === "" ? null : parseInt(val, 10);

            const row = cell.row;
            const col = cell.col;

            // increment number of moves
            if (value !== 0) setMovesTaken((moves) => moves + 1);
            const newGrid = cloneDeep(grid);

            // set current value of cell to input value
            newGrid.rows[row].cols[col].value = value;

            // check if move is valid
            checkBoard(newGrid, value, row, col);

            // check if player won
            let playerWon = checkPlayerWon(newGrid);

            // player won without pressing solve
            if (playerWon) {
                setSolved(true);
                handleGridCallback(cloneDeep(newGrid), movesTaken + 1);
            }
            // update grid state
            setGrid(newGrid);
        }
    };


    return <>
        <div className="grid" data-testid="grid" >
            {grid &&
                grid.rows.map(row => (
                    <div key={row.cols[0].row}>
                        {row.cols.map(cell => (
                            <Cell
                                key={`${cell.row}-${cell.col}`}
                                cell={getCell(cell)}
                                isPaused={isPaused}
                                isDisabled={isPaused || hasWon || pressedSolve || solved}
                                hasWon={hasWon || solved}
                                handleChangeCallback={handleChange}
                                handleFocusCallback={handleFocus}
                                isSelected={JSON.stringify(selectedCell) === JSON.stringify(cell)}
                            />
                        ))}
                    </div>
                ))}
        </div >

        <KeyPad
            onClick={handleChange}
            selectedCell={selectedCell}
            isDisabled={isPaused || hasWon || pressedSolve || solved}
        />
    </>;
};
export default Grid;
