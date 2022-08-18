import React, { Component } from "react";
import Cell from "../Cell/Cell";


export default class Grid extends Component {
    render() {
        const { grid, onChange, isPaused } = this.props;
        return <div className="grid" data-testid="grid">
            {grid &&
                grid.rows.map(row => (
                    <div key={row.cols[0].row}>
                        {row.cols.map(cell => (
                            <Cell
                                key={`${cell.row}-${cell.col}`}
                                cell={isPaused ? {
                                    row: cell.row,
                                    col: cell.col,
                                    value: null,
                                    readOnly: true,
                                    isInvalid: false,
                                } : cell}
                                handleChangeCallback={onChange}
                            />
                        ))}
                    </div>
                ))}
        </div>;
    }
}
