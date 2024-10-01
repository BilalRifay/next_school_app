'use client'

import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { loadTranslations } from '../utils/i18n';

export default function Home() {
  const { i18n } = useTranslation();
  useEffect(() => {
    const initializeTranslations = async () => {
      await loadTranslations(i18n.language || 'en');
    };

    initializeTranslations();
  }, [i18n.language]);
  return (
 
  );
}
