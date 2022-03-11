import React from "react";
import "./Button.css";

const STYLES = [
    "btn--primary--solid",
    "btn--yellow--solid",
    "btn--redish-orange--solid",
    "btn--success--solid",
    "btn--dark--solid",
    "btn--blue--solid",
    "btn--purple--solid",
];

const Button = ({ text, type, onClick, buttonStyle }) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];

    return (
        <button className={`btn ${checkButtonStyle}`} onClick={onClick} type={type}>
            {text}
        </button>
    );
};

export default Button;
