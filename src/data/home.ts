/**
 * Homepage content — migrated from ozwell.ai (our own WordPress/Elementor site).
 * All copy sourced from the live homepage during the 2026-07 migration.
 */

export const hero = {
  eyebrowLines: ['Say hi to', 'Ozwell.'],
  subheading: 'Your AI medical assistant',
  description:
    '& say goodbye to endless charting—Ozwell automates documentation so you can focus on what truly matters.',
  image: {
    src: '/images/Ozwell-Branding-Whiteboard-2.png',
    alt: 'Ozwell AI assistant illustration with SOAP note workflow actions',
    width: 1200,
    height: 900,
  },
  chips: [
    { label: 'Create a SOAP Note' },
    { label: 'Attach to Patient Record' },
    { label: 'Send Summary to Patient Chart' },
  ],
  chipHref:
    'https://ai.bluehive.com/session/Rdj3NsYnmoygWWRpG?utm_source=ozwell.ai#Gr6YRbpceMotpSdIDBZweqRENzTWM-i6HWm0WLhUk26',
}

export const logoCloud = {
  title: 'Enhancing Workflows for Leading Healthcare Companies',
  logos: [
    { src: '/images/company-logos-2.png', alt: 'Enterprise Health' },
    { src: '/images/company-logos-4.png', alt: 'Michigan Healthcare Professionals' },
    { src: '/images/company-logos-6.png', alt: 'BlueHive' },
    { src: '/images/company-logos-3.png', alt: 'Maui Medical Group' },
    { src: '/images/company-logos-1.png', alt: 'WebChart' },
  ],
}
export const featureVideo = {
  youtubeId: 'eCj_7FXArmg',
  title: 'Ozwell: Your AI-Powered Clinical Assistant Inside your EHR',
}

export const certification = {
  eyebrow: 'Security',
  title:
    "Ozwell is the market's first and only Drummond pDSI-Risk certified AI-powered Health IT solution.",
  description:
    "The certification confirms that Ozwell's AI platform meets key benchmarks related to intervention risk assessment and mitigation, which is a critical step in supporting the responsible use of AI in clinical care.",
  badges: ['HIPAA Compliant', 'Mobile friendly', 'Drummond certified'],
  image: {
    src: '/images/thumb-Drummond-Certified-pDSI-RISK-2025.png',
    alt: 'Drummond Certified pDSI-RISK 2025 certification badge',
    width: 400,
    height: 400,
  },
}

export const featureRows = [
  {
    eyebrow: 'Smart Scribing & Accurate Charting',
    title: 'Reclaim Your Time, Refocus on Patient Care',
    description:
      'Ozwell leverages AI to streamline documentation, transforming how healthcare providers manage patient records. With automated transcription of visits, seamless chart population, and accurate data capture, providers can now dedicate more time to patient care rather than paperwork. Enhance efficiency while deepening patient interactions.',
    bullets: [
      { label: 'Transcribe patient visits', icon: 'mic' },
      { label: 'Automate chart population', icon: 'gear' },
    ],
    cta: { label: 'Get Started', href: 'https://ai.bluehive.com/?utm_source=ozwell.ai' },
    video: '/videos/ozwell-smart-scribing.mp4',
    poster: '/videos/ozwell-smart-scribing.jpg',
    mediaSide: 'left' as const,
  },
  {
    eyebrow: 'Smart Call Handling',
    title: 'Optimize Your Lines, Elevate Your Service',
    description:
      'Ozwell leverages AI to transform call handling for healthcare providers and beyond. Organizations can configure personalized voice prompts, automate routine interactions, and optimize tasks such as prescription management and appointment reminders, enhancing both efficiency and user experience.',
    bullets: [
      { label: 'Automate routine calls', icon: 'phone' },
      { label: 'Personalize caller experience', icon: 'user' },
    ],
    cta: { label: 'Get Started', href: 'https://ai.bluehive.com/?utm_source=ozwell.ai' },
    video: '/videos/ozwell-call-dashboard.mp4',
    poster: '/videos/ozwell-call-dashboard.jpg',
    mediaSide: 'right' as const,
  },
]

