export const siteConfig = {
  name: "DevSoft",
  legalName: "DevSoft",
  tagline: "Technology Built for Mission-Critical Operations.",
  description:
    "DevSoft develops secure, intelligent and reliable software solutions for digital investigation, intelligence analysis, field operations and mission-critical workflows.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dev-soft.in",
  locale: "en_IN",
  email: "contact@dev-soft.in",
  address: {
    line1: "Shakti Vihar, Koradi Road",
    city: "Nagpur",
    postalCode: "440030",
    region: "Maharashtra",
    country: "India",
  },
  phone: {
    display: null as string | null,
    note: "Direct telephone listing is pending confirmation. Please use email or the contact form.",
  },
  copyrightYearStart: 2025,
} as const;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.line1,
    addressLocality: siteConfig.address.city,
    postalCode: siteConfig.address.postalCode,
    addressRegion: siteConfig.address.region,
    addressCountry: "IN",
  },
};
