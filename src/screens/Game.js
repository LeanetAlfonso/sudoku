import React, { useState, useEffect } from "react";
import "./Game.css";
import Grid from "../components/Grid/Grid";
import { generateSudoku, checkBoard, checkPlayerWon, solveSudoku } from "../utils/index";
import { cloneDeep } from "lodash";
import useLocalStorage from "../hooks/useLocalStorage";
import Button from "../components/Button/Button";
import ConfirmationDialog from "../components/Dialog/ConfirmationDialog";
import GameDetails from "../components/GameDetails/GameDetails";
import { MDBIcon } from "mdbreact";

const Game = () => {

  // Game
  const [grid, setGrid] = useLocalStorage("currentGrid", null);
  const [startingGrid, setStartingGrid] = useLocalStorage("startingGrid", null);
  const [pressedSolve, setPressedSolve] = useLocalStorage("pressedSolve", false);
  const [movesTaken, setMovesTaken] = useLocalStorage("movesTaken", 0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  // Modals
  const [noSolution, setNoSolution] = useState({ isOpen: false });
  const [confirmationDialog, setConfirmationDialog] = useState({ isOpen: false, title: '', subTitle: '' });
  const [gameDetails, setGameDetails] = useState({ isOpen: false, movesTaken: { movesTaken }, elapsed: { setSeconds }, pressedSolve: { pressedSolve } });


  // Timer
  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
    return undefined;
  }, [isRunning]);


  // Handles new game
  const handleNewGame = () => {
    // generates new puzzle
    const newGrid = generateSudoku();
    setStartingGrid(cloneDeep(newGrid));
    setGrid(cloneDeep(newGrid));

    // resets values
    setPressedSolve(false);
    setSeconds(0);
    setMovesTaken(0);
    setIsRunning(false);
  };


  // Handles clearing the board
  const handleClearBoard = () => {
    setGrid(cloneDeep(startingGrid));
  };


  // Handles solving the puzzle
  const handleSolve = () => {
    let solvedGrid = cloneDeep(startingGrid);
    let solvedStatus = solveSudoku(solvedGrid);
    if (solvedStatus === false) {
      setNoSolution({
        ...noSolution,
        isOpen: true
      });
      return;
    }
    setGrid(solvedGrid);
    setPressedSolve(true);

    setConfirmationDialog({
      ...confirmationDialog,
      isOpen: false
    });
    gameDetailsHandler();
  };


  // Handles cell changes
  const handleChange = (val, cell) => {

    setIsRunning(true);
    // checks if cell is not read-only
    if (!cell.readOnly) {
      // sets value to null or parses it into an integer accordingly
      const value = val === "" ? null : parseInt(val, 10);

      const row = cell.row;
      const col = cell.col;

      // increments number of moves
      if (value !== 0) setMovesTaken((moves) => moves + 1);
      const newGrid = grid;

      // sets current value of cell to input value
      newGrid.rows[row].cols[col].value = value;

      // checks if move is valid
      checkBoard(newGrid);

      // checks if player won
      let playerWon = checkPlayerWon(newGrid);
      if (playerWon) {
        gameDetailsHandler();
      }

      // updates grid state
      setGrid(newGrid);
    }
  };


  // Continue option for clear 
  const onContinueClear = () => {
    handleClearBoard();
    closeDialog();
  };

  // Continue option for new game
  const onContinueNewGame = () => {
    handleNewGame();
    closeDialog();
  };

  // Continue option for solve 
  const onContinueSolve = () => {
    handleSolve();
  };

  // Closes dialog and resumes timer
  const closeDialog = () => {
    setConfirmationDialog({ ...confirmationDialog, isOpen: false });
    setIsRunning(true);
  };


  // Handles confirmation dialog for clear
  const clearConfirmationHandler = () => {
    setIsRunning(false);
    setConfirmationDialog({
      isOpen: true,
      title: 'Are you sure you want to clear the board?',
      subTitle: 'You can\'t undo this operation.',
      onContinue: () => { onContinueClear(); },
      onCancel: () => { closeDialog(); }
    });
  };

  // Handles confirmation dialog for new game
  const newGameConfirmationHandler = () => {
    setIsRunning(false);
    setConfirmationDialog({
      isOpen: true,
      title: 'Are you sure you want to start a new game?',
      subTitle: 'All your changes will be lost.',
      onContinue: () => { onContinueNewGame(); },
      onCancel: () => { closeDialog(); }
    });
  };

  // Handles confirmation dialog for solve
  const solveConfirmationHandler = () => {
    setIsRunning(false);
    setConfirmationDialog({
      isOpen: true,
      title: 'Are you sure you want to solve this board?',
      subTitle: 'You will lose the game.',
      onContinue: () => { onContinueSolve(); },
      onCancel: () => { closeDialog(); }
    });
  };

  // Handles game details modal
  const gameDetailsHandler = () => {
    setIsRunning(false);
    setGameDetails({
      isOpen: true,
      movesTaken: { movesTaken },
      elapsed: { seconds },
      pressedSolve: { pressedSolve }
    });
  };



  if (grid == null && startingGrid == null) handleNewGame();

  return (
    <div className="Game">
      <h1 className="main-title" >
        Sudoku Game
      </h1>
      <h2>
        <MDBIcon far icon="clock" /> {seconds}
      </h2>
      <ConfirmationDialog
        confirmationDialog={confirmationDialog}
      />
      <GameDetails
        gameDetails={gameDetails}
        setGameDetails={setGameDetails}
        movesTaken={movesTaken}
        elapsed={seconds}
        pressedSolve={pressedSolve}
      />
      <Grid className="grid" grid={grid} onChange={handleChange} />
      <div className="action-container">
        <Button text="Clear" onClick={clearConfirmationHandler} buttonStyle="btn--danger--solid" />
        <Button text="Solve" onClick={solveConfirmationHandler} buttonStyle="btn--warning--solid" />
        <Button text="New Game" onClick={newGameConfirmationHandler} buttonStyle="btn--new--solid" />
      </div>
    </div>
  );
};

export default Game;
