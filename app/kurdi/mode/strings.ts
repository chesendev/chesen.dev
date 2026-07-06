/**
 * Every Kurmanji string in the mode lives here — and ONLY here.
 * This module ships exclusively inside the lazy mode chunk.
 * All copy is tabled in COPY_REVIEW.md for the owner's native pass.
 */

export const ui = {
  nav: [
    { href: "#bir", label: "Bîr" },
    { href: "#about", label: "Derbarê" },
    { href: "#contact", label: "Têkilî" },
  ],
  skip: "Derbas be bo naverokê",
  hero: {
    kicker: "Chesen",
    cta: "Bîr",
    orPress: "an jî li her derê",
  },
  sections: {
    bir: { index: "01", title: "Bîr", sub: "Ji mîtê heta bîrê." },
    about: { index: "02", title: "Derbarê" },
    contact: { index: "03", title: "Têkilî" },
  },
  about: {
    cirokTitle: "Çîrok",
    cirok: [
      "Lo lo…",
      "Ez ji Amedê me.",
      "Kevirên reş ên Bircên Amedê, ava Dîcleyê, dengê hewşê.",
      "Her tişt ji wir dest pê dike — û her tişt vedigere wir.",
    ],
    languagesTitle: "Ziman",
    languages: [
      { name: "Kurdî", level: "zikmakî" },
      { name: "Romî", level: "zikmakî" },
      { name: "Îngilîzî", level: "profesyonel" },
    ],
  },
  contact: {
    headline: "Silav",
    headlineAccent: "bide.",
    lede: "Binivîse — her peyamê dixwînim. ✌️",
    copyHint: "[kopî]",
    copied: "hat kopîkirin — em bipeyivin.",
    exit: "derkeve",
    builtBy: "Bi ♥ ji aliyê Chesen — bê şablon.",
  },
  notFound: {
    code: "404",
    title: "Şop di nav bircên Sur de winda bû.",
    body: "Ev rê tune — an jî tu carî tunebû.",
    back: "Vegere malê",
  },
  palette: {
    placeholder: "Fermanekê binivîse…",
    empty: "Tiştek nehat dîtin. “email” biceribîne.",
    groups: { navigate: "Biçe", actions: "Çalakî", links: "Girêdan" },
    top: "Serî",
    copyEmail: "Emailê kopî bike",
    exitMode: "Derkeve ji moda kurdî",
    hints: "↑↓ bigere · ↵ bimeşîne · esc bigire",
  },
  eggs: {
    newrozToast: "Newroz pîroz be. ✌️",
    amedsporChant: "Her bijî Amedspor! ✌️",
  },
} as const;

/** Kurdish month names — Hawar convention. Flagged for native review. */
export const months = [
  "Rêbendan",
  "Reşemî",
  "Adar",
  "Avrêl",
  "Gulan",
  "Pûşper",
  "Tîrmeh",
  "Gelawêj",
  "Rezber",
  "Kewçêr",
  "Sermawez",
  "Berfanbar",
] as const;

/** Kurdish calendar counts from the fall of Nineveh, 612 BC. 2026 → 2638. */
export function kurdishYear(date = new Date()): number {
  return date.getFullYear() + 612;
}

export function kurdishDate(date = new Date()): string {
  return `${date.getDate()} ${months[date.getMonth()]} ${kurdishYear(date)}`;
}

export function isNewroz(date = new Date()): boolean {
  return date.getMonth() === 2 && date.getDate() === 21;
}

export type Hero21 = {
  id: string;
  name: string;
  date: string;
  line: string;
  era: "MÎT" | "KEVNAR" | "NAVERAST" | "NÛJEN";
  /** the words behind the glyph — click to hear them */
  quote: string[];
  source: string;
};

/**
 * BÎR — the twenty-one. One for each ray of the sun.
 * The arc runs myth → memory and closes, deliberately, in 1974.
 * Every quote is tabled in COPY_REVIEW.md with its attestation level.
 */
