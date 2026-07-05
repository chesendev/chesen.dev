/**
 * Every Kurmanji string in the mode lives here — and ONLY here.
 * This module ships exclusively inside the lazy mode chunk.
 * All copy is tabled in COPY_REVIEW.md for the owner's native pass.
 */

export const ui = {
  nav: [
    { href: "#work", label: "Xebat" },
    { href: "#bir", label: "Bîr" },
    { href: "#about", label: "Derbarê" },
    { href: "#now", label: "Niha" },
    { href: "#contact", label: "Têkilî" },
  ],
  skip: "Derbas be bo naverokê",
  hero: {
    kicker: "Chesen · Xwendekarê Endezyariya Nermalavê",
    positioning: "Karê bêzar didim gerokan — bi ewlehî.",
    supporting:
      "C#/.NET ji dil, Playwright ji pêwîstiyê. Otomasyona ku li ber webê rastîn radiweste — di rêya Amed→Texas de.",
    cta: "Xebatên bijartî",
    orPress: "an jî li her derê",
    availability: "Ji bo hevkariyê vekirî",
    location: "Amed ⇄ Huntsville, TX",
  },
  sections: {
    work: { index: "01", title: "Xebatên Bijartî" },
    bir: { index: "02", title: "Bîr", sub: "Ji mîtê heta bîrê." },
    about: { index: "03", title: "Derbarê" },
    now: { index: "04", title: "Niha" },
    contact: { index: "05", title: "Têkilî" },
  },
  facets: { problem: "Pirsgirêk", approach: "Rê", learned: "Ders" },
  about: {
    paragraphs: [
      "Ez xwendekarê endezyariya nermalavê me, di bernameyeke du-diplomayî de: Zanîngeha Firatê, paşê salên Texasê li SHSU. Armanc sade ye — bingehên C#/.NET, her roj; ne peyvên CVyê.",
      "Beriya rêza yekem a C#, min marqeyeke medyaya felsefeyê ava kir — nêzîkî 600 hezar şopîner — û vîdyoyên profesyonel çêkirin. Ew ne rêwîtiyeke vala bû: ji ber wê otomasyona min bi zewq derdikeve û demoyên min çîrokan dibêjin.",
    ],
    cirokTitle: "Çîrok",
    cirok: [
      "Lo lo…",
      "Ez ji Amedê me.",
      "Kevirên reş ên Sur, ava Dîcleyê, dengê hewşê.",
      "Her tişt ji wir dest pê dike — û her tişt vedigere wir.",
    ],
    languagesTitle: "Ziman",
    languages: [
      { name: "Kurdî", level: "zikmakî" },
      { name: "Tirkî", level: "zikmakî" },
      { name: "Îngilîzî", level: "profesyonel" },
    ],
    toolboxTitle: "Sindoqa Amûran",
    logTitle: "Tomar",
    log: [
      { year: "2026", entry: "ODTÜ Blockchain Days — beşdar" },
      { year: "2026", entry: "Çelenja SUI Move ya 21-Rojî — didome" },
      { year: "2026", entry: "Çelenja Teknîkî ya C# — didome" },
      { year: "2025", entry: "DevFest Stenbol — beşdar" },
      { year: "····", entry: "Diplomaya ducarî, Firat ⇄ SHSU — didome" },
    ],
  },
  now: [
    "Di kûrahiya C#/.NET de — amûrên otomasyonê ku ji peyva “script” mezintir dibin.",
    "Temrîna birêkûpêk: Exercism, şaxa C#, her roj.",
    "Çelenja SUI Move ya 21-rojî didome.",
    "Li ekosîstema Avalanche vedikolim — dokuman, konsensus, ceribandinên biçûk.",
    "Amadekariya salên Texasê li SHSU.",
  ],
  contact: {
    headline: "Silav",
    headlineAccent: "bike.",
    lede: "Ji bo otomasyon, algorîtma û ceribandinên Web3 vekirî me. Binivîse — her peyamê dixwînim.",
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
    newrozToast: "Newroz pîroz be.",
    amedsporChant: "Her bijî Amedspor!",
    verseTitle: "Mem û Zîn · 1695",
    verse: ["Ger dê hebûya me îttîfaqek,", "Vêk ra bikira me înqiyadek."],
    verseSign: "— Ehmedê Xanî",
  },
} as const;

