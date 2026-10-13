import Link from "next/link"
import { Container } from "@/components/ui/Container"
import { Tag } from "@/components/ui/Tag"
import { projects, type Project, type ProjectTint } from "@/content/projects"
import { cn } from "@/lib/cn"

const tints: Record<ProjectTint, string> = {
  indigo:
    "bg-[radial-gradient(90%_70%_at_0%_0%,rgba(91,91,247,0.38),transparent_58%),linear-gradient(180deg,var(--bg-elevated),color-mix(in_srgb,var(--bg)_86%,#5b5bf7))]",
  emerald:
    "bg-[radial-gradient(90%_70%_at_0%_0%,rgba(16,185,129,0.34),transparent_58%),linear-gradient(180deg,var(--bg-elevated),color-mix(in_srgb,var(--bg)_86%,#10b981))]",
  violet:
    "bg-[radial-gradient(90%_70%_at_100%_0%,rgba(124,92,255,0.34),transparent_55%),linear-gradient(180deg,var(--bg-elevated),color-mix(in_srgb,var(--bg)_88%,#7c5cff))]",
}

const bars: Record<string, number[]> = {
  "lead-management-platform": [78, 70, 58, 46, 36, 28, 22, 18],
  "content-growth-platform": [28, 38, 48, 58, 74, 92, 66, 42, 48],
  rankflowhq: [22, 48, 30, 64, 42, 70, 55, 84],
}

export function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-28 py-24 md:py-32">
      <Container>
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
          Selected work
        </p>
        <h2 className="mt-3 max-w-xl text-3xl text-fg md:text-5xl">
          Products with a number attached.
        </h2>
        <div className="mt-12 flex flex-col gap-6 md:gap-10">
          {projects.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function WorkCard({ project }: { project: Project }) {
  const card = (
    <article
      className={cn(
        "overflow-hidden rounded-3xl border border-border p-6 shadow-[0_20px_60px_-36px_rgba(0,0,0,0.45)] md:p-8",
        tints[project.tint],
        project.comingSoon && "opacity-70 saturate-50",
      )}
    >
      <div className="grid items-stretch gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <h3 className="mt-5 text-3xl text-fg md:text-4xl">{project.title}</h3>
          <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
            {project.outcome}
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-4">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="font-mono text-2xl text-fg">{metric.value}</dt>
                <dd className="mt-1 text-sm text-muted">{metric.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Mockup slug={project.slug} interactive={Boolean(project.href)} />
      </div>
    </article>
  )

  if (!project.href) return card

  return (
    <Link href={project.href} data-cursor="view" className="group block">
      {card}
    </Link>
  )
}

function Mockup({ slug, interactive }: { slug: string; interactive: boolean }) {
  const heights = bars[slug] ?? [40, 55, 48, 70]

  return (
    <div className="relative min-h-56 overflow-hidden rounded-2xl border border-white/10 bg-black/10 md:min-h-full">
      <div
        className={cn(
          "flex h-full min-h-56 flex-col p-4",
          interactive &&
            "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
        )}
      >
        <div className="mb-4 flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
        </div>
        <div className="mt-auto flex h-36 items-end gap-1.5">
          {heights.map((height, index) => (
            <span
              key={`${slug}-${index}`}
              className="flex-1 rounded-t-md bg-white/30"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
