import type { Language } from '../i18n/LanguageContext';

const locales: Record<Language, string> = { en: 'en-US', pl: 'pl-PL' };

export function formatPrice(value: number, currency = 'PLN', language: Language = 'en'): string {
  return new Intl.NumberFormat(locales[language], {
    style: 'currency',
    currency,
  }).format(value);
}

export function formatDate(value: string, language: Language = 'en'): string {
  return new Intl.DateTimeFormat(locales[language], {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function shortId(value: string): string {
  return `${value.slice(0, 8)}…${value.slice(-4)}`;
}
