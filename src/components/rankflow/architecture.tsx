import { Fragment } from "react"
import { Container } from "@/components/ui/Container"
import { architectureSteps } from "@/content/rankflow"

export function Architecture() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Architecture</p>
        <h2 className="mt-3 max-w-xl text-3xl text-fg md:text-5xl">How a brief gets made</h2>
        <p className="mt-4 max-w-2xl text-muted">TODO</p>
        <div className="mt-12 hidden items-center md:flex">
          {architectureSteps.map((step, index) => (
            <Fragment key={step}>
              <Step label={step} index={index} />
              {index < architectureSteps.length - 1 ? (
                <FlowLine direction="horizontal" index={index} />
              ) : null}
            </Fragment>
          ))}
        </div>
        <div className="mt-10 flex flex-col md:hidden">
          {architectureSteps.map((step, index) => (
            <Fragment key={step}>
              <Step label={step} index={index} />
              {index < architectureSteps.length - 1 ? (
                <FlowLine direction="vertical" index={index} />
              ) : null}
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Step({ label, index }: { label: string; index: number }) {
  return (
    <div className="min-w-0 rounded-2xl border border-border bg-bg-elevated px-3 py-4 md:flex-1 md:px-2">
      <p className="font-mono text-[11px] text-accent-ink">{String(index + 1).padStart(2, "0")}</p>
      <p className="mt-2 text-sm leading-snug text-fg">{label}</p>
    </div>
  )
}

function FlowLine({
  direction,
  index,
}: {
  direction: "horizontal" | "vertical"
  index: number
}) {
  const horizontal = direction === "horizontal"
  const d = horizontal ? "M0 8 H64" : "M8 0 V64"

  return (
    <svg
      viewBox={horizontal ? "0 0 64 16" : "0 0 16 64"}
      className={horizontal ? "h-4 w-14 shrink-0 text-accent" : "mx-auto h-14 w-4 text-accent"}
      fill="none"
      aria-hidden
    >
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle r="2.4" fill="currentColor" className="motion-reduce:hidden">
        <animateMotion dur="2.4s" begin={`${index * 0.35}s`} repeatCount="indefinite" path={d} />
      </circle>
    </svg>
  )
}
