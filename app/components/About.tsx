import { about } from "../../content/site";
import { Reveal } from "./motion";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" index="02" title="About">
      <div className="grid gap-14 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <Reveal>
          <div className="space-y-6">
            {about.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="max-w-prose text-[15px] leading-relaxed text-zinc-300 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-10 font-mono text-sm">
            <div>
              <h3 className="mb-3 text-[10px] uppercase tracking-[0.25em] text-accent">
                Languages
              </h3>
              <ul className="space-y-1.5">
                {about.languages.map((lang) => (
                  <li
                    key={lang.name}
                    className="flex items-baseline justify-between gap-4 text-zinc-300"
                  >
                    <span>{lang.name}</span>
                    <span className="text-xs text-zinc-500">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-[10px] uppercase tracking-[0.25em] text-accent">
                Toolbox
              </h3>
              <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-zinc-300">
                {about.toolbox.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-[10px] uppercase tracking-[0.25em] text-accent">
                Log
              </h3>
              <ul className="space-y-1.5">
                {about.log.map((item) => (
                  <li
                    key={item.entry}
                    className="flex items-baseline gap-4 text-zinc-300"
                  >
                    <span className="shrink-0 text-xs text-zinc-500">
                      {item.year}
                    </span>
                    <span>{item.entry}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
