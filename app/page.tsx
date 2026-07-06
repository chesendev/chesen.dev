import { About } from "./components/About";
import { CommandPalette } from "./components/CommandPalette";
import { Contact } from "./components/Contact";
import { Fx } from "./components/Fx";
import { Hero } from "./components/Hero";
import { ModeGate } from "./components/ModeGate";
import { Nav } from "./components/Nav";
import { Now } from "./components/Now";

export default function Home() {
  return (
    <ModeGate>
      <div id="site-root">
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-accent focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
        >
          Skip to content
        </a>
        <Nav />
        <main>
          <Hero />
          <About />
          <Now />
          <Contact />
        </main>
        <CommandPalette />
        <Fx />
      </div>
    </ModeGate>
  );
}