/**
 * Testimonials — transcribed from the legacy `testimonials-1024x576.png` composite, which
 * rendered these quotes as a flat image (illegible on mobile, invisible to search).
 *
 * The quotes are verbatim. They predate the BlueHive AI → Ozwell rename, so the product name
 * is bracketed on the same convention the migrated blog posts already use
 * ("BlueHive AI [Ozwell]"). Replace with refreshed quotes when we can get them.
 */
export const testimonials = {
  title: "Don't just take our word for it.",
  description: 'Discover what users have to say about their experiences with our platform.',
  items: [
    {
      quote:
        'BlueHive AI [Ozwell] has been an absolute game changer for me. I’ve been using it for just two weeks, but it already feels like a major step forward compared to when we transitioned from paper charts to EMRs. With EMRs, I often found myself focusing more on the screen than on the patient, which really took away from the personal interaction. BlueHive [Ozwell] has given me the freedom to go back to being a doctor—looking my patients in the eye and focusing on them, while the AI handles the documentation. It’s liberating. Most of us in the practice have gained back an hour or two each day, and the improvement in patient care is remarkable.',
      name: 'Jeffrey Margolis, M.D.',
      title: 'President of Michigan Health Professionals',
      avatar: '/images/testimonials/jeffrey-margolis.png',
    },
    {
      quote:
        'One of the biggest challenges in medicine is time. We spend a lot of hours on administrative tasks like charting—up to one to two hours daily. This time is taking away from patient care and even our personal lives. BlueHive AI [Ozwell] has already helped cut down that time. It allows me to focus more on patient care without the stress of additional paperwork at the end of the day. For example, I saw 35 patients today, and all my notes and referrals were completed by the end of the clinic day.',
      name: 'Richard Zekman, D.O.',
      title: 'Division of Clinical Hematology & Medical Oncology',
      avatar: '/images/testimonials/richard-zekman.png',
    },
  ],
}

export const workSmarter = {
  title: 'Work Smarter, Not Harder',
  description:
    'Ozwell offers a range of features designed to boost your productivity and streamline your processes. Explore customizable workflows, real-time insights, and intuitive design that work together to make your workday more effective and your life easier.',
}

/** Six feature cards flanking the phone image (3 left, 3 right) — matches live layout. */
export const featureCards = {
  left: [
    {
      title: 'Customizable Workflows',
      description:
        'Utilize Ozwell to fit your specific processes and preferences, ensuring optimal efficiency and alignment with your organizational needs.',
    },
    {
      title: 'Personalized Assistance',
      description:
        'Receive support and recommendations based on your unique requirements and preferences, enhancing user experience.',
    },
    {
      title: 'Real-Time Data Analytics',
      description:
        'Access actionable insights with real-time analytics, empowering informed decision-making and improved operational efficiency.',
    },
  ],
  right: [
    {
      title: 'Communication Tools',
      description:
        'Improve team collaboration with integrated communication features, including real-time messaging and notifications.',
    },
    {
      title: 'User-Centric Design',
      description:
        'Benefit from a design that prioritizes user needs and preferences, offering an intuitive experience that enhances efficiency and reduces learning curves.',
    },
    {
      title: 'Seamless Integration',
      description:
        'Integrate effortlessly with existing systems and tools, enhancing functionality without disrupting your current setup.',
    },
  ],
  phoneImage: {
    src: '/images/Ozwell-mobile-phones-for-website-608x1080.png',
    alt: 'Ozwell mobile app on two phones',
    width: 608,
    height: 1080,
  },
}