export const heroes: Hero21[] = [
  // MÎT
  {
    id: "kawa",
    name: "Kawayê Hesinkar",
    date: "mît",
    line: "Agirê wî bû Newroz.",
    era: "MÎT",
    quote: ["Agirê ku îro geş bû,", "êdî venamire."],
    source: "ji efsaneya Newrozê",
  },
  {
    id: "sahmaran",
    name: "Şahmaran",
    date: "mît",
    line: "Di bin erdê de, şahbanûya aqil.",
    era: "MÎT",
    quote: ["Ji mirovan wefa nayê —", "lê min dîsa jî sirra xwe da wan."],
    source: "ji çîroka Şahmaran",
  },
  {
    id: "rustem",
    name: "Rustemê Zal",
    date: "mît",
    line: "Mêrxasê çîrokên dengbêjan.",
    era: "MÎT",
    quote: ["Ez Rustemê Zal im —", "kurê Zal im, ji tovê Sam im."],
    source: "ji kilamên dengbêjan",
  },
  {
    id: "memuzin",
    name: "Mem û Zîn",
    date: "mît",
    line: "Du dil, yek çîrok, dîwarek di navberê de.",
    era: "MÎT",
    quote: ["Ger dê hebûya me îttîfaqek,", "Vêk ra bikira me înqiyadek."],
    source: "Mem û Zîn · 1695",
  },
  {
    id: "siyabend",
    name: "Siyabend û Xecê",
    date: "mît",
    line: "Evîna ku ji Sîpanê bilindtir bû.",
    era: "MÎT",
    quote: ["Sîpan bilind e —", "evîna me jê bilindtir."],
    source: "ji kilama Siyabend û Xecê",
  },
  {
    id: "derwes",
    name: "Derwêşê Evdî",
    date: "mît",
    line: "Siwarê êzîdî yê destanan.",
    era: "MÎT",
    quote: ["Soza Edûlê bes e —", "bila rê rêya mirinê be."],
    source: "ji destana Derwêşê Evdî",
  },
  // KEVNAR
  {
    id: "diyako",
    name: "Diyako",
    date: "~700 BZ",
    line: "Avakarê Mediyayê, heft sûrên Ekbatanê.",
    era: "KEVNAR",
    quote: ["Ji min re bajarekî ava bikin —", "ez ê dad bidim we."],
    source: "li gorî Herodot",
  },
  {
    id: "keyaksar",
    name: "Keyaksar",
    date: "612 BZ",
    line: "Nînewa ket — sala sifir dest pê kir.",
    era: "KEVNAR",
    quote: ["Bajarê mezin", "bû gir û kavil."],
    source: "Kronîka Babîlê · 612 BZ",
  },
  // NAVERAST
  {
    id: "selahedin",
    name: "Selahedînê Eyûbî",
    date: "1137",
    line: "Siltanê ji Tikrîtê.",
    era: "NAVERAST",
    quote: ["Xwe ji rijandina xwînê biparêze —", "xwîn tu carî ranazê."],
    source: "şîreta wî ya dawî, ji kurê wî re",
  },
  {
    id: "ciziri",
    name: "Melayê Cizîrî",
    date: "~1570",
    line: "Bavê dîwana kurdî.",
    era: "NAVERAST",
    quote: ["Ger tu dixwazî durrê şehwarê,", "were dîwana Melê carê."],
    source: "Dîwan",
  },
  {
    id: "teyran",
    name: "Feqiyê Teyran",
    date: "1590",
    line: "Ê ku bi teyran re diaxivî.",
    era: "NAVERAST",
    quote: ["Ey av û av —", "tu bê sekin û bê rawest î."],
    source: "Ey Av û Av",
  },
  {
    id: "lepzerin",
    name: "Xanê Lepzêrîn",
    date: "1609",
    line: "Berxwedana Dimdimê, destê zêrîn.",
    era: "NAVERAST",
    quote: ["Dimdim nayê dayîn —", "bila bibe gora me."],
    source: "ji Beyta Dimdimê",
  },
  {
    id: "xani",
    name: "Ehmedê Xanî",
    date: "1695",
    line: "Miletek bi pirtûkekê nivîsand.",
    era: "NAVERAST",
    quote: ["Da xelq nebêjitin ku Ekrad", "bê marîfet in, bê esl û bunyad."],
    source: "Mem û Zîn",
  },
  {
    id: "xanzad",
    name: "Xanzad",
    date: "~1590",
    line: "Şahbanûya Soranê.",
    era: "NAVERAST",
    quote: ["Li pêşiya leşkerê xwe siwar dibû —", "bi şûr û bi rûmet."],
    source: "li gorî Evliya Çelebî",
  },
  // NÛJEN
  {
    id: "bedirxan",
    name: "Mîr Bedirxan",
    date: "1847",
    line: "Mîrê dawî yê Botanê.",
    era: "NÛJEN",
    quote: ["Ez mîrê Botan im —", "xulamê tu kesî nînim."],
    source: "gotina jê tê veguhastin",
  },
  {
    id: "mesture",
    name: "Mestûre Erdelan",
    date: "1848",
    line: "Helbestvan, û dîroknivîsa yekem a Rojhilatê.",
    era: "NÛJEN",
    quote: ["Min dîrok nivîsand,", "da ku bîr nemire."],
    source: "di ruhê berhema wê de",
  },
  {
    id: "evdal",
    name: "Evdalê Zeynikê",
    date: "~1850",
    line: "Şahê dengbêjan.",
    era: "NÛJEN",
    quote: ["Werê qulingo —", "dengê xwe bide dengê min."],
    source: "ji kilama Qulingo",
  },
  {
    id: "sexseid",
    name: "Şêx Seîdê Pîran",
    date: "1925",
    line: "Bîra wî ya Amedê ye.",
    era: "NÛJEN",
    quote: [
      "Xema min nîne ku ez li darê bêm daliqandin —",
      "doza min ji bo dîn û gelê min e.",
    ],
    source: "gotinên dawî · Amed, 1925",
  },
  {
    id: "seyidriza",
    name: "Seyîd Riza",
    date: "1937",
    line: "Dêrsim — deng nehat birîn.",
    era: "NÛJEN",
    quote: ["Ez li ber we netewiyam —", "ew jî bila ji we re bibe derd."],
    source: "gotinên dawî · 1937",
  },
  {
    id: "qazi",
    name: "Qazî Mihemed",
    date: "1946",
    line: "Serokê Komara Mahabadê — çar çira.",
    era: "NÛJEN",
    quote: ["Ez ne ji sêdarê ditirsim —", "ez ji dubendiya we ditirsim."],
    source: "ji wesiyeta wî ya dawî · 1947",
  },
  {
    id: "leyla",
    name: "Leyla Qasim",
    date: "1974",
    line: "Navê dawî li ser rêzê — kulîlkek.",
    era: "NÛJEN",
    quote: ["Min bikujin!", "Bi mirina min hezaran kurd hişyar dibin."],
    source: "gotinên dawî · 1974",
  },
];

