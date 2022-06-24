import React, { useState, useEffect } from "react";
import "./Game.css";
import Grid from "../components/Grid/Grid";
import { generateSudoku, generateURL, convertBoard, getURLdata, checkBoard, checkPlayerWon, solveSudoku } from "../utils/index";
import { cloneDeep } from "lodash";
import Button from "../components/Button/Button";
import DarkMode from "../components/DarkMode/DarkMode";
import LanguageMenu from "../components/LanguageMenu/LanguageMenu";
import ConfirmationDialog from "../components/Modals/Dialog/ConfirmationDialog";
import GameInstructions from "../components/Modals/GameInstructions/GameInstructions";
import GameDetails from "../components/Modals/GameDetails/GameDetails";
import FriendChallenge from "../components/Modals/FriendChallenge/FriendChallenge";
import GameModes from "../components/Modals/GameModes/GameModes";
import Timer from "../components/Timer/Timer";
import { useTranslation } from "react-i18next";


const Game = () => {

    // Game
    const [url, setURL] = useState(null);
    const [URLdata, setURLdata] = useState(null);
    const [grid, setGrid] = useState(null);
    const [startingGrid, setStartingGrid] = useState(null);
    const [pressedSolve, setPressedSolve] = useState(false);
    const [movesTaken, setMovesTaken] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [hasWon, setHasWon] = useState(false);
    const [mode, setMode] = useState("easy");
    const [helpSolve, setHelpSolve] = useState(true);

    // Modals
    const [noSolution, setNoSolution] = useState({ isOpen: false });
    const [confirmationDialog, setConfirmationDialog] = useState({ isOpen: false, title: '', subTitle: '' });
    const [gameDetails, setGameDetails] = useState({ isOpen: false, movesTaken: { movesTaken }, elapsed: { setSeconds }, pressedSolve: { pressedSolve } });
    const [gameInstructions, setGameInstructions] = useState({ isOpen: false });
    const [gameModes, setGameModes] = useState({ isOpen: false });
    const [friendChallenge, setFriendChallenge] = useState({ isOpen: false, moves: 0, time: 0, mode: '' });

    // Translation
    const { t } = useTranslation();

    // ! Temp
    const cheatingModeOn = true;

    // Mode
    const MODE = { "easy": 12, "medium": 8, "hard": 4, "expert": 0 };

    // Timer
    useEffect(() => {
        if (isRunning) {
            const intervalId = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
        return undefined;
    }, [isRunning, setSeconds]);


    // Handles new game
    const handleNewGame = (fill) => {
        closeGameModes();

        // generates new puzzle
        const newGrid = generateSudoku(fill);
        setStartingGrid(cloneDeep(newGrid));
        setGrid(convertBoard(cloneDeep(newGrid)));

        // resets values
        setPressedSolve(false);
        setSeconds(0);
        setMovesTaken(0);
        setHasWon(false);
        setIsRunning(true);
        setURLdata(null);
        setURL(null);

        // closes dialog
        closeDialog();

        // if shared by url handle friend challenge
        const data = getURLdata();
        setURLdata(data);
        if (data) {
            setHelpSolve(false);
            setMode(data.mode);
            friendChallengeHandler(data);
        }
    };


    // Handles clearing the board
    const handleClearBoard = () => {
        setGrid(cloneDeep(convertBoard(startingGrid)));
    };


    // Handles solving the puzzle
    const handleSolve = () => {
        let solvedGrid = cloneDeep(convertBoard(startingGrid));
        let solvedStatus = solveSudoku(solvedGrid);
        if (solvedStatus === false) {
            setNoSolution({
                ...noSolution,
                isOpen: true
            });
            return;
        }
        setGrid(solvedGrid);

        cheatingModeOn || setPressedSolve(true);
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
            const newGrid = cloneDeep(grid);

            // sets current value of cell to input value
            newGrid.rows[row].cols[col].value = value;

            // checks if move is valid
            checkBoard(newGrid);

            // checks if player won
            let playerWon = checkPlayerWon(newGrid);
            if (playerWon) {
                !pressedSolve && setURL(generateURL(startingGrid, seconds, movesTaken + 1, mode));
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

    // Closes modes and resumes timer
    const closeGameModes = () => {
        setGameModes({ ...gameModes, isOpen: false });
        setIsRunning(true);
    };

    // Closes challenge and resumes timer
    const closeFriendChallenge = () => {
        setFriendChallenge({ ...friendChallenge, isOpen: false });
        setIsRunning(true);
    };

    // Handles confirmation dialog for clear
    const clearConfirmationHandler = () => {
        setIsRunning(false);
        setConfirmationDialog({
            isOpen: true,
            title: t('clear_confirm_title'),
            subTitle: t('clear_confirm_subtitle'),
            icon: "fas fa-eraser",
            custom: "clear",
            onContinue: () => { onContinueClear(); },
            onCancel: () => { closeDialog(); }
        });
    };

    // Handles confirmation dialog for new game
    const newGameConfirmationHandler = () => {
        setIsRunning(false);
        setConfirmationDialog({
            isOpen: true,
            title: t('newgame_confirm_title'),
            subTitle: t('newgame_confirm_subtitle'),
            icon: "far fa-plus-square",
            custom: "new",
            onContinue: () => {
                window.history.pushState({}, document.title, "/"); // remove url query string
                selectModeHandler();
            },
            onCancel: () => { closeDialog(); }
        });
    };


    // Handles select mode dialog for new game
    const selectModeHandler = () => {
        setConfirmationDialog({ ...confirmationDialog, isOpen: false });

        setIsRunning(false);
        setGameModes({
            isOpen: true,
            onEasy: () => {
                setMode("easy");
                handleNewGame(MODE.easy);
            },
            onMedium: () => {
                setMode("medium");
                handleNewGame(MODE.medium);
            },
            onHard: () => {
                setMode("hard");
                handleNewGame(MODE.hard);
            },
            onExpert: () => {
                setMode("expert");
                handleNewGame(MODE.expert);
            }
        });
    };


    // Handles confirmation dialog for solve
    const solveConfirmationHandler = () => {
        setIsRunning(false);
        setConfirmationDialog({
            isOpen: true,
            title: t('solve_confirm_title'),
            subTitle: t('solve_confirm_subtitle'),
            icon: "fas fa-puzzle-piece",
            custom: "solve",
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
            pressedSolve: { pressedSolve },
            url: { url },
            URLdata: { URLdata }
        });
    };

    // Handles game details modal
    const friendChallengeHandler = (data) => {
        setIsRunning(false);

        setFriendChallenge({
            isOpen: true,
            moves: data.moves,
            time: data.time,
            mode: data.mode,
            onAccept: () => { closeFriendChallenge(); }
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

    if ((grid == null && startingGrid == null)) {
        handleNewGame(MODE.easy);
    }

    return (
        <div className="game">
            <div className="top-bar">
                <DarkMode />
                <LanguageMenu />
            </div>

            <h1 className="main-title">
                Sudoku
            </h1>

            <ConfirmationDialog
                confirmationDialog={confirmationDialog}
            />

            <GameModes
                gameModes={gameModes}
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
                mode={mode}
                url={url}
                URLdata={URLdata}
            />

            <FriendChallenge
                friendChallenge={friendChallenge}
                setFriendChallenge={setFriendChallenge}
                movesTaken={movesTaken}
                elapsed={seconds}
                mode={mode}
            />

            <GameInstructions
                gameInstructions={gameInstructions}
                setGameInstructions={setGameInstructions}
            />

            <Grid className="grid" grid={grid} onChange={handleChange} isPaused={!isRunning && !hasWon} />

            <div className="action-container">
                <Button text={<i className="fas fa-question"></i>} onClick={handleHelp} buttonStyle="btn--purple--solid" />
                <Button text={<i className="fas fa-eraser"></i>} onClick={clearConfirmationHandler} buttonStyle="btn--redish-orange--solid" />
                {(helpSolve || cheatingModeOn) && <Button text={<b>{t('solve')}</b>} onClick={solveConfirmationHandler} buttonStyle="btn--yellow--solid" />}
                <Button text={<b>{t('new_game')}</b>} onClick={newGameConfirmationHandler} buttonStyle="btn--blue--solid" />
            </div>
        </div>
    );
};

export default Game;
