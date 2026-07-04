import { ImageResponse } from "next/og";
import { profile } from "../content/site";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — Software Engineer`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          padding: 72,
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#71717a",
            fontSize: 24,
            letterSpacing: 6,
          }}
        >
          <span>{profile.domain.toUpperCase()}</span>
          <span style={{ color: "#fb923c" }}>●</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, color: "#f4f4f5" }}>
            {profile.firstName}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontStyle: "italic",
              color: "#fb923c",
            }}
          >
            {profile.lastName}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <span style={{ color: "#d4d4d8", fontSize: 30, maxWidth: 760 }}>
            {profile.positioning}
          </span>
          <span style={{ color: "#71717a", fontSize: 22 }}>
            C# / .NET · Playwright
          </span>
        </div>
      </div>
    ),
    size,
  );
}
