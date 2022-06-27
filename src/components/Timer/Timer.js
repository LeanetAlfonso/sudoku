import React, { useState, useEffect } from 'react';
import { formatTime } from "../../utils/index";

const Timer = (props) => {
    const [seconds, setSeconds] = useState(props.seconds);

    // Handle timer pause/play button
    const handlePausePlay = () => {
        props.handleIsRunningCallback();
    };

    // Timer (increment by one every second unless paused)
    useEffect(() => {
        if (props.isRunning && !props.hasWon) {
            const intervalId = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
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
