import { CountUp } from "@/components/motion/CountUp"

export type EvalRow = {
  label: string
  value: string
}

export function EvalTable({ rows }: { rows: readonly EvalRow[] }) {
  return (
    <dl className="overflow-hidden rounded-3xl border border-border bg-bg-elevated">
      {rows.map((row, index) => (
        <div
          key={row.label}
          className={
            index === rows.length - 1
              ? "grid gap-2 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-baseline"
              : "grid gap-2 border-b border-border px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-baseline"
          }
        >
          <dt className="text-sm text-muted">{row.label}</dt>
          <dd className="font-mono text-lg text-fg sm:text-right">
            <CountUp value={row.value} />
          </dd>
        </div>
      ))}
    </dl>
  )
}
