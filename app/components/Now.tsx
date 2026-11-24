import { now } from "../../content/site";

/**
 * The hero's "currently" panel. Keeps id="now" so the nav and ⌘K
 * links to #now still land here.
 */
export function NowCard() {
  return (
    <aside
      id="now"
      aria-labelledby="now-title"
      className="scroll-mt-24 border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md sm:p-7"
    >
      <h2
        id="now-title"
        className="mb-5 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-accent"
      >
        <span aria-hidden="true" className="h-px w-5 bg-accent/60" />
        Now
      </h2>
      <ul className="space-y-3.5">
        {now.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-relaxed text-zinc-300"
          >
            <span
              aria-hidden="true"
              className="mt-[3px] shrink-0 font-mono text-[11px] text-accent"
            >
              ▸
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
