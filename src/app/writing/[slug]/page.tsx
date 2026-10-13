import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { mdxComponents } from "@/components/mdx/mdx-components"
import { Container } from "@/components/ui/Container"
import { remarkStripMdxComments } from "@/lib/remark-sections"
import { formatDate, getNote, getNotes } from "@/lib/writing"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  const slugs = getNotes().map((note) => ({ slug: note.slug }))
  // Cache Components needs at least one param; a placeholder renders a 404 until a note is published.
  return slugs.length > 0 ? slugs : [{ slug: "coming-soon" }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = getNote((await params).slug)
  if (!note) return { title: "Writing" }
  return {
    title: note.title,
    description: note.summary,
    alternates: { canonical: `/writing/${note.slug}` },
  }
}

export default async function NotePage({ params }: Props) {
  const note = getNote((await params).slug)
  if (!note) notFound()

  return (
    <main className="pt-36 pb-24 md:pt-44">
      <Container className="max-w-2xl">
        <Link href="/writing" className="text-sm text-muted transition-colors hover:text-fg">
          ← All writing
        </Link>
        <p className="mt-10 font-mono text-xs text-muted">
          {formatDate(note.date)} · {note.readingMinutes} min read
        </p>
        <h1 className="mt-3 text-4xl text-balance text-fg md:text-5xl">{note.title}</h1>
        <p className="mt-4 text-lg text-muted">{note.summary}</p>
        <article className="prose case-prose mt-12 min-w-0">
          <MDXRemote
            source={note.content}
            components={mdxComponents}
            options={{ blockJS: false, mdxOptions: { remarkPlugins: [remarkGfm, remarkStripMdxComments] } }}
          />
        </article>
      </Container>
    </main>
  )
}
