import React from "react";
import Button from "../Button/Button";


const Key = ({ val, onClick, isPaused, label }) => {
    return (
        <Button
            name={label}
            testId={label}
            text={val}
            onClick={onClick}
            buttonStyle="btn--primary--outline"
            isDisabled={isPaused}
            aria-label={`${label}-${val}`}
        />
    );
};

export default Key;
