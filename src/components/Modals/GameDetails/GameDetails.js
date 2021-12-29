import React from 'react';
import Button from '../../Button/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import formatTime from '../../../utils/formatTime';
import gameOver from '../../../assets/game-over.png';
import youWin from '../../../assets/you-win.png';
import "./GameDetails.css";

export default function GameDetails(props) {

    const { gameDetails, setGameDetails, movesTaken, elapsed, pressedSolve } = props;
    return (

        <Dialog open={gameDetails.isOpen}>
            {pressedSolve ? <>
                <img className="end-game-image" type="image" src={gameOver} alt="Game Over" />
                <DialogTitle variant="h5" >
                    Next time try to solve it on your own ;)
                </DialogTitle> </> :
                <DialogTitle variant="h3">
                    <img className="end-game-image" type="image" src={youWin} alt="You Win!" />
                </DialogTitle>
            }
            <DialogContent>
                <Typography variant="subtitle1">
                    <b>Moves:</b> {movesTaken}
                </Typography>
                <Typography variant="subtitle1">
                    <b>Time:</b> {formatTime(elapsed)}
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
