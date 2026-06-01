import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 80px",
          background: "linear-gradient(135deg, #1a1230 0%, #2d1f4e 50%, #1a1230 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#c4b5fd"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span style={{ fontSize: 28, fontWeight: 600, color: "#e9e0ff" }}>
            {siteConfig.name}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 900,
          }}
        >
          Know your tenant{" "}
          <span style={{ color: "#c4b5fd" }}>before</span> they sign.
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 24,
            color: "rgba(255,255,255,0.65)",
            maxWidth: 800,
            lineHeight: 1.5,
          }}
        >
          AI tenant screening for U.S. landlords — identity, employment, banking,
          and social verification in one report.
        </div>
      </div>
    ),
    { ...size },
  );
}
