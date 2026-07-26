/**
 * Homepage content.
 *
 * Originally migrated verbatim from our own WordPress/Elementor site. Copy that
 * described no particular product — "Communication Tools", "User-Centric Design",
 * "Seamless Integration" — has been rewritten against things Ozwell actually
 * does, each traceable to the Help Center, the FAQ, or the certification.
 */

export const hero = {
  /**
   * Three lines of one heading, not three headings. The `{' '}` separators in
   * `Hero.tsx` matter: without them the spans concatenate and the accessible name
   * reads "Say hi toOzwell.Your AI medical assistant".
   *
   * The brand-voice opener stays, but the line that carries the search intent —
   * "AI medical assistant" — is now inside the H1 rather than only in a <p>.
   */
  eyebrowLines: ['Say hi to', 'Ozwell.'],
  subheading: 'Your AI medical assistant.',
  description:
    'Ozwell listens to the visit, writes the structured SOAP note, and queues the orders and referrals for your approval — so charting stops following you home.',
  /** Verifiable claims only. Each one is backed elsewhere on the site. */
  trustPoints: ['HIPAA compliant', 'Drummond pDSI-Risk certified', 'Works with your EHR'],
  image: {
    src: '/images/Ozwell-Branding-Whiteboard-2.webp',
    alt: 'A clinician reviewing a chart on a tablet with a patient, framed by the Ozwell mascot',
    width: 1400,
    height: 1205,
  },
  /**
   * Rendered as prompt suggestions rather than loose pills — they are examples of
   * what you can ask Ozwell, and the illustration behind them already contains an
   * empty input bar they now sit inside.
   */
  chips: [
    { label: 'Create a SOAP Note' },
    { label: 'Attach to Patient Record' },
    { label: 'Send Summary to Patient Chart' },
  ],
  chipHref:
    'https://ai.bluehive.com/session/Rdj3NsYnmoygWWRpG?utm_source=ozwell.ai#Gr6YRbpceMotpSdIDBZweqRENzTWM-i6HWm0WLhUk26',
}

export const logoCloud = {
  /** Was a 35px H2 — larger than some section titles — for what is a caption. */
  title: 'Enhancing workflows for leading healthcare companies',
  logos: [
    { src: '/images/company-logos-2.webp', alt: 'Enterprise Health' },
    { src: '/images/company-logos-4.webp', alt: 'Michigan Healthcare Professionals' },
    { src: '/images/company-logos-6.webp', alt: 'BlueHive' },
    { src: '/images/company-logos-3.webp', alt: 'Maui Medical Group' },
    { src: '/images/company-logos-1.webp', alt: 'WebChart' },
  ],
}

/**
 * The problem, stated once with numbers.
 *
 * The homepage previously jumped from "say hi to Ozwell" straight to feature
 * lists, so nothing established why any of it mattered. Every figure here is
 * cited from the research already summarised in our own blog post, and `Stat`
 * requires the attribution rather than leaving it optional.
 */
export const problem = {
  eyebrow: 'The problem',
  title: 'Documentation is eating clinical medicine',
  description:
    'Clinicians did not train for data entry. The shift to electronic records moved the paperwork onto the screen without reducing any of it — and the cost shows up in hours, in burnout, and in dollars.',
  stats: [
    {
      value: '2 hours',
      label: 'of documentation and desk work for every hour spent with a patient',
      source: 'Sinsky et al., 2016',
    },
    {
      value: '63%',
      label: 'of physicians report symptoms of burnout, with administrative burden a leading cause',
      source: 'Shanafelt et al., 2022',
    },
    {
      value: '52%',
      label: 'of the primary-care workday goes to EHR tasks — 5.9 hours out of 11.4',
      source: 'Arndt et al., 2017',
    },
    {
      value: '$286B',
      label: 'spent every year on administrative complexity instead of on patient care',
      source: 'Shrank et al., 2019',
    },
  ],
  cta: {
    label: 'Read the research',
    href: '/blog/the-healthcare-documentation-crisis-why-ai-isnt-a-luxury-its-a-necessity/',
  },
}

export const featureVideo = {
  eyebrow: 'See it work',
  youtubeId: 'eCj_7FXArmg',
  title: 'Ozwell: your AI-powered clinical assistant, inside your EHR',
  description:
    'Two minutes, one clinic encounter: what Ozwell hears, what it writes, and what lands in the chart.',
}

