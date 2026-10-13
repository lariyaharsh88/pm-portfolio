import { readFile } from "node:fs/promises"
import path from "node:path"
import { ImageResponse } from "next/og"
import { site, siteUrl } from "@/lib/site"

export const alt = "Harsh Lariya, Product Manager: data platforms and applied AI"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const stats = [
  { value: "78M+", label: "records processed" },
  { value: "600+", label: "clients served" },
  { value: "300K+", label: "pages indexed" },
  { value: "3", label: "AI products shipped" },
] as const

export default async function OpenGraphImage() {
  const headshot = await readFile(path.join(process.cwd(), "public", "me-headshot.jpg"))
  const src = `data:image/jpeg;base64,${headshot.toString("base64")}`
  const domain = siteUrl.includes("localhost")
    ? site.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
    : siteUrl.replace(/^https?:\/\//, "")

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#09090f",
        color: "#f4f4f5",
        padding: "64px 72px",
        backgroundImage:
          "radial-gradient(circle at 85% 20%, rgba(91,91,247,0.45), transparent 45%), radial-gradient(circle at 0% 100%, rgba(167,139,250,0.25), transparent 40%)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#a5a5fb",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#34d399" }} />
            Open to PM / AI PM roles
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", marginTop: 6, fontSize: 32, color: "#c7c7d1" }}>{site.role}</div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 26, lineHeight: 1.35, color: "#9a9aa8", maxWidth: 640 }}>
            {site.headline}
          </div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "14px 20px",
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <div style={{ display: "flex", fontSize: 32, fontWeight: 700 }}>{stat.value}</div>
              <div style={{ display: "flex", fontSize: 17, color: "#9a9aa8" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginLeft: 40 }}>
        <div style={{ display: "flex", padding: 8, borderRadius: 999, background: "linear-gradient(135deg, #5b5bf7, #a78bfa)" }}>
          <img
            src={src}
            width={300}
            height={300}
            alt=""
            style={{ width: 300, height: 300, borderRadius: 150, objectFit: "cover", objectPosition: "center 18%" }}
          />
        </div>
        <div style={{ display: "flex", marginTop: 26, fontSize: 20, color: "#9a9aa8" }}>{domain}</div>
      </div>
    </div>,
    { ...size },
  )
}
