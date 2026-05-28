// components/seo/JsonLd.tsx
export function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Linum Core',
    url: 'https://linumcore.com',
    logo: 'https://linumcore.com/assets/linum-core-logo.svg',
    description: 'Software development, systems consulting, and API integration. We restore the unseen connections in your business.',
    founder: {
      '@type': 'Person',
      name: 'Gabriel Gomes',
      email: 'ggvgabriel05@gmail.com',
      url: 'https://github.com/GgvGomes',
      jobTitle: 'CEO & Founder',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'ggvgabriel05@gmail.com',
      contactType: 'customer service',
      availableLanguage: ['English', 'Portuguese', 'Spanish'],
    },
    sameAs: ['https://github.com/GgvGomes'],
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gabriel Gomes',
    jobTitle: 'CEO & Founder',
    worksFor: { '@type': 'Organization', name: 'Linum Core' },
    email: 'ggvgabriel05@gmail.com',
    url: 'https://linumcore.com',
    sameAs: ['https://github.com/GgvGomes'],
    knowsAbout: ['Software Development', 'Systems Consulting', 'API Integration', 'TypeScript', 'React', 'Next.js', 'Node.js'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
    </>
  )
}
