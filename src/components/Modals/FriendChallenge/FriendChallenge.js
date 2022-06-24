import React from 'react';
import Button from '../../Button/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import formatTime from '../../../utils/formatTime';
import { useTranslation } from "react-i18next";
import IconButton from '@mui/material/IconButton';

export default function FriendChallenge(props) {

    const { t } = useTranslation();
    const { friendChallenge } = props;
    const storedTheme = localStorage.getItem("theme");

    return (
        <Dialog open={friendChallenge.isOpen}
            // black mode support
            PaperProps={{
                style: {
                    backgroundColor: storedTheme === "dark" ? "#242727" : "#eee",
                    color: storedTheme === "dark" ? "#dbd7d7" : "#333",
                    boxShadow: 'none',
                },
            }}>

            <IconButton disableRipple className='details-icon'>
                <i className="fa fa-regular fa-dice custom-details fa-4x"></i>
            </IconButton>
            <DialogTitle variant="h5">
                {t('challenge_title')}
            </DialogTitle>
            <DialogTitle variant="h7">
                {t('challenge_subtitle')}
            </DialogTitle>

            <DialogContent>
                <Typography variant="subtitle1">
                    <b>{t('game_mode')}:</b> {t(friendChallenge.mode)}
                </Typography>
                <Typography variant="subtitle1">
                    <b>{t('moves')}:</b> {friendChallenge.moves}
                </Typography>
                <Typography variant="subtitle1">
                    <b>{t('time')}:</b> {formatTime(friendChallenge.time)}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    text={t('accept_challenge')}
                    onClick={friendChallenge.onAccept}
                    buttonStyle="btn--primary--solid"
                />
            </DialogActions>
        </Dialog>
    );
}
