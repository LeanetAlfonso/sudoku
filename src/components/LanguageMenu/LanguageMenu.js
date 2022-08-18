import "./LanguageMenu.css";
import i18n from "i18next";

const languages = [
    {
        code: 'en',
        name: 'English',
        country_code: 'gb'
    }, {
        code: 'sp',
        name: 'Español',
        country_code: 'es'
    },
    {
        code: 'fr',
        name: 'Français',
        country_code: 'fr'
    }
];

const LanguageMenu = () => {
    return (
        <div className="lang-menu-label">
            <i className="fas fa-globe custom-globe fa-sm"></i>
            <select data-testid="lang-menu-select" id="lang-menu-select" className="lang-menu-select" value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}>
                {languages.map(({ name, country_code }) => (
                    <option data-testid="lang-menu-select-option" value={country_code} key={country_code}>
                        {name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageMenu;
