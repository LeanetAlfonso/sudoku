import React, { useState } from "react";
import Grid from "../Grid/Grid";
import Timer from "../Timer/Timer";
import ModeMenu from "../ModeMenu/ModeMenu";
import './GameBoard.css';

const GameBoard = (props) => {

    // Keep track of running state of timer due to pause/play button only
    const [isRunningTimer, setIsRunningTimer] = useState(true);

    // Handle isRunning from timer
    const handleIsRunningCallback = () => {
        setIsRunningTimer(!isRunningTimer);
    };

    // Handle resume (turn on running) from timer
    const handleTurnOnRunningCallback = () => {
        setIsRunningTimer(true);
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
        />
    </div>;
};

export default GameBoard;
