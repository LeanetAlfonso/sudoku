import "./DropDown.css";

const DropDown = ({ selected, content, changeHandler }) => {
    return (
        <div className="lang-menu-label">
            <select data-testid="lang-menu-select" id="lang-menu-select" className="lang-menu-select" value={selected}
                onChange={changeHandler}>
                {content.map(({ name, value }) => (
                    <option data-testid="lang-menu-select-option" value={value} key={value}>
                        {name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropDown;