/**
 * How Ozwell works — replaces the legacy 22 MB autoplaying MP4 of a nine-box flowchart, whose
 * text was unreadable at every viewport and invisible to screen readers and search engines.
 * The nine original stages collapse into the four the reader actually needs.
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

export const showcase = {
  title: 'The multi-armed solution for effortless documentation',
  description:
    "Here's a closer look at how Ozwell simplifies patient encounters and streamlines daily operations for clinicians.",
  screenshots: [
    {
      src: '/images/1-scaled.png',
      alt: 'Ozwell product screenshot — patient encounter view',
      width: 2560,
      height: 1440,
    },
    {
      src: '/images/2-scaled.png',
      alt: 'Ozwell product screenshot — documentation workflow',
      width: 2560,
      height: 1440,
    },
    {
      src: '/images/3-scaled.png',
      alt: 'Ozwell product screenshot — SOAP note generation',
      width: 2560,
      height: 1440,
    },
    {
      src: '/images/4-scaled.png',
      alt: 'Ozwell product screenshot — chart summary',
      width: 2560,
      height: 1440,
    },
    {
      src: '/images/5-scaled.png',
      alt: 'Ozwell product screenshot — clinical operations dashboard',
      width: 2560,
      height: 1440,
    },
  ],
}

export const faqs = {
  eyebrow: 'Get answers',
  title: 'Frequently Asked Questions',
  description:
    'Discover how Ozwell can simplify your healthcare management and elevate overall efficiency.',
  items: [
    {
      question: 'What is Ozwell?',
      answer:
        'Ozwell is an advanced assistant designed to streamline your work processes and enhance productivity. It offers features like customizable workflows, real-time data analytics, seamless integration with existing systems, and much more, all tailored to meet the unique needs of your organization.',
    },
    {
      question: 'How does the Ozwell phone assistant work when people call in?',
      answer:
        "The Ozwell phone assistant is designed to handle incoming calls with advanced natural language processing. When a call comes in, the AI phone assistant can understand and respond to a wide range of inquiries, whether it's scheduling appointments, providing information, or routing the call to the appropriate department. The AI assistant is capable of interpreting complex industry-specific terminology, making it particularly useful in fields like healthcare and legal services. It ensures that callers receive prompt, accurate, and professional service every time, enhancing the overall customer experience.",
    },
    {
      question: 'How does Ozwell integrate with my existing systems?',
      answer:
        'Ozwell integrates smoothly with a wide range of existing systems, including EHR, HRIS, CRM, and other essential tools. This ensures that you can enhance your workflows without any disruptions to your current setup.',
    },
    {
      question: 'Can Ozwell understand and process industry-specific terminology?',
      answer:
        'Yes, Ozwell is equipped with advanced natural language processing capabilities that allow it to understand and process complex industry-specific terminology, including medical, legal, and technical jargon.',
    },
    {
      question: 'What kind of support can I expect from Ozwell?',
      answer:
        'Ozwell includes integrated communication tools that facilitate real-time messaging and notifications, improving team collaboration. Whether your team is working in the office or remotely, Ozwell keeps everyone connected and informed.',
    },
    {
      question: 'How does Ozwell help improve team collaboration?',
      answer:
        'Ozwell includes integrated communication tools that facilitate real-time messaging and notifications, improving team collaboration. Whether your team is working in the office or remotely, Ozwell keeps everyone connected and informed.',
    },
    {
      question: 'Can I customize Ozwell to fit my specific workflow?',
      answer:
        'Yes, Ozwell offers customizable workflows that allow you to tailor the system to your specific processes and preferences. This ensures optimal efficiency and alignment with your organizational needs.',
    },
    {
      question: 'How does Ozwell stay up-to-date with my evolving needs?',
      answer:
        'Ozwell continuously learns from your interactions and feedback. It adapts its algorithms and capabilities to better meet your evolving needs, ensuring that it remains a valuable tool as your organization grows and changes.',
    },
    {
      question: 'Is Ozwell easy to use?',
      answer:
        'Absolutely. Ozwell is designed with a user-centric approach, offering an intuitive interface that minimizes learning curves and makes it easy for anyone to use, regardless of technical expertise.',
    },
  ],
}

export const appCta = {
  title: 'Reimagine Your Workday with Ozwell',
  subtitle: 'Get the app now and embrace a smarter work approach.',
  banner: 'Freeing up time for what truly matters.',
}
