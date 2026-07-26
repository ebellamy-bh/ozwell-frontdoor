/**
 * Content for `/certification/` and `/security/`.
 *
 * Both pages exist because the substance already did and nobody could find it. The
 * homepage claimed "first and only Drummond pDSI-Risk certified" as a badge with no
 * page behind it, `/#security` was an anchor on a marketing band, and the full ONC
 * source-attribute disclosure — thirty-one published answers about how this AI was
 * built, tested, and bounded — was buried in a blog post from January.
 *
 * Every claim here traces to one of three places: the published source-attribute
 * disclosure, Drummond's own announcement of the certification, or the product
 * behaviour already described on the homepage and in the Help Center. Nothing was
 * imported from a sibling site's copy. Where a fact would need confirming before it
 * could be published, it is marked TODO and left out rather than softened.
 */

/** The disclosure post the certification page is a front door to. */
export const SOURCE_ATTRIBUTES_POST = '/blog/ozwell-pdsi-source-attributes/'
export const IRM_POST = '/blog/introduction-to-bluehive-healths-irm-practices/'

export const certificationHero = {
  eyebrow: 'Certification',
  title: 'The first AI-powered health IT product certified for predictive decision support risk',
  description:
    'Drummond pDSI-Risk certification means an independent third party reviewed how Ozwell manages and discloses the risks of its AI — not just that we say we do. Announced July 15, 2025.',
}

export const certificationFacts = {
  eyebrow: 'At a glance',
  title: 'What was certified',
  description:
    'Certification is a specific, checkable claim. These are its terms, so you can verify them rather than take them on trust.',
  items: [
    {
      label: 'Certification',
      value: 'Drummond pDSI-Risk',
      detail: 'Issued by Drummond Group, an ONC-Authorized Certification Body.',
    },
    {
      label: 'Criterion',
      value: 'ASTP/ONC § 170.315(b)(11)',
      detail: 'The decision support interventions criterion, covering predictive DSI.',
    },
    {
      label: 'Announced',
      value: 'July 15, 2025',
      detail: 'Ozwell was the first AI-powered health IT product to achieve it.',
    },
    {
      label: 'Developer',
      value: 'BlueHive Health, LLC',
      detail:
        'Part of Medical Informatics Engineering, Inc., the team behind [WebChart](https://webchartnow.com) and [Enterprise Health](https://enterprisehealth.com).',
    },
  ],
}

/**
 * What a pDSI is, in ONC's terms.
 *
 * The three-prong test is lifted from our own published disclosure rather than
 * paraphrased, because the point of the section is that Ozwell meets a definition
 * someone else wrote.
 */
export const pdsiExplainer = {
  eyebrow: 'The definition',
  title: 'What a predictive decision support intervention is',
  description:
    'ONC defines a pDSI — generically understood as AI — with a three-prong test. Ozwell meets all three, which is why it is certified as one rather than exempt from the question.',
  tests: [
    {
      title: 'Supports decision making based on models',
      description:
        'Ozwell uses third-party foundation models to inform and augment the clinical documentation workflow.',
    },
    {
      title: 'Derives relationships from training data',
      description:
        'The models behind Ozwell learn relationships from training data rather than following hand-written rules.',
    },
    {
      title: 'Produces a prediction, classification, recommendation, evaluation, or analysis',
      description:
        'Ozwell outputs recommendations, evaluations, and analyses — drafted SOAP notes, clinical summaries, and suggested documentation actions.',
    },
  ],
}

/**
 * FAVES.
 *
 * ONC's five principles for decision support, used here as the skeleton because it
 * is the framework a reader is likely to be checking us against — and because we
 * have something specific and published to show for each letter. The `disclosure`
 * line on each card names where the evidence is, so no letter is just an adjective.
 */
