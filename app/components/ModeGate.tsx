"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

/**
 * Renders the public site (server-rendered children) unless the alternate
 * display mode is active on <html>. The mode tree is a separate lazy chunk —
 * it costs nothing until someone who knows the door walks through it.
 */
const KurdiSite = dynamic(() => import("../kurdi/mode/KurdiSite"), {
  ssr: false,
  loading: () => null, // #mode-veil covers this window via CSS
});

export function ModeGate({
  children,
  view = "home",
}: {
  children: ReactNode;
  view?: "home" | "not-found";
}) {
  const [mode, setMode] = useState<"public" | "kurdi" | null>(null);

  useEffect(() => {
    setMode(
      document.documentElement.dataset.mode === "kurdi" ? "kurdi" : "public",
    );
  }, []);

  if (mode === "kurdi") return <KurdiSite view={view} />;
  return <>{children}</>;
}
