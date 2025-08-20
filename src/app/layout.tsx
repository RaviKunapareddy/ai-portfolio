import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from 'next/script';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ravi Kunapareddy | GenAI Portfolio",
        description: "GenAI Engineer building functional AI systems. Healthcare RAG, Multi-Agent workflows, and FinTech LLMs by Ravi Kunapareddy.",
  keywords: ["GenAI", "AI", "Machine Learning", "LLM", "Portfolio", "Ravi Kunapareddy", "AI Engineer"],
  authors: [{ name: "Ravi Kunapareddy" }],
  creator: "Ravi Kunapareddy",
  publisher: "Ravi Kunapareddy",
  robots: "index, follow",
  
  // OpenGraph metadata
      openGraph: {
      title: "Ravi Kunapareddy | GenAI Portfolio",
      description: "GenAI Engineer building functional AI systems and prototypes.",
      url: siteUrl,
    siteName: "Ravi Kunapareddy Portfolio",
    locale: "en_US",
    type: "website",
  },
  
  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: "Ravi Kunapareddy | GenAI Portfolio",
    description: "GenAI Engineer building functional AI systems and prototypes.",
  },

  // Enhanced favicon setup
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" }
    ],
  },

  // Additional metadata
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#475569',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {plausibleDomain && (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col font-sans bg-white`}>
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
