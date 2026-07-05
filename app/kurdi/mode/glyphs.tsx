import type { SVGProps } from "react";

/**
 * The glyph-drawing language of the mode: single-weight hairlines,
 * angular kilim geometry — diamonds, chevrons, straight cuts.
 * Every mark here must feel made by the same hand.
 */

type P = SVGProps<SVGSVGElement>;

function G({ children, ...props }: P & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="square"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ————— the sun: exactly 21 rays. never explained. ————— */
export function Sun21({
  size = 20,
  ...props
}: P & { size?: number }) {
  const rays = Array.from({ length: 21 }, (_, i) => {
    const a = (i / 21) * Math.PI * 2 - Math.PI / 2;
    const x1 = 12 + Math.cos(a) * 6.6;
    const y1 = 12 + Math.sin(a) * 6.6;
    const x2 = 12 + Math.cos(a) * 10.4;
    const y2 = 12 + Math.sin(a) * 10.4;
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
  });
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="4.4" fill="currentColor" stroke="none" />
      {rays}
    </svg>
  );
}

/** Data-URI favicon variant — zer sun on basalt. */
export function sunFaviconHref(): string {
  const rays = Array.from({ length: 21 }, (_, i) => {
    const a = (i / 21) * Math.PI * 2 - Math.PI / 2;
    const x1 = (32 + Math.cos(a) * 17).toFixed(1);
    const y1 = (32 + Math.sin(a) * 17).toFixed(1);
    const x2 = (32 + Math.cos(a) * 27).toFixed(1);
    const y2 = (32 + Math.sin(a) * 27).toFixed(1);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
  }).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0d0b09"/><g stroke="#febd11" stroke-width="2.4"><circle cx="32" cy="32" r="11" fill="#febd11" stroke="none"/>${rays}</g></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/* ————— Pira Dehderî: ten arches over the Dicle ————— */
export function TenArches(props: SVGProps<SVGSVGElement>) {
  const arches = Array.from({ length: 10 }, (_, i) => {
    const x = 4 + i * 20;
    return <path key={i} d={`M${x} 16 q8 -12 16 0`} />;
  });
  return (
    <svg
      viewBox="0 0 208 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-hidden="true"
      {...props}
    >
      {arches}
      <line x1="0" y1="16.5" x2="208" y2="16.5" />
    </svg>
  );
}

/* ————— Sur: the basalt wall as the footer horizon ————— */
export function SurHorizon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1200 56"
      preserveAspectRatio="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M0 56V34h28v-8h10v8h30V22l16-8 16 8v12h30v-8h10v8h48V30h26v-8h10v8h26v4h44V20l18-9 18 9v14h40v-8h10v8h30v6h52V26h24v-6h10v6h24v8h46V18l16-8 16 8v16h34v-8h10v8h44v-6h26v-8h10v8h26v6h48V24l18-9 18 9v10h32v-8h10v8h30v8h46v-6h24v-8h10v8h24v6h38V22l16-8 16 8v12h30v-8h10v8h28v22Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ————— the 21, in the kilim hand ————— */

export const heroGlyphs: Record<string, (props: P) => React.ReactElement> = {
  // Kawa — hammer over anvil
  kawa: (p) => (
    <G {...p}>
      <path d="M8 17h8l2-3H6l2 3ZM9 20h6" />
      <path d="M11 11 16 6M14 4l4 4" />
    </G>
  ),
  // Şahmaran — crowned coiled serpent
  sahmaran: (p) => (
    <G {...p}>
      <path d="M9 6l3-3 3 3M12 3v3" />
      <path d="M12 8c4 0 6 2 6 5s-2 5-6 5-6-2-6-5 2-3 4-3 4 1 4 3-1 2-2 2" />
    </G>
  ),
  // Rustem — drawn bow
  rustem: (p) => (
    <G {...p}>
      <path d="M7 4c6 2 6 14 0 16M7 4v16" />
      <path d="M7 12h11M15 9l3 3-3 3" />
    </G>
  ),
  // Mem û Zîn — two roses, a thorn between
  memuzin: (p) => (
    <G {...p}>
      <path d="M6 8l2-2 2 2-2 2-2-2ZM14 8l2-2 2 2-2 2-2-2Z" />
      <path d="M8 10v8M16 10v8M12 5v14M10 9l2 2 2-2" />
    </G>
  ),
  // Siyabend û Xecê — a stag on Mount Sîpan
  siyabend: (p) => (
    <G {...p}>
      <path d="M3 20 12 8l9 12Z" />
      <path d="M12 8V5M10 3l2 2 2-2M9 5l1 1M15 5l-1 1" />
    </G>
  ),
  // Derwêşê Evdî — horseman's lance
  derwes: (p) => (
    <G {...p}>
      <path d="M5 19 19 5M19 5l-1 5M19 5l-5 1" />
      <path d="M9 12l3 3" />
    </G>
  ),
  // Diyako — seven concentric walls
  diyako: (p) => (
    <G {...p}>
      <path d="M4 20a8 8 0 0 1 16 0M6.3 20a5.7 5.7 0 0 1 11.4 0M8.6 20a3.4 3.4 0 0 1 6.8 0M10.9 20a1.1 1.1 0 0 1 2.2 0" />
      <path d="M2 20h20M12 12V9M12 6.5v-2" />
    </G>
  ),
  // Keyaksar — a falling ziggurat
  keyaksar: (p) => (
    <G {...p}>
      <path d="M4 20h16M6 20l1.5-4h9L18 20M8.5 16l1.2-3.5h4.6L15.5 16M10.6 12.5 12 9l1.4 3.5" />
      <path d="M17 6l3-2M17.5 9l3-1" />
    </G>
  ),
  // Selahedîn — abstracted eagle
  selahedin: (p) => (
    <G {...p}>
      <path d="M12 5v14M12 8 4 6M12 8l8-2M12 12l-6-1M12 12l6-1M12 16l-4-.5M12 16l4-.5M10 21h4" />
    </G>
  ),
  // Melayê Cizîrî — mystic rose
  ciziri: (p) => (
    <G {...p}>
      <path d="M12 4l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4Z" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
    </G>
  ),
  // Feqiyê Teyran — a bird
  teyran: (p) => (
    <G {...p}>
      <path d="M4 14c4 0 6-4 8-6l2 3 6-2-4 5c-2 3-8 4-12 0Z" />
      <path d="M14 8l1-3" />
    </G>
  ),
  // Xanê Lepzêrîn — an open golden hand
  lepzerin: (p) => (
    <G {...p}>
      <path d="M8 21v-8M8 13 5 9M8 13l1-6M11 12V5M14 12l1-6M14 12l3-4M8 21h8l1-4" />
    </G>
  ),
  // Ehmedê Xanî — open book, reed pen
  xani: (p) => (
    <G {...p}>
      <path d="M3 6c3-1.5 6-1.5 9 0 3-1.5 6-1.5 9 0v13c-3-1.5-6-1.5-9 0-3-1.5-6-1.5-9 0V6ZM12 6v13" />
      <path d="M15 12l5-5" />
    </G>
  ),
  // Xanzad — rearing horse
  xanzad: (p) => (
    <G {...p}>
      <path d="M6 21c0-6 3-8 6-9l2-5 3 2-1 3c2 1 3 3 3 9" />
      <path d="M14 7l-1-3M10 21v-3M17 21v-3" />
    </G>
  ),
  // Mîr Bedirxan — signet ring
  bedirxan: (p) => (
    <G {...p}>
      <circle cx="12" cy="14" r="6" />
      <path d="M9 7l3-4 3 4-3 2-3-2Z" />
    </G>
  ),
  // Mestûre Erdelan — inkwell
  mesture: (p) => (
    <G {...p}>
      <path d="M7 20h10l-1-7H8l-1 7ZM9 13v-2h6v2" />
      <path d="M12 9 18 3M18 3l-1 3M18 3l-3 1" />
    </G>
  ),
  // Evdalê Zeynikê — a crane (quling)
  evdal: (p) => (
    <G {...p}>
      <path d="M6 20c5 0 7-3 7-7V7l4-3M17 4l1 2M13 10c-3 0-5 1-7 4" />
      <path d="M10 20h6" />
    </G>
  ),
  // Şêx Seîd — prayer beads
  sexseid: (p) => (
    <G {...p}>
      <path d="M12 4a8 8 0 0 0-8 8" strokeDasharray="0.1 3.1" />
      <path d="M12 4a8 8 0 0 1 8 8" strokeDasharray="0.1 3.1" />
      <path d="M4 12a8 8 0 0 0 3.5 6.6M20 12a8 8 0 0 1-3.5 6.6" strokeDasharray="0.1 3.1" />
      <path d="M12 19v3M11 22h2" />
    </G>
  ),
  // Seyîd Riza — twin peaks over a river
  seyidriza: (p) => (
    <G {...p}>
      <path d="M2 15l5-8 4 6 4-9 7 11" />
      <path d="M3 19c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0" />
    </G>
  ),
  // Qazî Mihemed — four lamps (Çarçira)
  qazi: (p) => (
    <G {...p}>
      <path d="M4 13l1.2-2.4L6.4 13M9 13l1.2-2.4L11.4 13M14 13l1.2-2.4L16.4 13M19 13l1.2-2.4L21.4 13" />
      <path d="M5.2 13v5M10.2 13v5M15.2 13v5M20.2 13v5M3 20h20" />
    </G>
  ),
  // Leyla Qasim — a single flower
  leyla: (p) => (
    <G {...p}>
      <path d="M12 21V11" />
      <path d="M12 11 9 8l3-4 3 4-3 3ZM12 11 8 11M12 11h4" />
      <path d="M12 15c-2 0-3-1-4-2M12 17c2 0 3-1 4-2" />
    </G>
  ),
};
