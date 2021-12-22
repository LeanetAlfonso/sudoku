import React from 'react';
import Button from '../Button/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default function GameDetails(props) {

    const { gameDetails, setGameDetails, movesTaken, elapsed, pressedSolve } = props;
    return (
        <Dialog open={gameDetails.isOpen}>
            {pressedSolve ? <>
                <DialogTitle variant="h3">
                    Game Over
                </DialogTitle>
                <DialogTitle variant="h5">
                    Better luck next time!
                </DialogTitle> </> :
                <DialogTitle variant="h3">
                    You Won!
                </DialogTitle>
            }
            <DialogContent>
                <Typography variant="subtitle1">
                    <b>Moves taken:</b> {movesTaken}
                </Typography>
                <Typography variant="subtitle1">
                    <b>Elapsed time:</b> {elapsed} seconds
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    text="OK"
                    onClick={() => setGameDetails({ ...gameDetails, isOpen: false })}
                    buttonStyle="btn--primary--solid"
                />
            </DialogActions>
        </Dialog>
    );
}
