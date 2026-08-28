export const mainNavigation = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products", hasDropdown: true },
  { href: "/solutions", label: "Solutions" },
  { href: "/services", label: "Services" },
  { href: "/security", label: "Security" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNavigation = {
  products: [
    { href: "/products/tracelens", label: "TraceLens" },
    { href: "/products/nigrani", label: "Nigrani" },
    { href: "/products/kartavyanama", label: "KartvyaNama" },
    { href: "/products/talash-gateway", label: "Talash Gateway" },
    { href: "/products", label: "All products" },
  ],
  solutions: [
    { href: "/solutions#digital-investigation", label: "Digital investigation" },
    { href: "/solutions#intelligence", label: "Intelligence analysis" },
    { href: "/solutions#field-operations", label: "Field operations" },
    { href: "/solutions#enterprise", label: "Secure enterprise operations" },
  ],
  company: [
    { href: "/about", label: "About DevSoft" },
    { href: "/services", label: "Services" },
    { href: "/security", label: "Security" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
    { href: "/download-terms", label: "Download Terms" },
  ],
};
