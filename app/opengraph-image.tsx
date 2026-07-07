import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Multi Rec Studio — Studio Podcast Premium à Laval";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
            top: -100,
            left: -100,
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            background: "rgba(37,99,235,0.15)",
            border: "1px solid rgba(37,99,235,0.4)",
            borderRadius: 999,
            padding: "8px 24px",
            marginBottom: 32,
          }}
        >
          <span style={{ color: "#60a5fa", fontSize: 18, fontWeight: 700, letterSpacing: 3 }}>
            LAVAL · QUÉBEC · 7J/7 · 10H–22H
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            color: "#ffffff",
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: -2,
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Multi Rec Studio
        </div>

        {/* Subtitle */}
        <div
          style={{
            color: "#94a3b8",
            fontSize: 28,
            fontWeight: 500,
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          Studio Podcast &amp; Enregistrement Premium
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 16 }}>
          {["Enregistrement 4K", "Son HD", "3 Studios", "Réservation en ligne"].map((label) => (
            <div
              key={label}
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                padding: "10px 20px",
                color: "#e2e8f0",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            color: "#475569",
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: 1,
          }}
        >
          multirecstudio.com
        </div>
      </div>
    ),
    { ...size }
  );
}
