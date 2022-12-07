import "./Toggle.css";

const Toggle = ({ name, onChange, defaultChecked, content }) => {
    return (
        <label className="toggle">
            <input
                data-testid={name}
                type="checkbox"
                name={name}
                value={name}
                onChange={onChange}
                defaultChecked={defaultChecked}
            />
            <div className="toggle-circle">
                {content}
            </div>
            <div className="slider round" />
        </label>
    );
};

export default Toggle;
