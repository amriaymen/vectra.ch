import type { Dictionary } from './content.en';
import { SWISS_ENTITY } from './config';

/** Voir content.en.ts — la mention d'origine suisse est conditionnée à l'entité. */
const origine = {
  descriptionOpener: SWISS_ENTITY
    ? 'Studio suisse de logiciel et de communication.'
    : 'Studio de logiciel et de communication pour les institutions suisses.',
  kicker: SWISS_ENTITY
    ? 'Systèmes de gestion et communication · Suisse'
    : 'Systèmes de gestion et communication · pour la Suisse',
  rights: SWISS_ENTITY
    ? 'Vectra — systèmes de gestion et communication suisses.'
    : 'Vectra — systèmes de gestion et communication pour les institutions suisses.',
};

/**
 * Swiss French (fr-CH).
 *
 * ACTION REQUIRED — this is a careful first draft, not a reviewed translation.
 * A Swiss buyer in Romandie spots weak French immediately, and it costs more
 * credibility than an English-only site would. Have a native reviewer pass over
 * it before /fr is linked publicly.
 *
 * Typed as `Dictionary`, so a missing or misspelled key fails `npm run build`.
 */
const fr: Dictionary = {
  meta: {
    title: 'Vectra | Systèmes de gestion et communication pour les institutions suisses',
    description:
      `${origine.descriptionOpener} Systèmes de gestion — administration scolaire, RH et paie, réservation d’installations — hébergés en Suisse. Ainsi que la marque, la vidéo explicative et les campagnes. Jalons à prix fixe.`,
    keywords: [
      'logiciel de gestion scolaire Suisse',
      'système RH et paie Suisse',
      'logiciel de réservation d’installations',
      'développement de système de gestion sur mesure',
      'développement d’applications web Suisse',
      'agence de vidéo explicative',
      'Vectra',
    ],
    ogAlt: 'Vectra — systèmes de gestion et communication pour les institutions suisses',
  },

  nav: {
    services: 'Services',
    solutions: 'Solutions',
    work: 'Réalisations',
    process: 'Processus',
    pricing: 'Tarifs',
    faqs: 'Questions',
    cta: 'Obtenir un cadrage',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    menuTitle: 'Navigation du site',
    language: 'Langue',
    home: 'Vectra — accueil',
  },

  solutionsMenu: {
    col1Title: "Produits Prêts à l'Emploi",
    col1Badge: "SaaS Clé en Main",
    col1Desc: "Logiciels institutionnels immédiatement déployables.",
    products: [
      { name: 'Schoolze', desc: 'Gestion scolaire & portail parents', href: '/fr/products/schoolze' },
      { name: 'SB Pointage', desc: 'Pointage RH, congés & calcul de paie', href: '/fr/products/sb-pointage' },
      { name: 'Spotbase', desc: "Réservation d'installations & sports", href: '/fr/products/spotbase' },
    ],
    col2Title: 'Projets à Prix Fixe',
    col2Badge: 'Sur Mesure',
    col2Desc: "Systèmes d'exploitation sur mesure avec jalons garantis.",
    customItems: [
      { name: 'Systèmes de Gestion sur Mesure', desc: 'Architecture adaptée à votre fonctionnement réel', href: '/fr/solutions/gestion-scolaire' },
      { name: 'Générer un Devis avec IA', desc: 'Cadrage et estimation instantanée en 3 minutes', href: '/fr#scope' },
    ],
    col3Title: 'Abonnements Illimités',
    col3Badge: 'Fractional Team',
    col3Desc: 'Accès flexible à une équipe senior dédiée.',
    subItems: [
      { name: 'Équipe Dédiée à la Demande', desc: 'Ingénieurs, motion designers & architectes seniors', href: '/fr#pricing' },
      { name: 'Abonnement Sans Engagement', desc: 'Ressources agiles avec pause ou annulation mensuelle', href: '/fr#pricing' },
    ],
  },

  hero: {
    kicker: origine.kicker,
    titleLine1: 'Nous construisons le système,',
    titleLine2: 'puis nous le rendons désirable.',
    body: 'Vectra développe les logiciels qui font tourner les institutions — administration scolaire, RH et paie, réservation d’installations — et produit la marque, le motion design et les campagnes qui les font adopter. Vos données restent en Suisse.',
    primaryCta: 'Obtenir un cadrage à prix fixe',
    secondaryCta: 'Voir nos réalisations',
    mediaLabel: 'Le portail de gestion scolaire Schoolze en cours d’utilisation',
  },

  trust: [
    {
      // En premier, délibérément : pour une école ou une commune, c'est la
      // question qui décide s'ils continuent à lire.
      label: 'Vos données restent en Suisse',
      detail:
        'Hébergement chez un prestataire suisse, sous juridiction suisse. Aucun hyperscaler américain, aucun transfert à l’étranger.',
    },
    {
      label: 'Conforme aux règles de votre canton',
      detail:
        'Les écoles et les communes relèvent de la loi cantonale sur la protection des données, et non de la loi fédérale. Nous construisons selon les exigences de votre canton.',
    },
    {
      label: 'Jalons à prix fixe',
      detail: 'Chaque jalon est chiffré avant de démarrer. Pas de facturation horaire ouverte.',
    },
    {
      label: 'Le code vous appartient',
      detail: 'Code source, schémas de base de données et fichiers de design vous sont transférés dès le premier jour.',
    },
  ],

  problem: {
    title:
      'La plupart des institutions ont besoin de deux prestataires : celui qui construit le système et celui qui sait l’expliquer.',
    body1:
      'Engager séparément une équipe de développement et une agence de communication revient à payer deux fois le même contexte, et à vivre avec l’écart entre les deux — un système qui fonctionne mais que personne n’adopte, ou une campagne qui promet ce que le logiciel ne fait pas.',
    body2:
      'Nous faisons les deux, avec une seule équipe et un seul cadrage. Une tarification par jalons plutôt qu’un forfait mensuel ouvert, des ingénieurs et des designers seniors plutôt qu’une équipe tournante, et un code qui vous appartient entièrement.',
  },

  tracks: {
    title: 'Deux volets. Une équipe.',
    intro:
      'Go construit le logiciel. Sketch le fait adopter. Choisissez l’un ou les deux — le cadrage est fixe dans les deux cas.',
    badge: 'Le plus demandé',
    ctaBuild: 'Cadrer un développement',
    ctaTell: 'Cadrer une campagne',
    build: {
      kicker: 'Go — nous le construisons',
      title: 'Les systèmes qui font tourner votre institution',
      promise:
        'Administration, planification, présences, paie et facturation, conçus autour du fonctionnement réel de votre organisation plutôt qu’autour d’un modèle générique.',
      services: [
        {
          name: 'Gestion scolaire et institutionnelle',
          detail: 'Inscriptions, présences, notes, portails parents, facturation et administration multi-sites.',
        },
        {
          name: 'RH, pointage et paie',
          detail: 'Pointage des entrées et sorties, gestion des congés et des contrats, calcul des salaires et rapports de paie.',
        },
        {
          name: 'Réservation et gestion d’installations',
          detail: 'Calendriers de ressources, gestion des abonnements, réservations en ligne et paiements automatisés.',
        },
        {
          name: 'Intégrations et migration de données',
          detail:
            'Connexion aux logiciels comptables, aux prestataires de paiement et aux bases de données existantes, avec reprise de l’historique.',
        },
      ],
    },
    tell: {
      kicker: 'Sketch — nous le faisons adopter',
      title: 'Une communication qui favorise l’adoption',
      promise:
        'L’équipe qui a construit le système est celle qui l’explique — le discours correspond donc au produit au lieu de décrire quelque chose qui n’existe pas.',
      services: [
        {
          name: 'Identité de marque et design systems',
          detail: 'Systèmes de logo, typographie, couleurs et bibliothèques de composants cohérentes entre les produits.',
        },
        {
          name: 'Vidéo explicative animée',
          detail: 'Animation 2D et 3D qui rend un système complexe compréhensible en moins d’une minute.',
        },
        {
          name: 'Supports d’intégration et d’adoption',
          detail:
            'Tutoriels de prise en main, aide contextuelle dans le produit et documentation pour le personnel, afin que le système soit réellement utilisé.',
        },
        {
          name: 'Campagnes et tunnels d’acquisition',
          detail: 'Pages d’atterrissage, séquences e-mail et automatisation CRM reliées à votre pipeline.',
        },
      ],
    },
  },

  products: {
    title: 'Les systèmes que nous exploitons déjà',
    intro:
      'Nos propres logiciels, hébergés en Suisse. L’un est disponible sous licence dès aujourd’hui ; les autres sont en production et peuvent être adaptés à votre institution.',
    forWhoLabel: 'Conçu pour',
    modulesLabel: 'Ce qu’il fait',
    scaleLabel: 'Échelle',
    stackLabel: 'Technologies',
    readMore: 'Voir le produit',
    statusAvailable: 'Disponible',
    statusRunning: 'En production',
    demoCta: 'Réserver une démo',
    adaptCta: 'Poser une question sur ce système',
    alsoTitle: 'Également réalisé',
    alsoIntro: 'Travaux produit et marque au-delà du cœur « systèmes de gestion ».',
    domains: {
      education: 'Éducation',
      sports: 'Sport et loisirs',
      hr: 'RH et paie',
      product: 'Produit',
      brand: 'Marque',
    },
    /*
     * Ce sont nos propres produits : chaque entrée décrit le LOGICIEL — à qui il
     * s'adresse et ce qu'il fait. Elle ne doit jamais décrire la situation d'un
     * client précis : un récit inventé constitue une preuve sociale fabriquée.
     */
    items: {
      spotbase: {
        tagline: 'Gestion et réservation d’installations sportives',
        forWho: 'Centres sportifs, clubs et communes gérant des installations réservables.',
        summary:
          'Calendriers de ressources, réservations en ligne, abonnements et paiement dans un seul système : la réservation et l’argent qui s’y rattache forment un seul enregistrement.',
        modules: ['Calendrier des ressources', 'Réservation en ligne', 'Abonnements', 'Paiements', 'Rapports d’utilisation'],
        scale: '',
        outcome: '',
      },
      schoolze: {
        tagline: 'Portail de gestion scolaire',
        forWho: 'Écoles primaires et secondaires, et groupes scolaires répartis sur plusieurs sites.',
        summary:
          'Inscriptions, présences, notes, communication avec les parents et facturation dans un seul portail, avec des accès par rôle pour l’administration, le corps enseignant et les parents.',
        modules: ['Inscriptions et dossiers', 'Présences', 'Notes et bulletins', 'Portail parents', 'Facturation'],
        scale: '',
        outcome: '',
      },
      'sb-pointage': {
        tagline: 'Pointage et paie',
        forWho: 'Employeurs avec du personnel en équipes ou à l’heure, dont les heures doivent arriver à la paie sans ressaisie.',
        summary:
          'Pointage des entrées et sorties, gestion des congés et des contrats, calcul des salaires et export vers la paie — une seule chaîne, de la pointeuse à la fiche de salaire.',
        modules: ['Pointage entrées / sorties', 'Gestion des congés', 'Calcul des salaires', 'Export paie', 'Dossiers du personnel'],
        scale: '',
        outcome: '',
      },
      raqim: {
        tagline: 'Administration scolaire multi-sites',
        forWho: 'Groupes scolaires ayant besoin d’une vue consolidée sur plusieurs sites.',
        summary:
          'Dossiers académiques, gestion du personnel, planification et reporting sur plusieurs sites, avec des chiffres consolidés au niveau central plutôt qu’assemblés site par site.',
        modules: [
          'Administration multi-sites',
          'Dossiers académiques',
          'Gestion du personnel',
          'Planification',
          'Reporting consolidé',
        ],
        scale: '',
        outcome: '',
      },
    },
    also: {
      hellodesk: {
        name: 'Hellodesk',
        detail: 'Plateforme de réservation d’espaces de coworking — recherche, réservations et intégration des hôtes.',
      },
      audio: {
        name: 'Application audio en direct',
        detail: 'Produit audio communautaire — salons pensés pour le mobile, invitations et graphe d’intérêts.',
      },
      spectrum: { name: 'Spectrum', detail: 'Identité de marque et système de logo.' },
    },
  },

  benefits: {
    title: 'Pourquoi nos clients nous choisissent',
    intro:
      'Une seule équipe pour le logiciel et pour le discours, à des conditions qui vous laissent vous arrêter à la fin de chaque jalon.',
    items: [
      {
        title: 'Conçu autour de votre fonctionnement',
        detail:
          'Des systèmes de gestion conçus pour le fonctionnement réel de votre organisation — pas un modèle générique que l’on tord pour qu’il rentre.',
      },
      {
        title: 'Des profils seniors, en direct',
        detail:
          'Vous travaillez directement avec les ingénieurs, les architectes et les designers qui réalisent le travail. Aucun chargé de compte pour relayer les messages.',
      },
      {
        title: 'Livré en semaines, pas en trimestres',
        detail:
          'Un premier module est livré en 3 à 5 semaines. Chaque jalon se termine par une version que vous pouvez essayer.',
      },
    ],
  },

  process: {
    title: 'Comment se déroule un projet',
    intro: 'Trois étapes, chiffrées et planifiées avant tout démarrage.',
    steps: [
      {
        step: '01',
        title: 'Cadrage et architecture',
        detail:
          'Nous auditons le processus que vous voulez corriger et vous remettons un cadrage écrit avec les jalons, le calendrier et un prix fixe par jalon.',
      },
      {
        step: '02',
        title: 'Développement et revues',
        detail:
          'Vous travaillez directement avec les ingénieurs et les designers. Chaque jalon se termine par une revue sur une version fonctionnelle, pas par un rapport d’avancement.',
      },
      {
        step: '03',
        title: 'Reprise et montée en charge',
        detail:
          'Nous déployons, formons votre équipe et vous remettons le code et les fichiers. Le suivi continue de mois en mois seulement si vous le souhaitez.',
      },
    ],
  },

  pricing: {
    title: 'Tarifs',
    intro: 'Des tarifs publiés, des jalons fixes, et le cadrage offert.',
    onRequest: 'Sur demande',
    subscriptionTitle: 'Abonnement mensuel',
    subscriptionIntro:
      'Une capacité de design et de développement continue, pour les équipes qui ont besoin d’un flux régulier plutôt que d’un projet unique. Une demande active à la fois, et vous pouvez suspendre ou résilier entre deux demandes.',
    monthly: 'Mensuel',
    yearly: 'Annuel',
    yearlyNote: 'facturé annuellement',
    perMonth: '/mois',
    perYear: '/an',
    featured: 'Le plus choisi',
    projectsTitle: 'Projets à périmètre fixe',
    projectsIntro: 'Pour un livrable défini. Chiffré et planifié par jalon avant le démarrage.',
    from: 'dès',
    subscriptionCta: 'Souscrire un abonnement',
    projectCta: 'Cadrer un projet',
    tiers: {
      design: {
        name: 'Design',
        detail: 'Marque, interface et motion design en continu.',
        includes: [
          'Une demande active à la fois',
          'Design de marque, d’interface et motion',
          'Délai habituel de 2 à 4 jours ouvrés',
          'Suspension ou résiliation à tout moment',
        ],
      },
      build: {
        name: 'Design + Développement',
        detail: 'Design et capacité de développement — les volets Go et Sketch réunis.',
        includes: [
          'Une demande active à la fois',
          'Design et développement full-stack',
          'Délai habituel de 3 à 7 jours ouvrés',
          'Infrastructure et maintenance incluses',
          'Suspension ou résiliation à tout moment',
        ],
      },
      scale: {
        name: 'Scale',
        detail: 'Capacité dédiée pour les équipes qui livrent en continu.',
        includes: [
          'Deux demandes actives à la fois',
          'Planification prioritaire',
          'Ingénieur et designer seniors dédiés',
          'Accompagnement architecture et feuille de route',
          'Suspension ou résiliation à tout moment',
        ],
      },
    },
    tracks: {
      management: {
        name: 'Systèmes de gestion',
        detail: 'Administration scolaire, RH et paie, réservation et gestion d’installations.',
      },
      webapps: {
        name: 'Applications web et mobiles',
        detail: 'Portails clients, plateformes, applications sur mesure et intégrations.',
      },
      brand: {
        name: 'Marque et motion explicatif',
        detail: 'Systèmes d’identité, bibliothèques de design et vidéos explicatives animées.',
      },
      growth: {
        name: 'Croissance et campagnes',
        detail: 'Tunnels d’acquisition, pages d’atterrissage, automatisation CRM et production de campagnes.',
      },
    },
  },

  scope: {
    title: 'Obtenez un cadrage à prix fixe',
    intro:
      'Répondez à cinq questions courtes et nous rédigeons le cadrage de votre projet — phases, livrables, calendrier et fourchette de prix — sur cette page, en une minute environ. Sans appel préalable, et sans frais de cadrage.',
    aside: 'Vous préférez en parler ? Réservez un appel depuis la bannière ci-dessous.',
    stepOf: 'Étape {current} sur {total}',
    stepNames: ['Votre besoin', 'Modules', 'Échelle', 'Calendrier', 'Vos coordonnées'],
    next: 'Suivant',
    back: 'Retour',
    submit: 'Rédiger mon cadrage',
    submitting: 'Rédaction…',
    progress: {
      reading: 'Lecture de vos besoins',
      drafting: 'Rédaction des phases et des livrables',
      estimating: 'Estimation du calendrier et de la fourchette',
    },
    q1: { title: 'De quel type de système avez-vous besoin ?', hint: 'Choisissez la réponse la plus proche.' },
    q2: { title: 'De quelles parties avez-vous besoin ?', hint: 'Sélectionnez tout ce qui s’applique.' },
    q3: { title: 'Quelle est son échelle ?', hint: 'Des ordres de grandeur suffisent.' },
    q4: { title: 'Pour quand le voulez-vous en production ?', hint: 'Et avec quel budget approximatif ?' },
    q5: { title: 'Où devons-nous l’envoyer ?', hint: '' },
    fields: {
      users: 'Combien de personnes l’utiliseront environ ?',
      sites: 'Combien de sites ou de lieux ?',
      existing: 'Avec quels systèmes doit-il fonctionner ?',
      existingPlaceholder: 'p. ex. notre logiciel comptable, une base élèves existante, Stripe',
      name: 'Nom',
      email: 'E-mail professionnel',
      company: 'Organisation',
      notes: 'Autre chose à nous signaler ?',
      notesPlaceholder: 'p. ex. nous avons trois sites et les présences sont rapprochées à la main chaque semaine',
    },
    domains: {
      education: 'École ou établissement de formation',
      sports: 'Installation sportive ou de loisirs',
      hr: 'RH, pointage ou paie',
      other: 'Autre chose',
    },
    timelines: {
      urgent: { label: 'Dès que possible', detail: 'Un premier module, 3 à 5 semaines' },
      standard: { label: 'Le trimestre prochain', detail: 'Système complet, 6 à 10 semaines' },
      ongoing: { label: 'Capacité continue', detail: 'Abonnement, de mois en mois' },
    },
    budgets: {
      unsure: 'Pas encore défini',
      small: 'Moins de CHF 15’000',
      medium: 'CHF 15’000 – 60’000',
      large: 'Plus de CHF 60’000',
    },
    result: {
      title: 'Votre projet de cadrage',
      disclaimer:
        'Il s’agit d’une estimation indicative générée à partir de vos réponses, et non d’une offre. Nous confirmons le périmètre et le prix par écrit avant tout démarrage.',
      phases: 'Phases',
      deliverables: 'Livrables',
      timeline: 'Calendrier estimé',
      weeks: 'semaines',
      range: 'Fourchette indicative',
      assumptions: 'Hypothèses retenues',
      risks: 'Ce qui pourrait modifier l’estimation',
      outOfScope: 'Non inclus',
      emailed:
        'Nous vous en avons envoyé une copie, ainsi qu’à notre équipe. Vous recevrez un cadrage écrit sous un jour ouvré.',
      restart: 'Recommencer',
      book: 'Réserver un appel pour l’affiner',
    },
    errors: {
      generic: 'Une erreur est survenue.',
      notSent: 'Vos informations n’ont pas été envoyées — veuillez réessayer ou nous écrire directement.',
      degraded:
        'Nous avons bien reçu votre demande et notre équipe en dispose. La rédaction instantanée est momentanément indisponible ; nous vous enverrons donc votre cadrage par e-mail.',
    },
  },

  faqs: {
    title: 'Questions fréquentes',
    items: [
      {
        question: 'Quels types de systèmes développez-vous ?',
        answer:
          'Des systèmes de gestion opérationnelle : administration scolaire et institutionnelle, RH avec pointage et paie, et réservation ou gestion d’installations. Nous partons du processus que vous voulez corriger, pas d’un produit standard.',
      },
      {
        question: 'Vous faites à la fois le développement et la communication — n’est-ce pas trop large ?',
        answer:
          'Nous travaillons en deux volets. Go couvre les systèmes de gestion et les applications web et mobiles. Sketch couvre l’identité de marque, la vidéo explicative et les campagnes. La plupart des clients commencent par l’un des deux. L’avantage de réunir les deux dans une même équipe, c’est que les personnes qui expliquent le système sont celles qui l’ont construit : le discours correspond donc à ce qui est réellement livré.',
      },
      {
        question: 'Comment vos tarifs sont-ils structurés ?',
        answer:
          'De deux façons. Un prix fixe par jalon pour les projets, ou un abonnement mensuel publié pour une capacité continue. Vous recevez le périmètre, le calendrier et le prix par écrit avant le démarrage d’un jalon, et vous pouvez vous arrêter entre deux jalons.',
      },
      {
        question: 'Quels sont les délais habituels ?',
        answer:
          'Un premier module ou un MVP prend environ 3 à 5 semaines. Une plateforme de gestion complète prend 6 à 10 semaines. Les travaux de marque et de vidéo explicative prennent 1 à 3 semaines. Vous recevez une feuille de route datée avant le démarrage.',
      },
      {
        question: 'Pouvez-vous vous intégrer aux systèmes que nous utilisons déjà ?',
        answer:
          'Oui. Nous développons des intégrations vers les logiciels comptables, les prestataires de paiement et les bases de données existantes, y compris des systèmes sur site qui n’exposent qu’une connexion à la base, et nous reprenons vos données historiques.',
      },
      {
        question: 'Où nos données sont-elles hébergées ?',
        answer:
          'En Suisse, chez un prestataire suisse, sous juridiction suisse. Pas chez un hyperscaler américain et sans transfert à l’étranger. Nous pouvons indiquer par écrit le prestataire et le centre de données afin que votre préposé à la protection des données puisse le vérifier.',
      },
      {
        question: 'Notre système contient des données d’élèves et de collaborateurs. Comment les traitez-vous ?',
        answer:
          'Les dossiers d’élèves, de personnel et de salaires sont des données personnelles sensibles : le contrôle d’accès relève donc de l’architecture et non d’une étape ultérieure — permissions par rôle, journalisation des accès, chiffrement au repos et minimisation des données par défaut. À noter : les écoles et les communes sont des organes cantonaux ou communaux ; c’est donc votre loi cantonale sur la protection des données qui s’applique et votre préposé cantonal qui exerce la surveillance, et non la loi fédérale. Nous construisons selon les exigences de votre canton et fournissons l’inscription au registre des traitements ainsi qu’une analyse d’impact que vous pouvez leur transmettre directement. Pour les employeurs privés, c’est la LPD fédérale qui s’applique, et nous travaillons selon celle-ci.',
      },
      {
        question: 'Nous sommes une école ou une commune. Comment se passe la procédure de marché ?',
        answer:
          'En dessous du seuil cantonal de la procédure sur invitation, un mandat peut normalement être attribué sans appel d’offres ouvert — pour les services, cela se situe généralement sous CHF 150’000, mais les seuils varient selon les cantons et sont révisés tous les deux ans : vérifiez le montant en vigueur chez vous. Au-dessus, nous répondons aux publications sur SIMAP et fournissons le dossier habituel : références, attestation d’assurance, concept de protection des données et déclaration de sous-traitance. Nos jalons à prix fixe sont structurés pour correspondre à la manière dont les budgets publics sont approuvés.',
      },
      {
        question: 'Le code source et les fichiers de design nous appartiennent-ils ?',
        answer:
          'Oui, entièrement. À la remise, vous recevez le code source, les schémas de base de données, les fichiers du design system et les médias. Il n’y a aucune licence à renouveler et rien ne vous empêche de confier la suite à une autre équipe.',
      },
      {
        question: 'Proposez-vous une maintenance après la mise en production ?',
        answer:
          'Oui — maintenance post-lancement, gestion de l’infrastructure cloud, mises à jour de sécurité et développement de nouvelles fonctionnalités, soit dans un périmètre mensuel, soit via l’abonnement.',
      },
    ],
  },

  procurement: {
    title: 'Acheter en tant qu’école, commune ou collectivité publique',
    intro:
      'Les collectivités publiques achètent selon les règles des marchés publics. Nous travaillons à l’intérieur de ces règles plutôt qu’à côté, et nous dimensionnons les projets en conséquence.',
    points: [
      {
        title: 'Souvent sans appel d’offres ouvert',
        detail:
          'En dessous du seuil cantonal de la procédure sur invitation — généralement sous CHF 150’000 pour les services — un mandat peut normalement être attribué de gré à gré. Les seuils varient selon les cantons et sont révisés tous les deux ans : vérifiez le montant en vigueur chez vous.',
      },
      {
        title: 'Nous répondons aux publications SIMAP',
        detail:
          'Au-dessus du seuil, nous soumissionnons normalement et fournissons le dossier habituel : références, attestation d’assurance, concept de protection des données et déclaration de sous-traitance.',
      },
      {
        title: 'Des jalons alignés sur les cycles budgétaires',
        detail:
          'Les jalons à prix fixe correspondent à la manière dont les budgets publics sont approuvés et libérés, au lieu d’exiger un montant global en début de mandat.',
      },
      {
        title: 'La documentation que votre préposé demandera',
        detail:
          'Inscription au registre des traitements, analyse d’impact relative à la protection des données et confirmation écrite du lieu d’hébergement — préparées dans le cadre du mandat, et non après coup.',
      },
    ],
  },

  cta: {
    title:
      'Vous ne savez pas encore quoi cadrer ? Prenez 30 minutes avec un ingénieur, pas avec un commercial.',
    button: 'Réserver un appel de 30 min',
  },

  footer: {
    title: 'Dites-nous ce qui freine votre organisation.',
    button: 'Obtenir un cadrage',
    note: 'Vous recevez un cadrage écrit avec les jalons et les prix avant tout engagement.',
    legal: 'Conditions · Confidentialité · Mentions légales — bientôt disponibles',
    rights: origine.rights,
    team: 'Équipe distribuée, aux horaires suisses. Données clients hébergées en Suisse.',
    social: 'Réseaux sociaux',
  },

  proof: {
    systems: 'systèmes en production',
    years: 'ans à les construire',
    institutions: 'institutions accompagnées',
  },

  testimonials: {
    title: 'Ce qu’en disent celles et ceux qui utilisent ces systèmes',
  },

  pages: {
    home: 'Accueil',
    solutions: 'Solutions',
    services: 'Services',
    servicesInArea: 'Nos services dans ce domaine',
    included: 'Ce que comprend un projet',
    relatedWork: 'Réalisations associées',
    problemTitle: 'Le problème',
    solutionTitle: 'Ce que nous construisons',
    pricingTitle: 'Combien cela coûte',
    pricingBody:
      'Un prix fixe par jalon, convenu par écrit avant le démarrage du jalon. Le cadrage est offert et vous pouvez vous arrêter entre deux jalons.',
    pricingCta: 'Obtenir un cadrage à prix fixe',
    allSolutions: 'Toutes les solutions',
  },

  hubs: {
    'school-management': {
      navLabel: 'Gestion scolaire et institutionnelle',
      navDetail: 'Inscriptions, présences, notes, portails parents, facturation.',
      kicker: 'Solutions · Éducation',
      h1: 'Logiciel de gestion scolaire pour les institutions suisses',
      intro:
        'Un seul système pour les inscriptions, les présences, les notes, la communication avec les parents et la facturation — en remplacement des tableurs et des formulaires papier qui ralentissent chaque fin de mois.',
      problem: [
        'Les présences sont notées sur papier puis ressaisies, si bien que registres et factures doivent être rapprochés à la main chaque semaine.',
        'Chaque site applique son propre processus : il n’existe aucune vue consolidée, ni académique ni opérationnelle.',
        'Les parents téléphonent et écrivent au secrétariat pour des informations qui pourraient être en libre-service.',
      ],
      solution: [
        'Un dossier unique par élève, de l’inscription aux notes jusqu’au certificat de fin de scolarité.',
        'Une saisie des présences qui alimente directement la facturation : les deux ne peuvent plus diverger.',
        'Un portail parents pour les absences, les bulletins, les paiements et les messages.',
        'Une administration multi-sites avec un reporting consolidé entre les établissements.',
      ],
      faqs: [
        {
          question: 'Peut-il fonctionner en parallèle du système que nous avons déjà ?',
          answer:
            'Oui. Nous commençons souvent par un seul module — les présences ou la facturation — connecté à vos données existantes, puis nous élargissons. Le premier jalon reste ainsi petit et réversible.',
        },
        {
          question: 'Comment les données des élèves sont-elles protégées ?',
          answer:
            'Permissions par rôle, journalisation des accès, chiffrement au repos et minimisation des données font partie de l’architecture, et non d’une étape ultérieure. Les données sont hébergées en Suisse. Les écoles et les communes relèvent de la loi cantonale sur la protection des données plutôt que de la loi fédérale : nous construisons selon les exigences de votre canton et vous remettons l’inscription au registre des traitements et l’analyse d’impact que votre préposé cantonal demandera.',
        },
      ],
    },
    'hr-and-payroll': {
      navLabel: 'RH, pointage et paie',
      navDetail: 'Pointage des entrées et sorties, congés, calcul des salaires, rapports.',
      kicker: 'Solutions · RH et paie',
      h1: 'Logiciel RH, de pointage et de paie',
      intro:
        'Des heures saisies une seule fois, au moment du travail, et reprises jusqu’au calcul des salaires sans tableur intermédiaire.',
      problem: [
        'Les heures sont notées sur papier ou dans un tableur puis ressaisies avant la paie, ce qui rend la clôture mensuelle lente et source d’erreurs.',
        'Les soldes de congés existent dans la tête de quelqu’un ou dans un fichier partagé : impossible de trancher un désaccord.',
        'Il n’existe aucun relevé fiable de qui a travaillé où, ce qui devient un problème dès que la question est posée.',
      ],
      solution: [
        'Un pointage des entrées et sorties réellement utilisable, sur borne ou sur téléphone.',
        'Demandes de congés, validations et soldes calculés automatiquement.',
        'Un calcul des salaires alimenté par les heures enregistrées, avec un export prêt pour la paie.',
        'Contrats et dossiers du personnel réunis, avec une piste d’audit.',
      ],
      faqs: [
        {
          question: 'Gérez-vous les spécificités de la paie suisse ?',
          answer:
            'Nous encodons les règles de calcul selon vos exigences cantonales et contractuelles, et nous exportons dans le format attendu par votre fiduciaire ou votre prestataire de paie. Nous nous intégrons à votre paie existante plutôt que de la remplacer, sauf si vous souhaitez toute la chaîne.',
        },
        {
          question: 'Et les collaborateurs sans téléphone professionnel ?',
          answer:
            'Une borne partagée — une tablette à l’entrée avec badge ou code — fonctionne exactement comme un appareil individuel. La plupart de nos déploiements utilisent les deux.',
        },
      ],
    },
    'booking-and-facilities': {
      navLabel: 'Réservation et gestion d’installations',
      navDetail: 'Calendriers de ressources, réservations en ligne, abonnements, paiements.',
      kicker: 'Solutions · Installations',
      h1: 'Logiciel de réservation et de gestion d’installations',
      intro:
        'Un calendrier par ressource, réservable en ligne, avec les abonnements et le paiement rattachés — fin des doubles réservations et visibilité enfin réelle sur l’utilisation de chaque installation.',
      problem: [
        'Les réservations arrivent par téléphone et par message, ce qui provoque des doubles réservations et ne laisse aucune trace.',
        'Personne ne peut dire quel terrain, quelle salle ou quel court est réellement rentable.',
        'Le paiement est encaissé séparément de la réservation : le rapprochement est manuel.',
      ],
      solution: [
        'Un calendrier par ressource, avec des règles d’horaires, de durée et de droits de réservation.',
        'Une réservation en ligne en libre-service, avec confirmation immédiate.',
        'Abonnements, souscriptions et réservations ponctuelles dans le même système.',
        'Un reporting de l’utilisation et des recettes par installation.',
      ],
      faqs: [
        {
          question: 'Les membres peuvent-ils payer en ligne ?',
          answer:
            'Oui — carte et moyens de paiement suisses, rattachés à la réservation, si bien que réservation et paiement forment un seul enregistrement au lieu de deux.',
        },
        {
          question: 'Nous avons plusieurs sites. Est-ce que cela fonctionne ?',
          answer:
            'Oui. Les ressources sont regroupées par site, avec des règles et des droits propres à chacun, plus un reporting consolidé sur l’ensemble.',
        },
      ],
    },
    'brand-and-communication': {
      navLabel: 'Marque et communication',
      navDetail: 'Systèmes d’identité, vidéo explicative, supports d’adoption.',
      kicker: 'Solutions · Communication',
      h1: 'Marque et communication pour produits techniques',
      intro:
        'L’équipe qui a construit le système est celle qui l’explique : le discours correspond au produit au lieu de décrire quelque chose qui n’existe pas.',
      problem: [
        'Un système qui fonctionne mais que personne n’adopte, parce que personne ne l’a expliqué à celles et ceux qui doivent l’utiliser.',
        'Une campagne qui promet des fonctionnalités que le logiciel n’a pas.',
        'Des supports produits par une agence qui n’a jamais vu le produit.',
      ],
      solution: [
        'Des systèmes d’identité et des bibliothèques de composants cohérents entre les produits.',
        'Une vidéo explicative animée qui rend un système complexe compréhensible en moins d’une minute.',
        'Des supports de prise en main et de formation qui font réellement adopter le système.',
        'Des pages d’atterrissage et des tunnels reliés à votre pipeline.',
      ],
      faqs: [
        {
          question: 'Pouvez-vous faire la communication sans construire le système ?',
          answer:
            'Oui. De nombreux clients nous confient un produit existant à expliquer. Nous demandons d’abord un accès : nous n’écrivons pas sur un logiciel que nous n’avons pas utilisé.',
        },
        {
          question: 'Combien de temps prend une vidéo explicative ?',
          answer:
            'De une à trois semaines selon la durée et la présence ou non de 3D. Le script et le storyboard sont validés avant le début de l’animation.',
        },
      ],
    },
  },

  services: {
    'school-management-software': {
      h1: 'Logiciel de gestion scolaire, conçu pour votre processus',
      intro:
        'Une plateforme d’administration sur mesure pour les écoles et les institutions de formation — et non un modèle générique que l’on tord pour l’adapter.',
      problem:
        'Les logiciels scolaires standards imposent leur logique à votre processus. Quand cela ne correspond pas, l’écart est comblé par des tableurs — et ces tableurs deviennent le véritable système de référence.',
      solution:
        'Nous cartographions d’abord votre processus administratif réel, puis nous construisons les modules qui le portent — inscriptions, présences, notes, facturation — avec votre terminologie et vos règles.',
      includes: [
        'Dossiers élèves et familles avec stockage des documents',
        'Saisie des présences et traitement des absences',
        'Notes, bulletins et reporting',
        'Facturation liée aux inscriptions et aux présences',
        'Accès par rôle pour le personnel, la direction et les parents',
      ],
      faqs: [
        {
          question: 'Quand pourrons-nous utiliser la première partie ?',
          answer:
            'Un premier module fonctionnel est livré en 3 à 5 semaines. Nous cadrons volontairement le premier jalon pour qu’il soit utile en lui-même, sans attendre la plateforme complète.',
        },
        {
          question: 'Nos données historiques peuvent-elles être reprises ?',
          answer:
            'Oui — voir la migration de données. Nous reprenons les dossiers depuis des tableurs, des exports ou une base existante, et nous rapprochons le résultat avec vous avant la mise en production.',
        },
      ],
    },
    'parent-portal': {
      h1: 'Portail parents pour les écoles',
      intro:
        'Un portail en libre-service qui retire du téléphone du secrétariat les demandes de routine.',
      problem:
        'Le personnel administratif passe une grande partie de la semaine à répondre à des questions dont la réponse existe déjà quelque part : une absence, un bulletin, une facture, une date.',
      solution:
        'Un portail où chaque parent voit ses propres enfants — présences, résultats, factures, documents et messages — avec des droits qui n’exposent jamais les données d’une autre famille.',
      includes: [
        'Un accès par famille, strictement limité à ses propres enfants',
        'Déclaration et justification des absences',
        'Bulletins et résultats dès leur publication',
        'Factures et état des paiements',
        'Annonces et messagerie directe',
      ],
      faqs: [
        {
          question: 'Qu’est-ce qui empêche un parent de voir les données d’un autre enfant ?',
          answer:
            'L’accès est contrôlé côté serveur pour chaque relation, et non en masquant des parties de l’interface. C’est la zone la plus testée de tous les portails que nous construisons, parce qu’une erreur y constitue un incident de protection des données.',
        },
        {
          question: 'Les parents doivent-ils installer une application ?',
          answer:
            'Non. Cela fonctionne dans le navigateur, sur téléphone. Une application native est possible, mais rarement justifiée au vu du coût supplémentaire et des contraintes des magasins d’applications.',
        },
      ],
    },
    'time-tracking': {
      h1: 'Logiciel de pointage pour les employeurs suisses',
      intro:
        'Des heures saisies au moment du travail, une seule fois, sous une forme exploitable par la paie.',
      problem:
        'Les feuilles de temps papier et les tableurs partagés sont ressaisis avant la paie. Chaque ressaisie est une occasion d’erreur que personne ne détecte avant qu’un salaire soit faux.',
      solution:
        'Un pointage des entrées et sorties sur borne partagée ou sur téléphone, avec les règles de pauses, d’heures supplémentaires et d’équipes encodées une fois et appliquées de façon constante.',
      includes: [
        'Pointage par badge, code ou téléphone',
        'Règles de pauses, d’heures supplémentaires et d’équipes',
        'Vues par site et par équipe',
        'Processus de correction avec piste d’audit',
        'Export au format de votre prestataire de paie',
      ],
      faqs: [
        {
          question: 'Un responsable peut-il corriger une erreur ?',
          answer:
            'Oui, via un processus de correction qui enregistre qui a modifié quoi et pourquoi. Ce sont précisément les modifications silencieuses qui rendent un relevé d’heures indéfendable.',
        },
        {
          question: 'Est-ce que cela fonctionne hors ligne ?',
          answer:
            'Une borne continue d’enregistrer si la connexion tombe, puis se synchronise au retour du réseau. Perdre une matinée de pointages à cause du réseau n’est pas acceptable.',
        },
      ],
    },
    payroll: {
      h1: 'Logiciel de paie et de gestion des salaires',
      intro: 'Un calcul des salaires alimenté par les heures enregistrées, pas par un tableur.',
      problem:
        'Une paie assemblée à la main chaque mois depuis plusieurs sources est lente, difficile à auditer et impossible à reproduire lorsqu’un collaborateur conteste une fiche de salaire de six mois plus tôt.',
      solution:
        'Des règles de calcul encodées une fois, appliquées aux heures enregistrées et aux contrats, produisant un résultat reproductible et un export accepté par votre fiduciaire.',
      includes: [
        'Calcul des salaires depuis les heures et les contrats',
        'Indemnités, déductions et règles d’heures supplémentaires',
        'Traitements mensuels reproductibles, avec historique complet',
        'Export prêt pour la paie',
        'Historique et piste d’audit par collaborateur',
      ],
      faqs: [
        {
          question: 'Remplacez-vous notre prestataire de paie ?',
          answer:
            'En général non. Nous produisons des données d’entrée propres et correctes pour le prestataire que vous utilisez déjà. Remplacer toute la chaîne est possible, mais rarement le moyen le plus économique de régler le vrai problème.',
        },
        {
          question: 'Pouvons-nous relancer un mois passé ?',
          answer:
            'Oui. Les traitements sont reproductibles et versionnés : vous pouvez démontrer exactement comment un montant a été obtenu.',
        },
      ],
    },
    'facility-booking': {
      h1: 'Logiciel de réservation d’installations et de terrains',
      intro:
        'La réservation en ligne pour les installations sportives, les salles et les ressources partagées, paiement inclus.',
      problem:
        'Les réservations par téléphone et par message provoquent des doubles réservations, et aucun relevé ne permet de savoir quelle installation est réellement utilisée ni ce qu’elle rapporte.',
      solution:
        'Un calendrier par ressource avec de vraies règles de réservation, la réservation en libre-service, les abonnements, et un reporting sur l’utilisation et les recettes.',
      includes: [
        'Un calendrier par ressource avec règles de disponibilité',
        'Réservation en libre-service avec confirmation immédiate',
        'Abonnements, souscriptions et réservations ponctuelles',
        'Paiement en ligne rattaché à la réservation',
        'Reporting de l’utilisation et des recettes par installation',
      ],
      faqs: [
        {
          question: 'Pouvons-nous continuer à prendre des réservations par téléphone ?',
          answer:
            'Oui — le personnel réserve dans le même calendrier, si bien que le téléphone et le site ne peuvent jamais se chevaucher.',
        },
        {
          question: 'Peut-on définir des règles différentes par ressource ?',
          answer:
            'Oui : horaires d’ouverture, durée minimale et maximale, délai de préavis, droits de réservation et tarification, le tout par ressource.',
        },
      ],
    },
    'explainer-video': {
      h1: 'Vidéo explicative animée pour logiciels',
      intro:
        'Un court film animé qui rend un système complexe compréhensible en moins d’une minute.',
      problem:
        'Les produits techniques perdent leur audience dans les trente premières secondes. Une démonstration est trop longue, une capture d’écran en dit trop peu, et un paragraphe de fonctionnalités n’explique pas pourquoi cela compte.',
      solution:
        'Script, storyboard et animation 2D ou 3D, réalisés par des personnes qui ont utilisé le logiciel — le film explique donc le produit réel, et non une idée marketing de celui-ci.',
      includes: [
        'Script et storyboard, validés avant l’animation',
        'Animation 2D ou 3D dans votre système de marque',
        'Voix off et création sonore',
        'Formats adaptés au web, aux réseaux et aux présentations',
        'Fichiers sources remis à la livraison',
      ],
      faqs: [
        {
          question: 'Quelle durée faut-il viser ?',
          answer:
            'Soixante à nonante secondes pour une vidéo produit. Plus long uniquement lorsqu’elle remplace une démonstration en direct, et nous la structurons alors en chapitres.',
        },
        {
          question: 'Les fichiers d’animation nous appartiennent-ils ?',
          answer:
            'Oui, y compris les sources du projet. Aucune licence à renouveler et rien n’empêche un autre studio de reprendre le travail.',
        },
      ],
    },
    'web-app-development': {
      h1: 'Développement d’applications web sur mesure',
      intro:
        'Des applications full-stack pour les organisations dont le processus ne correspond à aucun produit disponible sur le marché.',
      problem:
        'Quand les outils du marché conviennent presque, l’écart est absorbé par du travail manuel — et ce travail manuel devient discrètement le poste le plus coûteux de l’exploitation.',
      solution:
        'Une application web construite autour de votre processus réel, sur une stack pour laquelle vous pourrez recruter, avec le code et les schémas transférés dès le premier jour.',
      includes: [
        'Architecture et modèle de données conçus avec vous',
        'Application web sur Next.js, Node et PostgreSQL',
        'Contrôle d’accès par rôle et journalisation',
        'Intégrations avec les systèmes que vous exploitez déjà',
        'Déploiement, reprise et formation',
      ],
      faqs: [
        {
          question: 'Sur quelle stack travaillez-vous ?',
          answer:
            'Next.js, Node et PostgreSQL, hébergés en Suisse. Des choix volontairement ordinaires : vous devez pouvoir recruter quelqu’un d’autre qui les maîtrise.',
        },
        {
          question: 'Que se passe-t-il si nous changeons d’équipe plus tard ?',
          answer:
            'Vous avez déjà tout : code source, schémas de base de données, configuration d’infrastructure et documentation vous sont transférés au fil du projet, et non à la fin.',
        },
      ],
    },
    'data-migration': {
      h1: 'Migration de données pour systèmes de gestion',
      intro:
        'Sortir des années de données de tableurs et de systèmes existants, avec un résultat rapproché avant la mise en production.',
      problem:
        'C’est sur la migration qu’échouent les remplacements de systèmes. Les données sont plus désordonnées que prévu, et personne ne remarque ce qui a été perdu avant l’extinction de l’ancien système.',
      solution:
        'Nous profilons d’abord les données sources, nous convenons avec vous des règles pour les cas délicats, nous migrons par essais successifs, et nous rapprochons volumes et totaux avant toute mise en production.',
      includes: [
        'Profilage des données sources et rapport de qualité',
        'Traitement convenu des doublons, manques et conflits',
        'Essais répétables, et non une bascule unique',
        'Rapprochement des volumes et des totaux avant production',
        'Un chemin de retour arrière documenté',
      ],
      faqs: [
        {
          question: 'Nos données sont en mauvais état. Est-ce un problème ?',
          answer:
            'C’est normal, et c’est pourquoi la première étape est le profilage et non la migration. Vous recevez un rapport de ce qui est dupliqué, manquant ou contradictoire, et vous décidez des règles avant que nous déplacions quoi que ce soit.',
        },
        {
          question: 'Pouvons-nous faire tourner les deux systèmes en parallèle ?',
          answer:
            'Oui, et pour tout ce qui touche à la paie ou à la facturation nous le recommandons sur au moins un cycle, afin de pouvoir comparer les deux.',
        },
      ],
    },
  },
};

export default fr;
