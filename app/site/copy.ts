import fr, { type Copy } from './copy.fr';
import en from './copy.en';
import de from './copy.de';

const COPIES: Record<string, Copy> = { fr, en, de };

/** Homepage copy for a locale; French is the fallback. */
export function getCopy(locale: string): Copy {
  return COPIES[locale] ?? fr;
}

export type { Copy };
export { REGIOO_PRICE_PER_TECHNICIAN, REGIOO_SIGNUP_URL } from './copy.fr';