/**
 * Three differentiated capabilities. There were two, and they sat among three
 * other overlapping feature sections; the EHR-native row is the one the FAQ and
 * the WebChart integration guide describe but the homepage never mentioned.
 */
export const featureRows = [
  {
    eyebrow: 'Smart scribing & accurate charting',
    title: 'Reclaim your time, refocus on patient care',
    description:
      'Ozwell transcribes the encounter as it happens, pulls out the clinical detail, and populates the chart — handling specialised terminology rather than everyday speech. You review a finished note instead of writing one.',
    bullets: [
      { label: 'Transcribe patient visits', icon: 'mic' },
      { label: 'Automate chart population', icon: 'gear' },
    ],
    cta: { label: 'Start free trial', href: 'https://ai.bluehive.com/?utm_source=ozwell.ai' },
    media: {
      kind: 'video' as const,
      src: '/videos/ozwell-smart-scribing.mp4',
      poster: '/videos/ozwell-smart-scribing.jpg',
    },
    mediaSide: 'left' as const,
  },
  {
    eyebrow: 'Smart call handling',
    title: 'Optimize your lines, elevate your service',
    description:
      'Configure your own voice prompts and let Ozwell answer. It handles refill requests, appointment reminders, and routine questions, routes what it should not answer, and gives your front desk back the phone.',
    bullets: [
      { label: 'Automate routine calls', icon: 'phone' },
      { label: 'Personalize caller experience', icon: 'user' },
    ],
    cta: { label: 'Start free trial', href: 'https://ai.bluehive.com/?utm_source=ozwell.ai' },
    media: {
      kind: 'video' as const,
      src: '/videos/ozwell-call-dashboard.mp4',
      poster: '/videos/ozwell-call-dashboard.jpg',
    },
    mediaSide: 'right' as const,
  },
  {
    eyebrow: 'Works inside your stack',
    title: 'No new system to learn',
    description:
      'Ozwell connects to WebChart and the EHR, HRIS, and CRM tools you already run, then writes results back where your team expects to find them. Orders, referrals, and follow-ups queue as reviewable actions — nothing files until you approve it.',
    bullets: [
      { label: 'Write back to the chart', icon: 'plug' },
      { label: 'Approve before anything files', icon: 'shield' },
    ],
    cta: {
      label: 'Read the integration guide',
      href: '/docs/webchart-ozwell-integration-user-guide/',
    },
    media: {
      kind: 'image' as const,
      src: '/images/4-scaled.webp',
      alt: 'The Ozwell mobile app showing a generated SOAP note — subjective, objective, assessment, and plan — ready for review',
      // Portrait: every product shot in this set is a 900×1600 phone mockup.
      width: 900,
      height: 1600,
    },
    mediaSide: 'left' as const,
  },
]

export const certification = {
  eyebrow: 'Security & certification',
  title: "The market's first and only Drummond pDSI-Risk certified AI-powered Health IT solution",
  description:
    "The certification confirms that Ozwell's AI platform meets key benchmarks for intervention risk assessment and mitigation — a critical step in supporting the responsible use of AI in clinical care.",
  badges: ['HIPAA compliant', 'Mobile friendly', 'Drummond certified'],
  image: {
    src: '/images/thumb-Drummond-Certified-pDSI-RISK-2025.webp',
    alt: 'Drummond Certified pDSI-RISK 2025 certification badge',
    width: 600,
    height: 600,
  },
  cta: {
    label: 'How we disclose our AI',
    href: '/blog/ozwell-pdsi-source-attributes/',
  },
}

/**
 * Testimonials — transcribed from the legacy `testimonials-1024x576.png` composite,
 * which rendered these quotes as a flat image (illegible on mobile, invisible to
 * search).
 *
 * The quotes are verbatim. They predate the BlueHive AI → Ozwell rename, so the
 * product name is bracketed on the same convention the migrated blog posts
 * already use ("BlueHive AI [Ozwell]"). Replace when refreshed quotes exist.
 */
