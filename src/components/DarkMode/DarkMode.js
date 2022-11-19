import Toggle from "../Toggle/Toggle";
import "./DarkMode.css";

const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
};

const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
};

const storedTheme = localStorage.getItem("theme");

const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

const defaultDark = storedTheme === "dark" || (storedTheme === null && prefersDark);

if (defaultDark) {
    setDark();
}

const DarkMode = () => {
    return (
        <div className="toggle-theme-wrapper">
            <i className="fas fa-solid fa-sun"></i>
            <Toggle
                name="checkbox-theme"
                onChange={(e) => (e.target.checked ? setDark() : setLight())}
                defaultChecked={defaultDark}
                content=''
            />
            <i className="fas fa-light fa-moon fa-xs"></i>
        </div>
    );
};

export default DarkMode;
