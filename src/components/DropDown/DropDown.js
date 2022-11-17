import "./DropDown.css";
import { useTranslation } from "react-i18next";

import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';

const BootstrapInput = styled(InputBase)(() => ({
    '& .MuiFormControl-root:active': {
        backgroundColor: 'transparent',
    },
    '& .MuiSvgIcon-root': {
        color: "#5b8588",
    },
    '& .MuiInputBase-input': {
        borderRadius: 0,
        position: 'relative',
        backgroundColor: 'transparent',
        color: "#5b8588",
        border: 'none',
        fontSize: 16,
        fontWeight: 'bold',
        padding: '2px',
        margin: '0px',
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','), '&:focus': {
            backgroundColor: 'transparent',
        },
    },
}));

const DropDown = ({ selected, content, changeHandler }) => {

    const { t } = useTranslation();

    return (
        <FormControl variant="standard">
            <NativeSelect
                id={t(selected)}
                value={selected}
                onChange={changeHandler}
                input={<BootstrapInput />}
            >
                {content.map(({ name, value }) => (
                    <option data-testid="menu-select-option" value={value} key={value}>
                        {t(name)}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>
    );
};

export default DropDown;
