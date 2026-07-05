import type { Metadata } from "next";
import { KurdiGate } from "./KurdiGate";

// Deliberately unremarkable. This route is a door, not a page.
export const metadata: Metadata = {
  title: "chesen.dev",
  description: "chesen.dev",
  robots: { index: false, follow: false },
  openGraph: { title: "chesen.dev", description: "chesen.dev" },
};

export default function KurdiPage() {
  return <KurdiGate />;
}
