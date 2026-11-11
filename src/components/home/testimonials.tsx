"use client"

import { m } from "motion/react"
import { Marquee } from "@/components/motion/Marquee"
import { Container } from "@/components/ui/Container"
import { testimonials, type Testimonial } from "@/content/testimonials"

function Quote({ item, className = "w-[22rem] shrink-0 md:w-[26rem]" }: { item: Testimonial; className?: string }) {
  return (
    <figure className={`flex flex-col rounded-2xl border border-border bg-bg-elevated p-6 ${className}`}>
      <blockquote className="space-y-3 text-fg">
        {item.quote.split("\n\n").map((p, i, all) => (
          <p key={i}>
            {i === 0 && "“"}
            {p}
            {i === all.length - 1 && "”"}
          </p>
        ))}
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-5 text-sm">
        {item.photo && (
          // eslint-disable-next-line @next/next/no-img-element -- 160px static headshot
          <img src={item.photo} alt="" width={44} height={44} loading="lazy" className="size-11 shrink-0 rounded-full object-cover" />
        )}
        <span>
          {item.linkedin ? (
            <a href={item.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium text-fg underline-offset-4 hover:underline">
              {item.name}
            </a>
          ) : (
            <span className="font-medium text-fg">{item.name}</span>
          )}
          {(item.role || item.company || item.relationship) && (
            <span className="block text-muted">
              {[[item.role, item.company].filter(Boolean).join(", "), item.relationship].filter(Boolean).join(" · ")}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  )
}

/** Below this many quotes a moving marquee looks sparse and long quotes are hard to read, so they sit in a grid. */
const MARQUEE_MIN = 4

export function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <section className="py-24">
      <Container>
        <p className="font-mono text-xs tracking-widest text-muted uppercase">Kind words</p>
        <h2 className="mt-3 text-3xl text-fg md:text-4xl">What people I&apos;ve worked with say</h2>
      </Container>
      {testimonials.length < MARQUEE_MIN ? (
        <Container>
          <div className="mt-12 grid items-start gap-4 md:grid-cols-2">
            {testimonials.map((item) => (
              <Quote key={item.name} item={item} className="w-full" />
            ))}
          </div>
        </Container>
      ) : (
        <>
          <div className="mt-12 hidden md:block">
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