export const favesPrinciples = {
  eyebrow: 'FAVES',
  title: 'Fair, Appropriate, Valid, Effective, Safe',
  description:
    'ONC groups the expectations for decision-support AI under five principles. Here is what each one requires, and what we have published against it.',
  items: [
    {
      letter: 'F',
      title: 'Fair',
      principle:
        'Outputs should be unbiased and equitable regardless of patient demographics or clinical context.',
      disclosure:
        'Our disclosure describes the approach taken to ensure fairness, the methods used to manage and reduce bias, and the results of fairness testing on both internal and external data — including the limitation that testing relied on simulated scenarios rather than real-world demographic data.',
    },
    {
      letter: 'A',
      title: 'Appropriate',
      principle:
        'The tool should support healthcare professionals rather than replace clinical judgment.',
      disclosure:
        'Ozwell’s intended decision-making role is published as “inform and augment decision-making, but not replace clinical management.” Nothing reaches a patient record without a clinician approving it.',
    },
    {
      letter: 'V',
      title: 'Valid',
      principle:
        'Outputs should be accurate, relevant, and consistent with clinical guidelines and the user’s prompt.',
      disclosure:
        'We publish validity testing on data from the same source as the training data and on external data, the metrics used, and the standing advice that users verify outputs against current clinical guidelines and patient-specific information.',
    },
    {
      letter: 'E',
      title: 'Effective',
      principle: 'Results should be actionable and useful in real clinical workflow.',
      disclosure:
        'The value the intervention produces is described concretely — drafted SOAP notes, medical record entries, and clinical summaries — and was validated with clinician feedback from outpatient clinics, hospitals, and administrative offices.',
    },
    {
      letter: 'S',
      title: 'Safe',
      principle:
        'The tool should be built and maintained to minimize risk to patients, users, and organizations.',
      disclosure:
        'We publish known risks and limitations, and the settings and populations where Ozwell should not be used — emergency and critical care, and highly specialized care such as advanced pain management or rare disease treatment.',
    },
  ],
}

/**
 * The 31 source attributes, grouped as ONC groups them.
 *
 * Presented as a map into the disclosure rather than a copy of it: reproducing
 * 34,000 characters here would create two versions of a regulatory document that
 * can drift apart, and the blog post is the one with a publication date on it.
 */
export const disclosureMap = {
  eyebrow: 'Source attributes',
  title: 'Everything we are required to disclose, published in full',
  description:
    'Certification under § 170.315(b)(11) requires a developer to answer thirty-one questions about how the intervention was built, tested, and bounded. Ours are published in full — not summarized, and not behind a sales conversation.',
  groups: [
    {
      title: 'Details and output of the intervention',
      description:
        'Who developed it, who funded it, what value it produces, and whether the output is a prediction, classification, recommendation, evaluation, or analysis.',
    },
    {
      title: 'Purpose of the intervention',
      description:
        'Intended use, intended patient populations, intended users, and the decision-making role it was designed for.',
    },
    {
      title: 'Cautioned out-of-scope use',
      description:
        'The tasks, situations, and populations a user is cautioned against applying it to, plus known risks and limitations.',
    },
    {
      title: 'Development and training data',
      description:
        'Exclusion and inclusion criteria for the training set, and the relevance of that data to the deployed setting.',
    },
    {
      title: 'Fairness in development',
      description:
        'The approach taken to ensure output is fair, and the approaches used to manage, reduce, or eliminate bias.',
    },
    {
      title: 'External validation',
      description:
        'The data source, clinical setting, and environment where validity and fairness were assessed, and who conducted the testing.',
    },
    {
      title: 'Quantitative measures of performance',
      description:
        'Validity and fairness in test data from the same source as the training data, and in data from a different source.',
    },
    {
      title: 'Ongoing maintenance and update',
      description:
        'How the intervention is monitored and updated once deployed, and how emerging bias is identified and addressed.',
    },
  ],
}

export const certificationFaqs = {
  eyebrow: 'Questions',
  title: 'About the certification',
  description: 'What certification does and does not mean, in the plainest terms we can put it.',
  items: [
    {
      question: 'What is Drummond pDSI-Risk certification?',
      answer:
        'It is an independent certification, issued by Drummond Group, that a predictive decision support intervention meets the intervention risk management and source attribute disclosure requirements of ASTP/ONC § 170.315(b)(11). Ozwell was the first AI-powered health IT product to achieve it, announced on July 15, 2025.',
    },
    {
      question: 'What does the certification actually test?',
      answer:
        'It confirms alignment with intervention risk assessment and mitigation benchmarks, transparency standards, and the intervention risk management and source attribute disclosure requirements for predictive decision support. It reviews how the risks of the AI are assessed, mitigated, and disclosed — it is not a claim that the AI is never wrong.',
    },
    {
      question: 'Does certification mean Ozwell can be trusted to practice medicine?',
      answer:
        'No, and it is not intended to. Ozwell’s published intended decision-making role is to inform and augment clinical decision-making, not to replace clinical management. Certification is evidence that the limits of the tool are honestly assessed and disclosed, which is a different and more useful thing than a claim of infallibility.',
    },
    {
      question: 'Where can I read the full disclosure?',
      answer:
        'All thirty-one source attributes are published on our blog, covering intended use, cautioned uses, training data, fairness and validity testing, known limitations, and ongoing maintenance. Our intervention risk management practices are published alongside them.',
    },
    {
      question: 'Who issued the certification?',
      answer:
        'Drummond Group, an ONC-Authorized Certification Body and an established independent testing and certification body for health IT. Drummond announced the certification on July 15, 2025.',
    },
  ],
}