/**
 * The coda. Not one of the twenty-one — the twenty-one stand in the
 * river; the man who gave them letters stands at its mouth. Every word
 * of this mode is written in his alphabet.
 */
export const coda: Hero21 = {
  id: "celadet",
  name: "Celadet Alî Bedirxan",
  date: "1932",
  line: "Damezrînerê Xoybûnê, bavê Hawarê — ev rûpel bi tîpên wî dinivîse.",
  era: "NÛJEN",
  quote: [
    "Hawar dengê zanînê ye. Zanîn xwe nasîn e.",
    "Xwe nasîn ji me re rêya felat û xweşiyê vedike.",
  ],
  source: "Hawar, hejmar 1 · 1932",
};

/** intro line above the coda station */
export const codaIntro = "û tîpên ku hûn niha pê dixwînin —";

/**
 * At his side — Rewşen Bedirxan. Writer, teacher, the hand that kept
 * Hawar's flame burning after 1951.
 */
export const codaSide: Hero21 = {
  id: "rewsen",
  name: "Rewşen Bedirxan",
  date: "1909–1992",
  line: "Nivîskar û mamoste — piştî Celadet, dengê Hawarê ew bû.",
  era: "NÛJEN",
  quote: [
    "Piştî wî, min tîpên wî hînî zarokan kir —",
    "da ku deng nemire.",
  ],
  source: "ji jiyana wê",
};

/** connector between the two coda stations */
export const codaSideIntro = "û li kêleka wî —";
