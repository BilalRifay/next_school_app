import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getFirebaseTranslations } from './ContentFetch.js';

const resources = {
  en: { translation: {} },
  ta: { translation: {} },
  hi: { translation: {} },
};

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

const CACHE_DURATION = 24 * 60 * 60 * 1000;


const isCacheExpired = (timestamp) => {
  const currentTime = Date.now();
  return (currentTime - timestamp) > CACHE_DURATION;
};


const fetchFromCache = async (language) => {
  const cache = await caches.open('translations-cache');
  const cachedResponse = await cache.match(`/translations/${language}`);

  if (cachedResponse) {
    const cachedData = await cachedResponse.json();

    if (cachedData.timestamp && !isCacheExpired(cachedData.timestamp)) {
      return cachedData.translations;
    } else {
      console.log(`Cache expired for ${language}`);
      await cache.delete(`/translations/${language}`);
    }
  }
  return null;
};


const storeInCache = async (language, translations) => {
  const cache = await caches.open('translations-cache');
  const response = new Response(JSON.stringify({
    translations,
    timestamp: Date.now()
  }));
  cache.put(`/translations/${language}`, response);
};


const fetchFromSessionStorage = (language) => {
  const cachedTranslations = sessionStorage.getItem(`translations-${language}`);

  if (cachedTranslations) {
    const { translations, timestamp } = JSON.parse(cachedTranslations);

    if (timestamp && !isCacheExpired(timestamp)) {
      return translations;
    } else {
      console.log(`Session storage expired for ${language}`);
      sessionStorage.removeItem(`translations-${language}`);
    }
  }
  return null;
};


const storeInSessionStorage = (language, translations) => {
  sessionStorage.setItem(`translations-${language}`, JSON.stringify({
    translations,
    timestamp: Date.now()
  }));
};


export const loadTranslations = async (language) => {
  try {
    let translations = fetchFromSessionStorage(language);

    if (translations) {
      console.log(`Loaded translations from session storage for ${language}`);
    } else {

      translations = await fetchFromCache(language);

      if (translations) {
        console.log(`Loaded translations from Cache API for ${language}`);
      }
    }

    if (!translations) {
      console.log(`Fetching translations from Firebase for ${language}`);
      translations = await getFirebaseTranslations(language);


      storeInSessionStorage(language, translations);
      await storeInCache(language, translations);
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
