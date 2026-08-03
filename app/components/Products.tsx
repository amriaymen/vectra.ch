import Image from 'next/image';
import Section from './Section';
import Badge from './Badge';
import ProductMedia from './ProductMedia';
import {
  ALSO_BUILT,
  DEMO_URL,
  PRODUCTS,
  productPath,
  type Dictionary,
  type Locale,
} from '../data';

type Product = (typeof PRODUCTS)[number];
type Copy = Dictionary['products']['items'][keyof Dictionary['products']['items']];

function Card({
  product,
  copy,
  t,
  locale,
  priority,
}: {
  product: Product;
  copy: Copy;
  t: Dictionary;
  locale: Locale;
  priority: boolean;
}) {
  const featured = product.featured;
  const available = product.status === 'available';

  return (
    <article
      className={`group flex flex-col overflow-hidden border bg-surface ${
        featured ? 'border-primary md:col-span-2' : 'border-line'
      }`}
    >
      {/* No image is better than a wrong one — an earlier build captioned a
          school-management screenshot as a warehouse ERP. */}
      {product.image && (
        <div className={`relative w-full overflow-hidden ${featured ? 'h-64 md:h-96' : 'h-56'}`}>
          <ProductMedia
            poster={product.image}
            video={product.video}
            alt={`${product.name} — ${copy.tagline}`}
            priority={priority}
            sizes={featured ? '(min-width: 768px) 1152px, 100vw' : '(min-width: 768px) 568px, 100vw'}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-line px-3 py-1 text-xs uppercase tracking-wide text-gray-400">
            {t.products.domains[product.domain]}
          </span>
          {/* Status is the honesty control: only a sellable product may look sellable. */}
          {available ? (
            <Badge variant="accent">{t.products.statusAvailable}</Badge>
          ) : (
            <Badge>{t.products.statusRunning}</Badge>
          )}
        </div>

        <h3 className={`mt-4 leading-snug ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{copy.tagline}</p>

        <p className="mt-4 text-sm leading-relaxed text-gray-500">
          <span className="text-gray-400">{t.products.forWhoLabel}: </span>
          {copy.forWho}
        </p>

        <div className="mt-5 space-y-3">
          <p className="text-sm leading-relaxed text-gray-400">
            <strong className="text-white font-medium">{t.products.problemLabel}:</strong> {copy.problem}
          </p>
          <p className="text-sm leading-relaxed text-gray-400">
            <strong className="text-white font-medium">{t.products.solutionLabel}:</strong> {copy.solution}
          </p>
          <p className="text-sm leading-relaxed text-primary">
            <strong className="text-primary font-medium">{t.products.outcomeLabel}:</strong> {copy.outcome}
          </p>
        </div>

        {copy.scale && (
          <p className="mt-4 text-sm text-gray-300">
            <span className="text-gray-500">{t.products.scaleLabel}: </span>
            {copy.scale}
          </p>
        )}

        <ul className="mt-5 flex flex-wrap gap-2">
          {copy.modules.slice(0, featured ? 5 : 3).map((module) => (
            <li
              key={module}
              className="rounded-full bg-surface-hover px-3 py-1 text-xs text-gray-400"
            >
              {module}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          {/* A demo CTA appears only where a demo actually exists. */}
          {available && (
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-md bg-primary px-5 font-medium text-sm text-background transition-colors hover:bg-primary-hover"
            >
              {t.products.demoCta}
            </a>
          )}
          <a
            href={productPath(locale, product.slug)}
            className="group/link inline-flex min-h-[44px] items-center gap-2 text-sm text-primary transition-colors hover:text-white"
          >
            {t.products.readMore}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Products({ t, locale }: { t: Dictionary; locale: Locale }) {
  const ordered = [...PRODUCTS].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <Section id="work">
      <div className="max-w-3xl">
        <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
          {t.products.title}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-gray-300">{t.products.intro}</p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
        {ordered.map((product, index) => (
          <Card
            key={product.slug}
            product={product}
            copy={t.products.items[product.slug as keyof typeof t.products.items]}
            t={t}
            locale={locale}
            priority={index === 0}
          />
        ))}
      </div>

      <div className="mt-20 border-t border-line pt-12">
        <h3 className="text-xl leading-snug md:text-2xl">{t.products.alsoTitle}</h3>
        <p className="mt-3 max-w-2xl leading-relaxed text-gray-400">{t.products.alsoIntro}</p>

        <ul className="mt-8 grid gap-6 sm:grid-cols-3">
          {ALSO_BUILT.map((item) => {
            const copy = t.products.also[item.id as keyof typeof t.products.also];
            return (
              <li key={item.id} className="overflow-hidden border border-line bg-surface">
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={copy.name}
                    fill
                    sizes="(min-width: 640px) 368px, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-5">
                  <p className="font-medium text-white">{copy.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-400">{copy.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
