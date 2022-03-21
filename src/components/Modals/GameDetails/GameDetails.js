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


export default function GameDetails(props) {

    const { t } = useTranslation();
    const { gameDetails, setGameDetails, movesTaken, elapsed, pressedSolve, mode } = props;
    const storedTheme = localStorage.getItem("theme");

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
            {pressedSolve ? <>
                <DialogTitle variant="h3">
                    {t('game_over_title')}
                </DialogTitle>
                <DialogTitle variant="h5" >
                    {t('game_over_subtitle')}
                </DialogTitle> </> : <>
                <DialogTitle variant="h3">
                    {t('game_won_title')}
                </DialogTitle>
                <DialogTitle variant="h5">
                    {t('game_won_subtitle')}
                </DialogTitle></>
            }
            <DialogContent>
                <Typography variant="subtitle1">
                    <b>{t('game_mode')}:</b> {t(mode)}
                </Typography>
                <Typography variant="subtitle1">
                    <b>{t('moves')}:</b> {movesTaken}
                </Typography>
                <Typography variant="subtitle1">
                    <b>{t('time')}:</b> {formatTime(elapsed)}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    text={t('ok')}
                    onClick={() => setGameDetails({ ...gameDetails, isOpen: false })}
                    buttonStyle="btn--primary--solid"
                />
            </DialogActions>
        </Dialog>
    );
}
