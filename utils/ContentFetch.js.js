import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const getFirebaseTranslations = async (language) => {
  const translations = {};
  const translationRef = collection(db, 'Content', language ,'translation');
  try {
    const snapshot = await getDocs(translationRef);
    snapshot.forEach(doc => {
      translations[doc.id] = doc.data();
    });
  } catch (error) {
    console.error('Error fetching translations:', error);
  }
  return { translation: translations };
};
export { getFirebaseTranslations };
