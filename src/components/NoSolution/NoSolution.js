import React from 'react';
import Button from '../Button/Button';
import DialogTitle from '@mui/material/DialogTitle';
import CustomDialog from '../Modals/CustomDialog/CustomDialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from "react-i18next";
import './NoSolution.css';

export default function NoSolution(props) {

    const { noSolution } = props;
    const { t } = useTranslation();

    return (noSolution.isOpen &&
        <CustomDialog
            testId='no-solution'
            isOpen={noSolution.isOpen}
        >
            <IconButton disableRipple className='details-icon'>
                <i className={`fa-solid fas fa-exclamation custom-error fa-4x`}></i>
            </IconButton>
            <DialogTitle variant="h5">
                {t('no_solution_title')}
            </DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1">
                    {t('no_solution_first_subtitle')}
                </Typography>
                <Typography variant="subtitle1">
                    {t('no_solution_second_subtitle')}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    testId='ok-no-solution'
                    text={t('ok')}
                    onClick={noSolution.onOk}
                    buttonStyle="btn--primary--solid"
                />
            </DialogActions>
        </CustomDialog>
    );
}
