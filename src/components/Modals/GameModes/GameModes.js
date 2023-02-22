import React from 'react';
import Button from '../../Button/Button';
import DialogTitle from '@mui/material/DialogTitle';
import CustomDialog from '../CustomDialog/CustomDialog';
import { useTranslation } from "react-i18next";
import './GameModes.css';

export default function GameModes(props) {
    const { gameModes } = props;
    const { t } = useTranslation();
    return (
        <CustomDialog
            testId='game-modes'
            isOpen={gameModes.isOpen}
            centered
        >
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
        </CustomDialog>
    );
}
