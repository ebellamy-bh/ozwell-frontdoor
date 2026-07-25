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
    video: '/videos/Copy-of-Featured-Section-ImagesVideos.mp4',
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
    video: '/videos/Copy-of-bluehive-IRV-now-Ozwell-call-dashboard-graphic.mp4',
    mediaSide: 'right' as const,
  },
]

export const testimonials = {
  title: "Don't just take our word for it.",
  description: 'Discover what users have to say about their experiences with our platform.',
  image: {
    src: '/images/testimonials-1024x576.png',
    alt: 'Ozwell user testimonials',
    width: 1024,
    height: 576,
  },
}

export const workSmarter = {
  title: 'Work Smarter, Not Harder',
  description:
    'BlueHive offers a range of features designed to boost your productivity and streamline your processes. Explore customizable workflows, real-time insights, and intuitive design that work together to make your workday more effective and your life easier.',
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

/** Full-width workflow flowchart video section. */
export const flowchartVideo = {
  video: '/videos/Copy-of-Ozwell-AI-Workflow-Flowchart.mp4',
  title: 'Ozwell AI workflow flowchart animation',
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
