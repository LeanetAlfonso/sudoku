import React from 'react';
import Button from '../../Button/Button';
import DialogTitle from '@mui/material/DialogTitle';
import CustomDialog from '../CustomDialog/CustomDialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useTranslation } from "react-i18next";
import IconButton from '@mui/material/IconButton';
import "./ConfirmationDialog.css";

export default function ConfirmationDialog(props) {
    const { confirmationDialog } = props;
    const { t } = useTranslation();

    return (
        (confirmationDialog.isOpen) &&

        <CustomDialog
            testId='confirmation-dialog'
            isOpen={confirmationDialog.isOpen}
        >
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
                    testId="cancel"
                    text={t('cancel')}
                    onClick={confirmationDialog.onCancel}
                    buttonStyle="btn--dark--solid"
                />
                <Button
                    testId="continue"
                    text={t('continue')}
                    onClick={confirmationDialog.onContinue}
                    buttonStyle="btn--primary--solid"
                />
            </DialogActions>
        </CustomDialog>
    );
}
