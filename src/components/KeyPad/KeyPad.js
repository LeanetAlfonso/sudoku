import React from "react";
import Key from "./Key";
import './KeyPad.css';
import { ReactComponent as DeleteIcon } from '../../assets/delete-left-solid.svg';


const KeyPad = ({ onClick, selectedCell, isDisabled }) => {

    const keys = Array.from({ length: 9 }, (_, i) => i + 1);

    return (
        <div className="keypad">
            {keys.map((val) => {
                return (<Key
                    key={`key-${val}`}
                    val={val}
                    onClick={() => onClick(val, selectedCell)}
                    isDisabled={isDisabled}
                    label={`key-${val}`}
                />);
            })}
            <Key
                key="delete-button"
                val={<DeleteIcon />}
                onClick={() => onClick('', selectedCell)}
                isDisabled={isDisabled}
                label="delete-button"
            />
        </div>
    );
};

export default KeyPad;
