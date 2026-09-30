import { SWISS_ENTITY } from './config';

/**
 * Origin claims are gated: under the Swissness legislation a service may only be
 * marketed as Swiss with a Swiss registered office. `serves` is true and legal
 * today; `swiss` switches on automatically once COMPANY has an address.
 */
const origin = {
  descriptionOpener: SWISS_ENTITY
    ? 'Swiss software and design studio.'
    : 'A software and design studio for Swiss organisations.',
  kicker: SWISS_ENTITY
    ? 'Software & design studio · Swiss made'
    : 'Software & design studio · For Switzerland',
  rights: SWISS_ENTITY
    ? 'Vectra — Swiss software and design studio.'
    : 'Vectra — software and design for Swiss organisations.',
};

const en = {
  meta: {
    title: 'Vectra | SaaS Products, On-Demand Development & Design Subscription',
    description: `${origin.descriptionOpener} Three departments: our own SaaS products, on-demand development at a fixed price per milestone, and a design subscription that includes motion design.`,
    keywords: [
      'SaaS products Switzerland',
      'on-demand software development',
      'web application development Switzerland',
      'design subscription',
      'motion design subscription',
      'explainer video',
      'Vectra',
    ],
    ogAlt: 'Vectra — SaaS products, on-demand development and design subscription',
  },

  /*
   * Header labels are the SHORT department names. They must stay short enough
   * that three links, the locale switcher and the CTA all fit at 1024px in
   * German. Every href is derived from departmentPath() in config.ts.
   */
  nav: {
    departments: { saas: 'Products', development: 'Development', design: 'Design' },
    cta: 'Book a call',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menuTitle: 'Site navigation',
    language: 'Language',
    home: 'Vectra — home',
  },

  common: {
    onRequest: 'On request',
    from: 'From',
    perMonth: '/month',
    perYear: '/year',
    faqsTitle: 'Frequently asked questions',
  },

  hero: {
    kicker: origin.kicker,
    titleLine1: 'Software, development and design.',
    titleLine2: 'One studio, three departments.',
    body: 'License one of our SaaS products, commission software built around your process, or subscribe to a design team that also does motion.',
    primaryCta: 'Book a 30 min call',
    secondaryCta: 'See the three departments',
  },

  departments: {
    title: 'Three ways to work with us',
    intro: 'Each department has its own page, its own pricing model and its own way in.',
    // The other two prices are numbers, so they render from config.ts.
    licenceOnRequest: 'Licence on request',
    items: {
      saas: {
        name: 'SaaS products',
        summary:
          'Software we built and operate ourselves, for schools, sports facilities and employers.',
        points: [
          'Spotbase — facility booking and payment',
          'Schoolze and Raqim — school administration',
          'SB Pointage — time tracking and payroll',
        ],
        cta: 'See the products',
      },
      development: {
        name: 'On-demand development',
        summary:
          'Custom web applications and management systems, scoped in writing and priced per milestone before work starts.',
        points: [
          'Web applications and management systems',
          'Integrations and data migration',
          'You own the code from day one',
        ],
        cta: 'Scope a project',
      },
      design: {
        name: 'Design subscription',
        summary:
          'A senior design team on a monthly plan: product design, brand identity and motion design.',
        points: [
          'UI/UX and product design',
          'Brand identity and design systems',
          'Motion design and explainer video',
        ],
        cta: 'See the plans',
      },
    },
  },

  work: {
    title: 'Software already in production',
    intro:
      'Four products we built and run ourselves. They are the proof behind the other two departments.',
  },

  products: {
    forWhoLabel: 'Built for',
    modulesLabel: 'What it does',
    stackLabel: 'Built with',
    statusAvailable: 'Available now',
    statusRunning: 'In production',
    demoCta: 'Book a demo',
    adaptCta: 'Ask about this system',
    domains: {
      education: 'Education',
      sports: 'Sports & leisure',
      hr: 'HR & payroll',
    },
    /*
     * These are our own products: every entry describes the SOFTWARE — who it
     * is for and what it does. Never a specific client's situation: an invented
     * case story is fabricated social proof.
     */
    items: {
      spotbase: {
        tagline: 'Sports facility management & booking',
        forWho: 'Sports centres, clubs and communes managing bookable facilities.',
        summary:
          'Resource calendars, online reservations, memberships and payment in one system, so a booking and the money attached to it are a single record.',
        modules: ['Resource calendar', 'Online booking', 'Memberships', 'Payments', 'Usage reporting'],
      },
      schoolze: {
        tagline: 'School management portal',
        forWho: 'Primary and secondary schools, and school groups with several sites.',
        summary:
          'Enrolment, attendance, grading, parent communication and invoicing in one portal, with role-based access for administration, teaching staff and parents.',
        modules: ['Enrolment & records', 'Attendance', 'Grading & reports', 'Parent portal', 'Invoicing'],
      },
      'sb-pointage': {
        tagline: 'Time tracking & payroll',
        forWho: 'Employers running shift or hourly staff who need hours to reach payroll without re-entry.',
        summary:
          'Check-in and checkout, leave and contract management, salary calculation and payroll export — one chain from the clock to the payslip.',
        modules: ['Check-in / checkout', 'Leave management', 'Salary calculation', 'Payroll export', 'Staff records'],
      },
      raqim: {
        tagline: 'Multi-site school administration',
        forWho: 'School groups needing one consolidated view across several sites.',
        summary:
          'Academic records, staff management, scheduling and reporting across multiple sites, with figures consolidated centrally rather than assembled per site.',
        modules: ['Multi-site administration', 'Academic records', 'Staff management', 'Scheduling', 'Consolidated reporting'],
      },
    },
  },

  saas: {
    metaTitle: 'SaaS Products for Schools, Sports Facilities & Employers | Vectra',
    metaDescription:
      'Spotbase, Schoolze, SB Pointage and Raqim: software built and operated by Vectra, hosted in Switzerland.',
    kicker: 'Department 01 · SaaS products',
    h1: 'Software we built, and run ourselves.',
    intro:
      'Four products for schools, sports facilities and employers. Spotbase is available to license today; the others are in production and can be adapted to your organisation.',
    licence: {
      title: 'What a licence includes',
      intro: 'Licences are quoted on request, in writing, after a demo.',
      steps: [
        {
          step: '01',
          title: 'Ready-to-use software',
          detail: 'The product exists and runs today. Getting started is configuration, not a development project.',
        },
        {
          step: '02',
          title: 'Swiss hosting included',
          detail:
            'Your system runs with a Swiss provider, under Swiss jurisdiction. We name the provider and the data centre in writing.',
        },
        {
          step: '03',
          title: 'Ongoing updates',
          detail: 'We operate the product ourselves, so improvements keep shipping after you go live.',
        },
      ],
    },
    faqs: [
      {
        question: 'Which products can we license today?',
        answer:
          'Spotbase. Schoolze, SB Pointage and Raqim are in production but not yet packaged for licensing, so we do not offer a demo or a price for them yet. If one of them matches your need, ask us and we will tell you plainly what is possible.',
      },
      {
        question: 'Can a product be adapted to our organisation?',
        answer:
          'Yes. That is on-demand development: we start from the product and scope the changes as fixed-price milestones, agreed in writing before work starts.',
      },
      {
        question: 'Where is our data hosted?',
        answer:
          'In Switzerland, with a Swiss provider, under Swiss jurisdiction — not on a US hyperscaler. We name the provider and the data centre in writing so your data protection officer can verify it.',
      },
      {
        question: 'Our system would hold pupil and staff data. How do you handle that?',
        answer:
          'Pupil, staff and salary records are sensitive personal data, so access control is architectural rather than an afterthought: role-based permissions, audit logging, encryption at rest and data minimisation by default. Schools and communes answer to cantonal data protection law, and we build to your canton’s requirements. For private employers the federal FADP applies instead, and we work to that.',
      },
    ],
  },

  development: {
    metaTitle: 'On-Demand Software Development, Fixed Price per Milestone | Vectra',
    metaDescription:
      'Custom web applications and management systems. Written scope, fixed price per milestone, Swiss hosting, and you own the code.',
    kicker: 'Department 02 · On-demand development',
    h1: 'Custom software, scoped before we start.',
    intro:
      'Web applications and management systems built around how your organisation actually works. Fixed price per milestone, agreed in writing, and the code is yours.',
    priceNote: 'Fixed price per milestone. Scoping is free.',
    cta: 'Scope my project',
    offers: {
      title: 'What we build',
      items: [
        {
          title: 'Web applications',
          detail:
            'Full-stack applications on Next.js, Node and PostgreSQL, for processes that do not fit a product you can buy.',
        },
        {
          title: 'Management systems',
          detail:
            'School administration, HR and payroll, booking and facilities: the kind of operational system our own products are made of.',
        },
        {
          title: 'Integrations & data migration',
          detail:
            'Connections to accounting, payment and legacy databases, and historical data moved across and reconciled before go-live.',
        },
        {
          title: 'Maintenance & evolution',
          detail:
            'Post-launch maintenance, security updates and continued feature work, month to month and only if you want it.',
        },
      ],
    },
    process: {
      title: 'How a project runs',
      intro: 'Three steps, priced and scheduled before anything starts.',
      steps: [
        {
          step: '01',
          title: 'Scope & architecture',
          detail:
            'We audit the workflow you want to fix and return a written scope with milestones, timeline and a fixed price per milestone.',
        },
        {
          step: '02',
          title: 'Build & review',
          detail:
            'You work directly with the engineers and designers building it. Every milestone ends in a working review you can click through, not a status report.',
        },
        {
          step: '03',
          title: 'Handover & scale',
          detail:
            'We deploy, train your team and hand over the code and assets. Ongoing work continues month to month only if you want it to.',
        },
      ],
    },
    faqs: [
      {
        question: 'How is pricing structured?',
        answer:
          'Fixed price per milestone. You get scope, timeline and price in writing before a milestone starts, and you can stop between any two.',
      },
      {
        question: 'What are typical timelines?',
        answer:
          'A first module or MVP takes roughly 3 to 5 weeks. A full management platform takes 6 to 10 weeks. You get a milestone roadmap with dates before work begins.',
      },
      {
        question: 'What stack do you build on?',
        answer:
          'Next.js, Node and PostgreSQL, hosted in Switzerland. Deliberately ordinary choices — you need to be able to hire someone else who knows them.',
      },
      {
        question: 'Can you integrate with the systems we already use?',
        answer:
          'Yes. We build integrations to accounting software, payment providers and existing databases, including on-premise systems that only expose a database connection, and we migrate your historical data across.',
      },
      {
        question: 'Do we own the source code and design assets?',
        answer:
          'Yes, entirely. On handover you receive the source code, database schemas, design system files and media assets. There is no licence to renew and nothing stops you moving to another team.',
      },
      {
        question: 'We are a school or a commune. How does the procurement side work?',
        answer:
          'Below your canton’s invitation threshold a contract can normally be awarded without an open tender — for services that is typically somewhere under CHF 150’000, but thresholds differ by canton and are revised every two years, so confirm the current figure for yours. Above it, we respond to listings on SIMAP and supply the usual dossier. Our fixed-price milestones are structured to match how public budgets are approved.',
      },
      {
        question: 'Where does the scoping form send what we type?',
        answer:
          'The instant scope form sends what you type to services outside Switzerland, and our privacy page names them. If you would rather nothing left Switzerland, write or call us instead and we will scope it without those services.',
      },
    ],
  },

  design: {
    metaTitle: 'Design Subscription with Motion Design | Vectra',
    metaDescription:
      'Product design, brand identity and motion design for a fixed monthly price. Published plans, priority scheduling, pause or cancel anytime.',
    kicker: 'Department 03 · Design subscription',
    h1: 'A design team on subscription, motion included.',
    intro:
      'Product design, brand identity and motion design for a fixed monthly price. Priority scheduling, and you can pause or cancel anytime.',
    cta: 'See the plans',
    disciplines: {
      title: 'What the subscription covers',
      items: [
        {
          title: 'UI/UX and product design',
          detail: 'Interfaces, flows and prototypes for web and mobile products.',
        },
        {
          title: 'Brand identity',
          detail:
            'Logo systems, typography, colour and component libraries that stay consistent across products.',
        },
        {
          title: 'Motion design',
          detail: '2D and 3D animation in your brand system, with cuts sized for web, social and pitch decks.',
        },
        {
          title: 'Explainer video',
          detail:
            'Script, storyboard and animation that make a complex product understandable in under a minute.',
        },
      ],
    },
    plans: {
      title: 'Three plans, published prices',
      intro: 'Annual commitment: two months free.',
      featuredLabel: 'Recommended',
      // Tier names are plan names, kept identical in every locale so a client
      // reading the French site and an English contract sees the same word.
      names: { design: 'Design', build: 'Build', scale: 'Scale' },
      includesTitle: 'Every plan includes',
      includes: [
        'UI/UX and product design',
        'Brand identity and design systems',
        'Motion design and explainer video',
        'Priority scheduling',
        'Source files with every delivery',
        'Pause or cancel anytime',
      ],
      note: 'Not sure which plan fits? We settle it on a 30 minute call.',
      cta: 'Start a subscription',
    },
    process: {
      title: 'How the subscription runs',
      intro: 'No quotes and no negotiation: the price is the one on this page.',
      steps: [
        {
          step: '01',
          title: 'Pick a plan',
          detail: 'Monthly or annual. We confirm the plan on a short call and start.',
        },
        {
          step: '02',
          title: 'Send your requests',
          detail: 'Design and motion requests go into one queue and are scheduled with priority.',
        },
        {
          step: '03',
          title: 'Review, then continue or pause',
          detail: 'Each delivery comes with its source files. Pause or cancel whenever the work is done.',
        },
      ],
    },
    faqs: [
      {
        question: 'Is motion design really included?',
        answer:
          'Yes. Motion design and explainer video are part of the subscription, not an extra line on the invoice.',
      },
      {
        question: 'How long does an explainer video take?',
        answer:
          'One to three weeks depending on length and whether 3D is involved. Script and storyboard are approved before any animation starts.',
      },
      {
        question: 'Can you design for a product you did not build?',
        answer:
          'Yes. Plenty of clients bring us an existing product. We ask for access to it first — we do not design or write about software we have not used.',
      },
      {
        question: 'Do we own the design and animation files?',
        answer:
          'Yes, including project sources. There is no licence to renew and nothing stops another studio picking them up.',
      },
      {
        question: 'Can we pause or cancel?',
        answer: 'Yes, anytime. An annual commitment gets two months free.',
      },
    ],
  },

  scope: {
    title: 'Tell us which operational process needs fixing.',
    intro:
      'Answer five short questions and we will prepare an initial scope — modules, milestones, timeline and a price band — on this page, in about a minute. No call required first, and no charge for the scoping.',
    aside: 'Prefer to talk it through? You can book a call from the banner below.',
    stepOf: 'Step {current} of {total}',
    stepNames: ['What you need', 'Modules', 'Scale', 'Timing', 'Your details'],
    next: 'Next',
    back: 'Back',
    submit: 'Draft my scope',
    submitting: 'Drafting…',
    progress: {
      reading: 'Reading your requirements',
      drafting: 'Drafting phases and deliverables',
      estimating: 'Estimating timeline and range',
    },
    q1: { title: 'Which process do you want to simplify?', hint: 'Pick the closest match.' },
    q2: { title: 'Which parts do you need?', hint: 'Select everything that applies.' },
    q3: { title: 'How big is it?', hint: 'Rough numbers are fine.' },
    q4: { title: 'When do you want it live?', hint: 'And roughly what budget are you working with?' },
    q5: { title: 'Where should we send it?' },
    fields: {
      users: 'Roughly how many people will use it?',
      sites: 'How many sites or locations?',
      existing: 'What systems does it need to work with?',
      existingPlaceholder: 'e.g. our accounting software, an existing student database, Stripe',
      name: 'Name',
      email: 'Work email',
      company: 'Organisation',
      notes: 'Anything else we should know?',
      notesPlaceholder: 'e.g. we have three campuses and attendance is reconciled by hand every week',
    },
    domains: {
      education: 'School or education',
      sports: 'Sports or leisure facility',
      hr: 'HR, time tracking or payroll',
      other: 'Something else',
    },
    timelines: {
      urgent: { label: 'As soon as possible', detail: 'A first module, 3–5 weeks' },
      standard: { label: 'Next quarter', detail: 'Full system, 6–10 weeks' },
      ongoing: { label: 'Ongoing capacity', detail: 'Subscription, month to month' },
    },
    budgets: {
      unsure: 'Not sure yet',
      small: "Under CHF 15'000",
      medium: "CHF 15'000 – 60'000",
      large: "Above CHF 60'000",
    },
    result: {
      title: 'Your draft scope',
      disclaimer:
        'This is an indicative estimate generated from your answers, not a quote. We confirm scope and price in writing before any work starts.',
      deliverables: 'Deliverables',
      timeline: 'Estimated timeline',
      weeks: 'weeks',
      range: 'Indicative range',
      assumptions: 'Assumptions we made',
      risks: 'Things that could change the estimate',
      outOfScope: 'Not included',
      emailed: 'We have emailed a copy to you and to our team. Expect a written scope within one working day.',
      restart: 'Start over',
      book: 'Book a call to refine it',
    },
    errors: {
      generic: 'Something went wrong.',
      notSent: 'Your details were not sent — please retry, or email us directly.',
      degraded:
        'We received your request and our team has it. The instant draft is unavailable right now, so we will send your scope by email instead.',
    },
  },

  cta: {
    title:
      'Not sure which department you need? Take 30 minutes with the people who do the work, not a salesperson.',
    button: 'Book a 30 min call',
  },

  footer: {
    title: 'Software, development and design, from one studio.',
    group: 'Vectra is part of {group}.',
    country: 'Switzerland',
    legal: { terms: 'Terms', privacy: 'Privacy', impressum: 'Legal Notice' },
    rights: origin.rights,
    team: 'Distributed team, working Swiss hours. Client data hosted in Switzerland.',
    social: 'Social',
  },
};

export type Dictionary = typeof en;
export default en;
