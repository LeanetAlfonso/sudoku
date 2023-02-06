import React, { useState } from "react";
import Grid from "../Grid/Grid";
import Timer from "../Timer/Timer";
import ModeMenu from "../ModeMenu/ModeMenu";
import HighlightToggle from "../HighlightToggle/HighlightToggle";
import './GameBoard.css';

const GameBoard = ({
    startingGrid,
    seconds,
    isRunning,
    handleSecondsCallback,
    hasWon,
    handleResetTimerCallback,
    handleResetGridCallback,
    resetTimer,
    mode,
    handleChangeModeCallback,
    resetGrid,
    handleGridCallback,
    pressedSolve,
    cleared,
    handleMovesCallback
}) => {

    // Keep track of running state of timer due to pause/play button only
    const [isRunningTimer, setIsRunningTimer] = useState(true);

    // Keep track of highlight
    const storedHighlight = localStorage.getItem("highlight");
    const defaultHighlight = storedHighlight === 'on' || storedHighlight === null;
    const [highlight, setHighlight] = useState(storedHighlight || 'on');

    // Handle isRunning from timer
    const handleIsRunningCallback = () => {
        setIsRunningTimer(!isRunningTimer);
    };

    // Handle resume timer (turn on running) from timer
    const handleTurnOnRunningCallback = () => {
        setIsRunningTimer(true);
    };

    // Highlight switch
    const switchHighlight = (val) => {
        setHighlight(val);
        localStorage.setItem("highlight", val);
        document.documentElement.setAttribute("highlight", val);
    };

    return <div>
        <div className="mode-timer-wrapper">
            <div className="mode-timer">
                <div className="modes-dropdown">
                    <ModeMenu
                        mode={mode}
                        changeModeHandler={handleChangeModeCallback}
                    />
                </div>
                <div className="highlight-container">
                    <HighlightToggle
                        defaultHighlight={defaultHighlight}
                        setHighlightOff={() => switchHighlight('off')}
                        setHighlightOn={() => switchHighlight('on')}
                    />
                </div>
                <Timer
                    seconds={seconds}
                    isRunning={isRunningTimer && isRunning}
                    handleSecondsCallback={handleSecondsCallback}
                    hasWon={hasWon}
                    handleIsRunningCallback={handleIsRunningCallback}
                    handleResetTimerCallback={handleResetTimerCallback}
                    resetTimer={resetTimer}
                    handleTurnOnRunningCallback={handleTurnOnRunningCallback}
                />
            </div>
        </div>
        <Grid
            startingGrid={startingGrid}
            isPaused={(!isRunningTimer || !isRunning) && !hasWon}
            highlightOff={highlight === 'off'}
            resetGrid={resetGrid}
            handleGridCallback={handleGridCallback}
            handleResetGridCallback={handleResetGridCallback}
            pressedSolve={pressedSolve}
            cleared={cleared}
            handleMovesCallback={handleMovesCallback}
            hasWon={hasWon}
        />
    </div>;
};

export default GameBoard;
