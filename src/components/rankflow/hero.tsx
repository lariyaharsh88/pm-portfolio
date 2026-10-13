"use client"

import { Magnetic } from "@/components/motion/Magnetic"
import { Button } from "@/components/ui/Button"
import { Container } from "@/components/ui/Container"

export function RankflowHero({ demoUrl }: { demoUrl: string | null }) {
  return (
    <section className="pb-8">
      <Container>
        <p className="max-w-xl font-mono text-xs tracking-[0.14em] text-muted uppercase">
          Independent project — built and shipped by me outside my full-time role.
        </p>
        <h1 className="mt-5 max-w-4xl bg-[linear-gradient(115deg,var(--fg)_18%,var(--accent-ink)_82%)] bg-clip-text text-4xl text-transparent sm:text-6xl lg:text-7xl">
          RankFlowHQ
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted">TODO</p>
        <div className="mt-8">
          <Magnetic>
            {demoUrl ? (
              <Button href={demoUrl} target="_blank" rel="noopener noreferrer">
                Try the live demo
              </Button>
            ) : (
              <Button disabled className="cursor-not-allowed opacity-50">
                Demo coming soon
              </Button>
            )}
          </Magnetic>
        </div>
        <div className="mt-14">
          <div className="overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-[0_30px_80px_-48px_rgba(0,0,0,0.55)]">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="mx-auto rounded-full bg-bg px-4 py-1 font-mono text-[11px] text-muted">
                TODO
              </span>
            </div>
            <div className="aspect-[16/10] p-6 sm:p-8">
              <div className="h-3 w-1/3 rounded-full bg-border" />
              <div className="mt-4 h-3 w-2/3 rounded-full bg-border/80" />
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="h-24 rounded-xl bg-accent-soft" />
                <div className="h-24 rounded-xl bg-accent-soft" />
                <div className="h-24 rounded-xl bg-accent-soft" />
              </div>
              <p className="mt-6 font-mono text-xs tracking-[0.16em] text-muted uppercase">TODO</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
