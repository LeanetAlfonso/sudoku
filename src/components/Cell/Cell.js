import React, { Component } from "react";
import "./Cell.css";

export default class Cell extends Component {
    render() {
        const { cell, isPaused, isDisabled, handleChangeCallback, handleFocusCallback } = this.props;

        const getCellClassName = () => {
            return `cell 
            ${cell.isInvalid && "cell-invalid"}  ${cell.isInvalidValue && "cell-invalid-value"}
            ${cell.isInvalidValueCause && "cell-invalid-value-cause"}
            ${cell.isHighlighted && !isDisabled && "cell-highlighted"}
            ${cell.isFocused && !isDisabled && "cell-focused"}
            ${isPaused && "cell-paused"}
            `;
        };
        return (
            <input
                data-testid="cell"
                aria-label={`${cell.row}-${cell.col}`}
                key={`${cell.row}-${cell.col}`}
                id={`${cell.row}-${cell.col}`}
                className={getCellClassName()}
                row={cell.row}
                col={cell.col}
                value={cell.value || ''}
                readOnly={cell.readOnly}
                onChange={(e) => handleChangeCallback(e.target.value, cell)}
                maxLength="1"
                // type="tel"
                inputMode='none' //prevent virtual keyboard from appearing
                onFocus={() => handleFocusCallback(cell)}
                disabled={isDisabled}
            />
        );
    }
}
