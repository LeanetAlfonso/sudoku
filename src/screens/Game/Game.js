import React, { useState } from "react";
import "./Game.css";
import { generateSudoku, generateURL, convertBoard, getURLdata, solveSudoku } from "../../utils/index";
import { cloneDeep } from "lodash";
import Button from "../../components/Button/Button";
import DarkMode from "../../components/DarkMode/DarkMode";
import LanguageMenu from "../../components/LanguageMenu/LanguageMenu";
import ConfirmationDialog from "../../components/Modals/Dialog/ConfirmationDialog";
import GameInstructions from "../../components/Modals/GameInstructions/GameInstructions";
import GameDetails from "../../components/Modals/GameDetails/GameDetails";
import FriendChallenge from "../../components/Modals/FriendChallenge/FriendChallenge";
import GameModes from "../../components/Modals/GameModes/GameModes";
import NoSolution from "../../components/NoSolution/NoSolution";
import GameBoard from "../../components/GameBoard/GameBoard";
import { useTranslation } from "react-i18next";
import ShareURL from "../../components/ShareURL/ShareURL";
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import HighScores from "../../components/Modals/HighScores/HighScores";

const Game = (props) => {

    // Game
    const [url, setURL] = useState(null);
    const [URLdata, setURLdata] = useState(null);
    const [grid, setGrid] = useState(props.grid || null);
    const [startingGrid, setStartingGrid] = useState(props.grid || null);
    const [pressedSolve, setPressedSolve] = useState(false);
    const [movesTaken, setMovesTaken] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [hasWon, setHasWon] = useState(false);
    const [mode, setMode] = useState("easy");
    const [resetTimer, setResetTimer] = useState(false);
    const [resetGrid, setResetGrid] = useState(false);
    const [cleared, setCleared] = useState(false);
    const [helpSolve, setHelpSolve] = useState(true);

    // Modals
    const [noSolution, setNoSolution] = useState({ isOpen: false });
    const [confirmationDialog, setConfirmationDialog] = useState({ isOpen: false, title: '', subTitle: '' });
    const [gameDetails, setGameDetails] = useState({ isOpen: false, date: null });
    const [gameInstructions, setGameInstructions] = useState({ isOpen: false });
    const [gameModes, setGameModes] = useState({ isOpen: false });
    const [friendChallenge, setFriendChallenge] = useState({ isOpen: false, moves: 0, time: 0, mode: '' });
    const [highScores, setHighScores] = useState({ isOpen: false, mode: "", time: 0, moves: 0, date: null });

    // Translation
    const { t } = useTranslation();

    // ! TEMP
    const cheatingModeOn = false;

    // Mode
    const MODE = { "easy": 12, "medium": 8, "hard": 4, "expert": 0 };

    // Icons
    const ICONS = { clear: "fas fa-eraser", solve: "fas fa-puzzle-piece", new: "fas fa-plus-square", help: "fas fa-question" };

    // Handle seconds from timer (game over)
    const handleSecondsCallback = (timerSeconds) => {
        const newTime = timerSeconds;
        setSeconds(newTime);
        !pressedSolve && setURL(generateURL(startingGrid, newTime, movesTaken, mode));
    };

    // Handle timer reset
    const handleResetTimerCallback = () => {
        setResetTimer(false);
    };

    // Handle moves from grid (when pressed solve)
    const handleMovesCallback = (moves) => {
        const newMoves = moves;
        setMovesTaken(newMoves);
        handleGameDetails(newMoves);
    };

    // Handle timer reset
    const handleResetGridCallback = (moves) => {
        setMovesTaken(moves);
        setResetGrid(false);
        setCleared(false);
    };

    // Handle game won without pressing solve
    const handleGridCallback = (grid, moves) => {
        setHasWon(true);
        setGrid(cloneDeep(convertBoard(grid)));
        handleMovesCallback(moves);
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
        setResetTimer(true);
        setResetGrid(true);

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
        setResetGrid(true);
        setCleared(true);
        setGrid(cloneDeep(convertBoard(startingGrid)));
    };

    // Handle new game on no solution ok
    const onOkNoSolution = () => {
        setNoSolution({ ...noSolution, isOpen: false });
        resetGame();
        selectModeHandler();
    };

    // Handle no solution
    const handleNoSolution = () => {
        setNoSolution({
            ...noSolution,
            onOk: () => { onOkNoSolution(); },
            isOpen: true
        });
    };

    // Continue option for clear
    const onContinueClear = () => {
        handleClearBoard();
        closeDialog();
    };

    // Continue option for solve
    const onContinueSolve = () => {
        let solvedGrid = cloneDeep(convertBoard(startingGrid));
        let solvedStatus = solveSudoku(solvedGrid);
        if (solvedStatus === false) {
            handleNoSolution();
            setConfirmationDialog({
                ...confirmationDialog,
                isOpen: false
            });
            return;
        }
        !cheatingModeOn && cloneDeep(solvedGrid);
        setGrid(solvedGrid);

        cheatingModeOn || setPressedSolve(true);
        setHasWon(true);

        setConfirmationDialog({
            ...confirmationDialog,
            isOpen: false
        });
        setResetGrid(true);
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

    // Close high scores and resume timer
    const closeHighScores = () => {
        setHighScores({ ...highScores, isOpen: false });
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

    // Handle leaderboard modal
    const highScoresHandler = () => {
        setIsRunning(false);
        setHighScores({
            ...highScores,
            mode: mode,
            moves: movesTaken,
            time: seconds,
            hasWon: hasWon && !pressedSolve,
            date: new Date(),
            isOpen: true,
            onOk: () => { closeHighScores(); }
        });
    };

    // Handle confirmation dialog for clear
    const clearConfirmationHandler = () => {
        setIsRunning(false);
        setConfirmationDialog({
            isOpen: true,
            title: t('clear_confirm_title'),
            subTitle: t('clear_confirm_subtitle'),
            icon: ICONS['clear'],
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
            icon: ICONS['new'],
            custom: "new",
            onContinue: () => {
                resetGame();
                selectModeHandler();
            },
            onCancel: () => { closeDialog(); }
        });
    };

    // Reset Game
    const resetGame = () => {
        setHasWon(false);
        setResetTimer(true);
        setResetGrid(true);
        setIsRunning(false);
        window.history.pushState({}, document.title, "/"); // remove url query string
    };

    // Change game mode from mode menu
    const handleChangeModeCallback = (val) => {
        resetGame();
        changeMode(val);
    };

    // Change game mode
    const changeMode = (value) => {
        setMode(value);
        handleNewGame(MODE[value]);
    };

    // Handle select mode dialog for new game
    const selectModeHandler = () => {
        setConfirmationDialog({ ...confirmationDialog, isOpen: false });

        setGameModes({
            isOpen: true,
            onEasy: () => changeMode("easy"),
            onMedium: () => changeMode("medium"),
            onHard: () => changeMode("hard"),
            onExpert: () => changeMode("expert")
        });
    };


    // Handle confirmation dialog for solve
    const solveConfirmationHandler = () => {
        setIsRunning(false);
        setConfirmationDialog({
            isOpen: true,
            title: t('solve_confirm_title'),
            subTitle: t('solve_confirm_subtitle'),
            icon: ICONS["solve"],
            custom: "solve",
            onContinue: () => { onContinueSolve(); },
            onCancel: () => { closeDialog(); }
        });
    };

    // Handle game details modal
    const handleGameDetails = (moves) => {
        setIsRunning(false);
        setGameDetails({
            ...gameDetails,
            isOpen: true,
            date: new Date()
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

            <h2 className="main-title game-header">
                Sudoku
            </h2>
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

            <NoSolution
                noSolution={noSolution}
            />

            <HighScores
                highScores={highScores}
                hasWon={hasWon && !pressedSolve}
            />

            <GameBoard
                startingGrid={grid}
                seconds={seconds}
                isRunning={isRunning}
                handleSecondsCallback={handleSecondsCallback}
                hasWon={hasWon}
                handleResetTimerCallback={handleResetTimerCallback}
                handleResetGridCallback={handleResetGridCallback}
                resetTimer={resetTimer}
                mode={mode}
                handleChangeModeCallback={handleChangeModeCallback}
                resetGrid={resetGrid}
                handleGridCallback={handleGridCallback}
                pressedSolve={pressedSolve}
                cleared={cleared}
                handleMovesCallback={handleMovesCallback}
            />
            <div className="action-container">
                <div className={`flex-container vertical-flex-container ${hasWon && "spacious"}`}>
                    <Button name={t("leaderboard").toLowerCase()} testId="btn-leaderboard" text={<LeaderboardRoundedIcon padding="0px" style={{ margin: "-4px", fontSize: "21px" }} />} onClick={highScoresHandler} />
                    <div className="btn-label leaderboard">
                        {t('leaderboard')}
                    </div>
                </div>

                {hasWon && !pressedSolve && url && <div className={`flex-container vertical-flex-container ${hasWon && "spacious"}`}>
                    <ShareURL url={url} btn={true} />
                    <div className="btn-label challenge">
                        {t('share_url')}
                    </div>
                </div>
                }
                {!hasWon &&
                    <div className="flex-container vertical-flex-container">
                        <Button name={t("help").toLowerCase()} testId="btn-help" text={<i className={ICONS["help"]}></i>} onClick={handleHelp} buttonStyle="btn--purple--solid" />
                        <div className="btn-label help">
                            {t('help')}
                        </div>
                    </div>
                }
                {!hasWon && <div className="flex-container vertical-flex-container">
                    <Button name={t("clear_btn_title").toLowerCase()} testId="btn-clear" text={<i className={ICONS["clear"]}></i>} onClick={clearConfirmationHandler} buttonStyle="btn--redish-orange--solid" />
                    <div className="btn-label clear">
                        {t('clear')}
                    </div>
                </div>}
                {((helpSolve && !hasWon) || cheatingModeOn) &&
                    <div className="flex-container vertical-flex-container">
                        <Button name={t("solve").toLowerCase()} testId="btn-solve" text={<i className={ICONS["solve"]}></i>} onClick={solveConfirmationHandler} buttonStyle="btn--yellow--solid" />
                        <div className="btn-label solve">
                            {t('solve')}
                        </div>
                    </div>
                }
                <div className={`flex-container vertical-flex-container ${hasWon && "spacious"}`}>
                    <Button name={t("new_game").toLowerCase()} testId="btn-new" text={<i className={ICONS["new"]}></i>} onClick={newGameConfirmationHandler} buttonStyle="btn--blue--solid" />
                    <div className="btn-label new">
                        {t('new_game')}
                    </div>
                </div>
                {props.unsolvable && <Button name={t("no-solution").toLowerCase()} testId="btn-no-sol" text={<b>No solution</b>} onClick={handleNoSolution} />}
            </div>

        </div>
    );
};

export default Game;
