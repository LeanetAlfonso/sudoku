import React from 'react';
import Button from '../../Button/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useTranslation } from "react-i18next";

export default function GameModes(props) {
    const { gameModes } = props;
    const { t } = useTranslation();
    const storedTheme = localStorage.getItem("theme");

    return (
        <Dialog open={gameModes.isOpen}
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
                text={t('easy')}
                onClick={gameModes.onEasy}
                buttonStyle="btn--light--solid"
            />
            <Button
                text={t('medium')}
                onClick={gameModes.onMedium}
                buttonStyle="btn--primary--solid"
            />
            <Button
                text={t('hard')}
                onClick={gameModes.onHard}
                buttonStyle="btn--medium--solid"
            />
            <Button
                text={t('expert')}
                onClick={gameModes.onExpert}
                buttonStyle="btn--dark--solid"
            />
        </Dialog>
    );
}
