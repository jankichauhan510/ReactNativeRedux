import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import hi from './hi.json';
import gu from './gu.json';

i18n.use(initReactI18next).init({
  lng: 'gu',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en,
    },
    hi: {
      translation: hi,
    },
    gu: { translation: gu },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
