import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { extractHeadings } from "@/lib/slug"

export type CaseMetric = {
  value: string
  label: string
}

export type CaseStatus = "published" | "draft"

export type CaseHeading = {
  id: string
  text: string
}

export type CaseStudy = {
  title: string
  slug: string
  summary: string
  role: string
  company: string
  timeline: string
  team: string
  tags: string[]
  metrics: CaseMetric[]
  accent: string
  cover: string
  status: CaseStatus
  content: string
  headings: CaseHeading[]
  hasTodo: boolean
}

const publishedOrder = ["lead-management-platform", "content-growth-platform", "rankflowhq"]

export type CaseStudyMeta = Omit<CaseStudy, "content" | "hasTodo">

const DIRECTORY = path.join(process.cwd(), "src/content/case-studies")

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function readString(data: Record<string, unknown>, key: string, file: string): string {
  const value = data[key]
  if (typeof value !== "string") {
    throw new Error(`${file}: frontmatter "${key}" must be a string`)
  }
  return value
}

function readTags(value: unknown, file: string): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`${file}: frontmatter "tags" must be a list of strings`)
  }
  return value
}

function readMetrics(value: unknown, file: string): CaseMetric[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${file}: frontmatter "metrics" must be a non-empty list`)
  }

  return value.map((item, index) => {
    if (
      !isRecord(item) ||
      typeof item.value !== "string" ||
      typeof item.label !== "string"
    ) {
      throw new Error(`${file}: metrics[${index}] needs string value and label`)
    }
    return { value: item.value, label: item.label }
  })
}

function readStatus(value: unknown, file: string): CaseStatus {
  if (value !== "published" && value !== "draft") {
    throw new Error(`${file}: frontmatter "status" must be "published" or "draft"`)
  }
  return value
}

function readStudy(fileName: string): CaseStudy {
  const filePath = path.join(DIRECTORY, fileName)
  const source = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(source)

  if (!isRecord(data)) {
    throw new Error(`${fileName}: frontmatter must be a map`)
  }

  const accent = readString(data, "accent", fileName)
  if (!/^#[0-9a-fA-F]{6}$/.test(accent)) {
    throw new Error(`${fileName}: frontmatter "accent" must be a 6-digit hex color`)
  }

  return {
    title: readString(data, "title", fileName),
    slug: readString(data, "slug", fileName),
    summary: readString(data, "summary", fileName),
    role: readString(data, "role", fileName),
    company: readString(data, "company", fileName),
    timeline: readString(data, "timeline", fileName),
    team: readString(data, "team", fileName),
    tags: readTags(data.tags, fileName),
    metrics: readMetrics(data.metrics, fileName),
    accent,
    cover: readString(data, "cover", fileName),
    status: readStatus(data.status, fileName),
    content,
    headings: extractHeadings(content),
    hasTodo: source.includes("TODO"),
  }
}

export function getCaseStudies(): CaseStudy[] {
  if (!fs.existsSync(DIRECTORY)) return []

  const studies = fs
    .readdirSync(DIRECTORY)
    .filter((file) => file.endsWith(".mdx"))
    .sort((a, b) => a.localeCompare(b))
    .map(readStudy)

  const seen = new Set<string>()
  for (const study of studies) {
    if (seen.has(study.slug)) {
      throw new Error(`Duplicate case study slug "${study.slug}"`)
    }
    seen.add(study.slug)
  }

  return studies
}

function publishedRank(slug: string): number {
  const index = publishedOrder.indexOf(slug)
  return index === -1 ? publishedOrder.length : index
}

export function getPublishedCaseStudies(): CaseStudy[] {
  return getCaseStudies()
    .filter((study) => study.status === "published")
    .sort((a, b) => publishedRank(a.slug) - publishedRank(b.slug) || a.slug.localeCompare(b.slug))
}

export function getCaseStudy(slug: string): CaseStudy | null {
  return getCaseStudies().find((study) => study.slug === slug) ?? null
}

export function toCaseMeta(study: CaseStudy): CaseStudyMeta {
  return {
    title: study.title,
    slug: study.slug,
    summary: study.summary,
    role: study.role,
    company: study.company,
    timeline: study.timeline,
    team: study.team,
    tags: study.tags,
    metrics: study.metrics,
    accent: study.accent,
    cover: study.cover,
    status: study.status,
    headings: study.headings,
  }
}

export function getNextCaseStudy(slug: string): CaseStudyMeta | null {
  const published = getPublishedCaseStudies()
  const index = published.findIndex((study) => study.slug === slug)
  if (index >= 0) {
    const next = published[index + 1]
    return next ? toCaseMeta(next) : null
  }
  const first = published[0]
  return first ? toCaseMeta(first) : null
}
