import { useEffect } from 'react';

interface StructuredDataProps {
  data: object | object[];
}

export function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(Array.isArray(data) ? data : [data]);
    script.id = `structured-data-${Math.random().toString(36).substr(2, 9)}`;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(script.id);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [data]);

  return null;
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Plandepa',
  url: 'https://plandepa.com',
  logo: 'https://plandepa.com/plandepa_logo_slim.png',
  description: 'Australian construction AI automation and business consulting experts specializing in workflow optimization, lead generation, and construction management systems.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Brisbane',
    addressRegion: 'QLD',
    addressCountry: 'AU',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+61-447-733-216',
    contactType: 'Customer Service',
    availableLanguage: 'English',
    areaServed: ['AU', 'Worldwide'],
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61581827105862',
    'https://www.instagram.com/plandepa/',
    'https://www.linkedin.com/company/107528755/admin/dashboard/',
  ],
  founder: [
    {
      '@type': 'Person',
      name: 'Mitch Humphries',
      jobTitle: 'Co-Founder',
      description: 'Former carpenter and State Manager in building and restoration with expertise in construction systems and scaling operations.',
      sameAs: 'https://www.linkedin.com/in/mitchell-humphries-8436ab37b/',
    },
    {
      '@type': 'Person',
      name: 'Jarrod Tanko',
      jobTitle: 'Co-Founder',
      description: 'Construction company founder and site manager with experience from startup operations to Tier 1 mining projects.',
      sameAs: 'https://www.linkedin.com/in/jarrod-tanko-104943267/',
    },
  ],
  award: [
    'ISO Auditing Accreditation',
    'Diploma of Project Management',
    'Diploma of Health and Safety',
    'Diploma of Building and Construction',
  ],
};

export const localBusinessBrisbane = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://plandepa.com/#brisbane',
  name: 'Plandepa - Brisbane',
  image: 'https://plandepa.com/plandepa_logo_slim.png',
  description: 'ISO certified construction business consultants in Brisbane specializing in AI automation, lead generation, and workflow optimization for construction companies.',
  telephone: '+61-447-733-216',
  email: 'admin@plandepa.com',
  priceRange: '$$',
  openingHours: 'Mo-Su 00:00-23:59',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Brisbane',
    addressRegion: 'QLD',
    addressCountry: 'AU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '-27.4698',
    longitude: '153.0251',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Brisbane',
    },
    {
      '@type': 'State',
      name: 'Queensland',
    },
    {
      '@type': 'Country',
      name: 'Australia',
    },
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Diploma',
      name: 'Diploma of Project Management',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Diploma',
      name: 'Diploma of Health and Safety',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Diploma',
      name: 'Diploma of Building and Construction',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Certification',
      name: 'ISO Auditing Accreditation',
    },
  ],
};

export const localBusinessSydney = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://plandepa.com/#sydney',
  name: 'Plandepa - Sydney',
  image: 'https://plandepa.com/plandepa_logo_slim.png',
  description: 'ISO certified construction business consultants in Sydney specializing in AI automation, lead generation, and workflow optimization for construction companies.',
  telephone: '+61-447-733-216',
  email: 'admin@plandepa.com',
  priceRange: '$$',
  openingHours: 'Mo-Su 00:00-23:59',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    addressCountry: 'AU',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Sydney',
    },
    {
      '@type': 'City',
      name: 'Newcastle',
    },
    {
      '@type': 'State',
      name: 'New South Wales',
    },
    {
      '@type': 'Country',
      name: 'Australia',
    },
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Diploma',
      name: 'Diploma of Project Management',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Diploma',
      name: 'Diploma of Health and Safety',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Diploma',
      name: 'Diploma of Building and Construction',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Certification',
      name: 'ISO Auditing Accreditation',
    },
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Plandepa',
  url: 'https://plandepa.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://plandepa.com/blog?search={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export const serviceSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Construction AI Automation',
    provider: {
      '@type': 'Organization',
      name: 'Plandepa',
    },
    areaServed: 'AU',
    description: 'AI-powered automation solutions for construction businesses to reduce paperwork, streamline workflows, and increase efficiency.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Construction Business Consulting',
    provider: {
      '@type': 'Organization',
      name: 'Plandepa',
    },
    areaServed: 'AU',
    description: 'Professional business consulting services for construction companies including workflow optimization, system selection, and strategic planning.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Lead Generation for Construction',
    provider: {
      '@type': 'Organization',
      name: 'Plandepa',
    },
    areaServed: 'AU',
    description: 'Proven lead generation systems to help construction companies attract and convert quality leads consistently.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Buildxact Integration & Support',
    provider: {
      '@type': 'Organization',
      name: 'Plandepa',
    },
    areaServed: 'AU',
    description: 'Official Buildxact partner providing implementation, training, and optimization services for construction estimating and project management.',
  },
];

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
