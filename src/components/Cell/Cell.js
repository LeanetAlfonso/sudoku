import React, { Component } from "react";
import "./Cell.css";

export default class Cell extends Component {
    render() {
        const { cell, handleChangeCallback } = this.props;
        const getCellClassName = () => {
            return `cell 
            ${cell.isInvalid ? "cell-invalid" : ""}
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
                type="tel"
            />
        );
    }
}
