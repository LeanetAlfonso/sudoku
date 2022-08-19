import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Button from '../Button/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function ShareURL(props) {

    // snackbar
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <CopyToClipboard
                data-testid="copy-to-clipboard"
                text={props.url}
                onCopy={handleClick}
            >
                {props.btn ? (
                    <Button text={<i className="fa fa-regular fa-link share-link-icon" />} />
                ) : (
                    <div className='share-link-icon custom-details'>
                        <b>{props.text}</b> <i data-testid="share-url-icon" className="fa fa-regular fa-link" />
                    </div>
                )}
            </CopyToClipboard>
            <Snackbar
                data-testid="snackbar"
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Copied to Clipboard!"
            />
        </>
    );
}
