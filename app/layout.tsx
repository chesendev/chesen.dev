import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chesen.dev"),
  title: {
    default: "Mehdi Osmanoğlu — Software Engineering & CS Student",
    template: "%s · Mehdi Osmanoğlu",
  },
  description:
    "Mehdi Osmanoğlu — Software Engineering dual-diploma student building robust backend systems, exploring algorithm design and Web3 ecosystems.",
  keywords: [
    "Mehdi Osmanoğlu",
    "Chesen",
    "Software Engineer",
    "Computer Science",
    "Backend",
    "C#",
    ".NET",
    "Move",
    "SUI",
    "Web3",
    "Fırat University",
    "Sam Houston State University",
  ],
  authors: [{ name: "Mehdi Osmanoğlu" }],
  creator: "Mehdi Osmanoğlu",
  openGraph: {
    title: "Mehdi Osmanoğlu — Software Engineering & CS Student",
    description:
      "Backend, algorithms, and Web3. Dual-degree Software Engineering student.",
    url: "https://chesen.dev",
    siteName: "chesen.dev",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehdi Osmanoğlu",
    description:
      "Backend, algorithms, and Web3. Dual-degree Software Engineering student.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mehdi Osmanoğlu",
  alternateName: "Chesen",
  url: "https://chesen.dev",
  jobTitle: "Software Engineering Student",
  description:
    "Dual-diploma student focused on backend architectures, algorithm design, and Web3 ecosystems.",
  knowsAbout: [
    "C#",
    ".NET",
    "Java",
    "C++",
    "Python",
    "Move",
    "SUI",
    "Algorithm Design",
    "Backend Architecture",
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Fırat University",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Sam Houston State University",
    },
  ],
  sameAs: [
    "https://github.com/chesendev",
    "https://www.linkedin.com/in/mehdiosmanoglu",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body
        className="min-h-screen bg-background text-foreground antialiased"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
