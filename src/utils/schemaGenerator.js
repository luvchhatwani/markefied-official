/**
 * Schema.org JSON-LD Structured Data Generator for Markefied
 * Following Google's Structured Data Guidelines & Schema.org standards.
 */

export const SITE_URL = 'https://markefied.com';
export const BRAND_NAME = 'Markefied';
export const LOGO_URL = `${SITE_URL}/logo.png`;

export const SOCIAL_PROFILES = [
  'https://www.instagram.com/markefiedofficial/',
  'https://www.linkedin.com/in/luv-chhatwani-561257427/',
  'https://twitter.com',
  'https://facebook.com',
];

export const CONTACT_INFO = {
  email: 'hello@markefied.com',
  phone: '+91 94140 12345',
  secondaryPhone: '+1 (415) 555-0176',
  address: {
    streetAddress: 'Udaipur',
    addressLocality: 'Udaipur',
    addressRegion: 'Rajasthan',
    postalCode: '313001',
    addressCountry: 'IN',
  },
  secondaryLocation: {
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
};

/**
 * Base Organization Schema
 */
export function getOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: LOGO_URL,
      contentUrl: LOGO_URL,
      caption: BRAND_NAME,
    },
    image: LOGO_URL,
    description:
      'Markefied is a premier digital marketing agency specializing in Social Media Marketing, Google Ads, and Meta Ads that drive leads and sales.',
    email: CONTACT_INFO.email,
    telephone: CONTACT_INFO.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: CONTACT_INFO.address.addressLocality,
      addressRegion: CONTACT_INFO.address.addressRegion,
      postalCode: CONTACT_INFO.address.postalCode,
      addressCountry: CONTACT_INFO.address.addressCountry,
    },
    sameAs: SOCIAL_PROFILES,
    founder: {
      '@type': 'Person',
      name: 'Sofia Marchetti',
      jobTitle: 'Founder & Managing Director',
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 4,
      maxValue: 20,
    },
  };
}

/**
 * LocalBusiness / ProfessionalService Schema
 */
export function getLocalBusinessSchema() {
  return {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#localbusiness`,
    name: BRAND_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    image: LOGO_URL,
    email: CONTACT_INFO.email,
    telephone: CONTACT_INFO.phone,
    priceRange: '$3500 - $7500+',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT_INFO.address.streetAddress,
      addressLocality: CONTACT_INFO.address.addressLocality,
      addressRegion: CONTACT_INFO.address.addressRegion,
      postalCode: CONTACT_INFO.address.postalCode,
      addressCountry: CONTACT_INFO.address.addressCountry,
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'India',
      },
      {
        '@type': 'Country',
        name: 'United States',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Worldwide',
      },
    ],
    parentOrganization: {
      '@id': `${SITE_URL}/#organization`,
    },
  };
}

/**
 * WebSite Schema
 */
export function getWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BRAND_NAME,
    alternateName: 'Markefied Digital Marketing',
    description:
      'Markefied helps businesses grow online with digital marketing, Google Ads, Meta Ads, and social media marketing that drive leads and sales.',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'en-US',
  };
}

/**
 * Service Schemas for Services offered by Markefied
 */
export function getServicesSchema() {
  return [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/services#smm`,
      name: 'Social Media Marketing',
      serviceType: 'Social Media Marketing & Brand Management',
      description:
        'Grow your audience and build a strong brand presence across Instagram, Facebook, LinkedIn, and other platforms.',
      provider: {
        '@id': `${SITE_URL}/#organization`,
      },
      url: `${SITE_URL}/services#smm`,
      offers: {
        '@type': 'Offer',
        price: '3500',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '3500',
          priceCurrency: 'USD',
          unitText: 'MONTH',
        },
      },
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/services#google`,
      name: 'Google Ads Management',
      serviceType: 'Search Engine Advertising & PPC',
      description:
        'Generate high-quality leads and maximize ROI with data-driven Google advertising campaigns.',
      provider: {
        '@id': `${SITE_URL}/#organization`,
      },
      url: `${SITE_URL}/services#google`,
      offers: {
        '@type': 'Offer',
        price: '3500',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '3500',
          priceCurrency: 'USD',
          unitText: 'MONTH',
        },
      },
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/services#meta`,
      name: 'Meta Ads Management',
      serviceType: 'Facebook & Instagram Advertising',
      description:
        'Reach the right audience using Facebook and Instagram ads designed for conversions and sales.',
      provider: {
        '@id': `${SITE_URL}/#organization`,
      },
      url: `${SITE_URL}/services#meta`,
      offers: {
        '@type': 'Offer',
        price: '3500',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '3500',
          priceCurrency: 'USD',
          unitText: 'MONTH',
        },
      },
    },
  ];
}

