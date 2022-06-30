import React, { useState } from "react";
import Grid from "../Grid/Grid";
import Timer from "../Timer/Timer";

const GameBoard = (props) => {

    // Keep track of running state of timer due to pause/play button only
    const [isRunningTimer, setIsRunningTimer] = useState(true);

    // Handle isRunning from timer
    const handleIsRunningCallback = () => {
        setIsRunningTimer(!isRunningTimer);
    };

    // Handle isRunning from timer
    const handleTurnOnRunningCallback = () => {
        setIsRunningTimer(true);
    };

    return <div>
        <Timer
            seconds={props.seconds}
            isRunning={isRunningTimer && props.isRunning}
            handleSecondsCallback={props.handleSecondsCallback}
            hasWon={props.hasWon}
            handleIsRunningCallback={handleIsRunningCallback}
            handleResetCallback={props.handleResetCallback}
            reset={props.reset}
            handleTurnOnRunningCallback={handleTurnOnRunningCallback}
            handleHasWonCallback={props.handleHasWonCallback}
        />

        <Grid
            className="grid"
            grid={props.grid}
            onChange={props.handleChange}
            isPaused={(!isRunningTimer || !props.isRunning) && !props.hasWon}
        />
    </div>;
};

export default GameBoard;
