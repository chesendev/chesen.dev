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
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 sm:py-28 lg:border-x lg:border-zinc-800/40">
        <Reveal>
          <div className="mb-10 flex items-baseline gap-4 sm:mb-14">
            <span className="font-mono text-xs text-accent">{index}</span>
            <h2 className="font-heading text-2xl tracking-[-0.03em] sm:text-3xl">
              {title}
            </h2>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