/**
 * TODO — publish the certificate number.
 *
 * Drummond's announcement does not include one and we could not find it published
 * anywhere authoritative, so the page cites the criterion and the announcement date
 * instead. A certificate number is the single most verifiable fact this page could
 * carry; add it here and to `certificationFacts` once someone reads it off the
 * certificate. Do not copy the number that appears on Enterprise Health's concept
 * page — that page is marked as a mock and the number is unverified for ozwell.ai.
 */

export const securityHero = {
  eyebrow: 'Trust',
  title: 'How Ozwell handles the record, and where a clinician stays in control',
  description:
    'Ozwell drafts; a clinician decides. This page collects what we publish about how that boundary is enforced, how the AI is governed, and what we have had independently certified.',
}

export const securityPillars = {
  eyebrow: 'Controls',
  title: 'What is in place today',
  description:
    'Each of these is described elsewhere on this site — in the product, the Help Center, or the certification disclosure. They are collected here so they can be read in one place.',
  items: [
    {
      icon: 'shield',
      title: 'Nothing files without approval',
      description:
        'Ozwell drafts the note and queues orders, referrals, and follow-ups as reviewable actions. A clinician approves them before anything is written to the patient record, so a person is always the last step before the chart.',
    },
    {
      icon: 'stethoscope',
      title: 'Designed to augment, not replace',
      description:
        'The published intended decision-making role is to inform and augment clinical decision-making, not to replace clinical management. That is a disclosed design constraint, not a disclaimer added afterwards.',
    },
    {
      icon: 'certificate',
      title: 'HIPAA compliant',
      description:
        'Ozwell is built for use with protected health information in outpatient clinics, hospitals, and administrative offices.',
    },
    {
      icon: 'badge',
      title: 'Independently certified for AI risk',
      description:
        'Drummond pDSI-Risk certification, under ASTP/ONC § 170.315(b)(11) — covering intervention risk management and source attribute disclosure. Ozwell was the first AI-powered health IT product to hold it.',
    },
    {
      icon: 'eye',
      title: 'Limits published, not buried',
      description:
        'The settings and populations Ozwell should not be used in are published in full, including emergency and critical care and highly specialized care. So are the known limitations of its fairness and validity testing.',
    },
    {
      icon: 'clipboard',
      title: 'Risk management practices on the record',
      description:
        'Our intervention risk management practices — how risk is identified, assessed, mitigated, and reviewed as the product changes — are published rather than described on request.',
    },
  ],
}

/**
 * The gaps, stated as gaps. NOT CURRENTLY RENDERED — see below.
 *
 * A buyer doing real diligence will ask these five questions whether or not we
 * anticipate them, and a trust page listing only strengths reads as marketing. In
 * the site's own candid voice, naming what isn't published yet would cost less
 * credibility than appearing not to have noticed.
 *
 * But publishing a list of your own unanswered security questions is a marketing and
 * legal decision, not an engineering one, so `/security/` does not render this.
 * To turn it on, import `securityGaps` in `src/app/security/page.tsx` and pass it to
 * a section — the copy is ready.
 *
 * The better outcome is deleting this and answering the questions instead. Each one
 * needs confirming with the team, and none of it should be inferred from Enterprise
 * Health's deployment: their infrastructure claims are theirs, not automatically
 * ours.
 */
export const securityGaps = {
  eyebrow: 'In progress',
  title: 'What we have not published yet',
  description:
    'These are fair questions we do not yet answer in public. We would rather name them than let a page about trust imply completeness it does not have.',
  items: [
    'Whether prompts or outputs are retained by the model providers Ozwell calls, and for how long.',
    'The specific encryption in place for data at rest and in transit.',
    'Which providers act as subprocessors, and whether that list is published.',
    'The business associate agreements in place with each provider that can process PHI.',
    'Data residency options for customers with localization requirements.',
  ],
}
