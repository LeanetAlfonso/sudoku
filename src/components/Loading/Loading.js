import React from "react";
import "./Loading.css";
import { CircularProgress } from '@material-ui/core';

const Loading = () => {
    return (
        <div className="custom-center">
            <CircularProgress disableShrink color="#5b8588" size='8vh' />
        </div>
    );
};

export default Loading;
