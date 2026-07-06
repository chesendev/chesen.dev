import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { about, profile, socials } from "../content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: {
    default: `${profile.name} — Software Engineering Student`,
    template: `%s · ${profile.name}`,
  },
  description: profile.description,
  keywords: [
    profile.name,
    profile.handle,
    "Software Engineering Student",
    "Backend Development",
    "C#",
    ".NET",
    "Python",
    "Blockchain",
    "Avalanche",
    "Fırat University",
    "Sam Houston State University",
  ],
  authors: [{ name: profile.name, url: profile.url }],
  creator: profile.name,
  openGraph: {
    title: `${profile.name} — Software Engineering Student`,
    description: profile.positioning,
    url: profile.url,
    siteName: profile.domain,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: profile.name,
    description: profile.positioning,
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.handle,
  url: profile.url,
  email: `mailto:${profile.email}`,
  jobTitle: "Software Engineering Student",
  description: profile.description,
  knowsAbout: [
    "C#",
    ".NET",
    "Python",
    "TypeScript",
    "Backend Development",
    "Blockchain",
    "Avalanche",
  ],
  knowsLanguage: about.languages.map((lang) => lang.name),
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Fırat University" },
    { "@type": "CollegeOrUniversity", name: "Sam Houston State University" },
  ],
  sameAs: [socials.github.url, socials.linkedin.url],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* restore display mode before first paint — zero flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('chesen:mode')==='kurdi'){var d=document.documentElement;d.dataset.mode='kurdi';d.lang='kmr';}}catch(e){}`,
          }}
        />
      </head>
      <body
        className="min-h-screen bg-background text-foreground antialiased"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <div id="mode-veil" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
