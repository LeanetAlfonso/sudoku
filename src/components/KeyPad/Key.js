import React from "react";
import Button from "../Button/Button";


const Key = ({ val, onClick, isDisabled, label }) => {
    return (
        <Button
            name={label}
            testId={label}
            text={val}
            onClick={onClick}
            buttonStyle="btn--primary--outline"
            isDisabled={isDisabled}
            aria-label={`${label}-${val}`}
        />
    );
};

export default Key;
