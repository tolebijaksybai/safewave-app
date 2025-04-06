// src/i18n.js
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "./locales/en.json"
import ru from "./locales/ru.json"
import kz from "./locales/kz.json"

const savedLang = localStorage.getItem("lang") || "en" // ← читаем сохранённый язык

i18n
    .use(initReactI18next)
    .init({
        lng: savedLang,
        fallbackLng: "en",
        resources: {
            en: { translation: en },
            ru: { translation: ru },
            kz: { translation: kz },
        },
        interpolation: {
            escapeValue: false,
        },
    })

export default i18n
