import "./DarkMode.css";

const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
};

const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
};

// 4
const storedTheme = localStorage.getItem("theme");

const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

const defaultDark =
    storedTheme === "dark" || (storedTheme === null && prefersDark);

if (defaultDark) {
    setDark();
}


const DarkMode = () => {


    return (
        <div className="toggle-theme-wrapper">
            <span></span>
            <i className="fas fa-solid fa-sun"></i>
            <label className="toggle-theme" htmlFor="checkbox">
                <input
                    type="checkbox"
                    id="checkbox"
                    onChange={(e) => (e.target.checked ? setDark() : setLight())}
                    defaultChecked={defaultDark}
                />
                <div className="slider round"></div>
            </label>
            <i className="fas fa-light fa-moon fa-xs"></i>
        </div>

    );
};

export default DarkMode;
