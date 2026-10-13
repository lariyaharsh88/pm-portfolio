"use client"

import type { CSSProperties } from "react"
import { Timeline } from "@/components/mdx/timeline"
import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import { Container } from "@/components/ui/Container"
import { EvalTable } from "@/components/rankflow/eval-table"
import {
  evalRows,
  failureModes,
  iterationLog,
  limitations,
  mvpIn,
  mvpOut,
  nextSteps,
} from "@/content/rankflow"

export function ProblemUsers() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Problem & users</p>
        <h2 className="mt-3 max-w-xl text-3xl text-fg md:text-5xl">Who it is for</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-border bg-bg-elevated p-6 md:p-8">
            <h3 className="text-xl text-fg">Problem</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">TODO</p>
          </article>
          <article className="rounded-3xl border border-border bg-bg-elevated p-6 md:p-8">
            <h3 className="text-xl text-fg">Users</h3>
            <p className="mt-3 text-base text-fg">SEO and content strategists.</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">TODO</p>
          </article>
        </div>
      </Container>
    </section>
  )
}

export function MvpScope() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">MVP scope</p>
        <h2 className="mt-3 max-w-xl text-3xl text-fg md:text-5xl">What the first version held</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <ScopeColumn title="In" items={mvpIn} muted={false} />
          <ScopeColumn title="Out" items={mvpOut} muted />
        </div>
      </Container>
    </section>
  )
}

function ScopeColumn({
  title,
  items,
  muted,
}: {
  title: string
  items: readonly string[]
  muted: boolean
}) {
  return (
    <article className="rounded-3xl border border-border bg-bg-elevated p-6 md:p-8">
      <h3 className="text-2xl text-fg">{title}</h3>
      <Stagger className="mt-6 space-y-3">
        {items.map((item, index) => (
          <StaggerItem key={`${title}-${index}`}>
            <p className={muted ? "text-sm text-muted" : "text-sm text-fg"}>{item}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </article>
  )
}

export function Evaluation() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Evaluation</p>
        <h2 className="mt-3 max-w-xl text-3xl text-fg md:text-5xl">What the test set showed</h2>
        <p className="mt-4 max-w-2xl text-muted">TODO</p>
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <EvalTable rows={evalRows} />
          <div>
            <h3 className="text-xl text-fg">Known failure modes</h3>
            <ul className="mt-4 space-y-3">
              {failureModes.map((mode, index) => (
                <li key={`${mode}-${index}`} className="text-sm leading-relaxed text-muted">
                  {mode}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

export function IterationLog() {
  return (
    <section className="py-16 md:py-24" style={{ "--study-accent": "var(--accent)" } as CSSProperties}>
      <Container>
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Iteration log</p>
        <h2 className="mt-3 max-w-xl text-3xl text-fg md:text-5xl">What changed after the first build</h2>
        <Timeline items={[...iterationLog]} />
      </Container>
    </section>
  )
}

export function Limitations() {
  return (
    <section className="py-16 md:pb-28">
      <Container>
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
          Limitations & next steps
        </p>
        <h2 className="mt-3 max-w-xl text-3xl text-fg md:text-5xl">What it does not do yet</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <TodoList title="Limitations" items={limitations} />
          <TodoList title="Next steps" items={nextSteps} />
        </div>
      </Container>
    </section>
  )
}

function TodoList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <article className="rounded-3xl border border-border bg-bg-elevated p-6 md:p-8">
      <h3 className="text-xl text-fg">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li key={`${title}-${index}`} className="text-sm leading-relaxed text-muted">
            {item}
          </li>
        ))}
      </ul>
    </article>
  )
}
