import React from 'react';
import Button from '../../Button/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default function GameInstructions(props) {

    const { gameInstructions } = props;
    return (
        <Dialog open={gameInstructions.isOpen}>
            <DialogTitle variant="h7">
                How to play Sudoku
            </DialogTitle>
            <DialogTitle >
                Fill in the 9×9 grid with digits 1-9 such that:
            </DialogTitle>
            <DialogContent>
                <Typography variant="subtitle2">
                    <li>No <b>row</b> contains repeated numbers</li>
                    <li> No <b>column</b>  contains repeated numbers</li>
                    <li> No <b>3×3 box</b>  contains repeated numbers</li>
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    text="OK"
                    onClick={gameInstructions.onOk}
                    buttonStyle="btn--primary--solid"
                />
            </DialogActions>
        </Dialog>
    );
}
