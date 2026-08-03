'use client';

import { useState } from 'react';
import Section from './Section';

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Reusable accordion. Takes its items as a prop so hub and service pages can
 * each carry a distinct set — the homepage passes `t.faqs.items`.
 *
 * Answers are always rendered and hidden with the `hidden` attribute, so every
 * one is in the served HTML for crawlers and assistive tech.
 */
export default function Faq({
  items,
  title,
  id = 'faqs',
}: {
  items: FaqItem[];
  title: string;
  id?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  if (items.length === 0) return null;

  return (
    // Dark, not light: Faq is followed by the lime CtaBanner on every page that
    // uses it. Lime on white measures 1.15:1 — the band dissolved into the FAQ
    // and the page's one call to action lost its edge. On dark it is 15.98:1.
    <Section id={id}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <div>
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl">{title}</h2>
        </div>

        <ul className="grid">
          {items.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `${id}-panel-${index}`;
            return (
              <li key={faq.question} className="border-b border-line first:border-t">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg leading-snug transition-colors hover:text-primary md:text-xl"
                  >
                    <span>{faq.question}</span>
                    <svg
                      className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="M10 4v12M4 10h12" strokeLinecap="round" />
                    </svg>
                  </button>
                </h3>
                <div id={panelId} hidden={!isOpen}>
                  <p className="max-w-2xl pb-6 leading-relaxed text-gray-400">{faq.answer}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
