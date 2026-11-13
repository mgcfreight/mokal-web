'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { translate } from '@/utils/locale';

const LocaleContext = createContext<string>('en');

export function LocaleProvider({ children, lang }: { children: ReactNode; lang: string }) {
  return <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useTranslate() {
  const lang = useLocale();
  return (field: any) => translate(field, lang);
}
