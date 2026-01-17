import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en';
import fr from './translations/fr';
import de from './translations/de';
import az from './translations/az';
import tr from './translations/tr';
import ru from './translations/ru';
import ar from './translations/ar';

const resources = {
    en,
    fr,
    de,
    az,
    tr,
    ru,
    ar,
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false, // React already escapes values
    },
    compatibilityJSON: 'v4',
});

export default i18n;
