import React from "react";
import Key from "./Key";
import './KeyPad.css';
import { ReactComponent as DeleteIcon } from '../../assets/delete-left-solid.svg';


const KeyPad = ({ onClick, selectedCell, isPaused }) => {

    const keys = Array.from({ length: 9 }, (_, i) => i + 1);

    return (
        <div className="keypad">
            {keys.map((val) => {
                return (<Key
                    key={`key-${val}`}
                    val={val}
                    onClick={() => onClick(val, selectedCell)}
                    isPaused={isPaused}
                    label={`key-${val}`}
                />);
            })}
            <Key
                key="delete-button"
                val={<DeleteIcon />}
                onClick={() => onClick('', selectedCell)}
                isPaused={isPaused}
                label="delete-button"
            />
        </div>
    );
};

export default KeyPad;
