import React from 'react';
import Button from '../../Button/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useTranslation } from "react-i18next";
import './GameModes.css';

export default function GameModes(props) {
    const { gameModes } = props;
    const { t } = useTranslation();
    const storedTheme = localStorage.getItem("theme");

    return (
        <Dialog
            data-testid='game-modes'
            open={gameModes.isOpen}
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
                {t('select_mode')}
            </DialogTitle>
            <Button
                testId='easy'
                text={t('easy')}
                onClick={gameModes.onEasy}
                buttonStyle="btn--light--solid"
            />
            <Button
                testId='medium'
                text={t('medium')}
                onClick={gameModes.onMedium}
                buttonStyle="btn--primary--solid"
            />
            <Button
                testId='hard'
                text={t('hard')}
                onClick={gameModes.onHard}
                buttonStyle="btn--medium--solid"
            />
            <Button
                testId='expert'
                text={t('expert')}
                onClick={gameModes.onExpert}
                buttonStyle="btn--dark--solid"
            />
        </Dialog>
    );
}
