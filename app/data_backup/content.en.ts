import { SWISS_ENTITY } from './config';

/**
 * Origin claims are gated: under the Swissness legislation a service may only be
 * marketed as Swiss with a Swiss registered office. `serves` is true and legal
 * today; `swiss` switches on automatically once COMPANY has an address.
 */
const origin = {
  descriptionOpener: SWISS_ENTITY
    ? 'Swiss software and communication studio.'
    : 'A software and communication studio for Swiss institutions.',
  kicker: SWISS_ENTITY
    ? 'Management systems & communication · Switzerland'
    : 'Management systems & communication · for Switzerland',
  rights: SWISS_ENTITY
    ? 'Vectra — Swiss management systems & communication.'
    : 'Vectra — management systems & communication for Swiss institutions.',
};

const en = {
  meta: {
    title: 'Vectra | Management Systems & Communication for Swiss Institutions',
    description:
      `${origin.descriptionOpener} Management systems — school administration, HR and payroll, facility booking — hosted in Switzerland. Plus brand, explainer video and campaigns. Fixed-price milestones.`,
    keywords: [
      'school management software Switzerland',
      'HR and payroll system Switzerland',
      'facility booking software',
      'custom management system development',
      'web application development Switzerland',
      'explainer video agency',
      'Vectra',
    ],
    ogAlt: 'Vectra — management systems and communication for Swiss institutions',
  },

  nav: {
    services: 'Services',
    solutions: 'Solutions',
    work: 'Work',
    process: 'Process',
    pricing: 'Pricing',
    faqs: 'FAQs',
    cta: 'Get a scope',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menuTitle: 'Site navigation',
    language: 'Language',
    home: 'Vectra — home',
  },

  /*
   * Labels only. Every href is derived in app/lib/nav.ts from the config path
   * helpers — authoring URLs here is what produced `/en/solutions/gestion-scolaire`,
   * a French slug on an English page.
   *
   * Column titles are buyer statements, not our pricing labels: someone arrives
   * thinking "we do attendance by hand", not "I'd like a fixed-price engagement".
   */
  solutionsMenu: {
    ready: {
      title: 'Something already exists',
      desc: 'Licence a system that is already running. Nothing to build.',
    },
    built: {
      title: 'We need it built',
      desc: 'Scoped to your workflow, at a fixed price per milestone.',
    },
    team: {
      title: 'We need a team',
      desc: 'Continuous design and engineering capacity, month to month.',
    },
    ctaLabel: 'Draft a scope in about a minute',
    ctaNote: 'Not sure which of the three fits?',
  },

  hero: {
    kicker: origin.kicker,
    titleLine1: 'We build the system,',
    titleLine2: 'then we make people want it.',
    body: 'Vectra builds the software institutions run on — school administration, HR and payroll, facility booking — and produces the brand, motion and campaigns that sell it. Your data stays in Switzerland.',
    primaryCta: 'Get a fixed-price scope',
    secondaryCta: 'See what we build',
    mediaLabel: 'The Schoolze school management portal in use',
  },

  trust: [
    {
      // First, deliberately: for a school or commune this is the question that
      // decides whether they keep reading.
      label: 'Your data stays in Switzerland',
      detail:
        'Hosted with a Swiss provider, under Swiss jurisdiction. No US hyperscaler and no transfer abroad.',
    },
    {
      label: 'Built to your canton’s rules',
      detail:
        'Schools and communes answer to cantonal data protection law, not the federal act. We build to your canton’s requirements.',
    },
    {
      label: 'Fixed-price milestones',
      detail: 'Every milestone is quoted before it starts. No open-ended hourly billing.',
    },
    {
      label: 'You own the code',
      detail: 'Source code, schemas and design files transfer to you from day one.',
    },
  ],

  problem: {
    title: 'Most institutions need two vendors: one who can build the system, one who can explain it.',
    body1:
      'Hiring a software team and a communication agency separately means paying twice for the same context, and living with the gap between them — a system that works but nobody adopts, or a campaign that promises something the software does not do.',
    body2:
      'We do both, with one team and one scope. Milestone pricing instead of an open-ended retainer, senior engineers and designers instead of a rotating bench, and code you own outright.',
  },

  tracks: {
    title: 'Two tracks. One team.',
    intro: 'Go builds the software. Sketch makes it land. Take one or both — the scope is fixed either way.',
    badge: 'Most requested',
    ctaBuild: 'Scope a build',
    ctaTell: 'Scope a campaign',
    build: {
      kicker: 'Go — we build it',
      title: 'Systems your institution runs on',
      promise:
        'Administration, scheduling, attendance, payroll and billing, engineered around how your organisation actually works rather than around a template.',
      services: [
        {
          name: 'School & institution management',
          detail: 'Enrolment, attendance, grading, parent portals, invoicing and multi-campus administration.',
        },
        {
          name: 'HR, time tracking & payroll',
          detail: 'Check-in/checkout, leave and contract management, salary calculation and payroll reporting.',
        },
        {
          name: 'Booking & facility management',
          detail: 'Resource calendars, membership management, online reservations and automated payments.',
        },
        {
          name: 'Integrations & data migration',
          detail: 'Connecting new systems to accounting, payment and legacy databases, and moving the historical data across.',
        },
      ],
    },
    tell: {
      kicker: 'Sketch — we make it land',
      title: 'Communication that drives adoption',
      promise:
        'The same team that built the system explains it — so the story matches the product instead of describing something that does not exist.',
      services: [
        {
          name: 'Brand identity & design systems',
          detail: 'Logo systems, typography, colour and component libraries that stay consistent across products.',
        },
        {
          name: 'Animated explainer video',
          detail: '2D and 3D motion that makes a complex system understandable in under a minute.',
        },
        {
          name: 'Onboarding & adoption material',
          detail: 'Training walkthroughs, in-product guidance and staff documentation that get a system actually used.',
        },
        {
          name: 'Campaigns & lead funnels',
          detail: 'Landing pages, email sequences and CRM automation wired to your pipeline.',
        },
      ],
    },
  },

  products: {
    title: 'Systems we already run',
    intro:
      'Our own software, hosted in Switzerland. One is available to licence today; the others are in production and can be adapted for your institution.',
    forWhoLabel: 'Built for',
    modulesLabel: 'What it does',
    scaleLabel: 'Scale',
    stackLabel: 'Built with',
    readMore: 'See the product',
    statusAvailable: 'Available now',
    statusRunning: 'In production',
    demoCta: 'Book a demo',
    adaptCta: 'Ask about this system',
    alsoTitle: 'Also built',
    alsoIntro: 'Product and brand work beyond the management-systems core.',
    domains: {
      education: 'Education',
      sports: 'Sports & leisure',
      hr: 'HR & payroll',
      product: 'Product',
      brand: 'Brand',
    },
    /*
     * These are our own products, so each entry describes the SOFTWARE — who it
     * is for and what it does. It must never describe a specific client's
     * situation: we do not name clients we cannot cite, and an invented
     * "they used to reconcile by hand" narrative is fabricated social proof.
     */
    items: {
      spotbase: {
        tagline: 'Sports facility management & booking',
        forWho: 'Sports centres, clubs and communes managing bookable facilities.',
        summary:
          'Resource calendars, online reservations, memberships and payment in one system, so a booking and the money attached to it are a single record.',
        modules: ['Resource calendar', 'Online booking', 'Memberships', 'Payments', 'Usage reporting'],
        scale: '',
        outcome: '',
      },
      schoolze: {
        tagline: 'School management portal',
        forWho: 'Primary and secondary schools, and school groups with several sites.',
        summary:
          'Enrolment, attendance, grading, parent communication and invoicing in one portal, with role-based access for administration, teaching staff and parents.',
        modules: ['Enrolment & records', 'Attendance', 'Grading & reports', 'Parent portal', 'Invoicing'],
        scale: '',
        outcome: '',
      },
      'sb-pointage': {
        tagline: 'Time tracking & payroll',
        forWho: 'Employers running shift or hourly staff who need hours to reach payroll without re-entry.',
        summary:
          'Check-in and checkout, leave and contract management, salary calculation and payroll export — one chain from the clock to the payslip.',
        modules: ['Check-in / checkout', 'Leave management', 'Salary calculation', 'Payroll export', 'Staff records'],
        scale: '',
        outcome: '',
      },
      raqim: {
        tagline: 'Multi-site school administration',
        forWho: 'School groups needing one consolidated view across several sites.',
        summary:
          'Academic records, staff management, scheduling and reporting across multiple sites, with figures consolidated centrally rather than assembled per site.',
        modules: ['Multi-site administration', 'Academic records', 'Staff management', 'Scheduling', 'Consolidated reporting'],
        scale: '',
        outcome: '',
      },
    },
    also: {
      hellodesk: { name: 'Hellodesk', detail: 'Co-working space booking platform — search, reservations and host onboarding.' },
      audio: { name: 'Live audio app', detail: 'Community audio product — mobile-first rooms, invitations and interest graph.' },
      spectrum: { name: 'Spectrum', detail: 'Brand identity and logo system.' },
    },
  },

  benefits: {
    title: 'Why teams pick us',
    intro: 'One team for the software and the story, on terms that let you stop whenever a milestone closes.',
    items: [
      {
        title: 'Built around your workflow',
        detail:
          'Management systems engineered for how your organisation actually runs — not a template bent to fit it.',
      },
      {
        title: 'Senior people, directly',
        detail: 'You work with the engineers, architects and designers doing the work. No account manager relaying messages.',
      },
      {
        title: 'Shipped in weeks, not quarters',
        detail: 'A first module lands in 3 to 5 weeks. Every milestone ends in something you can click through.',
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

  pricing: {
    title: 'Pricing',
    intro: 'Published rates, fixed milestones, and no charge for scoping.',
    onRequest: 'On request',
    subscriptionTitle: 'Ongoing subscription',
    subscriptionIntro:
      'A continuous design and engineering capacity for teams who need steady delivery rather than one project. One active request at a time, and you can pause or cancel between any two.',
    monthly: 'Monthly',
    yearly: 'Yearly',
    yearlyNote: 'billed yearly',
    perMonth: '/month',
    perYear: '/year',
    featured: 'Most popular',
    projectsTitle: 'Fixed-scope projects',
    projectsIntro: 'For a defined deliverable. Priced and scheduled per milestone before work starts.',
    from: 'from',
    subscriptionCta: 'Start a subscription',
    projectCta: 'Scope a project',
    tiers: {
      design: {
        name: 'Design',
        detail: 'Brand, UI and motion work on a continuous basis.',
        includes: ['One active request at a time', 'Brand, UI and motion design', 'Typical turnaround 2–4 working days', 'Pause or cancel anytime'],
      },
      build: {
        name: 'Design + Build',
        detail: 'Design plus engineering capacity — the full Build and Tell tracks.',
        includes: ['One active request at a time', 'Design and full-stack development', 'Typical turnaround 3–7 working days', 'Infrastructure and maintenance included', 'Pause or cancel anytime'],
      },
      scale: {
        name: 'Scale',
        detail: 'Dedicated capacity for teams shipping continuously.',
        includes: ['Two active requests at a time', 'Priority scheduling', 'Dedicated senior engineer and designer', 'Architecture and roadmap support', 'Pause or cancel anytime'],
      },
    },
    tracks: {
      management: {
        name: 'Management systems',
        detail: 'School administration, HR and payroll, booking and facility management.',
      },
      webapps: { name: 'Web & mobile apps', detail: 'Client portals, platforms, custom applications and integrations.' },
      brand: { name: 'Brand & explainer motion', detail: 'Identity systems, design libraries and animated explainers.' },
      growth: { name: 'Growth & campaigns', detail: 'Funnels, landing pages, CRM automation and campaign production.' },
    },
  },

  scope: {
    title: 'Get a fixed-price scope',
    intro:
      'Answer five short questions and we will draft your project scope — phases, deliverables, timeline and a price band — on this page, in about a minute. No call required first, and no charge for the scoping.',
    aside: 'Prefer to talk it through? Book a call from the banner below instead.',
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
    q1: { title: 'What kind of system do you need?', hint: 'Pick the closest match.' },
    q2: { title: 'Which parts do you need?', hint: 'Select everything that applies.' },
    q3: { title: 'How big is it?', hint: 'Rough numbers are fine.' },
    q4: { title: 'When do you want it live?', hint: 'And roughly what budget are you working with?' },
    q5: { title: 'Where should we send it?', hint: '' },
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
      phases: 'Phases',
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

  faqs: {
    title: 'Frequently asked questions',
    items: [
      {
        question: 'What kind of systems do you build?',
        answer:
          'Operational management systems: school and institution administration, HR with time tracking and payroll, and booking or facility management. We start from the process you want to fix, not from a product template.',
      },
      {
        question: 'You do both development and communication — is that not too broad?',
        answer:
          'We run two tracks. Build covers management systems, web and mobile apps. Tell covers brand identity, explainer video and campaigns. Most clients start with one. The advantage of both under one team is that the people explaining the system are the people who built it, so the story matches what actually ships.',
      },
      {
        question: 'How is pricing structured?',
        answer:
          'Two ways. Fixed price per milestone for project work, or a published monthly subscription for ongoing capacity. You get scope, timeline and price in writing before a milestone starts, and you can stop between any two.',
      },
      {
        question: 'What are typical timelines?',
        answer:
          'A first module or MVP takes roughly 3 to 5 weeks. A full management platform takes 6 to 10 weeks. Branding and explainer video work takes 1 to 3 weeks. You get a milestone roadmap with dates before work begins.',
      },
      {
        question: 'Can you integrate with the systems we already use?',
        answer:
          'Yes. We build integrations to accounting software, payment providers and existing databases, including on-premise systems that only expose a database connection, and we migrate your historical data across.',
      },
      {
        question: 'Where is our data hosted?',
        answer:
          'In Switzerland, with a Swiss provider, under Swiss jurisdiction. Not on a US hyperscaler and not transferred abroad. We can name the provider and the data centre in writing so your data protection officer can verify it.',
      },
      {
        question: 'Our system holds pupil and staff data. How do you handle that?',
        answer:
          'Pupil, staff and salary records are sensitive personal data, so access control is architectural rather than an afterthought: role-based permissions, audit logging, encryption at rest and data minimisation by default. Note that schools and communes are cantonal or municipal bodies, so it is your cantonal data protection law that applies and your cantonal data protection officer who supervises — not the federal act. We build to your canton’s requirements and provide a processing register entry and a data protection impact assessment you can hand straight to them. For private employers the federal FADP applies instead, and we work to that.',
      },
      {
        question: 'We are a school or a commune. How does the procurement side work?',
        answer:
          'Below your canton’s invitation threshold a contract can normally be awarded without an open tender — for services that is typically somewhere under CHF 150’000, but thresholds differ by canton and are revised every two years, so confirm the current figure for yours. Above it, we respond to listings on SIMAP and supply the usual dossier: references, insurance certificate, data protection concept and sub-contractor declaration. Our fixed-price milestones are structured to match how public budgets are approved.',
      },
      {
        question: 'Do we own the source code and design assets?',
        answer:
          'Yes, entirely. On handover you receive the source code, database schemas, design system files and media assets. There is no licence to renew and nothing stops you moving to another team.',
      },
      {
        question: 'Do you offer ongoing maintenance after launch?',
        answer:
          'Yes — post-launch maintenance, cloud infrastructure management, security updates and continued feature work, either as a monthly scope or through the subscription.',
      },
    ],
  },

  procurement: {
    title: 'Buying as a school, commune or public body',
    intro:
      'Public bodies buy under procurement rules. We work inside them rather than around them, and we size projects with them in mind.',
    points: [
      {
        title: 'Often no open tender needed',
        detail:
          'Below your canton’s invitation threshold — typically somewhere under CHF 150’000 for services — a contract can normally be awarded directly. Thresholds vary by canton and are revised every two years, so confirm the current figure for yours.',
      },
      {
        title: 'We respond to SIMAP listings',
        detail:
          'Above the threshold we tender in the normal way and supply the usual dossier: references, insurance certificate, data protection concept and sub-contractor declaration.',
      },
      {
        title: 'Milestones fit budget cycles',
        detail:
          'Fixed-price milestones map onto how public budgets are actually approved and released, instead of asking for one lump sum up front.',
      },
      {
        title: 'Documentation your DPO will ask for',
        detail:
          'A processing register entry, a data protection impact assessment and written confirmation of where data is hosted — prepared as part of the work, not as an afterthought.',
      },
    ],
  },

  cta: {
    title: 'Not sure what you need scoped yet? Take 30 minutes with an engineer, not a salesperson.',
    button: 'Book a 30 min call',
  },

  footer: {
    title: 'Tell us what is slowing your organisation down.',
    button: 'Get a scope',
    note: 'You get a written scope with milestones and pricing before committing to anything.',
    legal: 'Terms · Privacy · Impressum — coming soon',
    rights: origin.rights,
    team: 'Distributed team, working Swiss hours. Client data hosted in Switzerland.',
    social: 'Social',
  },

  proof: {
    systems: 'systems in production',
    years: 'years building them',
    institutions: 'institutions served',
  },

  testimonials: {
    title: 'What the people running these systems say',
  },

  pages: {
    home: 'Home',
    solutions: 'Solutions',
    services: 'Services',
    servicesInArea: 'Services in this area',
    included: 'What a build includes',
    relatedWork: 'Related work',
    problemTitle: 'The problem',
    solutionTitle: 'What we build',
    pricingTitle: 'What it costs',
    pricingBody:
      'Fixed price per milestone, agreed in writing before the milestone starts. Scoping is free and you can stop between any two milestones.',
    pricingCta: 'Get a fixed-price scope',
    allSolutions: 'All solutions',
  },

  hubs: {
    'school-management': {
      navLabel: 'School & institution management',
      navDetail: 'Enrolment, attendance, grading, parent portals, invoicing.',
      kicker: 'Solutions · Education',
      h1: 'School management software for Swiss institutions',
      intro:
        'One system for enrolment, attendance, grading, parent communication and invoicing — replacing the spreadsheets and paper forms that make every month-end slow.',
      problem: [
        'Attendance is recorded on paper and re-keyed later, so registers and invoices have to be reconciled by hand every week.',
        'Each site runs its own process, leaving no consolidated academic or operational view of the organisation.',
        'Parents phone and email the office for information that could be self-service.',
      ],
      solution: [
        'A single record per pupil, from enrolment through grading to leaving certificate.',
        'Attendance capture that feeds invoicing directly, so the two cannot disagree.',
        'A parent portal for absences, reports, payments and messages.',
        'Multi-site administration with consolidated reporting across campuses.',
      ],
      faqs: [
        {
          question: 'Can it run alongside the system we already have?',
          answer:
            'Yes. We commonly start with one module — attendance or invoicing — connected to your existing records, and expand from there. That keeps the first milestone small and reversible.',
        },
        {
          question: 'How is pupil data protected?',
          answer:
            'Role-based permissions, audit logging, encryption at rest and data minimisation are part of the architecture, not an afterthought. Data is hosted in Switzerland. Schools and communes fall under cantonal data protection law rather than the federal act, so we build to your canton’s requirements and hand you the processing register entry and impact assessment your cantonal data protection officer will ask for.',
        },
      ],
    },
    'hr-and-payroll': {
      navLabel: 'HR, time tracking & payroll',
      navDetail: 'Check-in and checkout, leave, salary calculation, reporting.',
      kicker: 'Solutions · HR & payroll',
      h1: 'HR, time tracking and payroll software',
      intro:
        'Hours captured once, at the point of work, and carried through to salary calculation without a spreadsheet in between.',
      problem: [
        'Hours are written on paper or in a spreadsheet and re-entered before payroll, which makes the monthly close slow and error-prone.',
        'Leave balances live in someone’s head or a shared file, so entitlement disputes are hard to settle.',
        'There is no reliable record of who worked where, which matters the moment anyone asks.',
      ],
      solution: [
        'Check-in and checkout that staff can actually use, on a terminal or a phone.',
        'Leave requests, approvals and balances calculated automatically.',
        'Salary calculation driven by recorded hours, with payroll-ready output.',
        'Contract and staff records in one place, with an audit trail.',
      ],
      faqs: [
        {
          question: 'Does it handle Swiss payroll specifics?',
          answer:
            'We build the calculation rules to your cantonal and contractual requirements and export in the format your accountant or payroll provider expects. We integrate with your existing payroll rather than replacing it, unless you want the whole chain.',
        },
        {
          question: 'What about employees without a company phone?',
          answer:
            'A shared terminal — a tablet at the entrance with a badge or PIN — works the same as individual devices. Most of our deployments use both.',
        },
      ],
    },
    'booking-and-facilities': {
      navLabel: 'Booking & facility management',
      navDetail: 'Resource calendars, online reservations, memberships, payments.',
      kicker: 'Solutions · Facilities',
      h1: 'Booking and facility management software',
      intro:
        'One calendar per resource, bookable online, with memberships and payment attached — so double-bookings stop and you can finally see usage per facility.',
      problem: [
        'Bookings arrive by phone and message, which causes double-booking and leaves no record.',
        'Nobody can say which pitch, room or court actually earns its keep.',
        'Payment is collected separately from the booking, so reconciliation is manual.',
      ],
      solution: [
        'A calendar per resource with rules for opening hours, duration and who may book what.',
        'Self-service online reservation with instant confirmation.',
        'Memberships, subscriptions and one-off bookings in the same system.',
        'Usage and revenue reporting per facility.',
      ],
      faqs: [
        {
          question: 'Can members pay online?',
          answer:
            'Yes — card and Swiss payment methods, attached to the booking so the reservation and the payment are one record rather than two.',
        },
        {
          question: 'We have several sites. Does that work?',
          answer:
            'Yes. Resources are grouped by site, with per-site rules and permissions, plus consolidated reporting across all of them.',
        },
      ],
    },
    'brand-and-communication': {
      navLabel: 'Brand & communication',
      navDetail: 'Identity systems, explainer video, adoption material.',
      kicker: 'Solutions · Communication',
      h1: 'Brand and communication for technical products',
      intro:
        'The team that built the system explains it, so the story matches the product instead of describing something that does not exist.',
      problem: [
        'A system that works but nobody adopts, because no one explained it to the people who have to use it.',
        'A campaign that promises capabilities the software does not have.',
        'Materials produced by an agency that never saw the product.',
      ],
      solution: [
        'Identity systems and component libraries that stay consistent across products.',
        'Animated explainer video that makes a complex system understandable in under a minute.',
        'Onboarding and training material that gets a system actually used.',
        'Landing pages and funnels wired to your pipeline.',
      ],
      faqs: [
        {
          question: 'Can you do the communication without building the system?',
          answer:
            'Yes. Plenty of clients bring us an existing product to explain. We ask for access to it first — we do not write about software we have not used.',
        },
        {
          question: 'How long does an explainer video take?',
          answer:
            'One to three weeks depending on length and whether 3D is involved. Script and storyboard are approved before any animation starts.',
        },
      ],
    },
  },

  services: {
    'school-management-software': {
      h1: 'School management software, built to your process',
      intro:
        'A custom administration platform for schools and training institutions — not a template bent to fit how you already work.',
      problem:
        'Off-the-shelf school software forces your process to match its assumptions. When it does not fit, the gap is filled with spreadsheets, and those spreadsheets become the real system of record.',
      solution:
        'We map your actual administrative workflow first, then build the modules that carry it — enrolment, attendance, grading, invoicing — with your terminology and your rules.',
      includes: [
        'Pupil and family records with document storage',
        'Attendance capture and absence workflows',
        'Grading, bulletins and reporting',
        'Invoicing linked to enrolment and attendance',
        'Role-based access for staff, management and parents',
      ],
      faqs: [
        {
          question: 'How long until we can use the first part?',
          answer:
            'A first working module lands in 3 to 5 weeks. We deliberately scope the first milestone so it is useful on its own, rather than waiting for the whole platform.',
        },
        {
          question: 'Can our historical data come across?',
          answer:
            'Yes — see data migration. We move records from spreadsheets, exports or a legacy database, and reconcile the result with you before go-live.',
        },
      ],
    },
    'parent-portal': {
      h1: 'Parent portal for schools',
      intro:
        'A self-service portal that takes routine parent enquiries off the office phone.',
      problem:
        'Office staff spend a large part of the week answering questions with answers that already exist somewhere: an absence, a report, an invoice, a date.',
      solution:
        'A portal where parents see their own children — attendance, results, invoices, documents and messages — with permissions that never expose another family’s data.',
      includes: [
        'Per-family login scoped strictly to their own children',
        'Absence reporting and justification',
        'Reports and bulletins on release',
        'Invoices and payment status',
        'Announcements and direct messaging',
      ],
      faqs: [
        {
          question: 'What stops a parent seeing another child’s data?',
          answer:
            'Access is enforced server-side per relationship, not by hiding parts of the interface. It is the single most tested area of any portal we build, because getting it wrong is a data-protection incident.',
        },
        {
          question: 'Do parents need to install an app?',
          answer:
            'No. It works in the browser on a phone. A native app is possible but rarely worth the extra cost and the app-store overhead.',
        },
      ],
    },
    'time-tracking': {
      h1: 'Time tracking software for Swiss employers',
      intro: 'Hours captured at the point of work, once, in a form payroll can use.',
      problem:
        'Paper timesheets and shared spreadsheets are re-keyed before payroll. Every re-entry is a chance for an error nobody catches until someone is paid wrongly.',
      solution:
        'Check-in and checkout on a shared terminal or a phone, with the rules for breaks, overtime and shifts encoded once and applied consistently.',
      includes: [
        'Check-in and checkout by badge, PIN or phone',
        'Break, overtime and shift rules',
        'Per-site and per-team views',
        'Correction workflow with an audit trail',
        'Export in your payroll provider’s format',
      ],
      faqs: [
        {
          question: 'Can supervisors correct a mistake?',
          answer:
            'Yes, through a correction workflow that records who changed what and why. Silent edits are exactly what makes a time record indefensible.',
        },
        {
          question: 'Does it work offline?',
          answer:
            'A terminal keeps recording if the connection drops and syncs when it returns. Losing a morning of check-ins because of the network is not acceptable.',
        },
      ],
    },
    payroll: {
      h1: 'Payroll and salary management software',
      intro: 'Salary calculation driven by recorded hours, not by a spreadsheet.',
      problem:
        'Payroll assembled by hand each month from several sources is slow, hard to audit, and impossible to reproduce when someone queries a payslip from six months ago.',
      solution:
        'Calculation rules encoded once, run against recorded hours and contracts, producing a reproducible result and an export your accountant accepts.',
      includes: [
        'Salary calculation from recorded hours and contracts',
        'Allowances, deductions and overtime rules',
        'Reproducible monthly runs with full history',
        'Payroll-ready export',
        'Per-employee history and audit trail',
      ],
      faqs: [
        {
          question: 'Do you replace our payroll provider?',
          answer:
            'Usually not. We produce clean, correct input for the provider you already use. Replacing the whole chain is possible but rarely the cheapest way to fix the actual problem.',
        },
        {
          question: 'Can we re-run a past month?',
          answer:
            'Yes. Runs are reproducible and versioned, so you can show exactly how a figure was reached.',
        },
      ],
    },
    'facility-booking': {
      h1: 'Facility and pitch booking software',
      intro:
        'Online reservation for sports facilities, rooms and shared resources, with payment attached.',
      problem:
        'Phone and message bookings cause double-booking, and there is no record to tell you which facility is actually used or what it earns.',
      solution:
        'A calendar per resource with real booking rules, self-service reservation, memberships, and reporting on usage and revenue.',
      includes: [
        'Calendar per resource with availability rules',
        'Self-service booking with instant confirmation',
        'Memberships, subscriptions and single bookings',
        'Online payment tied to the reservation',
        'Usage and revenue reporting per facility',
      ],
      faqs: [
        {
          question: 'Can we keep taking bookings by phone?',
          answer:
            'Yes — staff book into the same calendar, so the phone and the website can never double-book each other.',
        },
        {
          question: 'Can we set different rules per resource?',
          answer:
            'Yes: opening hours, minimum and maximum duration, notice period, who may book, and pricing, all per resource.',
        },
      ],
    },
    'explainer-video': {
      h1: 'Animated explainer video for software',
      intro:
        'A short animated film that makes a complex system understandable in under a minute.',
      problem:
        'Technical products lose people in the first thirty seconds. A demo is too long, a screenshot says too little, and a paragraph of features explains nothing about why it matters.',
      solution:
        'Script, storyboard and 2D or 3D animation, produced by people who have used the software — so the film explains the real product rather than a marketing idea of it.',
      includes: [
        'Script and storyboard, approved before animation',
        '2D or 3D animation in your brand system',
        'Voice-over and sound design',
        'Cuts sized for web, social and pitch decks',
        'Source files on handover',
      ],
      faqs: [
        {
          question: 'How long should it be?',
          answer:
            'Sixty to ninety seconds for a product explainer. Longer only when it replaces a live demo, and then we structure it in chapters.',
        },
        {
          question: 'Do we own the animation files?',
          answer:
            'Yes, including project sources. There is no licence to renew and nothing stops another studio picking it up.',
        },
      ],
    },
    'web-app-development': {
      h1: 'Custom web application development',
      intro:
        'Full-stack applications for organisations whose process does not fit a product you can buy.',
      problem:
        'When the available tools nearly fit, the difference gets absorbed by manual work — and that manual work quietly becomes the most expensive part of the operation.',
      solution:
        'A web application built around your actual workflow, on a stack you can hire for, with the code and schemas transferred to you from day one.',
      includes: [
        'Architecture and data model designed with you',
        'Web application on Next.js, Node and PostgreSQL',
        'Role-based access control and audit logging',
        'Integrations with the systems you already run',
        'Deployment, handover and training',
      ],
      faqs: [
        {
          question: 'What stack do you build on?',
          answer:
            'Next.js, Node and PostgreSQL, hosted in Switzerland. Deliberately ordinary choices — you need to be able to hire someone else who knows them.',
        },
        {
          question: 'What happens if we want to change teams later?',
          answer:
            'You already have everything: source code, database schemas, infrastructure configuration and documentation transfer to you as we go, not at the end.',
        },
      ],
    },
    'data-migration': {
      h1: 'Data migration for management systems',
      intro:
        'Moving years of records out of spreadsheets and legacy systems, with the result reconciled before go-live.',
      problem:
        'Migration is where system replacements fail. The data is messier than anyone expects, and nobody notices what was lost until the old system is switched off.',
      solution:
        'We profile the source data first, agree the rules for the awkward cases with you, migrate in dry runs, and reconcile record counts and totals before anything goes live.',
      includes: [
        'Source data profiling and a quality report',
        'Agreed handling for duplicates, gaps and conflicts',
        'Repeatable dry runs, not a one-shot cutover',
        'Reconciliation of counts and totals before go-live',
        'A documented rollback path',
      ],
      faqs: [
        {
          question: 'Our data is in a bad state. Is that a problem?',
          answer:
            'It is normal, and it is why the first step is profiling rather than migrating. You get a report of what is duplicated, missing or contradictory, and you decide the rules before we move anything.',
        },
        {
          question: 'Can we run both systems in parallel?',
          answer:
            'Yes, and for anything payroll- or invoicing-related we recommend it for at least one cycle so the two can be compared.',
        },
      ],
    },
  },
};

export type Dictionary = typeof en;
export default en;
