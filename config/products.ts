import type { ProductRecord, ProductSlug } from "@/types";

export const products: ProductRecord[] = [
  {
    slug: "tracelens",
    name: "TraceLens",
    shortName: "TraceLens",
    tagline: "Digital Evidence & Intelligence Analysis Platform",
    excerpt:
      "A professional workspace for reviewing digital evidence, uncovering relationships, and producing investigation-ready analysis.",
    description:
      "TraceLens is DevSoft’s digital evidence and intelligence analysis platform. It helps investigators and analysts organise large volumes of digital material, search across sources, review entities and documents, and produce structured reports — without exposing operational tradecraft on the public site.",
    featured: true,
    status: "request-demo",
    platforms: ["Windows", "Android", "Web", "On-premises"],
    version: "Preview",
    versionConfirmed: false,
    downloadEnabled: false,
    audience: "Digital investigation, intelligence analysis, and evidence review teams",
    category: "Digital Investigation",
    capabilities: [
      {
        title: "Digital evidence analysis",
        description:
          "Bring together case material in a structured workspace designed for review, annotation, and follow-up.",
      },
      {
        title: "Advanced search",
        description:
          "Locate relevant items quickly across large collections using targeted and full-text search.",
      },
      {
        title: "Keyword analysis",
        description:
          "Identify patterns, recurring terms, and investigation-relevant language across evidence sets.",
      },
      {
        title: "Entity analysis",
        description:
          "Surface people, organisations, identifiers, and other entities to support relationship review.",
      },
      {
        title: "Document analysis",
        description:
          "Review documents in context, with support for structured examination and investigator notes.",
      },
      {
        title: "Email analysis",
        description:
          "Examine message collections, threads, and related metadata as part of a unified case view.",
      },
      {
        title: "Metadata analysis",
        description:
          "Inspect available file and communication metadata to support chronology and provenance review.",
      },
      {
        title: "OCR",
        description:
          "Make image-based and scanned material searchable so printed and captured text can be reviewed.",
      },
      {
        title: "Multilingual content analysis",
        description:
          "Work with content across languages commonly encountered in regional and national investigations.",
      },
      {
        title: "Evidence review",
        description:
          "A dedicated review flow for marking, commenting, and progressing items through an investigation.",
      },
      {
        title: "Forensic reporting",
        description:
          "Produce structured outputs suitable for case files, supervisory review, and further disclosure processes.",
      },
      {
        title: "Data visualisation",
        description:
          "Visualise relationships, timelines, and activity so complex cases are easier to brief and explain.",
      },
      {
        title: "Investigation workspace",
        description:
          "Keep case work organised in one place: sources, findings, notes, and outputs.",
      },
    ],
    features: [
      "Case-centric investigation workspace",
      "Cross-source search and review",
      "Entity and relationship views",
      "Document, email, and metadata examination",
      "OCR-assisted review of scanned material",
      "Multilingual content handling",
      "Visual timelines and relationship maps",
      "Structured reporting for case handover",
    ],
    workflow: [
      {
        step: "01",
        title: "Assemble the case",
        description:
          "Create a workspace and bring authorised digital material into a controlled review environment.",
      },
      {
        step: "02",
        title: "Search and examine",
        description:
          "Use search, entities, documents, and metadata views to isolate what matters.",
      },
      {
        step: "03",
        title: "Visualise relationships",
        description:
          "Map connections and sequences of activity to support briefing and next investigative steps.",
      },
      {
        step: "04",
        title: "Report and handover",
        description:
          "Generate structured analysis outputs for supervisors, counsel, or partner units.",
      },
    ],
    benefits: [
      "Reduces time spent locating relevant material in large evidence sets",
      "Keeps investigation work organised and reviewable",
      "Supports consistent reporting across cases",
      "Designed for professional, authorised investigative use",
    ],
    securityNotes: [
      "Intended for authorised agencies and controlled operational environments",
      "Deployment can be planned for on-premises or isolated networks where required",
      "Access should be limited to designated investigators and supervisors",
      "Public documentation does not describe internal processing methods",
    ],
    requirements: [
      "Authorised organisational use only",
      "Deployment sizing depends on evidence volume and concurrent reviewers",
      "Exact system requirements are confirmed during a scoped demonstration",
    ],
    faqs: [
      {
        question: "Who is TraceLens for?",
        answer:
          "TraceLens is intended for authorised investigation, intelligence, and evidence-review teams that need a professional workspace for digital material.",
      },
      {
        question: "Can TraceLens be deployed without public cloud?",
        answer:
          "Yes. DevSoft can discuss on-premises and isolated-network deployments for agencies that require local operation.",
      },
      {
        question: "Is a public download available?",
        answer:
          "TraceLens is provided through a demonstration and deployment process rather than an open public installer.",
      },
    ],
    placeholders: [
      "Product screenshots, exact version number, and confirmed system requirements will be published after internal sign-off.",
    ],
  },
  {
    slug: "nigrani",
    name: "Nigrani",
    shortName: "Nigrani",
    tagline: "IPDR Forensic Analyzer",
    excerpt:
      "A forensic-grade digital communication analysis system for authorised Indian law-enforcement use of IP Detail Records.",
    description:
      "Nigrani helps authorised investigators analyse IP Detail Records (IPDR) to understand application usage, voice and video communication indicators, VPN-related activity, and session patterns — and to produce structured, court-oriented evidence packages. Nigrani is offered as a production product (v1.0.0) with Windows, Android, and offline desktop deployment options.",
    featured: true,
    status: "brochure",
    platforms: ["Windows", "Android", "Web", "Offline / Air-gapped"],
    version: "1.0.0",
    versionConfirmed: true,
    brochureHref: "/docs/Nigrani_Product_Info.pdf",
    downloadEnabled: false,
    audience: "Authorised Indian law-enforcement and digital forensic units",
    category: "Digital Forensics",
    capabilities: [
      {
        title: "Application identification",
        description:
          "Identify a wide range of applications across messaging, email, cloud storage, browsers, VPN, and other categories from IPDR material.",
      },
      {
        title: "Voice and video call indicators",
        description:
          "Detect indicators of voice and video activity from supported communications services, with confidence classification for investigative review.",
      },
      {
        title: "VPN and privacy-tool indicators",
        description:
          "Highlight VPN-related activity and named service indicators to support further authorised enquiry.",
      },
      {
        title: "Session reconstruction",
        description:
          "Group activity into subscriber sessions so investigators can review usage over time rather than isolated rows.",
      },
      {
        title: "Geographic and network context",
        description:
          "Enrich addresses with available location and network-organisation context to support mapping and briefing.",
      },
      {
        title: "Department of Telecommunications formats",
        description:
          "Native handling of common IPDR file layouts used in Indian telecom reporting, including multi-file analysis.",
      },
      {
        title: "Forensic evidence packages",
        description:
          "Export structured packages with reports, activity extracts, hashes, and supporting files for case documentation.",
      },
      {
        title: "Legally cautious narratives",
        description:
          "Produce descriptions classified by confidence level to support disclosure and supervisory review.",
      },
    ],
    features: [
      "97+ application signatures across 10 categories (product brochure, Feb 2026)",
      "Voice/video indicators across 31 communications services",
      "Named VPN service indicators",
      "CSV, XLSX, and XLS input",
      "UTF-8 and additional encodings commonly found in IPDR exports",
      "SHA-256 hashed export packages (PDF, CSV, JSON, TXT)",
      "Web workstation and offline Windows desktop options",
      "USB-based licensed distribution for controlled delivery",
    ],
    workflow: [
      {
        step: "01",
        title: "Ingest authorised IPDR files",
        description:
          "Load CSV or spreadsheet IPDR exports, including multi-file sets in common Indian reporting formats.",
      },
      {
        step: "02",
        title: "Analyse communications activity",
        description:
          "Review applications, session groupings, VPN indicators, and voice/video classifications.",
      },
      {
        step: "03",
        title: "Enrich and map",
        description:
          "Add available geographic and network-organisation context to endpoints under review.",
      },
      {
        step: "04",
        title: "Export the evidence package",
        description:
          "Generate a hashed package of reports and extracts for case files and further legal process.",
      },
    ],
    benefits: [
      "Purpose-built for IPDR review rather than generic log browsing",
      "Supports both laboratory and field/offline operating models",
      "Produces structured outputs intended for case documentation",
      "Designed for authorised law-enforcement use in India",
    ],
    securityNotes: [
      "Licensing can be bound to controlled distribution media",
      "Offline desktop operation is available for isolated networks",
      "Access should remain limited to authorised officers and forensic staff",
      "Operational detection methods are not published beyond the product brochure",
    ],
    requirements: [
      "Authorised IPDR material in supported spreadsheet or CSV layouts",
      "Web workstation or Windows desktop environment, depending on deployment",
      "Detailed column mapping is documented in the product information brochure",
    ],
    faqs: [
      {
        question: "Is Nigrani a public download?",
        answer:
          "No. Nigrani is supplied to authorised agencies through a controlled demonstration and licensing process.",
      },
      {
        question: "What inputs does Nigrani accept?",
        answer:
          "Nigrani accepts IPDR files in CSV and Excel formats, including common Department of Telecommunications layouts.",
      },
      {
        question: "Can it run without internet access?",
        answer:
          "Yes. A Windows desktop deployment is available for offline and isolated-network use.",
      },
    ],
    placeholders: [],
  },
  {
    slug: "kartavyanama",
    name: "KartvyaNama",
    shortName: "KartvyaNama",
    tagline: "Operational duty records for Android and Windows",
    excerpt:
      "A DevSoft application for structured operational recording on Android and Windows. The public download on this site is the Android package; Windows distribution is confirmed by the official product icon.",
    description:
      "KartvyaNama is DevSoft’s professional application for authorised organisational use, with official Android and Windows product icons. Field and desk staff can capture duty-related information in a controlled way. Because a public feature specification has not yet been formally issued, this page describes the intended product role and the secure Android download process — not unverified capabilities.",
    featured: true,
    status: "available",
    platforms: ["Android", "Windows"],
    version: "To be confirmed",
    versionConfirmed: false,
    fileLabel: "KartvyaNama Android package",
    fileSizeLabel: "Published with the signed build",
    downloadEnabled: true,
    audience: "Authorised departments and field teams using Android devices",
    category: "Field Operations",
    capabilities: [
      {
        title: "Mobile operational recording",
        description:
          "Capture duty-related information on Android devices used in the field.",
      },
      {
        title: "Professional distribution",
        description:
          "Packages are issued through a registered download process rather than an open public file link.",
      },
      {
        title: "Organisation-ready delivery",
        description:
          "Intended for named departments and units that need a controlled copy of the application.",
      },
    ],
    features: [
      "Android application package distributed by DevSoft",
      "Registered download with organisation details",
      "Designed for professional, authorised use",
    ],
    requirements: [
      "Compatible Android device (exact OS versions will be listed with the signed build)",
      "Installation from unknown sources may be required when the package is not distributed via a store",
      "Use only if you are authorised by your organisation",
    ],
    faqs: [
      {
        question: "Why do I have to register before downloading?",
        answer:
          "DevSoft records download requests so software is issued to identifiable organisations, to support updates and to reduce anonymous redistribution.",
      },
      {
        question: "Will the APK start downloading immediately?",
        answer:
          "No. You complete a registration form and verification first. The package is released only after the request is accepted.",
      },
    ],
    releaseNotes: [
      {
        version: "Pending",
        date: "To be published",
        notes: [
          "Official version number, file size, supported Android versions, and release notes will be added when the signed package is placed in private storage.",
        ],
        confirmed: false,
      },
    ],
    placeholders: [
      "Android version compatibility, APK file size, screenshots, and detailed feature list are pending confirmation and must not be treated as final specifications.",
    ],
  },
  {
    slug: "talash-gateway",
    name: "Talash Gateway",
    shortName: "Talash",
    tagline: "Secure subscriber information portal (SDR)",
    excerpt:
      "A controlled portal for authorised access to subscriber account, call, billing, and usage information.",
    description:
      "Talash Gateway is a secure Subscriber Detail Record (SDR) portal. It allows authorised users to view account, call, billing, and usage data while supporting privacy, access control, and operational service management. Detailed module specifications beyond this description are confirmed during a demonstration.",
    featured: true,
    status: "request-demo",
    platforms: ["Web", "On-premises"],
    versionConfirmed: false,
    downloadEnabled: false,
    audience: "Authorised telecom, investigation, and service-management users",
    category: "Secure Enterprise Operations",
    capabilities: [
      {
        title: "Authorised subscriber lookup",
        description:
          "Provide controlled access to subscriber-related records for users with a legitimate operational need.",
      },
      {
        title: "Account and usage visibility",
        description:
          "Review account, call, billing, and usage information within defined permissions.",
      },
      {
        title: "Privacy-conscious access",
        description:
          "Designed so sensitive subscriber data is reached through an authorised portal rather than ad-hoc file sharing.",
      },
    ],
    features: [
      "Role-based access to subscriber information",
      "Portal experience for authorised operational staff",
      "Built for environments where privacy and auditability matter",
    ],
    placeholders: [
      "Screenshots, version, hosting model, and a full module list are not published on the current DevSoft site and remain to be confirmed.",
    ],
  },
  {
    slug: "ems",
    name: "EMS",
    shortName: "EMS",
    tagline: "Employee management for operational organisations",
    excerpt:
      "A central system for employee records, attendance, payroll support, performance, and leave.",
    description:
      "EMS is DevSoft’s employee management system. It centralises workforce records and day-to-day HR operations — attendance, leave, payroll-related processes, and performance — so departments can run staff administration with more consistency. Module-level screenshots and version details are not yet published.",
    featured: false,
    status: "request-demo",
    platforms: ["Android", "Web", "On-premises"],
    versionConfirmed: false,
    downloadEnabled: false,
    audience: "HR, administration, and department leadership",
    category: "Secure Enterprise Operations",
    capabilities: [
      {
        title: "Employee records",
        description: "Maintain staff information in a single operational register.",
      },
      {
        title: "Attendance and leave",
        description: "Track presence and leave so administrative reporting stays current.",
      },
      {
        title: "Payroll and performance support",
        description:
          "Support payroll-related workflows and performance recording used by departmental administration.",
      },
    ],
    features: [
      "Central employee register",
      "Attendance, leave, and administrative workflows",
      "Built for organisational rather than consumer HR use",
    ],
    placeholders: [
      "Exact modules, integrations, and deployment sizing are pending confirmation.",
    ],
  },
  {
    slug: "task-master",
    name: "Task Master / Tapal",
    shortName: "Task Master",
    tagline: "Task and correspondence management for teams",
    excerpt:
      "A productivity system for task tracking, deadlines, progress, and team coordination.",
    description:
      "Task Master (also referred to as Tapal) helps individuals and teams organise work: assignments, deadlines, progress, and collaboration. It is used where departments need a clearer operational picture of outstanding tasks. Public screenshots and a confirmed version number are not yet available.",
    featured: false,
    status: "request-demo",
    platforms: ["Web"],
    versionConfirmed: false,
    downloadEnabled: false,
    audience: "Teams and departments coordinating operational work",
    category: "Mission-Critical Workflows",
    capabilities: [
      {
        title: "Task tracking",
        description: "Record work items, owners, and status in one place.",
      },
      {
        title: "Deadline management",
        description: "Keep due dates visible so work does not stall unnoticed.",
      },
      {
        title: "Progress visibility",
        description: "Give supervisors a current view of what is moving and what is blocked.",
      },
    ],
    features: [
      "Task lists and status tracking",
      "Deadline and progress views",
      "Team-oriented collaboration",
    ],
    placeholders: [
      "The relationship between the Task Master and Tapal names, screenshots, and version details should be confirmed before marketing claims are expanded.",
    ],
  },
];

export function getProduct(slug: string): ProductRecord | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): ProductRecord[] {
  return products.filter((product) => product.featured);
}

export function getDownloadableProducts(): ProductRecord[] {
  return products.filter((product) => product.downloadEnabled);
}

export const productSlugList: ProductSlug[] = products.map((product) => product.slug);
