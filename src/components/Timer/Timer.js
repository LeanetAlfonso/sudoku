import React, { useState, useEffect } from 'react';
import { formatTime } from "../../utils/index";
import { useTranslation } from "react-i18next";

const Timer = (props) => {
    const [seconds, setSeconds] = useState(props.seconds);

    // Translation
    const { t } = useTranslation();

    // Handle timer pause/play button
    const handlePausePlay = () => {
        props.handleIsRunningCallback();
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

    return <div className="timer" data-testid="timer">
        <p>{formatTime(seconds)}</p>{!props.hasWon && (props.isRunning ?
            <i
                title={t("pause").toLowerCase()}
                data-testid="pause-icon"
                className="btn-pause-play far fa-pause-circle"
                onClick={handlePausePlay}
            />
            :
            <i title={t("play").toLowerCase()}
                data-testid="play-icon"
                className="btn-pause-play far fa-play-circle"
                onClick={handlePausePlay}
            />
        )}
    </div>;
};

export default Timer;
