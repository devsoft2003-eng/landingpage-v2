export type ProductSlug =
  | "tracelens"
  | "nigrani"
  | "kartavyanama"
  | "talash-gateway"
  | "ems"
  | "task-master";

export type ProductStatus = "available" | "request-demo" | "brochure";

export type ProductPlatform =
  | "Web"
  | "Windows"
  | "Android"
  | "iOS"
  | "Offline / Air-gapped"
  | "On-premises";

export interface ProductCapability {
  title: string;
  description: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface ProductReleaseNote {
  version: string;
  date: string;
  notes: string[];
  confirmed: boolean;
}

export interface ProductRecord {
  slug: ProductSlug;
  name: string;
  shortName: string;
  tagline: string;
  excerpt: string;
  description: string;
  featured: boolean;
  status: ProductStatus;
  platforms: ProductPlatform[];
  version?: string;
  versionConfirmed: boolean;
  fileLabel?: string;
  fileSizeLabel?: string;
  brochureHref?: string;
  downloadEnabled: boolean;
  capabilities: ProductCapability[];
  features: string[];
  workflow?: { step: string; title: string; description: string }[];
  benefits?: string[];
  securityNotes?: string[];
  requirements?: string[];
  faqs?: ProductFaq[];
  releaseNotes?: ProductReleaseNote[];
  placeholders?: string[];
  audience: string;
  category: string;
}

export interface DownloadRequestInput {
  productSlug: string;
  fullName: string;
  organization: string;
  designation: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  country: string;
  purpose: string;
  consent: boolean;
}

export interface AdminSession {
  userId: number;
  email: string;
  issuedAt: number;
  expiresAt: number;
}

export interface ContactEnquiryInput {
  fullName: string;
  email: string;
  organization?: string;
  phone?: string;
  enquiryType: "business" | "product" | "support" | "other";
  product?: string;
  message: string;
}
