/**
 * Single source of truth for every word and link on the site.
 * Components render this; they do not own copy.
 */

export const profile = {
  name: "Mehdi Osmanoğlu",
  firstName: "Mehdi",
  lastName: "Osmanoğlu",
  handle: "Chesen",
  domain: "chesen.dev",
  url: "https://chesen.dev",
  kicker: "Chesen · Software Engineering Student",
  positioning:
    "Software engineering student, building my backend foundations in public.",
  supporting:
    "C#/.NET at the core, exploring blockchain along the way. A Türkiye → Texas dual degree, one repo at a time.",
  availability: "Available for collaboration",
  location: "Elazığ ⇄ Huntsville, TX",
  email: "mehdiosmanoglu@icloud.com",
  description:
    "Mehdi Osmanoğlu (Chesen) — software engineering dual-degree student. C#/.NET at the core, exploring blockchain along the way.",
} as const;

export const socials = {
  github: { label: "GitHub", url: "https://github.com/chesendev" },
  linkedin: {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/mehdiosmanoglu",
  },
} as const;

export const about = {
  paragraphs: [
    "I'm a software engineering student on a dual-diploma track: Fırat University in Türkiye, with the Texas years at Sam Houston State University ahead. The focus is simple — C#/.NET fundamentals practiced daily, not collected as résumé keywords.",
  ],
  languages: [
    { name: "Kurdish", level: "native" },
    { name: "Turkish", level: "native" },
    { name: "English", level: "professional" },
  ],
  toolbox: [
    "C# / .NET",
    "Java",
    "C++",
    "Python",
    "TypeScript",
    "SQL",
    "Git & GitHub",
    "Avalanche",
    "Photoshop",
  ],
  log: [
    { year: "2026", entry: "ODTÜ Blockchain Days — attendee" },
    { year: "2026", entry: "exercism.io — C# track, daily practice" },
    { year: "2025", entry: "DevFest Istanbul — attendee" },
    { year: "····", entry: "Dual diploma, Fırat ⇄ SHSU — ongoing" },
  ],
} as const;

export const now = [
  "Avalanche Team1 Collaborator — contributing to the ecosystem.",
  "Joined the Fırat University Blockchain Incubator Program.",
  "Deepening C#/.NET fundamentals — daily practice on the Exercism C# track.",
  "Preparing for the Texas leg of the dual degree at SHSU.",
] as const;

export const nav = [
  { href: "#about", label: "About" },
  { href: "#now", label: "Now" },
  { href: "#contact", label: "Contact" },
] as const;
