import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/Container"
import { Tag } from "@/components/ui/Tag"
import { products } from "@/content/products"
import type { CaseStudyMeta } from "@/lib/case-studies"
import { cn } from "@/lib/cn"

export function WorkGrid({ studies }: { studies: CaseStudyMeta[] }) {
  return (
    <main className="pb-24">
      <Container>
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Work</p>
        <h1 className="mt-3 max-w-xl text-4xl text-fg md:text-6xl">Case studies</h1>
        <p className="mt-4 max-w-xl text-lg text-muted">The write-ups behind the numbers.</p>
        {studies.length === 0 ? (
          <p className="mt-16 text-muted">Published case studies will land here.</p>
        ) : (
          <div className={cn("mt-12 grid gap-6", studies.length > 1 && "md:grid-cols-2")}>
            {studies.map((study, index) => (
              <WorkCard key={study.slug} study={study} priority={index === 0} />
            ))}
          </div>
        )}
      </Container>
    </main>
  )
}

function WorkCard({ study, priority = false }: { study: CaseStudyMeta; priority?: boolean }) {
  const href = `/work/${study.slug}`
  const product = products.find((item) => item.caseStudy === href)
  // The whole card opens the case study (stretched link); the buttons sit above it so both stay clickable.
  return (
    <article
      data-cursor="view"
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border focus-within:outline focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-accent-ink"
      style={{
        background: `linear-gradient(180deg, color-mix(in srgb, ${study.accent} 16%, var(--bg-elevated)), var(--bg-elevated))`,
      }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={study.cover}
          alt={study.title}
          fill
          priority={priority}
          unoptimized={study.cover.endsWith(".svg")}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <h2 className="mt-4 text-2xl text-fg md:text-3xl">
          <Link href={href} className="outline-none after:absolute after:inset-0 after:content-['']">
            {study.title}
          </Link>
        </h2>
        <p className="pt-3 text-sm leading-relaxed text-muted">{study.summary}</p>
        <dl className="flex gap-6 pt-4">
          {study.metrics.slice(0, 2).map((metric) => (
            <div key={metric.label}>
              <dt className="font-mono text-lg text-fg">{metric.value}</dt>
              <dd className="text-xs text-muted">{metric.label}</dd>
            </div>
          ))}
        </dl>
        <div className="relative z-10 mt-auto flex flex-wrap gap-3 pt-6">
          <Link
            href={href}
            className="inline-flex items-center rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
          >
            View case study →
          </Link>
          {product ? (
            <a
              href={product.url}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center rounded-full border border-border bg-bg/60 px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-accent/50 hover:bg-accent-soft"
            >
              Visit {product.urlLabel} ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}
