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
    'https://app.ozwell.ai/session/Rdj3NsYnmoygWWRpG?utm_source=ozwell.ai#Gr6YRbpceMotpSdIDBZweqRENzTWM-i6HWm0WLhUk26',
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
  /**
   * Video metadata for `VideoObject`. Taken from the YouTube upload itself rather
   * than estimated: an `uploadDate` that disagrees with the platform's own is worse
   * than none, since it's the field a crawler can trivially check.
   */
  uploadDate: '2025-03-27',
  duration: 'PT2M27S',
  thumbnailUrl: 'https://i.ytimg.com/vi/eCj_7FXArmg/maxresdefault.jpg',
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
    cta: { label: 'Start free trial', href: 'https://app.ozwell.ai/?utm_source=ozwell.ai' },
    media: {
      kind: 'video' as const,
      src: '/videos/ozwell-smart-scribing.mp4',
      poster: '/videos/ozwell-smart-scribing.jpg',
      /**
       * Describes the clip for `VideoObject`. `uploadDate` is the date the file was
       * first published to this site, which is the only upload event these
       * self-hosted clips have. Duration is the real measured length.
       */
      name: 'Ozwell smart scribing: a visit becomes a structured SOAP note',
      description:
        'Screen capture of Ozwell transcribing a patient encounter and populating a structured SOAP note for clinician review.',
      uploadDate: '2026-07-25',
      duration: 'PT30S',
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
    cta: { label: 'Start free trial', href: 'https://app.ozwell.ai/?utm_source=ozwell.ai' },
    media: {
      kind: 'video' as const,
      src: '/videos/ozwell-call-dashboard.mp4',
      poster: '/videos/ozwell-call-dashboard.jpg',
      name: 'Ozwell call handling: the phone dashboard',
      description:
        'Screen capture of the Ozwell call dashboard handling an inbound call, showing how routine requests are answered and the rest routed to staff.',
      uploadDate: '2026-07-25',
      duration: 'PT9S',
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

/**
 * Purpose-built vs. general-purpose.
 *
 * The comparison is against the category of general assistants, not against a
 * named vendor: claims about a competitor's current behaviour go stale silently
 * and can't be substantiated from anything on this site. Every cell in the Ozwell
 * column is backed elsewhere here — the feature rows, the FAQ, the Help Center
 * integration guide, or the certification page.
 */
export const comparison = {
  eyebrow: 'Why purpose-built',
  title: 'Built for the clinical encounter, not adapted to it',
  description:
    'A general assistant can summarise a transcript. Getting from a spoken visit to something that belongs in a patient record is a different job.',
  columns: {
    generic: 'General-purpose AI assistant',
    ozwell: 'Ozwell',
  },
  rows: [
    {
      capability: 'Designed for',
      generic: 'General knowledge work, adapted to healthcare afterwards',
      ozwell: 'Clinical encounters and healthcare workflows from the start',
    },
    {
      capability: 'Clinical vocabulary',
      generic: 'Tuned for everyday speech; specialty terminology gets mangled',
      ozwell: 'Interprets medical, legal, and technical terminology as a first concern',
    },
    {
      capability: 'What you get back',
      generic: 'Freeform prose you still have to restructure yourself',
      ozwell: 'A structured SOAP note, with orders, referrals, and follow-ups queued',
    },
    {
      capability: 'Your existing systems',
      generic: 'Copy and paste between windows',
      ozwell: 'Writes back into WebChart and the EHR, HRIS, and CRM tools you run',
    },
    {
      capability: 'Reaching the record',
      generic: 'Not applicable — nothing connects to the chart',
      ozwell: 'Nothing files until a clinician reviews and approves it',
    },
    {
      capability: 'Inbound calls',
      generic: 'No telephony',
      ozwell: 'Answers your lines with your own voice prompts, escalating the rest',
    },
    {
      capability: 'Adapting to you',
      generic: 'One generic model average for every user',
      ozwell: 'Learns your vocabulary and note style from the corrections you make',
    },
    {
      capability: 'Risk certification',
      generic: 'Rarely certified for predictive decision support',
      ozwell: 'First to hold Drummond pDSI-Risk certification, under ASTP/ONC § 170.315(b)(11)',
    },
    {
      capability: 'Scope disclosure',
      generic: 'Intended use and limitations usually unstated',
      ozwell: 'Intended uses, cautioned uses, and known limits published in full',
    },
  ],
}

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
  /**
   * Points at `/certification/` rather than straight into the disclosure post. The
   * post is 34,000 characters of regulatory answers — the right destination for
   * someone already convinced, and a wall for everyone else. The certification page
   * explains what was certified and links onward to it.
   */
  cta: {
    label: 'What was certified, and by whom',
    href: '/certification/',
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

/**
 * TODO — the highest-value FAQ we cannot yet publish.
 *
 * "Is my data used to train AI models?" is the first question every clinical-AI
 * buyer asks and the one answer engines are most often asked to retrieve, and we
 * have no answer to it anywhere on this site. It is deliberately left out rather
 * than answered vaguely: the source attribute disclosure confirms Ozwell calls
 * third-party foundation models, and an unsourced reassurance about what those
 * providers do with a prompt is the worst possible thing to guess at.
 *
 * To ship it, confirm with the team and then add both the FAQ entry and the
 * matching section on `/security/`:
 *   1. Do we hold a Zero Data Retention agreement with the model provider(s)?
 *   2. Is there a BAA in place with each provider that can see PHI?
 *   3. Are prompts or outputs retained, and for how long?
 *   4. Encryption specifics at rest and in transit.
 *   5. Which providers are subprocessors, and is that list published?
 * Enterprise Health states an OpenAI Zero Data Retention BAA for their own
 * deployment, but that is their infrastructure claim and does not transfer to
 * ozwell.ai without confirmation.
 */
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
        'Yes. Ozwell is HIPAA compliant and is the first AI-powered Health IT solution to hold Drummond pDSI-Risk certification, which confirms the platform meets benchmarks for predictive decision support intervention risk assessment and mitigation. Our full source attribute disclosures are published on the certification page.',
    },
    /**
     * The questions below answer objections the old FAQ left standing. They are
     * sourced from the published ONC source-attribute disclosure and the Drummond
     * announcement, so every claim is traceable — which matters more here than
     * anywhere else on the site, since these are the answers an answer engine
     * quotes when someone asks whether clinical AI can be trusted.
     */
    {
      question: 'What is Drummond pDSI-Risk certification?',
      answer:
        'It is an independent certification, issued by Drummond Group, that a predictive decision support intervention meets the intervention risk management and source attribute disclosure requirements of ASTP/ONC § 170.315(b)(11). Ozwell was the first AI-powered health IT product to achieve it, announced on July 15, 2025. In practice it means an impartial third party has reviewed how the risks of the AI are assessed, mitigated, and disclosed — not merely that the vendor says they are.',
    },
    {
      question: 'Does Ozwell make clinical decisions on its own?',
      answer:
        'No. Ozwell is designed to inform and augment clinical decision-making, not to replace clinical management — that is the intended decision-making role published in our source attribute disclosure. It drafts documentation and queues actions; a clinician reviews and approves them, and nothing reaches the patient record until they do.',
    },
    {
      question: 'When should Ozwell not be used?',
      answer:
        'Ozwell is not intended for emergency or critical care settings where real-time clinical decision-making is required, nor as a substitute for professional medical judgment. We also caution against relying on it for highly specialized or nuanced care, such as advanced pain management or rare disease treatment. These limits are published in full in our source attribute disclosure rather than left for you to discover.',
    },
    {
      question: 'Which clinicians and care settings is Ozwell built for?',
      answer:
        'Ozwell is intended for outpatient clinics, hospitals, and administrative offices, and is built for primary care physicians, specialists, nurses and nurse practitioners, physician assistants, and the administrative staff involved in documentation and care coordination. It supports clinicians working with a broad range of patient populations, including routine, preventive, and chronic condition care.',
    },
    {
      question: 'Who builds Ozwell?',
      answer:
        'Ozwell is built by BlueHive Health, LLC, part of Medical Informatics Engineering, Inc. — the team behind the WebChart EHR, with a long history in health IT rather than a general AI company entering healthcare. BlueHive Health is the named developer on our ONC source attribute disclosure.',
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
