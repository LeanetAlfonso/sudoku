import React, { useState } from "react";
import "./Game.css";
import { generateSudoku, generateURL, convertBoard, getURLdata, checkBoard, checkPlayerWon, solveSudoku, makeAllReadOnly } from "../../utils/index";
import { cloneDeep } from "lodash";
import Button from "../../components/Button/Button";
import DarkMode from "../../components/DarkMode/DarkMode";
import LanguageMenu from "../../components/LanguageMenu/LanguageMenu";
import ConfirmationDialog from "../../components/Modals/Dialog/ConfirmationDialog";
import GameInstructions from "../../components/Modals/GameInstructions/GameInstructions";
import GameDetails from "../../components/Modals/GameDetails/GameDetails";
import FriendChallenge from "../../components/Modals/FriendChallenge/FriendChallenge";
import GameModes from "../../components/Modals/GameModes/GameModes";
import GameBoard from "../../components/GameBoard/GameBoard";
import { useTranslation } from "react-i18next";
import ShareURL from "../../components/ShareURL/ShareURL";

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
    const [reset, setReset] = useState(false);
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

    // ! TEMP
    const cheatingModeOn = false;

    // Mode
    const MODE = { "easy": 12, "medium": 8, "hard": 4, "expert": 0 };


    // Handle seconds from timer
    const handleSecondsCallback = (timerSeconds) => {
        const newTime = timerSeconds;
        setSeconds(newTime);
        !pressedSolve && setURL(generateURL(startingGrid, newTime, movesTaken, mode));
    };

    // Handle timer reset
    const handleResetCallback = () => {
        setReset(false);
    };


    // Handle new game
    const handleNewGame = (fill) => {
        // close game modes modal
        closeGameModes();

        // get data from url
        const data = getURLdata();

        // generates new puzzle
        const newGrid = generateSudoku(fill, data);
        setStartingGrid(cloneDeep(newGrid));
        setGrid(convertBoard(cloneDeep(newGrid)));

        // reset values
        setPressedSolve(false);
        setSeconds(0);
        setMovesTaken(0);
        setHasWon(false);
        setIsRunning(true);
        setURLdata(null);
        setURL(null);
        setHelpSolve(true);
        setReset(false);

        // close dialog
        closeDialog();

        // if shared by url handle friend challenge
        if (data) {
            setURLdata(data);
            setHelpSolve(false);
            setMode(data.mode);
            friendChallengeHandler(data);
        }
    };


    // Handle clearing the board
    const handleClearBoard = () => {
        setGrid(cloneDeep(convertBoard(startingGrid)));
    };


    // Handle solving the puzzle
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
        !cheatingModeOn && cloneDeep(makeAllReadOnly(solvedGrid));
        setGrid(solvedGrid);

        cheatingModeOn || setPressedSolve(true);
        setHasWon(true);

        setConfirmationDialog({
            ...confirmationDialog,
            isOpen: false
        });
        gameDetailsHandler();
    };

    // Handle timer pause/play button
    const handlePausePlay = () => {
        setHasWon(false);
        setIsRunning(!isRunning);
    };

    // Handle cell changes
    const handleChange = (val, cell) => {

        setHasWon(false);
        setIsRunning(true);

        // check if cell is not read-only
        if (!cell.readOnly) {
            // set value to null or parse it into an integer accordingly
            const value = val === "" ? null : parseInt(val, 10);

            const row = cell.row;
            const col = cell.col;

            // increment number of moves
            if (value !== 0) setMovesTaken((moves) => moves + 1);
            const newGrid = cloneDeep(grid);

            // set current value of cell to input value
            newGrid.rows[row].cols[col].value = value;

            // check if move is valid
            checkBoard(newGrid);

            // check if player won
            let playerWon = checkPlayerWon(newGrid);

            if (playerWon) {
                setHasWon(true); // will trigger handleSecondsCallback from Timer
                gameDetailsHandler();
            }

            // update grid state
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

    // Close dialog and resume timer
    const closeDialog = () => {
        setConfirmationDialog({ ...confirmationDialog, isOpen: false });
        setIsRunning(true);
    };

    // Close game instructions and resume timer
    const closeHelp = () => {
        setGameInstructions({ ...gameInstructions, isOpen: false });
        setIsRunning(true);
    };

    // Close modes and resume timer
    const closeGameModes = () => {
        setGameModes({ ...gameModes, isOpen: false });
        setIsRunning(true);
    };

    // Close challenge and resume timer
    const closeFriendChallenge = () => {
        setFriendChallenge({ ...friendChallenge, isOpen: false });
        setIsRunning(true);
    };

    // Handle confirmation dialog for clear
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

    // Handle confirmation dialog for new game
    const newGameConfirmationHandler = () => {
        setIsRunning(false);
        setConfirmationDialog({
            isOpen: true,
            title: t('newgame_confirm_title'),
            subTitle: t('newgame_confirm_subtitle'),
            icon: "far fa-plus-square",
            custom: "new",
            onContinue: () => {
                setHasWon(false);
                setReset(true);
                setIsRunning(false);
                window.history.pushState({}, document.title, "/"); // remove url query string
                selectModeHandler();
            },
            onCancel: () => { closeDialog(); }
        });
    };


    // Handle select mode dialog for new game
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


    // Handle confirmation dialog for solve
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

    // Handle game details modal
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

    // Handle game details modal
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

    // Handle game instructions modal
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

            <GameBoard
                seconds={seconds}
                isRunning={isRunning}
                handlePausePlay={handlePausePlay}
                handleSecondsCallback={handleSecondsCallback}
                grid={grid}
                handleChange={handleChange}
                hasWon={hasWon}
                handleResetCallback={handleResetCallback}
                reset={reset}
            />

            <div className="action-container">
                {hasWon && !pressedSolve && url && <ShareURL url={url} btn={true} />}
                {!hasWon && <Button name="help" testId="btn-help" text={<i className="fas fa-question"></i>} onClick={handleHelp} buttonStyle="btn--purple--solid" />}
                {!hasWon && <Button name="clear board" testId="btn-clear" text={<i className="fas fa-eraser"></i>} onClick={clearConfirmationHandler} buttonStyle="btn--redish-orange--solid" />}
                {((helpSolve && !hasWon) || cheatingModeOn) && <Button name="solve" testId="btn-solve" text={<b>{t('solve')}</b>} onClick={solveConfirmationHandler} buttonStyle="btn--yellow--solid" />}
                <Button name="new game" testId="btn-new" text={<b>{t('new_game')}</b>} onClick={newGameConfirmationHandler} buttonStyle="btn--blue--solid" />
            </div>
        </div>
    );
};

export default Game;
