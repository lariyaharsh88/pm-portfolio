export function ogCard({
  kicker,
  title,
  detail,
}: {
  kicker: string
  title: string
  detail: string
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#09090b",
        color: "#f4f4f5",
        padding: "72px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ width: "14px", height: "14px", borderRadius: "999px", background: "#5b5bf7" }} />
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#a5a5fb", textTransform: "uppercase" }}>
          {kicker}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", fontSize: 68, lineHeight: 1.05, letterSpacing: -1.5, maxWidth: "980px" }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 28, lineHeight: 1.35, color: "#a0a0ab", maxWidth: "900px" }}>
          {detail}
        </div>
      </div>
    </div>
  )
}

export function clip(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim()
  if (clean.length <= max) return clean
  return `${clean.slice(0, max - 1).trimEnd()}…`
}
