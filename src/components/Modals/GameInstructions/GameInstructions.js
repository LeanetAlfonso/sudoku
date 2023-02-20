import React from 'react';
import Button from '../../Button/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useTranslation } from "react-i18next";
import "./GameInstructions.css";
import IconButton from '@mui/material/IconButton';

export default function GameInstructions(props) {

    const { t } = useTranslation();
    const { gameInstructions } = props;
    const storedTheme = localStorage.getItem("theme");

    return ((gameInstructions.isOpen) &&
        <Dialog
            data-testid='game-instructions'
            open={gameInstructions.isOpen}
            PaperProps={{
                style: {
                    backgroundColor: storedTheme === "dark" ? "#242727" : "#eee",
                    color: storedTheme === "dark" ? "#dbd7d7" : "#333",
                    boxShadow: 'none',
                },
            }}>
            <IconButton disableRipple className='details-icon'>
                <i className="far fa-question-circle custom-instructions fa-4x"></i>
            </IconButton>
            <DialogTitle variant="h6">
                {t('instuctions_title')}
            </DialogTitle>
            <DialogContent>
                <Typography>
                    {t('instuctions_subtitle')}
                </Typography>
                <Typography variant="subtitle2" className="intructions-bullets intructions">
                    <li> {t('instuctions_list_negation')} <b>{t('row')}</b> {t('instuctions_list_repetition')}</li>
                    <li> {t('instuctions_list_negation')} <b>{t('column')}</b> {t('instuctions_list_repetition')}</li>
                    <li> {t('instuctions_list_negation')} <b>{t('box')}</b> {t('instuctions_list_repetition')}</li>
                </Typography>
                <Typography className="instuctions-clarification">
                    {t('instuctions_clarification')}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    testId='help-ok'
                    text={t('ok')}
                    onClick={gameInstructions.onOk}
                    buttonStyle="btn--primary--solid"
                />
            </DialogActions>
        </Dialog>
    );
}
