/**
 * About Us page content — migrated from ozwell.ai/about-us/ (our own site).
 */

export const aboutHero = {
  title: 'About Us',
  image: {
    src: '/images/Ozwell-Branding-Whiteboard-4.png',
    alt: 'Ozwell team illustration',
    width: 1200,
    height: 900,
  },
}

export const mission = {
  title: 'Our Mission',
  description:
    'At Ozwell, we believe technology should empower—not burden—healthcare professionals. Our AI-driven solutions automate documentation, optimize workflows, and enhance decision-making, giving providers more time to focus on delivering exceptional care.',
}

export const pillars = [
  {
    title: 'More Patients, Less Burnout',
    description:
      'The weight of administrative tasks contributes to provider burnout, pulling focus away from the calling that brought you to healthcare in the first place. With Ozwell, you can reclaim your time, your energy, and your passion for patient care.',
  },
  {
    title: 'Reduce Errors, Increase Confidence',
    description:
      'Documentation should support, not slow down, patient care. Ozwell helps providers capture critical details efficiently, reducing administrative strain and improving workflow clarity—so you can focus on making informed decisions with confidence.',
  },
  {
    title: 'Smart Integration, Effortless Workflow',
    description:
      'Too often, new systems disrupt your workflow instead of supporting it. Ozwell seamlessly integrates into your existing tools, ensuring a smooth experience that enhances—never hinders—your ability to provide care.',
  },
]

export const supportingLogos = {
  title: 'Supporting the Best in Healthcare',
  // Four of these read "Healthcare partner logo", which tells a screen reader nothing and is the
  // same string five times over. Named from the artwork.
  logos: [
    { src: '/images/company-display-logos-1.png', alt: 'Maui Medical Group' },
    { src: '/images/company-display-logos-3.png', alt: 'BlueHive' },
    { src: '/images/company-display-logos-4.png', alt: 'WebChart' },
    { src: '/images/company-display-logos-6.png', alt: 'Michigan Healthcare Professionals' },
    { src: '/images/company-display-logos-7.png', alt: 'Enterprise Health' },
  ],
}

export const values = {
  title: 'Our values',
  items: [
    {
      title: 'Compassion',
      description:
        'We believe technology should enhance, not replace, human connection in healthcare. Ozwell is built to support providers, reduce burnout, and give them more time to focus on delivering quality patient care.',
    },
    {
      title: 'Innovation',
      description:
        'Healthcare is constantly evolving, and so are we. Ozwell leverages cutting-edge AI to simplify workflows, optimize efficiency, and help providers stay ahead in an ever-changing landscape.',
    },
    {
      title: 'Clarity',
      description:
        'Documentation should be an asset, not a burden. Ozwell streamlines processes, providing clear, structured, and actionable insights so providers can make informed decisions with confidence.',
    },
    {
      title: 'Integrity',
      description:
        'We prioritize responsible technology. Ozwell is designed with healthcare in mind, ensuring AI solutions align with ethical standards, regulatory requirements, and real-world needs.',
    },
    {
      title: 'Collaboration',
      description:
        "Great care doesn't happen in isolation. Ozwell seamlessly integrates with existing systems, creating a connected ecosystem that enhances communication and teamwork across healthcare organizations.",
    },
    {
      title: 'Support',
      description:
        "From setup to day-to-day operations, our team is here to help. Whether it's a quick question or in-depth troubleshooting, we provide responsive, knowledgeable support so you can get the most out of Ozwell.",
    },
  ],
}

export const aboutCta = {
  title: 'Ready to take your practice to the next level?',
  cta: { label: 'Get Started', href: 'https://ai.bluehive.com/' },
}
