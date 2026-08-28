import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { organizationJsonLd, siteConfig } from "@/config/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "DevSoft | Secure Technology & Digital Investigation Solutions",
    template: "%s | DevSoft",
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: siteConfig.locale,
    images: [{ url: "/images/devsoft-logo.png", width: 537, height: 133, alt: "DevSoft" }],
  },
  icons: {
    icon: [{ url: "/images/devsoft-mark.png", type: "image/png" }],
    apple: [{ url: "/images/devsoft-mark.png" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground" suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
        <Toaster theme="dark" richColors position="top-right" />
      </body>
    </html>
  );
}
