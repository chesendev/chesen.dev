import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Milestones } from "./components/Milestones";
import { Nav } from "./components/Nav";
import { ScrollProgress } from "./components/ScrollProgress";
import { Skills } from "./components/Skills";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main className="relative">
        <Hero />
        <Skills />
        <Milestones />
        <Footer />
      </main>
    </>
  );
}
