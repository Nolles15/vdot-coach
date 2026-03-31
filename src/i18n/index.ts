import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import nl from './nl';
import en from './en';

i18n.use(initReactI18next).init({
  resources: {
    nl: { translation: nl },
    en: { translation: en },
  },
  lng: 'nl',
  fallbackLng: 'nl',
  interpolation: { escapeValue: false },
});

export default i18n;
