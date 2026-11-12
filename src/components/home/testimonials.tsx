"use client"

import { useRef } from "react"
import { m } from "motion/react"
import { Marquee } from "@/components/motion/Marquee"
import { LinkedInIcon } from "@/components/social-links"
import { Container } from "@/components/ui/Container"
import { testimonials, type Testimonial } from "@/content/testimonials"

/** Quotes longer than this are clamped on the card and open in full in a dialog. */
const CLAMP_AT = 220

function Byline({ item }: { item: Testimonial }) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3 text-sm">
      {item.photo && (
        // eslint-disable-next-line @next/next/no-img-element -- 160px static headshot
        <img src={item.photo} alt="" width={44} height={44} loading="lazy" className="size-11 shrink-0 rounded-full object-cover" />
      )}
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-fg">{item.name}</span>
        {(item.role || item.company || item.relationship) && (
          <span className="block text-muted">
            {[[item.role, item.company].filter(Boolean).join(", "), item.relationship].filter(Boolean).join(" · ")}
          </span>
        )}
      </span>
      {item.linkedin && (
        <a
          href={item.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${item.name} on LinkedIn`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-fg transition-colors hover:border-[#0a66c2] hover:text-[#0a66c2]"
        >
          <LinkedInIcon className="size-4 text-[#0a66c2]" />
          LinkedIn
        </a>
      )}
    </div>
  )
}

function Quote({ item, className = "w-[22rem] shrink-0 md:w-[26rem]" }: { item: Testimonial; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const paragraphs = item.quote.split("\n\n")
  const long = item.quote.length > CLAMP_AT

  return (
    <figure className={`flex h-72 flex-col rounded-2xl border border-border bg-bg-elevated p-6 ${className}`}>
      <blockquote className="line-clamp-6 text-fg">“{paragraphs.join(" ")}”</blockquote>
      {long && (
        <button type="button" onClick={() => dialog.current?.showModal()} className="mt-2 self-start text-sm font-medium text-accent underline-offset-4 hover:underline">
          Read more
        </button>
      )}
      <div className="mt-auto pt-5">
        <Byline item={item} />
      </div>

      {long && (
        <dialog
          ref={dialog}
          aria-label={`Testimonial from ${item.name}`}
          onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
          className="m-auto w-[min(40rem,calc(100vw-2rem))] rounded-2xl border border-border bg-bg-elevated p-0 text-fg backdrop:bg-black/50 backdrop:backdrop-blur-sm"
        >
          <figure className="max-h-[85vh] overflow-y-auto p-6 md:p-8">
            <blockquote className="space-y-3">
              {paragraphs.map((p, i) => (
                <p key={i}>
                  {i === 0 && "“"}
                  {p}
                  {i === paragraphs.length - 1 && "”"}
                </p>
              ))}
            </blockquote>
            <div className="mt-6 flex items-center justify-between gap-4">
              <Byline item={item} />
              <button type="button" onClick={() => dialog.current?.close()} className="rounded-full border border-border px-4 py-1.5 text-sm text-fg hover:bg-bg">
                Close
              </button>
            </div>
          </figure>
        </dialog>
      )}
    </figure>
  )
}

/** Below this many quotes they sit in a grid; a marquee of a few cards looks sparse, and Read more on moving cards is awkward. */
const MARQUEE_MIN = 7

export function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <section className="py-12 md:py-16">
      <Container>
        <p className="font-mono text-xs tracking-widest text-muted uppercase">Kind words</p>
        <h2 className="mt-3 text-3xl text-fg md:text-4xl">What people I&apos;ve worked with say</h2>
      </Container>
      {testimonials.length < MARQUEE_MIN ? (
        <Container>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {testimonials.map((item) => (
              <Quote key={item.name} item={item} className="w-full" />
            ))}
          </div>
        </Container>
      ) : (
        <>
          <div className="mt-8 hidden md:block">
            <Marquee duration={50}>
              {testimonials.map((item) => (
                <Quote key={item.name} item={item} />
              ))}
            </Marquee>
          </div>
          <div className="mt-10 overflow-hidden px-6 md:hidden">
            <m.div drag="x" dragConstraints={{ left: -(testimonials.length - 1) * 360, right: 0 }} className="flex gap-4">
              {testimonials.map((item) => (
                <Quote key={item.name} item={item} />
              ))}
            </m.div>
          </div>
        </>
      )}
    </section>
  )
}
