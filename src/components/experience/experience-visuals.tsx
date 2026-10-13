"use client"

import Image from "next/image"
import { m } from "motion/react"
import type { ReactNode } from "react"
import { CountUp } from "@/components/motion/CountUp"
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe"
import { cn } from "@/lib/cn"
import { ease } from "@/lib/motion"

/** Company or school mark on a white tile, so it reads in both themes. */
export function LogoTile({ src, alt, size = "md" }: { src: string; alt: string; size?: "md" | "lg" }) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white",
        size === "lg" ? "h-14 w-14 p-2" : "h-11 w-11 p-1.5",
      )}
    >
      <Image src={src} alt={alt} width={56} height={56} unoptimized className="h-full w-full object-contain" />
    </span>
  )
}

const path = [
  { year: "2021", title: "Digital Content Analyst", company: "Collegedunia" },
  { year: "2022", title: "Associate PM", company: "Collegedunia" },
  { year: "2023", title: "Product Manager", company: "Collegedunia" },
  { year: "2025", title: "Product Manager", company: "KollegeApply" },
] as const

const stats = [
  { value: "5", label: "years in product" },
  { value: "2", label: "promotions in 2 years" },
  { value: "78M+", label: "records through my platform" },
  { value: "3", label: "AI products shipped solo" },
] as const

export function CareerOverview() {
  const reduced = useReducedMotionSafe()

  return (
    <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-bg-elevated p-6 md:p-8">
      <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Career path</p>
      <m.ol
        className="relative mt-6 grid gap-6 md:grid-cols-4 md:gap-4"
        initial={reduced ? false : "hidden"}
        whileInView="shown"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.2 } } }}
      >
        <span aria-hidden className="absolute top-[9px] right-4 left-4 hidden h-px bg-border md:block" />
        <m.span
          aria-hidden
          className="absolute top-[9px] left-4 hidden h-px origin-left bg-accent md:block"
          style={{ right: "1rem" }}
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease }}
        />
        {path.map((step, index) => (
          <m.li
            key={`${step.year}-${step.title}`}
            className="relative flex gap-4 md:block"
            variants={{
              hidden: { y: 12 },
              shown: { y: 0, transition: { duration: 0.5, ease } },
            }}
          >
            <span
              className={cn(
                "relative z-10 mt-0.5 block h-[18px] w-[18px] shrink-0 rounded-full border-4 border-bg-elevated",
                index === path.length - 1 ? "bg-accent shadow-[0_0_0_4px_var(--accent-soft)]" : "bg-accent/60",
              )}
            />
            <div className="md:mt-4">
              <p className="font-mono text-xs text-accent-ink">{step.year}</p>
              <p className="mt-1 text-base text-fg">{step.title}</p>
              <p className="text-sm text-muted">{step.company}</p>
            </div>
          </m.li>
        ))}
      </m.ol>
      <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="font-mono text-3xl text-fg">
              <CountUp value={stat.value} />
            </dt>
            <dd className="mt-1 text-sm text-muted">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-3xl border border-border bg-bg-elevated", className)}>{children}</div>
  )
}

function Caption({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-5">
      <p className="font-mono text-2xl text-fg">
        <CountUp value={value} />
      </p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  )
}

const sources = ["Website", "Meta Ads", "Google Ads", "CSV"] as const

function KollegeApplyPanel() {
  const reduced = useReducedMotionSafe()
  const clients = Array.from({ length: 6 })

  return (
    <Panel>
      <div className="p-6">
        <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Lead distribution platform</p>
        <svg viewBox="0 0 320 170" className="mt-4 w-full" aria-hidden>
          {sources.map((label, index) => {
            const y = 25 + index * 40
            return (
              <g key={label}>
                <m.path
                  d={`M70 ${y} C 115 ${y}, 115 85, 150 85`}
                  fill="none"
                  stroke="var(--accent)"
                  strokeOpacity="0.5"
                  strokeWidth="1.5"
                  initial={reduced ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease, delay: index * 0.1 }}
                />
                <rect x="0" y={y - 11} width="70" height="22" rx="11" fill="var(--bg)" stroke="var(--border)" />
                <text x="35" y={y + 4} textAnchor="middle" fontSize="9" fill="var(--muted)">
                  {label}
                </text>
              </g>
            )
          })}
          {clients.map((_, index) => {
            const y = 14 + index * 26
            return (
              <g key={index}>
                <m.path
                  d={`M190 85 C 230 85, 230 ${y}, 270 ${y}`}
                  fill="none"
                  stroke="var(--accent)"
                  strokeOpacity="0.5"
                  strokeWidth="1.5"
                  initial={reduced ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease, delay: 0.5 + index * 0.08 }}
                />
                <circle cx="280" cy={y} r="9" fill="var(--accent-soft)" stroke="var(--accent)" />
              </g>
            )
          })}
          <rect x="150" y="62" width="40" height="46" rx="12" fill="var(--accent)" />
          <text x="170" y="90" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">
            LMS
          </text>
          <text x="300" y="168" textAnchor="end" fontSize="9" fill="var(--muted)">
            600+ clients
          </text>
        </svg>
      </div>
      <div className="grid grid-cols-2 divide-x divide-border border-t border-border">
        <Caption value="78M+" label="lead-distribution records" />
        <Caption value="300K+" label="indexed pages" />
      </div>
    </Panel>
  )
}

