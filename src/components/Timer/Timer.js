import React, { useState, useEffect } from 'react';
import { formatTime } from "../../utils/index";

const Timer = (props) => {
    const [seconds, setSeconds] = useState(props.seconds);

    // Handle timer pause/play button
    const handlePausePlay = () => {
        props.handleIsRunningCallback();
        props.handleHasWonCallback(); // allow pause/play after game over
    };

    // Timer
    useEffect(() => {
        // reset state variables in GameBoard 
        if (props.reset) {
            setSeconds(0);
            props.handleTurnOnRunningCallback();
            props.handleResetCallback();

        }

        // ensure timer starts in next new game
        if (props.hasWon) {
            props.handleTurnOnRunningCallback();
        }

        // increment by one every second unless paused
        if (props.isRunning && !props.hasWon) {
            const intervalId = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }

        // update seconds in Game
        else {
            props.handleSecondsCallback(seconds);
        }
        return undefined;
    }, [seconds, setSeconds, props]);

    return <h2 className="timer">
        {formatTime(seconds)} <i className={`btn-pause-play ${props.isRunning ? "far fa-pause-circle" : "pauseplay far fa-play-circle"}`} onClick={handlePausePlay}> </i>
    </h2>;
};

export default Timer;
