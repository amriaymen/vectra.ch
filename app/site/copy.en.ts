import type { Copy, Kind } from './copy.fr';

/** English. Same facts and prices as the French original in copy.fr.ts. */
const en: Copy = {
  meta: {
    title: 'Business management software for companies in French-speaking Switzerland | Vectra',
    description:
      'Replace Excel, paper and WhatsApp with one system. Regioo for field teams (CHF 45 per technician per month), Spotbase for sports venues, or custom software from CHF 10’000.',
    regioo: 'Management of jobs, technicians, customers and schedules for field-service companies.',
    regiooOffer: 'Per technician per month. 14-day trial, no credit card.',
    area: 'French-speaking Switzerland',
    navLabel: 'Navigation',
    language: 'Language',
  },

  nav: {
    links: [
      { href: '#metier', label: 'Software' },
      { href: '#sur-mesure', label: 'Custom' },
      { href: '#design', label: 'Design' },
      { href: '#questions', label: 'Questions' },
    ],
    cta: 'Find my software',
  },

  hero: {
    kicker: 'Management software · Switzerland',
    line1: 'All your work.',
    line2: 'One system.',
    body: 'No more Excel, paper, WhatsApp and phone calls. Pick the software made for your trade and start today.',
    primary: 'Find my software',
    note: 'One question, one answer, one price.',
  },

  trades: [
    'Plumbers',
    'Electricians',
    'Fibre installers',
    'Heating engineers',
    'Sports centres',
    'Padel clubs',
    'Maintenance companies',
  ],

  chaos: {
    before: 'Today, your work is everywhere.',
    after: 'Tomorrow, it is in one place.',
    hint: 'Scroll',
    chips: [
      'schedule_final_v3.xlsx',
      'WhatsApp · 47 unread',
      'Job sheet (paper)',
      '3 missed calls',
      'Post-it: call the client back',
      'Invoice to redo',
      'Unanswered email',
      'Who has the latest version?',
    ],
    windowTitle: 'Your system',
    rows: ['This week’s schedule', 'Today’s jobs', 'Customers and history', 'Invoices and payments'],
    done: 'Up to date',
  },

  picker: {
    title: 'What is your trade?',
    intro: 'Choose. We show you the software, the price and how to start.',
    options: [
      {
        id: 'regioo',
        tab: 'Teams in the field',
        tag: 'Plumbing, electrical, fibre, heating, maintenance',
        name: 'Regioo',
        line: 'Field management, made simple.',
        points: [
          'Jobs planned and tracked',
          'An app for your technicians, on their phone',
          'Customers and schedules in one place',
        ],
        price: 'CHF 45',
        priceNote: 'per technician per month',
        cta: 'Start the free trial',
        ctaNote: '14 days, no credit card',
        kind: 'trial' as Kind,
        screen: [
          ['08:00', 'Fibre connection · Bulle', 'On the way'],
          ['10:30', 'Heating repair · Fribourg', 'Planned'],
          ['14:00', 'Electrical check · Vevey', 'Planned'],
          ['16:15', 'Meter installation · Romont', 'Done'],
        ],
      },
      {
        id: 'spotbase',
        tab: 'Sports centre or club',
        tag: 'Padel, tennis, football, basketball',
        name: 'Spotbase',
        line: 'Your courts, your bookings, your tournaments.',
        points: [
          'One calendar for all your courts',
          'Your players book from their phone',
          'Tournaments with live scores',
        ],
        price: 'On request',
        priceNote: 'depending on the number of courts',
        cta: 'Request a demo',
        ctaNote: 'We reply by email',
        kind: 'demo' as Kind,
        screen: [
          ['17:00', 'Padel 1 · Booking', 'Collected'],
          ['18:00', 'Padel 2 · Group class', '8 / 12'],
          ['19:00', 'Tennis · Club tournament', 'Live'],
          ['20:00', 'Five-a-side · Booking', 'Unpaid'],
        ],
      },
      {
        id: 'custom',
        tab: 'Another trade',
        tag: 'The way you work is your own',
        name: 'Custom',
        line: 'We build the software you are missing.',
        points: ['Fixed price, known before we start', 'Delivered step by step', 'The code belongs to you'],
        price: 'From CHF 10’000',
        priceNote: 'fixed price per step',
        cta: 'Estimate my project',
        ctaNote: 'Five questions, about a minute',
        kind: 'estimate' as Kind,
        screen: [
          ['01', 'Scope and price', 'In writing'],
          ['02', 'First module', 'Delivered'],
          ['03', 'Go-live', 'Trained'],
          ['04', 'The code', 'Yours'],
        ],
      },
    ],
  },

  calc: {
    title: 'What does Regioo cost?',
    intro: 'One price per technician. Nothing else.',
    label: 'Number of technicians',
    perMonth: 'per month',
    detail: 'CHF 45 per technician per month.',
    cta: 'Start the free trial',
    note: '14 days, no credit card.',
  },

  steps: {
    title: 'Three steps. No meeting.',
    items: [
      { n: '1', title: 'Choose', text: 'The software made for your trade.' },
      { n: '2', title: 'Try', text: 'With your team and your real cases.' },
      { n: '3', title: 'Work', text: 'Everyone in the same place.' },
    ],
  },

  custom: {
    kicker: 'Custom',
    title: 'Your trade has no software yet?',
    body: 'We build it. You know the price before we start, you receive the work step by step, and the code is yours.',
    price: 'From CHF 10’000',
    cta: 'Estimate my project',
    note: 'Five questions, about a minute. No call.',
    facts: ['Fixed price per step', 'You can stop between two steps', 'Code and files are yours'],
  },

  design: {
    kicker: 'Design subscription',
    title: 'A designer on your team, without hiring one.',
    body: 'One price per month. You send requests, we deliver. Pause or stop whenever you want.',
    perMonth: '/month',
    recommended: 'The most complete for most teams',
    cta: 'Choose this plan',
    plans: [
      {
        id: 'design',
        name: 'Design',
        price: 'CHF 1’500',
        points: ['Web and mobile interfaces', 'Brand identity', 'One request at a time'],
      },
      {
        id: 'build',
        name: 'Build',
        price: 'CHF 1’800',
        points: ['Everything in Design', 'Motion design and explainer video', 'One request at a time'],
      },
      {
        id: 'scale',
        name: 'Scale',
        price: 'CHF 2’400',
        points: ['Everything in Build', 'Your designs built into your website', 'Two requests in parallel'],
      },
    ],
  },

  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        q: 'Can I try before I pay?',
        a: 'Yes. Regioo has a 14-day trial, with no credit card. For Spotbase, we show you the software in a demo.',
      },
      {
        q: 'What if no software fits my trade?',
        a: 'We build it to order, from CHF 10’000. You receive the scope and the price in writing before we start.',
      },
      {
        q: 'Where is our data hosted?',
        a: 'The systems we build for you are hosted in Switzerland, with Infomaniak in Geneva. This website itself is hosted with Vercel.',
      },
      {
        q: 'Who owns the code of a custom project?',
        a: 'You do. You receive the source code, the database schemas and the design files.',
      },
      {
        q: 'Can I stop the design subscription?',
        a: 'Yes. You can pause or cancel it at any time.',
      },
    ],
  },

  contact: {
    title: 'Tell us what slows you down.',
    body: 'We reply by email.',
    name: 'Your name',
    email: 'Your email',
    company: 'Your company',
    interest: 'What you are interested in',
    interests: ['Regioo', 'Spotbase', 'Custom software', 'The design subscription', 'I don’t know yet'],
    notes: 'Your message (optional)',
    send: 'Send',
    sending: 'Sending…',
    success: 'Thank you. Your message has been sent; we will reply by email.',
    error: 'Sending failed. Try again, or write to us directly at',
    required: 'Please enter your name and your email.',
    disclosure: 'Your message is sent by email through a provider located outside Switzerland.',
    privacy: 'Privacy policy',
  },

  footer: {
    title: 'All your work. One system.',
    explore: 'Explore',
    contact: 'Contact',
    legal: 'Legal',
    group: 'Vectra is the software and digital products department of',
    terms: 'Terms',
    privacy: 'Privacy',
    impressum: 'Legal notice',
    rights: 'Vectra — Swiss software and design studio.',
    top: 'Back to top',
    country: 'Switzerland',
  },
};

export default en;
