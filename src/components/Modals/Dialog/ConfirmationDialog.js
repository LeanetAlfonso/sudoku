import React from 'react';
import Button from '../../Button/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default function ConfirmDialog(props) {

    const { confirmationDialog } = props;

    return (
        <Dialog open={confirmationDialog.isOpen}>
            <DialogTitle variant="h6">
                {confirmationDialog.title}
            </DialogTitle>
            <DialogContent>
                <Typography variant="subtitle2">
                    {confirmationDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions >
                <Button
                    text="Cancel"
                    onClick={confirmationDialog.onCancel}
                    buttonStyle="btn--dark--solid"
                />
                <Button
                    text="Continue"
                    onClick={confirmationDialog.onContinue}
                    buttonStyle="btn--primary--solid"
                />
            </DialogActions>
        </Dialog>
    );
}
