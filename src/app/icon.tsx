import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #5b5bf7, #a78bfa)",
        color: "white",
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: -0.6,
        borderRadius: 8,
      }}
    >
      HL
    </div>,
    { ...size },
  )
}
