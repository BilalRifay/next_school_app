import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getFirebaseTranslations } from './ContentFetch.js';

const resources = {
  en: { translation: {} },
  ta: { translation: {} },
  hi: { translation: {} },
};

console.log('Loading translations...')
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export const loadTranslations = async (language) => {
  try {
    const cachedTranslations = sessionStorage.getItem(`translations-${language}`);

    let translations;
    if (cachedTranslations) {
      translations = JSON.parse(cachedTranslations);
    } else {
      translations = await getFirebaseTranslations(language);
      sessionStorage.setItem(`translations-${language}`, JSON.stringify(translations));
    }
    const mergedTranslations = Object.values(translations.translation).reduce((keys, values) => {
      return { ...keys, ...values };
    }, {});

    i18n.addResourceBundle(language, 'translation', mergedTranslations, true, true);
    const resourceBundle = i18n.getResourceBundle(language, 'translation');
    console.log(`Resource bundle for ${language} in i18n:`, resourceBundle);
    await i18n.changeLanguage(language);
  } catch (error) {
    console.error('Error loading translations:', error);
  }
};

export default i18n;