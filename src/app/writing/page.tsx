import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SplitText } from "@/components/motion/SplitText"
import { Container } from "@/components/ui/Container"
import { Tag } from "@/components/ui/Tag"
import { formatDate, getNotes } from "@/lib/writing"

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on product management, PRDs, AI product teardowns and LLM evaluation.",
  alternates: { canonical: "/writing" },
}

export default function WritingPage() {
  const notes = getNotes()

  return (
    <main className="pt-36 pb-24 md:pt-44">
      <Container className="max-w-3xl">
        <SplitText text="Writing" className="text-5xl text-fg md:text-6xl" />
        <p className="mt-4 text-lg text-muted">PRDs, teardowns and notes on building AI products that work.</p>

        {notes.length === 0 ? (
          <p className="mt-16 text-muted">First notes are on the way.</p>
        ) : (
          <ul className="mt-16 divide-y divide-border border-y border-border">
            {notes.map((note) => (
              <li key={note.slug}>
                <Link href={`/writing/${note.slug}`} className="group block py-8">
                  <div className="flex items-center gap-3 font-mono text-xs text-muted">
                    <span>{formatDate(note.date)}</span>
                    <span>·</span>
                    <span>{note.readingMinutes} min read</span>
                    {note.status === "draft" && <span className="text-amber-500">Draft</span>}
                  </div>
                  <h2 className="mt-3 flex items-center gap-2 text-2xl text-fg">
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                      {note.title}
                    </span>
                    <ArrowRight className="size-5 -translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </h2>
                  <p className="mt-2 text-muted">{note.summary}</p>
                  {note.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {note.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </main>
  )
}