export const testimonials = {
  eyebrow: 'From the exam room',
  title: "Don't just take our word for it",
  description: 'Two physicians on what changed after a fortnight with Ozwell.',
  items: [
    {
      /** Pull quote: the line a skimmer should take away from the full quote. */
      highlight: 'Most of us in the practice have gained back an hour or two each day.',
      quote:
        'BlueHive AI [Ozwell] has been an absolute game changer for me. I’ve been using it for just two weeks, but it already feels like a major step forward compared to when we transitioned from paper charts to EMRs. With EMRs, I often found myself focusing more on the screen than on the patient, which really took away from the personal interaction. BlueHive [Ozwell] has given me the freedom to go back to being a doctor—looking my patients in the eye and focusing on them, while the AI handles the documentation. It’s liberating. Most of us in the practice have gained back an hour or two each day, and the improvement in patient care is remarkable.',
      name: 'Jeffrey Margolis, M.D.',
      title: 'President of Michigan Health Professionals',
      avatar: '/images/testimonials/jeffrey-margolis.webp',
    },
    {
      highlight:
        'I saw 35 patients today, and all my notes and referrals were completed by the end of the clinic day.',
      quote:
        'One of the biggest challenges in medicine is time. We spend a lot of hours on administrative tasks like charting—up to one to two hours daily. This time is taking away from patient care and even our personal lives. BlueHive AI [Ozwell] has already helped cut down that time. It allows me to focus more on patient care without the stress of additional paperwork at the end of the day. For example, I saw 35 patients today, and all my notes and referrals were completed by the end of the clinic day.',
      name: 'Richard Zekman, D.O.',
      title: 'Division of Clinical Hematology & Medical Oncology',
      avatar: '/images/testimonials/richard-zekman.webp',
    },
  ],
}

/**
 * How Ozwell works — replaces the legacy 22 MB autoplaying MP4 of a nine-box
 * flowchart, whose text was unreadable at every viewport and invisible to screen
 * readers and search engines. The nine original stages collapse into four.
 */
export const howItWorks = {
  eyebrow: 'How it works',
  title: 'From conversation to completed chart',
  description:
    'Ozwell listens to the visit, understands the clinical detail, and does the documentation — then gets better at your terminology every time you use it.',
  steps: [
    {
      icon: 'mic',
      title: 'Listen',
      description:
        'Start from phone or chat, on desktop or mobile. Ozwell transcribes the encounter in real time and handles specialized clinical terminology, not just everyday speech.',
    },
    {
      icon: 'brain',
      title: 'Understand',
      description:
        'It reads the full context of the conversation rather than matching keywords — pulling out conditions, medications, allergies, vitals, and referrals as discrete clinical facts.',
    },
    {
      icon: 'clipboard',
      title: 'Act',
      description:
        'A structured SOAP note is written for you, with orders, referrals, and follow-ups queued as reviewable actions. Nothing is filed until you approve it.',
    },
    {
      icon: 'refresh',
      title: 'Learn',
      description:
        'Your corrections feed back in, so accuracy improves against your own vocabulary and documentation style. Results sync to EHR, HRIS, and the rest of your stack.',
    },
  ],
}

/**
 * Capability grid. The heading is the former standalone "Work Smarter" band, which
 * was a heading and a paragraph with no content of its own.
 *
 * Every card previously named a software category rather than a behaviour —
 * "Communication Tools", "User-Centric Design" — and a competitor could have run
 * the identical list. These six are specific, and each is documented elsewhere on
 * this site: the custom-instructions and multi-device guides in the Help Center,
 * the terminology and phone answers in the FAQ, the approval gate in step three
 * above.
 */
export const featureCards = {
  eyebrow: 'Built for clinicians',
  title: 'Work smarter, not harder',
  description:
    'Ozwell adapts to how your practice already runs, rather than asking your practice to adapt to it.',
  cards: [
    {
      icon: 'graduation',
      title: 'Learns your vocabulary',
      description:
        'Every correction you make feeds back in, so accuracy improves against your own terminology and note style instead of a generic model average.',
    },
    {
      icon: 'sliders',
      title: 'Custom instructions per clinician',
      description:
        'Set your name, title, and standing instructions once. Notes come out in your voice and your format, not a house template.',
    },
    {
      icon: 'stethoscope',
      title: 'Specialty terminology, not just speech',
      description:
        'Built to interpret complex medical, legal, and technical language — the vocabulary general-purpose dictation reliably mangles.',
    },
    {
      icon: 'phone',
      title: 'A phone line that answers itself',
      description:
        'Refill requests, appointment reminders, and routine questions handled with your own voice prompts, escalating the rest to a human.',
    },
    {
      icon: 'smartphone',
      title: 'Works on the phone in your pocket',
      description:
        'iOS and Android apps on the same account. Start a note between rooms on mobile and finish it at the desktop.',
    },
    {
      icon: 'shield',
      title: 'Nothing files without approval',
      description:
        'Orders, referrals, and follow-ups arrive as reviewable actions. You stay the last step before anything reaches the record.',
    },
  ],
  phoneImage: {
    src: '/images/Ozwell-mobile-phones-for-website-608x1080.webp',
    alt: 'The Ozwell mobile app shown on two phones',
    width: 800,
    height: 1421,
  },
}

