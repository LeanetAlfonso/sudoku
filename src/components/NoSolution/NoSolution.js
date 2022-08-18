import React from 'react';
import Button from '../Button/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default function NoSolution(props) {

    const { noSolution, setNoSolution } = props;
    return (
        <Dialog open={noSolution.isOpen} data-testid="no-solution">
            <DialogTitle variant="h3">
                No Solution Found
            </DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1">
                    This grid cannot be solved.
                </Typography>
                <Typography variant="subtitle1">
                    Please start a new game.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    text="OK"
                    onClick={() => setNoSolution({ ...noSolution, isOpen: false })}
                    buttonStyle="btn--primary--solid"
                />
            </DialogActions>
        </Dialog>
    );
}
