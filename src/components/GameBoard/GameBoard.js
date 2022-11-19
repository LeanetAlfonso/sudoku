import React, { useState } from "react";
import Grid from "../Grid/Grid";
import Timer from "../Timer/Timer";
import ModeMenu from "../ModeMenu/ModeMenu";
import KeyPad from "../KeyPad/KeyPad";
import HighlightToggle from "../HighlightToggle/HighlightToggle";
import './GameBoard.css';

const GameBoard = (props) => {

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
                        mode={props.mode}
                        changeModeHandler={props.handleChangeModeCallback}
                    />
                </div>
                <div className="highlight-container">
                    <HighlightToggle
                        defaultHighlight={defaultHighlight}
                        setHighlightOff={() => switchHighlight('off')} setHighlightOn={() => switchHighlight('on')}
                    />
                </div>
                <Timer
                    seconds={props.seconds}
                    isRunning={isRunningTimer && props.isRunning}
                    handleSecondsCallback={props.handleSecondsCallback}
                    hasWon={props.hasWon}
                    handleIsRunningCallback={handleIsRunningCallback}
                    handleResetCallback={props.handleResetCallback}
                    reset={props.reset}
                    handleTurnOnRunningCallback={handleTurnOnRunningCallback}
                />

            </div>
        </div>
        <Grid
            grid={props.grid}
            onChange={props.handleChange}
            onFocus={props.handleFocus}
            isPaused={(!isRunningTimer || !props.isRunning) && !props.hasWon}
            hasWon={props.hasWon}
            selectedCell={props.selectedCell}
            highlightOff={highlight === 'off'}
        />

        {!props.hasWon &&
            <KeyPad
                onClick={props.handleChange}
                selectedCell={props.selectedCell}
                isPaused={(!isRunningTimer || !props.isRunning) && !props.hasWon}
            />}
    </div>;
};

export default GameBoard;
