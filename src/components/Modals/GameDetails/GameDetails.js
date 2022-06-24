import React from 'react';
import Button from '../../Button/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import formatTime from '../../../utils/formatTime';
import "./GameDetails.css";
import { useTranslation } from "react-i18next";
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function GameDetails(props) {
    // snackbar
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const { t } = useTranslation();
    const { gameDetails, setGameDetails, movesTaken, elapsed, pressedSolve, mode, url, URLdata } = props;
    const storedTheme = localStorage.getItem("theme");
    console.log("inside details");
    return (
        <Dialog open={gameDetails.isOpen}
            // black mode support
            PaperProps={{
                style: {
                    backgroundColor: storedTheme === "dark" ? "#242727" : "#eee",
                    color: storedTheme === "dark" ? "#dbd7d7" : "#333",
                    boxShadow: 'none',
                },
            }}>
            {pressedSolve || (URLdata && ((URLdata.time < elapsed) || (URLdata.time === elapsed && URLdata.moves < movesTaken))) ?
                <>
                    <IconButton disableRipple className='details-icon'>
                        <i className="fa fa-regular fa-skull-crossbones custom-details fa-4x"></i>
                    </IconButton>
                    <DialogTitle variant="h4" align="center">
                        {t('game_lost_title')}
                    </DialogTitle>
                </> :
                <>
                    <IconButton disableRipple className='details-icon'>
                        <i className="fa fa fa-regular fa-trophy custom-details fa-4x"></i>
                    </IconButton>
                    <DialogTitle variant="h4" align="center">
                        {t('game_won_title')}
                    </DialogTitle>
                </>
            }
            <DialogContent className="row">

                <div className="column" >
                    {URLdata &&
                        <Typography variant="h6" align="center" className="custom-details">
                            <b>{t('You')}</b>
                        </Typography>}
                    <Typography variant="subtitle1">
                        <b>{t('Mode')}:</b> {t(mode)}
                    </Typography>
                    <Typography variant="subtitle1">
                        <b>{t('moves')}:</b> {movesTaken}
                    </Typography>
                    <Typography variant="subtitle1">
                        <b>{t('time')}:</b> {formatTime(elapsed)}
                    </Typography>
                </div>
                {URLdata &&
                    <div className="column" >
                        <Typography variant="h6" align="center" className="custom-details">
                            <b>{t('Enemy')}</b>
                        </Typography>
                        <Typography variant="subtitle1">
                            <b>{t('Mode')}:</b> {t(URLdata.mode)}
                        </Typography>
                        <Typography variant="subtitle1">
                            <b>{t('moves')}:</b> {URLdata.moves}
                        </Typography>
                        <Typography variant="subtitle1">
                            <b>{t('time')}:</b> {formatTime(URLdata.time)}
                        </Typography>
                    </div>}
            </DialogContent>
            {!pressedSolve && url &&
                <DialogContent>
                    <Typography variant="subtitle1" align="center">
                        {t('share_url')} <CopyToClipboard text={url}
                            onCopy={handleClick}>
                            <i className="fa fa-regular fa-link custom-details share-link-icon"></i>
                        </CopyToClipboard>
                    </Typography>
                </DialogContent>
            }
            <DialogActions>
                <Button
                    text={t('ok')}
                    onClick={() => setGameDetails({ ...gameDetails, isOpen: false })}
                    buttonStyle="btn--primary--solid"
                />
            </DialogActions>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Copied to Clipboard!"
            />
        </Dialog>
    );
}
