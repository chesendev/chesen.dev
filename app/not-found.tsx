import Link from "next/link";
import { ModeGate } from "./components/ModeGate";

export default function NotFound() {
  return (
    <ModeGate view="not-found">
      <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col justify-center px-6 sm:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          404
        </p>
        <h1 className="mt-6 font-display text-4xl tracking-tight sm:text-6xl">
          This route doesn&apos;t exist.
        </h1>
        <p className="mt-4 max-w-md text-zinc-400">
          Whatever was here either moved or never was.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex w-fit items-center gap-3 border border-accent/60 px-6 py-3 font-mono text-sm transition-colors hover:bg-accent hover:text-background"
        >
          ← Back home
        </Link>
      </main>
    </ModeGate>
  );
}
