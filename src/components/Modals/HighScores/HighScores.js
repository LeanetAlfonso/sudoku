import React from 'react';
import Button from '../../Button/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import CustomDialog from '../CustomDialog/CustomDialog';
import DialogContent from '@mui/material/DialogContent';
import { useTranslation } from "react-i18next";
import Leaderboard from '../../Leaderboard/Leaderboard';

export default function HighScores(props) {
    const { highScores } = props;
    const { t } = useTranslation();

    return (
        <CustomDialog
            testId='high-scores'
            isOpen={highScores.isOpen}
            centered
        >
            <DialogTitle variant="h6">
                {t('leaderboard')}
            </DialogTitle>
            <DialogContent>
                <Leaderboard
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
        </CustomDialog>
    );
}
