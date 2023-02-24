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
                    <Button testId='btn-share' text={<i className="fa fa-regular fa-link share-link-icon" />} buttonStyle={`${props.buttonStyle ? props.buttonStyle : "btn--pink-solid"}`} />
                ) : (
                    <div data-testid='text-share' className='custom-details share-link-text'>
                        <b>{props.text}</b> <i data-testid="share-url-icon" className="fa fa-regular fa-link" />
                    </div>
                )}
            </CopyToClipboard>
            {open &&
                <Snackbar
                    data-testid="snackbar"
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Copied to Clipboard!"
                />
            }

        </>
    );
}