export const projects = [
  {
    index: "01",
    name: "Otomasyona Kirînê ya Amazonê",
    stack: ".NET · Playwright",
    problem:
      "Kirînên dubare, li ser hesabên cuda — DOMên ku her gav diguherin, danişînên xayin, gavên ku bi dengê bêdeng têk diçin.",
    approach:
      "Herikîn wek makîneya rewşan hate modelkirin; Playwright gerokên rastîn dimeşîne. Her gav idempotent e — têkçûn ji serî dest pê nake, didome.",
    learned:
      "DOM APIyeke dijmin e. Selektor peyman in ku aliyê din qet îmze nekiriye — bi parastinê binivîse.",
  },
  {
    index: "02",
    name: "Bota Bilêtan",
    stack: "Python · Playwright",
    problem:
      "Bilêtên daxwazbar di çirkeyan de diqedin — û dor li pişt Cloudflare ye, ku gerokên headless dadiqurtîne.",
    approach:
      "Dev ji pêşbaziya veşartinê hate berdan. Geroka rastîn, danişîna domdar, lezeke mirovane — danişîn wek mirov xuya dike, ji ber ku bi piranî mirov e.",
    learned:
      "Tu bi veşartinê bi ser nakevî. Tu bi ser dikevî dema ku ji wî mirovî neyê cudakirin ê ku tu ji bo wî otomasyonê dikî.",
  },
  {
    index: "03",
    name: "FinQuest",
    stack: "Hackathon · AgeSA Code Night",
    problem:
      "Naveroka perwerdeya aborî wek sebzeya tehl e — kes naxwe, nemaze ciwanên ku herî zêde jê hewce ne.",
    approach:
      "Mufredat bû lîstik: quest û streak. Demoyeke xebitî, bi tîmekê, di şevekê de.",
    learned:
      "Sînordarkirin çek e. Taybetiya ku nîvê şevê tê birîn, sedema ku demo sibehê dixebite.",
  },
] as const;

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
};

/**
 * BÎR — the twenty-one. One for each ray of the sun.
 * The arc runs myth → memory and closes, deliberately, in 1974.
 */
export const heroes: Hero21[] = [
  // MÎT
  {
    id: "kawa",
    name: "Kawayê Hesinkar",
    date: "mît",
    line: "Agirê wî bû Newroz.",
    era: "MÎT",
  },
  {
    id: "sahmaran",
    name: "Şahmaran",
    date: "mît",
    line: "Di bin erdê de, şahbanûya aqil.",
    era: "MÎT",
  },
  {
    id: "rustem",
    name: "Rustemê Zal",
    date: "mît",
    line: "Mêrxasê çîrokên dengbêjan.",
    era: "MÎT",
  },
  {
    id: "memuzin",
    name: "Mem û Zîn",
    date: "mît",
    line: "Du dil, yek çîrok, dîwarek di navberê de.",
    era: "MÎT",
  },
  {
    id: "siyabend",
    name: "Siyabend û Xecê",
    date: "mît",
    line: "Evîna ku ji Sîpanê bilindtir bû.",
    era: "MÎT",
  },
  {
    id: "derwes",
    name: "Derwêşê Evdî",
    date: "mît",
    line: "Siwarê êzîdî yê destanan.",
    era: "MÎT",
  },
  // KEVNAR
  {
    id: "diyako",
    name: "Diyako",
    date: "~700 BZ",
    line: "Avakarê Mediyayê, heft sûrên Ekbatanê.",
    era: "KEVNAR",
  },
  {
    id: "keyaksar",
    name: "Keyaksar",
    date: "612 BZ",
    line: "Nînewa ket — sala sifir dest pê kir.",
    era: "KEVNAR",
  },
  // NAVERAST
  {
    id: "selahedin",
    name: "Selahedînê Eyûbî",
    date: "1137",
    line: "Siltanê ji Tikrîtê.",
    era: "NAVERAST",
  },
  {
    id: "ciziri",
    name: "Melayê Cizîrî",
    date: "~1570",
    line: "Bavê dîwana kurdî.",
    era: "NAVERAST",
  },
  {
    id: "teyran",
    name: "Feqiyê Teyran",
    date: "1590",
    line: "Ê ku bi teyran re diaxivî.",
    era: "NAVERAST",
  },
  {
    id: "lepzerin",
    name: "Xanê Lepzêrîn",
    date: "1609",
    line: "Berxwedana Dimdimê, destê zêrîn.",
    era: "NAVERAST",
  },
  {
    id: "xani",
    name: "Ehmedê Xanî",
    date: "1695",
    line: "Miletek bi pirtûkekê nivîsand.",
    era: "NAVERAST",
  },
  {
    id: "xanzad",
    name: "Xanzad",
    date: "~1590",
    line: "Şahbanûya Soranê.",
    era: "NAVERAST",
  },
  // NÛJEN
  {
    id: "bedirxan",
    name: "Mîr Bedirxan",
    date: "1847",
    line: "Mîrê dawî yê Botanê.",
    era: "NÛJEN",
  },
  {
    id: "mesture",
    name: "Mestûre Erdelan",
    date: "1848",
    line: "Helbestvan, û dîroknivîsa yekem a Rojhilatê.",
    era: "NÛJEN",
  },
  {
    id: "evdal",
    name: "Evdalê Zeynikê",
    date: "~1850",
    line: "Şahê dengbêjan.",
    era: "NÛJEN",
  },
  {
    id: "sexseid",
    name: "Şêx Seîdê Pîran",
    date: "1925",
    line: "Bîra wî ya Amedê ye.",
    era: "NÛJEN",
  },
  {
    id: "seyidriza",
    name: "Seyîd Riza",
    date: "1937",
    line: "Dêrsim — deng nehat birîn.",
    era: "NÛJEN",
  },
  {
    id: "qazi",
    name: "Qazî Mihemed",
    date: "1946",
    line: "Serokê Komara Mahabadê — çar çira.",
    era: "NÛJEN",
  },
  {
    id: "leyla",
    name: "Leyla Qasim",
    date: "1974",
    line: "Navê dawî li ser rêzê — kulîlkek.",
    era: "NÛJEN",
  },
];
