import React from "react";
import "./Loading.css";

const Loading = () => {
    return (
        <div className="custom-center">
            <i className="fas fa-spinner fa-pulse fa-5x" data-testid="loading-icon"></i>
        </div>
    );
};

export default Loading;