export const faqs = {
  eyebrow: 'Get answers',
  title: 'Frequently asked questions',
  description:
    'How Ozwell fits into a working practice. If your question is not here, the Help Center goes deeper.',
  items: [
    {
      question: 'What is Ozwell?',
      answer:
        'Ozwell is an AI medical assistant for healthcare practices. It transcribes patient visits, writes structured clinical notes, answers inbound calls, and connects to the EHR and other systems you already use, so documentation and routine administration stop consuming clinical time.',
    },
    {
      question: 'How does the Ozwell phone assistant work when people call in?',
      answer:
        'The Ozwell phone assistant handles incoming calls with advanced natural language processing. When a call comes in, it can understand and respond to a wide range of inquiries — scheduling appointments, providing information, or routing the call to the appropriate department. It interprets complex industry-specific terminology, which makes it particularly useful in fields like healthcare and legal services, so callers receive prompt, accurate, and professional service every time.',
    },
    {
      question: 'How does Ozwell integrate with my existing systems?',
      answer:
        'Ozwell integrates with a wide range of existing systems, including EHR, HRIS, CRM, and other essential tools — WebChart included. Results are written back where your team already looks for them, so workflows improve without disrupting your current setup. The Help Center has a full WebChart integration guide.',
    },
    {
      question: 'Is Ozwell HIPAA compliant, and how is the AI risk assessed?',
      answer:
        'Yes. Ozwell is HIPAA compliant and is the first and only AI-powered Health IT solution to hold Drummond pDSI-Risk certification, which confirms the platform meets benchmarks for predictive decision support intervention risk assessment and mitigation. Our source attribute disclosures are published on the blog.',
    },
    {
      question: 'Can Ozwell understand and process industry-specific terminology?',
      answer:
        'Yes. Ozwell is equipped with advanced natural language processing that allows it to understand and process complex industry-specific terminology, including medical, legal, and technical jargon, rather than only everyday speech.',
    },
    {
      question: 'Can I customize Ozwell to fit my specific workflow?',
      answer:
        'Yes. Ozwell offers customizable workflows, and each user can set their own name, title, and custom instructions so that output matches their documentation style. This ensures alignment with how your organization already works rather than forcing a single house format.',
    },
    {
      question: 'Does anything get filed to the patient record automatically?',
      answer:
        'No. Ozwell drafts the note and queues orders, referrals, and follow-ups as reviewable actions. A clinician approves them before anything is written to the record, so you remain the final check on everything that reaches the chart.',
    },
    {
      question: 'How does Ozwell stay up to date with my evolving needs?',
      answer:
        'Ozwell continuously learns from your interactions and corrections, adapting to better match your vocabulary and documentation style over time, so it remains useful as your organization grows and changes.',
    },
    {
      question: 'What kind of support can I expect?',
      answer:
        'The Help Center covers setup, accounts, integrations, and the API, and our team answers questions directly at info@ozwell.ai. Ozwell also includes integrated communication tools with real-time messaging and notifications to keep your team coordinated, whether they work in the office or remotely.',
    },
    {
      question: 'Is Ozwell easy to use?',
      answer:
        'Yes. Ozwell is designed around an intuitive interface that minimizes learning curves, and it runs on the web plus iOS and Android, so most people are productive without training. You can start a note on mobile between rooms and finish it at a desktop on the same account.',
    },
  ],
}

/** Closing conversion band, merging the old mid-page CTA and app-download sections. */
export const closingCta = {
  eyebrow: 'Freeing up time for what truly matters',
  title: 'Reimagine your workday with Ozwell',
  description:
    'Start free on the web, or get the app and let Ozwell handle the documentation from your pocket.',
}
