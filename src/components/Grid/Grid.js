import React, { Component } from "react";
import Cell from "../Cell/Cell";


export default class Grid extends Component {
    render() {
        const { grid, onChange, onFocus, isPaused, hasWon, selectedCell, highlightOff } = this.props;

        const getCell = (cell) => {
            if (isPaused)
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
        return <div className="grid" data-testid="grid" >
            {grid &&
                grid.rows.map(row => (
                    <div key={row.cols[0].row}>
                        {row.cols.map(cell => (
                            <Cell
                                key={`${cell.row}-${cell.col}`}
                                cell={getCell(cell)}
                                isPaused={isPaused}
                                hasWon={hasWon}
                                handleChangeCallback={onChange}
                                handleFocusCallback={onFocus}
                                isSelected={JSON.stringify(selectedCell) === JSON.stringify(cell)}
                            />
                        ))}
                    </div>
                ))}
        </div >;
    }
}
