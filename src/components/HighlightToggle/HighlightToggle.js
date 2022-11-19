import Toggle from "../Toggle/Toggle";
import "./HighlightToggle.css";

const HighlightToggle = ({ setHighlightOn, setHighlightOff, defaultHighlight }) => {
    return (
        <div className="toggle-highlight-wrapper">
            <Toggle
                name="checkbox-highlight"
                onChange={(e) => (e.target.checked ? setHighlightOn() : setHighlightOff())}
                defaultChecked={defaultHighlight}
                content={<i className="fa-solid fa fa-fill-drip"></i>}
            />
        </div>
    );
};

export default HighlightToggle;