/**
 * BreadcrumbList Schema
 * @param {Array<{name: string, path: string}>} items
 */
export function getBreadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}${items[items.length - 1]?.path || ''}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path === '/' ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };
}

/**
 * FAQPage Schema
 * @param {Array<{q: string, a: string}>} faqs
 */
export function getFaqSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

/**
 * Common FAQs matching website content
 */
export const SITE_FAQS = [
  {
    q: 'What services do you offer?',
    a: 'We specialize in Social Media Marketing (SMM), Google Ads, and Meta Ads (Facebook & Instagram) to drive traffic, leads, and sales.',
  },
  {
    q: 'How long before I see results?',
    a: 'While Meta and Google Ads can generate immediate traffic and conversions within the first week, full campaign optimization and consistent scaling typically take 30 to 90 days.',
  },
  {
    q: 'Do you work with small businesses?',
    a: 'Yes, our Starter plan is designed specifically to help growing startups and local businesses build their digital foundation.',
  },
  {
    q: 'How much do your services cost?',
    a: 'Our monthly plans start at $3.5k/month for Starter and $7.5k/month for our full Growth Engine. Custom enterprise partnerships are scaled based on scope.',
  },
];

/**
 * Page-specific SEO metadata & structured data graphs
 */
export const PAGE_CONFIGS = {
  '/': {
    title: 'Markefied | Premier Digital Marketing Agency',
    description:
      'Markefied helps businesses grow online with digital marketing, Google Ads, Meta Ads, and social media marketing that drive leads and sales.',
    pageType: 'WebPage',
    breadcrumbs: [{ name: 'Home', path: '/' }],
    includeFaq: true,
    includeServices: true,
  },
  '/about': {
    title: 'About Us | Markefied Digital Marketing',
    description:
      'Meet the team behind Markefied. A specialized team of advertising buyers, copywriters, and marketing strategists dedicated to your revenue growth.',
    pageType: 'AboutPage',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
    ],
    includeFaq: false,
    includeServices: false,
  },
  '/about-us': {
    title: 'About Us | Markefied Digital Marketing',
    description:
      'Meet the team behind Markefied. A specialized team of advertising buyers, copywriters, and marketing strategists dedicated to your revenue growth.',
    pageType: 'AboutPage',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about-us' },
    ],
    includeFaq: false,
    includeServices: false,
  },
  '/services': {
    title: 'Digital Marketing Services | Google Ads, Meta Ads & SMM | Markefied',
    description:
      'Explore Markefied digital marketing services: Social Media Marketing, Google Ads, and Meta Ads designed for conversions, leads, and maximum ROI.',
    pageType: 'WebPage',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ],
    includeFaq: true,
    includeServices: true,
  },
  '/blog': {
    title: 'Growth Journal & Marketing Insights | Markefied Blog',
    description:
      'Actionable growth strategies, PPC tips, and social media guides from Markefied specialists to scale your brand online.',
    pageType: 'CollectionPage',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ],
    includeFaq: false,
    includeServices: false,
  },
  '/contact': {
    title: 'Contact Us | Schedule a Free Marketing Consultation | Markefied',
    description:
      'Get in touch with Markefied. Request a free digital marketing consultation and custom audit for Google Ads, Meta Ads, and social media growth.',
    pageType: 'ContactPage',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ],
    includeFaq: false,
    includeServices: false,
  },
};

/**
 * Generate complete JSON-LD graph for a given route path
 * @param {string} pathname
 */
export function generateJsonLdGraph(pathname = '/') {
  const normalizedPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  const config = PAGE_CONFIGS[normalizedPath] || {
    title: 'Markefied | Premier Digital Marketing Agency',
    description: 'Markefied helps businesses grow online with digital marketing that drives leads and sales.',
    pageType: 'WebPage',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: normalizedPath.replace('/', '').toUpperCase() || 'Page', path: normalizedPath },
    ],
    includeFaq: false,
    includeServices: false,
  };

  const pageUrl = normalizedPath === '/' ? SITE_URL : `${SITE_URL}${normalizedPath}`;

  const graph = [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getWebSiteSchema(),
    {
      '@type': config.pageType,
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: config.title,
      description: config.description,
      isPartOf: {
        '@id': `${SITE_URL}/#website`,
      },
      about: {
        '@id': `${SITE_URL}/#organization`,
      },
      breadcrumb: {
        '@id': `${pageUrl}#breadcrumb`,
      },
      inLanguage: 'en-US',
    },
    getBreadcrumbSchema(config.breadcrumbs),
  ];

  if (config.includeServices) {
    const services = getServicesSchema();
    graph.push(...services);
  }

  if (config.includeFaq) {
    const faqSchema = getFaqSchema(SITE_FAQS);
    if (faqSchema) {
      graph.push(faqSchema);
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
