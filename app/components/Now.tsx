import { now } from "../../content/site";
import { Reveal } from "./motion";
import { Section } from "./Section";

export function Now() {
  return (
    <Section id="now" index="03" title="Now">
      <Reveal>
        <ul className="max-w-2xl space-y-4">
          {now.map((item) => (
            <li key={item} className="flex gap-4">
              <span
                aria-hidden="true"
                className="mt-[3px] shrink-0 font-mono text-xs text-accent"
              >
                ▸
              </span>
              <p className="text-[15px] leading-relaxed text-zinc-300 sm:text-base">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
