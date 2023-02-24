import React from "react";
import "./Loading.css";

const Loading = (props) => {
    return (
        <div className="custom-center">
            <i className={`fas fa-spinner fa-pulse fa-${props.scale}x`} data-testid="loading-icon"></i>
        </div>
    );
};

export default Loading;
