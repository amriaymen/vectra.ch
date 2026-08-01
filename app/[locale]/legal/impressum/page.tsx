import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Section from '../../../components/Section';
import { COMPANY, LOCALE_TAGS, LOCALES, SITE_URL, getContent, isLocale, languageAlternates, type Locale } from '../../../data';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  const languages = languageAlternates('/legal/impressum');

  const titles: Record<Locale, string> = {
    fr: `Mentions Légales & Impressum | ${COMPANY.name}`,
    de: `Impressum & Rechtliche Hinweise | ${COMPANY.name}`,
    en: `Legal Notice & Impressum | ${COMPANY.name}`,
  };

  return {
    title: titles[locale],
    description: `Mentions légales et informations officielles concernant la société ${COMPANY.legalName} à La Tour-de-Trême (Fribourg), Suisse.`,
    alternates: { canonical: `${SITE_URL}/${locale}/legal/impressum`, languages },
  };
}

export default function ImpressumPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getContent(locale);

  return (
    <>
      <Header t={t} locale={locale} />
      <main className="py-12 md:py-20">
        <Section>
          <div className="max-w-3xl space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Information Officielle
              </span>
              <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
                Mentions Légales & Impressum
              </h1>
              <p className="mt-4 text-lg text-gray-400">
                Informations légales requises conformément à la loi suisse (Art. 3 al. 1 let. s LCD).
              </p>
            </div>

            <div className="space-y-6 text-gray-300 leading-relaxed border-t border-line/60 pt-8">
              <section className="space-y-2">
                <h2 className="text-xl font-semibold text-white">1. Éditeur du Site & Raison Sociale</h2>
                <p>
                  <strong>Nom de la société :</strong> {COMPANY.legalName || COMPANY.name}<br />
                  <strong>Siège social :</strong> {COMPANY.streetAddress}, {COMPANY.postalCode} {COMPANY.addressLocality} ({COMPANY.addressRegion}), Suisse<br />
                  <strong>Pays :</strong> Suisse (CH)
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-semibold text-white">2. Contact & Direction</h2>
                <p>
                  <strong>Adresse e-mail :</strong>{' '}
                  <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">
                    {COMPANY.email}
                  </a>
                  <br />
                  <strong>Téléphone direct :</strong>{' '}
                  <a href={`tel:${COMPANY.phoneSwiss.replace(/\s/g, '')}`} className="text-primary hover:underline">
                    {COMPANY.phoneSwiss}
                  </a>
                  <br />
                  <strong>Direction :</strong> Direction Générale {COMPANY.name}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-semibold text-white">3. Hébergement & Souveraineté des Données</h2>
                <p>
                  Conformément aux engagements de {COMPANY.name}, l’intégralité du site et des données clients sont hébergées exclusivement en <strong>Suisse</strong> sur des serveurs hautement sécurisés (Infomaniak Network SA, Genève, Suisse / Datacenters certifiés ISO 27001 & ISO 50001).
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-semibold text-white">4. Propriété Intellectuelle</h2>
                <p>
                  L’ensemble des contenus, marques, logos, graphismes, codes sources et vidéos présents sur ce site sont protégés par la loi suisse sur le droit d’auteur (LDA) et appartiennent exclusivement à {COMPANY.name} Sàrl, sauf mention contraire.
                </p>
              </section>
            </div>
          </div>
        </Section>
      </main>
      <Footer t={t} />
    </>
  );
}
