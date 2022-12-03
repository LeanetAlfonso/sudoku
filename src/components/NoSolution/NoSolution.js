import React from 'react';
import Button from '../Button/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from "react-i18next";
import './NoSolution.css';
export default function NoSolution(props) {

    const { noSolution, setNoSolution } = props;
    const { t } = useTranslation();
    const storedTheme = localStorage.getItem("theme");

    return (noSolution.isOpen &&
        <Dialog
            data-testid="no-solution"
            open={noSolution.isOpen}
            // dark mode support
            PaperProps={{
                style: {
                    backgroundColor: storedTheme === "dark" ? "#242727" : "#eee",
                    color: storedTheme === "dark" ? "#dbd7d7" : "#333",
                    boxShadow: 'none',
                },
            }}>
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
                    onClick={() => setNoSolution({ ...noSolution, isOpen: false })}
                    buttonStyle="btn--primary--solid"
                />
            </DialogActions>
        </Dialog>
    );
}
