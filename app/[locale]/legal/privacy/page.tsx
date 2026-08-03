import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Section from '../../../components/Section';
import { COMPANY, HOSTING, LOCALES, SITE_URL, SUBPROCESSORS, getContent, isLocale, languageAlternates, type Locale } from '../../../data';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/**
 * What each sub-processor actually receives. Keyed by SUBPROCESSORS id so a new
 * entry in config.ts fails the build here until its purpose is written — the
 * disclosure cannot silently fall behind the code that calls the service.
 */
const SUBPROCESSOR_PURPOSE: Record<(typeof SUBPROCESSORS)[number]['id'], string> = {
  anthropic:
    'reçoit le descriptif du projet — secteur, modules souhaités, nombre d’utilisateurs, sites, systèmes existants, budget indicatif, nom de votre organisation et le texte libre que vous rédigez — afin de générer le brouillon de cadrage. Ne reçoit ni votre nom, ni votre adresse e-mail.',
  resend:
    'reçoit votre nom, votre adresse e-mail professionnelle, votre organisation et le cadrage produit, uniquement pour nous acheminer votre demande par courriel.',
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  const languages = languageAlternates('/legal/privacy');

  const titles: Record<Locale, string> = {
    fr: `Politique de Confidentialité (nLPD) | ${COMPANY.name}`,
    de: `Datenschutzerklärung (nDSG) | ${COMPANY.name}`,
    en: `Privacy Policy (Swiss DPA) | ${COMPANY.name}`,
  };

  return {
    title: titles[locale],
    description: `Politique de protection des données personnelles de ${COMPANY.legalName} conforme à la nouvelle loi fédérale suisse sur la protection des données (nLPD).`,
    alternates: { canonical: `${SITE_URL}/${locale}/legal/privacy`, languages },
  };
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
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
                Protection des Données (nLPD)
              </span>
              <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
                Politique de Confidentialité
              </h1>
              <p className="mt-4 text-lg text-gray-400">
                Transparence totale et conformité avec la nouvelle Loi fédérale sur la Protection des Données (nLPD) et le RGPD.
              </p>
            </div>

            <div className="space-y-6 text-gray-300 leading-relaxed border-t border-line/60 pt-8">
              <section className="space-y-2">
                <h2 className="text-xl font-semibold text-white">1. Principe Général & Souveraineté Suisse</h2>
                <p>
                  Chez <strong>{COMPANY.name}</strong>, la confidentialité et la sécurité de vos données sont inscrites au cœur de notre architecture. Vos données ne sont jamais revendues, louées ou cédées à des tiers.
                </p>
                <p>
                  <strong>Les systèmes que nous construisons pour vous</strong> sont hébergés en <strong>Suisse</strong>, chez {HOSTING.client.provider} ({HOSTING.client.location}), sous juridiction suisse.
                </p>
                <p>
                  <strong>Le présent site vitrine</strong> est hébergé chez {HOSTING.site.provider}, hors de Suisse, et les informations que vous saisissez dans le formulaire de cadrage sont transmises à des prestataires eux aussi situés hors de Suisse. Nous préférons l’écrire noir sur blanc plutôt que de laisser entendre une exclusivité suisse qui ne s’appliquerait pas ici — le détail figure au point 5.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-semibold text-white">2. Collecte et Traitement des Données</h2>
                <p>
                  Nous appliquons le principe de minimisation des données. Nous collectons uniquement les informations nécessaires au traitement de vos demandes de cadrage, de devis et de livraison de projets :
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-400">
                  <li>Formulaire de cadrage instantané (nom, e-mail professionnel, organisation, caractéristiques du projet).</li>
                  <li>Prise de contact directe et correspondance professionnelle.</li>
                  <li>Données techniques anonymisées de navigation à des fins strictement d’analyse de performance du site.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-semibold text-white">3. Vos Droits (Droit d’Accès et d’Effacement)</h2>
                <p>
                  Conformément à la nLPD suisse, vous disposez à tout moment des droits suivants sur vos données personnelles :
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-400">
                  <li><strong>Droit d’accès :</strong> Obtenir une copie intégrale des données vous concernant.</li>
                  <li><strong>Droit de rectification :</strong> Corriger toute donnée inexacte ou incomplète.</li>
                  <li><strong>Droit à l’effacement (Droit à l’oubli) :</strong> Demander la suppression définitive de vos données de nos registres.</li>
                </ul>
                <p className="pt-2">
                  Pour exercer vos droits, contactez directement notre responsable de la protection des données à :{' '}
                  <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">
                    {COMPANY.email}
                  </a>.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-semibold text-white">4. Sécurité & Chiffrement</h2>
                <p>
                  Tous les échanges d’informations sont chiffrés selon les standards industriels les plus stricts (HTTPS / TLS 1.3). Les bases de données sont isolées et chiffrées au repos.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-semibold text-white">
                  5. Sous-traitants et communication de données à l’étranger
                </h2>
                <p>
                  Conformément à l’art. 19 nLPD, voici précisément qui reçoit les données que vous saisissez sur ce site, et pourquoi. Cette liste correspond aux services réellement appelés par notre formulaire de cadrage :
                </p>
                <ul className="list-disc space-y-2 pl-6 text-gray-400">
                  {SUBPROCESSORS.map((processor) => (
                    <li key={processor.id}>
                      <strong className="text-gray-300">{processor.name}</strong> ({processor.country}) —{' '}
                      {SUBPROCESSOR_PURPOSE[processor.id]}
                    </li>
                  ))}
                </ul>
                <p className="pt-2">
                  Les États-Unis ne bénéficient pas d’une décision d’adéquation du Conseil fédéral. Ces transferts reposent donc sur les <strong>clauses contractuelles types</strong>, lues au regard de la LPD suisse — et non sur une quelconque équivalence de niveau de protection. Vous pouvez nous demander une copie des garanties en vigueur à l’adresse{' '}
                  <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">
                    {COMPANY.email}
                  </a>.
                </p>
                <p>
                  Si vous préférez qu’aucune donnée ne quitte la Suisse, ne remplissez pas le formulaire : écrivez-nous ou appelez-nous directement, et le cadrage se fera sans passer par ces services.
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
