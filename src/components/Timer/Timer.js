import React, { Component } from "react";
import { formatTime } from "../../utils/index";


export default class Timer extends Component {

    render() {
        const { seconds, isRunning, handlePausePlay } = this.props;

        return <h2 className="timer">
            {formatTime(seconds)} <i className={`btn-pause-play ${isRunning ? "far fa-pause-circle" : "pauseplay far fa-play-circle"}`} onClick={handlePausePlay}> </i>
        </h2>;
    }
}
