import { notFound } from 'next/navigation';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import Problem from '../components/Problem';
import Tracks from '../components/Tracks';
import Products from '../components/Products';
import Testimonials from '../components/Testimonials';
import Benefits from '../components/Benefits';
import Process from '../components/Process';
import Pricing from '../components/Pricing';
import Procurement from '../components/Procurement';
import ScopeForm from '../components/ScopeForm';
import Faq from '../components/Faq';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';
import EngagementModels from '../components/EngagementModels';
import WhoWeServe from '../components/WhoWeServe';
import DecisionMatrix from '../components/DecisionMatrix';
import WhyVectra from '../components/WhyVectra';
import { LOCALE_TAGS, SITE_URL, getContent, isLocale, type Locale } from '../data';

export default function Home({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getContent(locale);

  // Lives on the homepage only — the layout would repeat it on every route.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/${locale}#faq`,
    inLanguage: LOCALE_TAGS[locale].hreflang,
    mainEntity: t.faqs.items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    // id is the `inert` target while the mobile panel is open (see MobileNav).
    <div id="page-shell" className="isolate bg-background text-white">
      {/* Section tones alternate dark / light so no two neighbours share a
          background, with accent (blue) and action (lime) used once each.
          TESTIMONIALS is currently empty so Testimonials renders nothing — when
          real quotes land it becomes a light band between two darks and
          DecisionMatrix must flip to dark to keep the alternation. */}
      <Header t={t} locale={locale} />
      <Hero t={t} />
      <EngagementModels t={t} />
      <WhoWeServe t={t} />
      <Products t={t} locale={locale} />
      <Testimonials t={t} />
      <DecisionMatrix t={t} />
      <WhyVectra t={t} />
      <Process t={t} />
      <Pricing t={t} />
      {/* Directly after pricing: the threshold question is what a public buyer
          asks the moment they see a number. */}
      <Procurement t={t} />
      <ScopeForm t={t} locale={locale} />
      <Faq items={t.faqs.items} title={t.faqs.title} />
      <CtaBanner t={t} />
      <Footer t={t} locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
