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

    // const classes = useStyles();
    const { t } = useTranslation();


    return (
        // <select data-testid="menu-select" id="menu-select" className="menu-select" value={selected}
        //     onChange={changeHandler}>
        //     {content.map(({ name, value }) => (
        //         <option data-testid="menu-select-option" value={value} key={value}>
        //             {t(name)}
        //         </option>
        //     ))}
        // </select>
        <div>

            <FormControl variant="standard">
                <NativeSelect
                    id="demo-customized-select-native"
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
        </div>
    );
};

export default DropDown;
