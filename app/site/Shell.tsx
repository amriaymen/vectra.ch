import s from './site.module.css';
import type { Copy } from './copy';
import { COMPANY, LOCALES, LOCALE_TAGS, type Locale } from '../data';

/** The brand mark, drawn inline so it takes the page's colours. */
function Logo() {
  return (
    <svg viewBox="0 0 1423.26 1186.05" aria-hidden="true">
      <rect fill="#d63a08" x="948.84" width="474.42" height="474.42" rx="48.36" />
      <path
        fill="currentColor"
        d="M946.49,726.21v411.48a48.36,48.36,0,0,1-48.36,48.36H498a48.35,48.35,0,0,1-40.3-21.63L8.06,486.57A48.31,48.31,0,0,1,0,459.84V48.36A48.36,48.36,0,0,1,48.36,0H448.47a48.35,48.35,0,0,1,40.3,21.63L938.43,699.48A48.31,48.31,0,0,1,946.49,726.21Z"
      />
    </svg>
  );
}

function Brand({ locale }: { locale: Locale }) {
  return (
    <a className={s.brand} href={`/${locale}`} aria-label="Vectrastudio, by Timgroup">
      <Logo />
      <span aria-hidden="true">
        <b>VECTRASTUDIO</b>
        <small>By Timgroup</small>
      </span>
    </a>
  );
}

/**
 * The current page below the locale ('' on the homepage), so the language links
 * stay on it. Pages whose address is translated pass one path per language.
 */
type PagePath = string | Record<Locale, string>;

function Languages({ locale, path, label }: { locale: Locale; path: PagePath; label: string }) {
  return (
    <span className={s.langs} role="group" aria-label={label}>
      {LOCALES.map((option) => (
        <a
          key={option}
          href={`/${option}${typeof path === 'string' ? path : path[option]}`}
          hrefLang={LOCALE_TAGS[option].hreflang}
          aria-current={option === locale ? 'true' : undefined}
        >
          {option.toUpperCase()}
        </a>
      ))}
    </span>
  );
}

export function SiteHeader({ locale, copy, path = '' }: { locale: Locale; copy: Copy; path?: PagePath }) {
  return (
    <header className={s.nav}>
      <Brand locale={locale} />
      <nav aria-label={copy.meta.navLabel}>
        {copy.nav.links.map((link) => (
          <a key={link.href} href={`/${locale}${link.href}`}>
            {link.label}
          </a>
        ))}
      </nav>
      <span className={s.navEnd}>
        <Languages locale={locale} path={path} label={copy.meta.language} />
        <a className={`${s.btn} ${s.btnSmall}`} href={`/${locale}#metier`}>
          {copy.nav.cta}
        </a>
      </span>
    </header>
  );
}

export function SiteFooter({ locale, copy, path = '' }: { locale: Locale; copy: Copy; path?: PagePath }) {
  const phones = [COMPANY.phoneSwiss, COMPANY.phoneBureau].filter(Boolean);

  return (
    <footer className={s.footer}>
      <div className={s.footerTop}>
        <div>
          <Brand locale={locale} />
          <p className={s.footerTitle}>{copy.footer.title}</p>
          <Languages locale={locale} path={path} label={copy.meta.language} />
        </div>

        <nav aria-label={copy.footer.explore}>
          <h3>{copy.footer.explore}</h3>
          <ul>
            {copy.nav.links.map((link) => (
              <li key={link.href}>
                <a href={`/${locale}${link.href}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3>{copy.footer.contact}</h3>
          <ul>
            <li>
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </li>
            {phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
              </li>
            ))}
          </ul>
          <address>
            {COMPANY.streetAddress}
            <br />
            {COMPANY.postalCode} {COMPANY.addressLocality} ({COMPANY.addressRegion}), {copy.footer.country}
          </address>
        </div>

        <nav aria-label={copy.footer.legal}>
          <h3>{copy.footer.legal}</h3>
          <ul>
            <li>
              <a href={`/${locale}/legal/terms`}>{copy.footer.terms}</a>
            </li>
            <li>
              <a href={`/${locale}/legal/privacy`}>{copy.footer.privacy}</a>
            </li>
            <li>
              <a href={`/${locale}/legal/impressum`}>{copy.footer.impressum}</a>
            </li>
          </ul>
        </nav>
      </div>

      <div className={s.footerBase}>
        <p>
          {copy.footer.rights} © {new Date().getFullYear()}
        </p>
        <p>
          {copy.footer.group} {COMPANY.legalName} · {COMPANY.uid}
        </p>
      </div>
    </footer>
  );
}
