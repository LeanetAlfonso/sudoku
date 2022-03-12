import React from 'react';
import Button from '../../Button/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useTranslation } from "react-i18next";
import IconButton from '@mui/material/IconButton';
import "./ConfirmationDialog.css";

export default function ConfirmDialog(props) {
    const { confirmationDialog } = props;
    const { t } = useTranslation();
    const storedTheme = localStorage.getItem("theme");

    return (
        <Dialog open={confirmationDialog.isOpen}
            // dark mode support
            PaperProps={{
                style: {
                    backgroundColor: storedTheme === "dark" ? "#242727" : "#eee",
                    color: storedTheme === "dark" ? "#dbd7d7" : "#333",
                    boxShadow: 'none',
                },
            }}>
            <IconButton disableRipple className='details-icon'>
                <i className={`${confirmationDialog.icon} custom-${confirmationDialog.custom} fa-4x`}></i>
            </IconButton>
            <DialogTitle variant="h6">
                {confirmationDialog.title}
            </DialogTitle>
            <DialogContent>
                <Typography variant="subtitle2">
                    {confirmationDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className="dialog-actions">
                <Button
                    text={t('cancel')}
                    onClick={confirmationDialog.onCancel}
                    buttonStyle="btn--dark--solid"
                />
                <Button
                    text={t('continue')}
                    onClick={confirmationDialog.onContinue}
                    buttonStyle="btn--primary--solid"
                />
            </DialogActions>
        </Dialog>
    );
}
