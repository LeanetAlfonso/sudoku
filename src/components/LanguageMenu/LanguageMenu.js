import "./LanguageMenu.css";
import i18n from "i18next";
import DropDown from "../DropDown/DropDown";

const languages = [
    {
        code: 'en',
        name: 'English',
        value: 'gb'
    }, {
        code: 'sp',
        name: 'Español',
        value: 'es'
    },
    {
        code: 'fr',
        name: 'Français',
        value: 'fr'
    }
];

const LanguageMenu = () => {
    return (
        <div className="lang-menu-label">
            <i className="fas fa-globe custom-globe fa-sm"></i>
            <DropDown
                selected={i18n.language}
                content={languages}
                changeHandler={(e) => i18n.changeLanguage(e.target.value)}
            />
        </div>
    );
};

export default LanguageMenu;
