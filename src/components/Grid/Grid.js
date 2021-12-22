import React, { Component } from "react";
import Cell from "../Cell/Cell";


export default class Grid extends Component {

  render() {
    const { grid, onChange } = this.props;

    return <div>
      {grid &&
        grid.rows.map(row => (
          <div key={row.index}>
            {row.cols.map(cell => (
              <Cell
                key={row.index + "-" + cell.col}
                cell={cell}
                isInvalid={cell.isInvalid}
                handleChangeCallback={onChange}
              />
            ))}
          </div>
        ))}
    </div>;
  }
}
