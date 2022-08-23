import React from "react";
import "./Button.css";

const STYLES = [
    "btn--primary--solid",
    "btn--yellow--solid",
    "btn--redish-orange--solid",
    "btn--success--solid",
    "btn--dark--solid",
    "btn--light--solid",
    "btn--medium--solid",
    "btn--blue--solid",
    "btn--purple--solid",
];

const Button = ({ testId, text, onClick, buttonStyle }) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];

    return (
        <button data-testid={testId} className={`btn ${checkButtonStyle}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
