import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.ogAlt;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at top left, rgba(15, 118, 110, 0.24), transparent 28%), radial-gradient(circle at 85% 12%, rgba(249, 115, 22, 0.22), transparent 24%), linear-gradient(180deg, #f7f0e2 0%, #fffdf8 100%)",
          color: "#142033",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 36,
            borderRadius: 42,
            border: "1px solid rgba(20, 32, 51, 0.1)",
            background: "rgba(255, 255, 255, 0.76)",
            boxShadow: "0 28px 90px rgba(20, 32, 51, 0.12)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "72px 84px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontSize: 24,
                textTransform: "uppercase",
                letterSpacing: "0.32em",
                color: "#0f766e",
              }}
            >
              <span>Alex</span>
              <span style={{ color: "rgba(20, 32, 51, 0.28)" }}>Portfolio</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: 16,
                fontSize: 24,
                color: "rgba(20, 32, 51, 0.64)",
              }}
            >
              <span>Projects</span>
              <span>Testimonials</span>
              <span>Contact</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 850, gap: 24 }}>
            <div
              style={{
                fontSize: 78,
                lineHeight: 1,
                fontWeight: 700,
                letterSpacing: "-0.06em",
              }}
            >
              Building interfaces that feel calm at speed.
            </div>
            <div
              style={{
                fontSize: 32,
                lineHeight: 1.4,
                color: "rgba(20, 32, 51, 0.7)",
              }}
            >
              Accessible frontend systems, resilient full-stack architecture, and product
              engineering with a sharper bar for performance.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 18,
              flexWrap: "wrap",
            }}
          >
            {["Accessible UI systems", "Performance budgets", "Cross-functional delivery"].map(
              (label) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "16px 22px",
                    borderRadius: 999,
                    border: "1px solid rgba(20, 32, 51, 0.1)",
                    background: "rgba(255, 255, 255, 0.75)",
                    fontSize: 24,
                    color: "rgba(20, 32, 51, 0.84)",
                  }}
                >
                  {label}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
