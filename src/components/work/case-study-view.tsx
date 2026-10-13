"use client"

import { m, useScroll, useTransform, type MotionValue } from "motion/react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { CountUp } from "@/components/motion/CountUp"
import { SplitText } from "@/components/motion/SplitText"
import { Container } from "@/components/ui/Container"
import { Tag } from "@/components/ui/Tag"
import type { CaseStudyMeta } from "@/lib/case-studies"
import { cn } from "@/lib/cn"

const RING = 2 * Math.PI * 15

export function CaseStudyView({
  study,
  nextStudy,
  showTodo = false,
  children,
}: {
  study: CaseStudyMeta
  nextStudy: CaseStudyMeta | null
  showTodo?: boolean
  children: ReactNode
}) {
  const articleRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  })
  const dashOffset = useTransform(scrollYProgress, [0, 1], [RING, 0])

  const facts = [
    { label: "Role", value: study.role },
    { label: "Company", value: study.company },
    { label: "Timeline", value: study.timeline },
    { label: "Team", value: study.team },
  ].filter((fact) => fact.value.trim().length > 0)

  return (
    <article
      ref={articleRef}
      style={{ "--study-accent": study.accent } as CSSProperties}
    >
      <header
        className="pb-8"
        style={{
          background: `radial-gradient(80% 70% at 0% 0%, color-mix(in srgb, ${study.accent} 34%, transparent), transparent 62%)`,
        }}
      >
        <Container>
          {showTodo ? (
            <p className="mb-4 inline-flex rounded-full bg-yellow-300 px-2.5 py-1 text-xs font-medium text-yellow-950">
              TODO in this file
            </p>
          ) : null}
          <div className="flex items-center gap-3">
            <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
              Case study
            </p>
            {study.status === "draft" ? <Tag>Draft</Tag> : null}
          </div>
          <SplitText
            text={study.title}
            as="h1"
            className="mt-4 max-w-4xl text-4xl text-balance text-fg md:text-6xl"
          />
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{study.summary}</p>
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-border bg-bg-elevated">
            <Image
              src={study.cover}
              alt={study.title}
              fill
              priority
              unoptimized={study.cover.endsWith(".svg")}
              sizes="(min-width: 1152px) 1100px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </header>

      <Container>
        <section className="rounded-3xl border border-border bg-bg-elevated p-6 md:p-8">
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">TL;DR</p>
          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-sm text-muted">{fact.label}</dt>
                <dd className="mt-1 text-base text-fg">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <dl className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
            {study.metrics.map((metric) => (
              <div
                key={metric.label}
                className="min-w-40 flex-1 rounded-2xl border px-4 py-3"
                style={{
                  borderColor: "color-mix(in srgb, var(--study-accent) 48%, var(--border))",
                  background: "color-mix(in srgb, var(--study-accent) 12%, transparent)",
                }}
              >
                <dt>
                  <CountUp value={metric.value} className="text-2xl text-fg md:text-3xl" />
                </dt>
                <dd className="mt-1 text-sm text-muted">{metric.label}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Container>

      <Container className="py-16 md:py-24">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_12.5rem] lg:gap-16">
          <div className="prose case-prose min-w-0">{children}</div>
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <ProgressRing offset={dashOffset} />
              <Contents headings={study.headings} />
            </div>
          </aside>
        </div>
      </Container>

      <ProgressRing offset={dashOffset} className="fixed right-5 bottom-5 z-40 lg:hidden" />

      {nextStudy ? <NextStudy study={nextStudy} /> : null}
    </article>
  )
}

function ProgressRing({
  offset,
  className,
}: {
  offset: MotionValue<number>
  className?: string
}) {
  return (
    <div className={cn("mb-6 h-11 w-11", className)} aria-hidden>
      <svg viewBox="0 0 36 36" className="h-11 w-11 -rotate-90">
        <circle cx="18" cy="18" r="15" fill="none" stroke="var(--border)" strokeWidth="2" />
        <m.circle
          cx="18"
          cy="18"
          r="15"
          fill="none"
          stroke="var(--study-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={RING}
          style={{ strokeDashoffset: offset }}
        />
      </svg>
    </div>
  )
}

function Contents({ headings }: { headings: CaseStudyMeta["headings"] }) {
  const [active, setActive] = useState(headings[0]?.id ?? "")

  useEffect(() => {
    function update() {
      const line = 148
      let current = headings[0]?.id ?? ""
      for (const heading of headings) {
        const node = document.getElementById(heading.id)
        if (node && node.getBoundingClientRect().top <= line) current = heading.id
      }
      setActive((prev) => (prev === current ? prev : current))
    }

    const frame = requestAnimationFrame(update)
    window.addEventListener("scroll", update, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", update)
    }
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav aria-label="Contents">
      <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Contents</p>
      <ul className="mt-3">
        {headings.map((heading) => {
          const current = active === heading.id
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  "relative block py-1.5 pl-4 text-sm transition-colors duration-300 hover:text-fg",
                  current ? "text-fg" : "text-muted hover:text-fg",
                )}
                aria-current={current ? "location" : undefined}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-y-1 left-0 w-0.5 origin-center rounded-full transition-transform duration-300 motion-reduce:transition-none",
                    current ? "scale-y-100" : "scale-y-0",
                  )}
                  style={{ background: "var(--study-accent)" }}
                />
                {heading.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function NextStudy({ study }: { study: CaseStudyMeta }) {
  return (
    <Container className="pb-24">
      <Link
        href={`/work/${study.slug}`}
        data-cursor="view"
        className="group block overflow-hidden rounded-3xl border border-border"
        style={{
          background: `linear-gradient(135deg, color-mix(in srgb, ${study.accent} 18%, var(--bg-elevated)), var(--bg-elevated) 58%)`,
        }}
      >
        <div className="flex items-end justify-between gap-6 p-8 md:p-12">
          <div>
            <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
              Next case study
            </p>
            <h2 className="mt-3 max-w-3xl text-4xl text-balance text-fg md:text-6xl">
              {study.title}
            </h2>
            <p className="mt-4 max-w-xl text-base text-muted">{study.summary}</p>
          </div>
          <span className="relative mb-1 hidden h-8 w-8 shrink-0 overflow-hidden text-fg sm:inline-flex">
            <ArrowRight aria-hidden className="h-8 w-8 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-8 motion-reduce:transition-none" />
            <ArrowRight aria-hidden className="absolute h-8 w-8 -translate-x-8 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 motion-reduce:transition-none" />
          </span>
        </div>
      </Link>
    </Container>
  )
}
