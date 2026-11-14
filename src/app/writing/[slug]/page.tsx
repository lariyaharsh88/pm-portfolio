import type { Metadata } from "next"
import { pageMetadata } from "@/lib/site"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { mdxComponents } from "@/components/mdx/mdx-components"
import { Container } from "@/components/ui/Container"
import { remarkStripMdxComments } from "@/lib/remark-sections"
import { products } from "@/content/products"
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
    ...pageMetadata({ title: note.title, description: note.summary, path: `/writing/${note.slug}` }),
  }
}

export default async function NotePage({ params }: Props) {
  const note = getNote((await params).slug)
  if (!note) notFound()
  // Keep the site-wide product order (by impact), not the order listed in the note.
  const related = products.filter((product) => note.related.includes(product.slug))

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
        {note.cover && (
          <Image
            src={note.cover}
            alt=""
            width={1600}
            height={840}
            unoptimized
            priority
            className="mt-10 w-full rounded-2xl border border-border"
          />
        )}
        <article className="prose case-prose mt-12 min-w-0">
          <MDXRemote
            source={note.content}
            components={mdxComponents}
            options={{ blockJS: false, mdxOptions: { remarkPlugins: [remarkGfm, remarkStripMdxComments] } }}
          />
        </article>
        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-10">
            <p className="font-mono text-xs tracking-[0.14em] text-muted uppercase">Products in this post</p>
            <ul className="mt-6 grid gap-4">
              {related.map((product) => (
                <li key={product.slug} className="rounded-2xl border border-border bg-bg-elevated p-5">
                  <p className="text-lg font-medium text-fg">{product.name}</p>
                  <p className="mt-1 font-mono text-sm text-accent-ink">{product.impact}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={product.caseStudy}
                      className="inline-flex items-center rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
                    >
                      View case study →
                    </Link>
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-accent/50 hover:bg-accent-soft"
                    >
                      Visit website ↗
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </main>
  )
}