function ConversionPanel() {
  const reduced = useReducedMotionSafe()
  const bars = [
    { label: "Before", value: 1.94 },
    { label: "After", value: 2.78 },
  ]

  return (
    <Panel className="p-6">
      <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Click-to-lead conversion</p>
      <div className="mt-6 flex h-44 items-end gap-6">
        {bars.map((bar, index) => (
          <div key={bar.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <span className="font-mono text-sm text-fg">{bar.value}%</span>
            <m.span
              className={cn("block w-full origin-bottom rounded-t-xl", index === 1 ? "bg-accent" : "bg-muted/35")}
              style={{ height: `${(bar.value / 2.78) * 7.5}rem` }}
              initial={reduced ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease, delay: index * 0.2 }}
            />
            <span className="text-xs text-muted">{bar.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm text-muted">
        <span className="text-fg">+43% relative lift</span> across Collegedunia.com and Prepp.in
      </p>
    </Panel>
  )
}

function ScrapersPanel() {
  const reduced = useReducedMotionSafe()
  const dots = Array.from({ length: 110 })

  return (
    <Panel className="p-6">
      <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Data aggregation</p>
      <div className="mt-5 grid grid-cols-[repeat(22,minmax(0,1fr))] gap-1.5">
        {dots.map((_, index) => (
          <m.span
            key={index}
            className="aspect-square rounded-full bg-accent"
            initial={reduced ? false : { opacity: 0.12 }}
            whileInView={{ opacity: [0.12, 1, 0.55] }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: index * 0.012 }}
          />
        ))}
      </div>
      <p className="mt-5 font-mono text-2xl text-fg">110+ scrapers</p>
      <p className="mt-1 text-sm text-muted">feeding real-time college and exam data; manual processing down 50%</p>
    </Panel>
  )
}

function PromotionPanel() {
  const reduced = useReducedMotionSafe()
  const radius = 52
  const circumference = 2 * Math.PI * radius

  return (
    <Panel className="flex items-center gap-6 p-6">
      <svg viewBox="0 0 128 128" className="h-32 w-32 shrink-0 -rotate-90" aria-hidden>
        <circle cx="64" cy="64" r={radius} fill="none" stroke="var(--border)" strokeWidth="10" />
        <m.circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={reduced ? false : { strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference * (1 - 7 / 12) }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease }}
        />
      </svg>
      <div>
        <p className="font-mono text-3xl text-fg">7 months</p>
        <p className="mt-1 text-sm text-muted">from content analyst to Associate PM, the fastest promotion on the team</p>
      </div>
    </Panel>
  )
}

function EducationPanel({ logo, school }: { logo: string; school: string }) {
  return (
    <Panel className="flex items-center gap-5 p-6">
      <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white p-1.5 ring-1 ring-border">
        <Image src={logo} alt={`${school} seal`} width={300} height={299} unoptimized className="h-full w-full object-contain" />
      </span>
      <div className="min-w-0">
        <p className="text-lg leading-snug text-fg">{school}</p>
        <p className="mt-1 text-sm text-muted">Formerly Delhi College of Engineering · est. 1941</p>
        <p className="mt-3 text-sm text-accent-ink">B.Tech, Electrical Engineering</p>
      </div>
    </Panel>
  )
}

/** The visual shown beside each timeline card on desktop, keyed by row index. */
export function SidePanel({ index, logo, school }: { index: number; logo: string; school: string }) {
  switch (index) {
    case 0:
      return <KollegeApplyPanel />
    case 1:
      return <ConversionPanel />
    case 2:
      return <ScrapersPanel />
    case 3:
      return <PromotionPanel />
    default:
      return <EducationPanel logo={logo} school={school} />
  }
}
