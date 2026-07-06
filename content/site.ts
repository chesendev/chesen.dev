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
    "Software engineering student, building toward a US backend career.",
  supporting:
    "C#/.NET at the core, exploring blockchain along the way. Learning in public through a Türkiye → Texas dual degree, one repo at a time.",
  availability: "Available for collaboration",
  location: "Elazığ ⇄ Huntsville, TX",
  email: "mehdiosmanoglu@icloud.com",
  description:
    "Mehdi Osmanoğlu (Chesen) — software engineering dual-degree student building toward a US backend career. C#/.NET at the core, exploring blockchain along the way.",
} as const;

export const socials = {
  github: { label: "GitHub", url: "https://github.com/chesendev" },
  linkedin: {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/mehdiosmanoglu",
  },
} as const;

export type Project = {
  index: string;
  name: string;
  stack: string;
  problem: string;
  approach: string;
  learned: string;
};

export const projects: Project[] = [
  {
    index: "01",
    name: "Amazon Purchase Automation",
    stack: ".NET · Playwright",
    problem:
      "Repetitive purchase flows across accounts — each one a minefield of dynamic DOMs, session traps, and steps that fail silently at 4 a.m.",
    approach:
      "Modeled the flow as a state machine in .NET and drove real browsers with Playwright. Every step is idempotent, so a crash resumes instead of restarting.",
    learned:
      "The DOM is a hostile API. Selectors are contracts signed with a counterpart who never agreed to them — write them defensively.",
  },
  {
    index: "02",
    name: "Ticket Purchase Bot",
    stack: "Python · Playwright",
    problem:
      "High-demand ticket drops sell out in seconds — and the queue sits behind Cloudflare, which eats headless browsers for breakfast.",
    approach:
      "Skipped the stealth-plugin arms race entirely. Persistent real-browser contexts with humane pacing: the session looks human because it mostly is.",
    learned:
      "You don't beat bot detection by hiding. You beat it by being indistinguishable from the person you're automating for.",
  },
  {
    index: "03",
    name: "FinQuest",
    stack: "Hackathon · AgeSA Code Night",
    problem:
      "Financial literacy content is broccoli. Nobody finishes broccoli — especially not the young people who need it most.",
    approach:
      "Gamified the curriculum into quests and streaks, then built a working demo with a team in a single night.",
    learned:
      "Scope is a weapon. The feature you cut at midnight is the reason the demo works at 9 a.m.",
  },
];

export const about = {
  paragraphs: [
    "I'm a software engineering student on a dual-diploma track: Fırat University in Türkiye, with the Texas years at Sam Houston State University ahead. The focus is simple — C#/.NET fundamentals practiced daily, not collected as résumé keywords.",
    "Before I wrote my first line of C#, I built a philosophy media brand to roughly 600K followers and cut professional video in Premiere and After Effects. That's not a detour — it's why my work ships with taste and my demos tell a story.",
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
    "Premiere Pro",
    "After Effects",
    "Photoshop",
  ],
  log: [
    { year: "2026", entry: "ODTÜ Blockchain Days — attendee" },
    { year: "2026", entry: "C# Technical Challenge — in progress" },
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
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#now", label: "Now" },
  { href: "#contact", label: "Contact" },
] as const;
