import React, { useState, useEffect } from "react";
import "./Game.css";
import Grid from "../components/Grid/Grid";
import { generateSudoku, checkBoard, checkPlayerWon, solveSudoku } from "../utils/index";
import { cloneDeep } from "lodash";
import useLocalStorage from "../hooks/useLocalStorage";
import Button from "../components/Button/Button";
import ConfirmationDialog from "../components/Modals/Dialog/ConfirmationDialog";
import GameInstructions from "../components/Modals/GameInstructions/GameInstructions";
import GameDetails from "../components/Modals/GameDetails/GameDetails";
import Timer from "../components/Timer/Timer";

const Game = () => {

  // Game
  const [grid, setGrid] = useLocalStorage("currentGrid", null);
  const [startingGrid, setStartingGrid] = useLocalStorage("startingGrid", null);
  const [pressedSolve, setPressedSolve] = useLocalStorage("pressedSolve", false);
  const [movesTaken, setMovesTaken] = useLocalStorage("movesTaken", 0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [hasWon, setHasWon] = useState(false);

  // Modals
  const [noSolution, setNoSolution] = useState({ isOpen: false });
  const [confirmationDialog, setConfirmationDialog] = useState({ isOpen: false, title: '', subTitle: '' });
  const [gameDetails, setGameDetails] = useState({ isOpen: false, movesTaken: { movesTaken }, elapsed: { setSeconds }, pressedSolve: { pressedSolve } });
  const [gameInstructions, setGameInstructions] = useState({ isOpen: false });


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
    setHasWon(false);
    setIsRunning(true);
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
    setHasWon(true);

    setConfirmationDialog({
      ...confirmationDialog,
      isOpen: false
    });
    gameDetailsHandler();
  };

  // Handles timer pause/play button
  const handlePausePlay = () => {
    setHasWon(false);
    setIsRunning(!isRunning);
  };

  // // Handles selecting a cell
  // const handleCellClick = (val) => {
  //   findSelectedCells(grid, val);
  // };

  // // Handles clearing selected cells
  // const handleClearSelected = () => {
  //   clearSelectedCells(grid);
  // };

  // Handles cell changes
  const handleChange = (val, cell) => {
    setHasWon(false);
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
        setHasWon(true);
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

  // Closes game instructions and resumes timer
  const closeHelp = () => {
    setGameInstructions({ ...gameInstructions, isOpen: false });
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

  // Handles game instructions modal
  const handleHelp = () => {
    setIsRunning(false);
    setGameInstructions({
      ...gameInstructions,
      isOpen: true,
      onOk: () => { closeHelp(); }
    });
  };


  if (grid == null && startingGrid == null) handleNewGame();

  return (
    <div className="game">
      <h1 className="main-title">
        Sudoku Game
      </h1>

      <ConfirmationDialog
        confirmationDialog={confirmationDialog}
      />

      <Timer
        seconds={seconds}
        isRunning={isRunning}
        handlePausePlay={handlePausePlay}
      />

      <GameDetails
        gameDetails={gameDetails}
        setGameDetails={setGameDetails}
        movesTaken={movesTaken}
        elapsed={seconds}
        pressedSolve={pressedSolve}
      />
      <GameInstructions
        gameInstructions={gameInstructions}
        setGameInstructions={setGameInstructions}
      />
      <Grid className="grid" grid={grid} onChange={handleChange} isPaused={!isRunning && !hasWon} />

      <div className="action-container">
        <Button text="?" onClick={handleHelp} buttonStyle="btn--purple--solid" />
        <Button text="Clear" onClick={clearConfirmationHandler} buttonStyle="btn--danger--solid" />
        <Button text="Solve" onClick={solveConfirmationHandler} buttonStyle="btn--warning--solid" />
        <Button text="New Game" onClick={newGameConfirmationHandler} buttonStyle="btn--new--solid" />
      </div>
    </div>
  );
};

export default Game;
