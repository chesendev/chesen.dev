import { projects } from "../../content/site";
import { Reveal } from "./motion";
import { Section } from "./Section";

const FACETS = [
  { key: "problem", label: "Problem" },
  { key: "approach", label: "Approach" },
  { key: "learned", label: "Learned" },
] as const;

export function Work() {
  return (
    <Section id="work" index="01" title="Selected Work">
      <div className="space-y-20 sm:space-y-24">
        {projects.map((project, i) => (
          <Reveal key={project.index} delay={i * 0.05}>
            <article className="group grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              <div>
                <p className="font-mono text-xs text-zinc-500">
                  {project.index} · {project.stack}
                </p>
                <h3 className="mt-3 font-display text-3xl leading-tight tracking-tight sm:text-4xl">
                  <span className="bg-gradient-to-r from-accent to-accent bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                    {project.name}
                  </span>
                </h3>
                {project.link && (
                  <a
                    href={project.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-zinc-500 transition-colors hover:text-accent"
                  >
                    {project.link.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>

              <dl className="space-y-6">
                {FACETS.map((facet) => (
                  <div key={facet.key}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                      {facet.label}
                    </dt>
                    <dd className="mt-1.5 max-w-prose text-[15px] leading-relaxed text-zinc-300">
                      {project[facet.key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
