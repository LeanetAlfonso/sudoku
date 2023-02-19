import React from 'react';
import Button from '../../Button/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useTranslation } from "react-i18next";
import LeaderBoard from './LeaderBoard';
import './HighScores.css';

export default function HighScores(props) {
    const { highScores } = props;
    const { t } = useTranslation();
    const storedTheme = localStorage.getItem("theme");

    return (
        <Dialog
            data-testid='high-scores'
            open={highScores.isOpen}
            // dark mode support
            PaperProps={{
                style: {
                    backgroundColor: storedTheme === "dark" ? "#242727" : "#eee",
                    color: storedTheme === "dark" ? "#dbd7d7" : "#333",
                    boxShadow: 'none',
                    alignItems: 'center'
                },
            }}>
            <DialogTitle variant="h6">
                {t('leaderboard')}
            </DialogTitle>
            <DialogContent className="instuctions-content">
                <LeaderBoard
                    hasWon={highScores.hasWon}
                    name={highScores.name}
                    time={highScores.time}
                    moves={highScores.moves}
                    mode={highScores.mode}
                    date={highScores.date}
                />
            </DialogContent>

            <DialogActions>
                <Button
                    testId='leaderboard-ok'
                    text={t('ok')}
                    onClick={highScores.onOk}
                    buttonStyle="btn--primary--solid"
                />
            </DialogActions>
        </Dialog>
    );
}
