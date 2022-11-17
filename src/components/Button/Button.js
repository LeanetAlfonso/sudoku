import React from "react";
import "./Button.css";

const STYLES = [
    "btn--primary--solid",
    "btn--yellow--solid",
    "btn--redish-orange--solid",
    "btn--dark--solid",
    "btn--light--solid",
    "btn--medium--solid",
    "btn--blue--solid",
    "btn--purple--solid",
    "btn--primary--outline"
];

const Button = ({ name, testId, text, onClick, buttonStyle, isDisabled, label }) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];

    return (
        <button
            data-testid={testId}
            className={`btn ${checkButtonStyle}`}
            onClick={onClick} title={name}
            disabled={isDisabled}
            aria-label={label}>
            {text}
        </button>
    );
};

export default Button;
