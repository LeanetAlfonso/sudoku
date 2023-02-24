import React, { Suspense } from 'react';
import ReactDOM from "react-dom/client";
import i18n from "i18next";
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";
import '@fortawesome/fontawesome-free/css/all.min.css';
import LanguageDetector from 'i18next-browser-languagedetector';
import Loading from './components/Loading/Loading';
import './index.css';
import App from './App';

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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Suspense fallback={<Loading scale={5} />}>
            <App />
        </Suspense>
    </React.StrictMode>
);
