import "./ModeMenu.css";
import DropDown from "../DropDown/DropDown";

const modes = [
    {
        name: 'easy',
        value: 'easy'
    }, {
        name: 'medium',
        value: 'medium'
    },
    {
        name: 'hard',
        value: 'hard'
    },
    {
        name: 'expert',
        value: 'expert'
    }
];

const ModeMenu = (props) => {
    return (
        <div className="mode-menu">
            <DropDown
                selected={props.mode}
                content={modes}
                changeHandler={(e) => props.changeModeHandler(e.target.value)}
            />
        </div>
    );
};

export default ModeMenu;
