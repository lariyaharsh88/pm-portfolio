import { readFile } from "node:fs/promises"
import path from "node:path"
import { ImageResponse } from "next/og"
import { site } from "@/lib/site"

export const alt = "Harsh Lariya, product manager"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpenGraphImage() {
  const headshot = await readFile(path.join(process.cwd(), "public", "me-headshot.jpg"))
  const src = `data:image/jpeg;base64,${headshot.toString("base64")}`

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 64,
        background: "#09090b",
        color: "#f4f4f5",
        padding: "72px",
      }}
    >
      <img
        src={src}
        width={280}
        height={280}
        alt=""
        style={{
          width: 280,
          height: 280,
          borderRadius: 140,
          objectFit: "cover",
          objectPosition: "center 18%",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 700 }}>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            color: "#a5a5fb",
            textTransform: "uppercase",
          }}
        >
          {site.name}
        </div>
        <div style={{ display: "flex", fontSize: 52, lineHeight: 1.08, letterSpacing: -1.2 }}>
          {site.headline}
        </div>
      </div>
    </div>,
    { ...size },
  )
}
