"use client"

import { m } from "motion/react"
import { Marquee } from "@/components/motion/Marquee"
import { Container } from "@/components/ui/Container"
import { testimonials, type Testimonial } from "@/content/testimonials"

function Quote({ item }: { item: Testimonial }) {
  return (
    <figure className="w-[22rem] shrink-0 rounded-2xl border border-border bg-bg-elevated p-6">
      <blockquote className="text-fg">“{item.quote}”</blockquote>
      <figcaption className="mt-5 text-sm">
        <span className="font-medium text-fg">{item.name}</span>
        <span className="block text-muted">
          {item.role}, {item.company} · {item.relationship}
        </span>
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <section className="py-24">
      <Container>
        <p className="font-mono text-xs tracking-widest text-muted uppercase">Kind words</p>
        <h2 className="mt-3 text-3xl text-fg md:text-4xl">What people I&apos;ve worked with say</h2>
      </Container>
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
    </section>
  )
}
