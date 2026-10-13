import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

export type Note = {
  title: string
  slug: string
  date: string
  summary: string
  tags: string[]
  status: "published" | "draft"
  cover?: string
  readingMinutes: number
  content: string
}

const DIRECTORY = path.join(process.cwd(), "src/content/writing")

function readNote(fileName: string): Note {
  const source = fs.readFileSync(path.join(DIRECTORY, fileName), "utf8")
  const { data, content } = matter(source)
  for (const key of ["title", "slug", "date", "summary"]) {
    if (typeof data[key] !== "string") throw new Error(`${fileName}: frontmatter "${key}" must be a string`)
  }
  if (data.status !== "published" && data.status !== "draft") {
    throw new Error(`${fileName}: frontmatter "status" must be "published" or "draft"`)
  }
  const words = content.split(/\s+/).filter(Boolean).length
  return {
    title: data.title,
    slug: data.slug,
    date: data.date,
    summary: data.summary,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    status: data.status,
    cover: typeof data.cover === "string" ? data.cover : undefined,
    readingMinutes: Math.max(1, Math.round(words / 220)),
    content,
  }
}

const showDrafts = process.env.NODE_ENV === "development"

export function getNotes(): Note[] {
  if (!fs.existsSync(DIRECTORY)) return []
  return fs
    .readdirSync(DIRECTORY)
    .filter((file) => file.endsWith(".mdx"))
    .map(readNote)
    .filter((note) => showDrafts || note.status === "published")
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getNote(slug: string): Note | null {
  return getNotes().find((note) => note.slug === slug) ?? null
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}
