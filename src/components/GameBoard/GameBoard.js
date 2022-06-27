import React, { useState } from "react";
import Grid from "../Grid/Grid";
import Timer from "../Timer/Timer";

const GameBoard = (props) => {

    const [isRunningTimer, setIsRunningTimer] = useState(props.isRunning);

    // Handle isRunning from timer
    const handleIsRunningCallback = () => {
        setIsRunningTimer(!isRunningTimer);
    };

    return <div>
        <Timer
            seconds={props.seconds}
            isRunning={isRunningTimer && props.isRunning}
            handleSecondsCallback={props.handleSecondsCallback}
            hasWon={props.hasWon}
            handleIsRunningCallback={handleIsRunningCallback}
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
