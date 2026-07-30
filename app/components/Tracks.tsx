import Section from './Section';
import Badge from './Badge';
import type { Dictionary } from '../data';

export default function Tracks({ t }: { t: Dictionary }) {
  const tracks = [
    { key: 'build' as const, cta: t.tracks.ctaBuild, data: t.tracks.build },
    { key: 'tell' as const, cta: t.tracks.ctaTell, data: t.tracks.tell },
  ];

  return (
    <Section id="services">
      <div className="max-w-4xl">
        <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
          {t.tracks.title}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-gray-300">{t.tracks.intro}</p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
        {tracks.map((track, index) => (
          <div
            key={track.key}
            className="flex flex-col rounded-xl border border-line bg-surface p-6 md:p-10"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm uppercase tracking-[0.15em] text-primary">{track.data.kicker}</p>
              {index === 0 && <Badge variant="accent">{t.tracks.badge}</Badge>}
            </div>

            <h3 className="mt-4 text-2xl leading-snug md:text-3xl">{track.data.title}</h3>
            <p className="mt-4 leading-relaxed text-gray-400">{track.data.promise}</p>

            <ul className="mt-8 grid gap-5 border-t border-line pt-8">
              {track.data.services.map((service) => (
                <li key={service.name}>
                  <p className="font-medium text-white">{service.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-400">{service.detail}</p>
                </li>
              ))}
            </ul>

            <a
              href="#scope"
              className="group mt-10 inline-flex min-h-[44px] items-center gap-2 text-primary transition-colors hover:text-white"
            >
              {track.cta}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
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
        ))}
      </div>
    </Section>
  );
}
