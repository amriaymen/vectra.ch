import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Section from '../../../components/Section';
import { COMPANY, LOCALES, SITE_URL, getContent, isLocale, languageAlternates, type Locale } from '../../../data';

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
  const languages = languageAlternates('/legal/terms');

  const titles: Record<Locale, string> = {
    fr: `Conditions Générales de Service & Charte Éthique | ${COMPANY.name}`,
    de: `Allgemeine Geschäftsbedingungen & Ethik-Charta | ${COMPANY.name}`,
    en: `Terms of Service & Ethical Charter | ${COMPANY.name}`,
  };

  return {
    title: titles[locale],
    description: `Conditions générales de vente, de service et charte d'éthique contractuelle de ${COMPANY.legalName} à La Tour-de-Trême (Fribourg), Suisse.`,
    alternates: { canonical: `${SITE_URL}/${locale}/legal/terms`, languages },
  };
}

export default function TermsPage({ params }: { params: { locale: string } }) {
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
                Cadre Contractuel & Éthique
              </span>
              <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
                Conditions Générales de Service
              </h1>
              <p className="mt-4 text-lg text-gray-400">
                Conditions d’engagement fondées sur le Droit suisse des obligations (CO), la transparence absolue et des principes d’éthique commerciale rigoureux.
              </p>
            </div>

            <div className="space-y-6 text-gray-300 leading-relaxed border-t border-line/60 pt-8">
              <section className="space-y-2">
                <h2 className="text-xl font-semibold text-white">1. Champ d’Application & Philosophie</h2>
                <p>
                  Les présentes Conditions Générales régissent l’ensemble des prestations de développement de logiciels, d’architecture système, d’identité de marque et de conseil fournies par <strong>{COMPANY.legalName || COMPANY.name}</strong> à ses clients institutionnels et B2B.
                </p>
                <p>
                  Toutes nos prestations sont réalisées selon le Droit suisse des obligations (CO) et une charte d’intégrité fondée sur l’équité, la transparence et le respect de la parole donnée.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-semibold text-white">2. Transparence des Prix & Jalons Fixes (Absence d’Ambiguïté)</h2>
                <p>
                  Afin de garantir une clarté totale et d’éliminer toute incertitude :
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-400">
                  <li>Chaque projet fait l’objet d’un document de cadrage écrit précisant les livrables exacts, le calendrier et un <strong>prix fixe par jalon</strong> convenu avant tout démarrage.</li>
                  <li>Aucun frais masqué, aucune facturation d’heures indéfinies et aucune clause ambiguë ne sont appliqués.</li>
                  <li>Le client conserve la liberté d’interrompre le projet entre deux jalons sans pénalité.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-semibold text-white">3. Facturation Équitable (Sans Intérêts Usuraires)</h2>
                <p>
                  La facturation s’effectue selon les jalons livrés ou selon les modalités de l’abonnement choisi.
                </p>
                <p>
                  Conformément à nos principes d’éthique financière :
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-400">
                  <li>Nous n’appliquons <strong>aucun taux d’intérêt usuraire</strong> ni pénalité d’agios composes sur les retards de paiement.</li>
                  <li>En cas de retard, une prise de contact directe et un rappel administratif sont effectués. {COMPANY.name} se réserve le droit de suspendre temporairement les livrables du jalon en cours jusqu’à régularisation du paiement.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-semibold text-white">4. Transfert d’Intégrale Propriété des Livrables</h2>
                <p>
                  Dès le règlement complet d’un jalon, l’intégralité des droits de propriété intellectuelle sur les livrables réalisés (code source, schémas de base de données, identité visuelle, médias) est transférée sans réserve au client. Aucun verrouillage propriétaire (lock-in) n’est pratiqué.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-semibold text-white">5. Charte d’Éthique et Exclusions d’Activités Prohibées</h2>
                <p>
                  {COMPANY.name} s’engage fermement à respecter des standards éthiques élevés et refuse tout projet impliquant des activités contraires à la morale, à l’éthique ou aux lois :
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-400">
                  <li>Jeux d’argent, paris en ligne et plateformes de jeu de hasard (Gambling / Jeux de hasard).</li>
                  <li>Prêts à taux d’intérêt usuraire et systèmes financiers spéculatifs trompeurs.</li>
                  <li>Contenus à caractère explicite, illicite, violent ou contraire à la dignité humaine.</li>
                  <li>Pratiques commerciales trompeuses ou malveillantes (scams, phishing, spams).</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-semibold text-white">6. Droit Applicable & For Juridique</h2>
                <p>
                  Les relations contractuelles sont exclusivement soumises au <strong>Droit suisse</strong>. Le for juridique exclusif est situé au siège de la société dans le <strong>Canton de Fribourg, Suisse</strong>.
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
