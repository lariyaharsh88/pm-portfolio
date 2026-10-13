export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function extractHeadings(markdown: string): { id: string; text: string }[] {
  const withoutFences = markdown.replace(/```[\s\S]*?```/g, "")
  const headings: { id: string; text: string }[] = []

  for (const match of withoutFences.matchAll(/^##\s+(.+)$/gm)) {
    const text = match[1].replace(/[*_`]/g, "").trim()
    const id = slugify(text)
    if (!id) continue
    headings.push({ id, text })
  }

  return headings
}
