import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import i18n from "i18next";
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";
import 'flag-icons/css/flag-icons.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import LanguageDetector from 'i18next-browser-languagedetector';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
import Loading from './components/Loading/Loading';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        supportedLngs: ['en', 'es', 'fr'],
        fallbackLng: "en",
        detection: {
            order: ['localStorage', 'cookie', 'path', 'htmlTag', 'subdomain'],
            caches: ['localStorage', 'cookie']
        },
        backend: {
            loadPath: 'assets/locales/{{lng}}/translation.json'
        }
    });

ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback={<Loading />}>
            <App />
        </Suspense>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
