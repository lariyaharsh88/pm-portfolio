"use client"

import { m, useInView, useScroll, useTransform } from "motion/react"
import { ChevronDown } from "lucide-react"
import { useRef, useState, type ReactNode } from "react"
import { Reveal } from "@/components/motion/Reveal"
import { SplitText } from "@/components/motion/SplitText"
import { Container } from "@/components/ui/Container"
import { Tag } from "@/components/ui/Tag"
import { education, roles, type ExperienceRole } from "@/content/experience"
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe"
import { cn } from "@/lib/cn"
import { CareerOverview, LogoTile, SidePanel } from "@/components/experience/experience-visuals"

const previewCount = 2

export function ExperienceTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="pb-8">
      <Container>
        <SplitText
          text="Experience"
          as="h1"
          className="max-w-3xl text-4xl text-fg md:text-6xl"
        />
        <Reveal delay={0.4}>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Product roles at KollegeApply and Collegedunia, across SEO, leads, rankings, and content systems.
          </p>
        </Reveal>
        <CareerOverview />

        <div ref={ref} className="relative mt-16">
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-px -translate-x-1/2 bg-border md:left-1/2"
          />
          <m.span
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top -translate-x-1/2 bg-accent md:left-1/2"
            style={{ scaleY: reduced ? 1 : scaleY }}
          />
          <ol className="space-y-8 md:space-y-12">
            {roles.map((role, index) => (
              <TimelineRow key={`${role.company}-${role.title}-${role.dates}`} index={index}>
                <RoleCard role={role} />
              </TimelineRow>
            ))}
            <TimelineRow index={roles.length}>
              <EducationCard />
            </TimelineRow>
          </ol>
        </div>
      </Container>
    </section>
  )
}

function TimelineRow({ index, children }: { index: number; children: ReactNode }) {
  const side = index % 2 === 0 ? "md:col-start-2 md:row-start-1 md:pl-12" : "md:col-start-1 md:row-start-1 md:pr-12"
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { amount: 0.45 })
  const reduced = useReducedMotionSafe()
  const from = index % 2 === 0 ? "left" : "right"

  return (
    <li ref={ref} className="relative grid md:grid-cols-2 md:gap-x-20">
      <PulseDot active={inView && !reduced} />
      <div className={cn("pl-10 md:row-start-1", index % 2 === 0 ? "md:pr-12 md:pl-0" : "md:col-start-2 md:pl-12")}>
        <Reveal from={from} amount={0.25}>
          {children}
        </Reveal>
      </div>
      <div className={cn("hidden self-center md:block", side)}>
        <Reveal from={from === "left" ? "right" : "left"} amount={0.25}>
          <SidePanel index={index} logo={education.logo} school={education.school} />
        </Reveal>
      </div>
    </li>
  )
}

function PulseDot({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className="absolute top-7 left-[7px] z-10 -translate-x-1/2 md:left-1/2"
    >
      <span className="relative block h-2.5 w-2.5">
        {active ? (
          <m.span
            className="absolute inset-0 rounded-full bg-accent"
            animate={{ scale: [1, 2.4], opacity: [0.45, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
        ) : null}
        <span className="relative block h-full w-full rounded-full bg-accent ring-4 ring-bg" />
      </span>
    </span>
  )
}

function RoleCard({ role }: { role: ExperienceRole }) {
  const [open, setOpen] = useState(false)
  const preview = role.bullets.slice(0, previewCount)
  const rest = role.bullets.slice(previewCount)
  const panelId = `${role.company}-${role.title}`.replace(/\s+/g, "-").toLowerCase()

  return (
    <article className="rounded-3xl border border-border bg-bg-elevated p-5 md:p-6">
      <div className="flex items-center gap-3">
        <LogoTile src={role.logo} alt={`${role.company} logo`} />
        <div className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <a
            href={role.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase transition-colors hover:text-fg"
          >
            {role.company}
          </a>
          <p className="font-mono text-xs text-muted">
            {role.dates}
            {role.location ? ` · ${role.location}` : ""}
          </p>
        </div>
      </div>
      <h2 className="mt-2 text-2xl text-fg">{role.title}</h2>
      {role.scope ? <p className="mt-3 text-sm leading-relaxed text-fg">{role.scope}</p> : null}
      <BulletList items={preview} className="mt-4" />
      {rest.length > 0 ? (
        <div
          id={panelId}
          inert={!open}
          aria-hidden={!open}
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <BulletList items={rest} className="pt-2" />
          </div>
        </div>
      ) : null}
      {rest.length > 0 ? (
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-1 text-sm text-fg transition-colors duration-300 hover:text-accent-ink"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Show less" : "Show more"}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-180")}
            aria-hidden
          />
        </button>
      ) : null}
      <div className="mt-5 flex flex-wrap gap-2">
        {role.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </article>
  )
}

function BulletList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("space-y-2", className)}>
      {items.map((item) => (
        <li key={item} className="relative pl-4 text-sm leading-relaxed text-muted">
          <span aria-hidden className="absolute top-2 left-0 h-1 w-1 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function EducationCard() {
  return (
    <article className="rounded-3xl border border-border bg-bg-elevated p-5 md:p-6">
      <div className="flex items-center gap-3">
        <LogoTile src={education.logo} alt={`${education.school} emblem`} />
        <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">Education</p>
      </div>
      <h2 className="mt-2 text-2xl text-fg">{education.credential}</h2>
      <p className="mt-2 text-sm text-muted">
        {education.school} · {education.dates}
      </p>
    </article>
  )
}
