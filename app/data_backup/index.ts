import en, { type Dictionary } from './content.en';
import fr from './content.fr';
import de from './content.de';
import { DEFAULT_LOCALE, LOCALES, type Locale } from './config';

const DICTIONARIES: Record<Locale, Dictionary> = { en, fr, de };

export function getContent(locale: string): Dictionary {
  return DICTIONARIES[locale as Locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export type { Dictionary };
export * from './config';
