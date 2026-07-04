import type { ReactNode } from "react";
import { Reveal } from "./motion";

/** Shared section shell: hairline top rule, mono index, display title. */
export function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-zinc-800/70">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <Reveal>
          <div className="mb-14 flex items-baseline gap-4 sm:mb-20">
            <span className="font-mono text-xs text-accent">{index}</span>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              {title}
            </h2>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
