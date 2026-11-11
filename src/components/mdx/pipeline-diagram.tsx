import type { ReactNode } from "react"

/** RankFlowHQ architecture: sources → AI pipeline → human loop → output. HTML, so labels wrap and it stacks on phones. */

function Node({ title, sub, tone = "default" }: { title: string; sub?: string; tone?: "default" | "ai" | "human" | "gap" }) {
  const tones = {
    default: "border-border bg-bg",
    ai: "border-[color-mix(in_srgb,var(--study-accent,var(--accent))_45%,transparent)] bg-[color-mix(in_srgb,var(--study-accent,var(--accent))_8%,var(--bg))]",
    human: "border-emerald-600/40 bg-emerald-500/10",
    gap: "border-dashed border-amber-600/60 bg-amber-500/10",
  } as const
  return (
    <div className={`rounded-xl border px-3 py-2 ${tones[tone]}`}>
      <p className="text-sm font-medium text-fg">{title}</p>
      {sub ? <p className="mt-0.5 text-xs leading-snug text-muted">{sub}</p> : null}
    </div>
  )
}

function Lane({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-bg-elevated p-3">
      <p className="mb-2 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">{label}</p>
      <div className="grid gap-2">{children}</div>
    </div>
  )
}

function Arrow() {
  return (
    <div aria-hidden className="flex items-center justify-center text-muted">
      <span className="hidden lg:inline">→</span>
      <span className="lg:hidden">↓</span>
    </div>
  )
}

export function PipelineDiagram() {
  return (
    <figure className="not-prose my-10">
      <div className="grid gap-2 lg:grid-cols-[1fr_auto_1.35fr_auto_1fr_auto_0.8fr] lg:items-stretch">
        <Lane label="1 · Inputs & research">
          <Node title="Keyword or topic" sub="from the user" />
          <Node title="Serper" sub="top 8 Google results, People also ask, related searches" />
          <Node title="Tavily" sub="web research, up to 16 sources" />
          <Node title="Search Console / autocomplete" sub="optional real queries" />
        </Lane>
        <Arrow />
        <Lane label="2 · AI pipeline (Gemini)">
          <Node tone="ai" title="Keywords → query clusters" sub="primary + supporting terms" />
          <Node tone="ai" title="Outline" sub="fixed structure: H1, 5–6 H2s, FAQs" />
          <Node tone="ai" title="Draft (streamed)" sub="cites stats inline, ends with Sources" />
          <Node tone="ai" title="SEO package + enrich" sub="title, meta, schema, tables, images" />
          <div className="rounded-xl border border-border px-3 py-2 text-xs text-muted">
            <span className="font-medium text-fg">Fallback chain:</span> 2.0 Flash → 2.5 Flash → … (7 Gemini models). On rate limit, wait &lt;1s and try the next. Every step degrades instead of failing.
          </div>
        </Lane>
        <Arrow />
        <Lane label="3 · Human in the loop">
          <Node tone="human" title="Review & edit" sub="rich-text editor: rewrite, add experience, fix facts" />
          <Node tone="human" title="Quality gate" sub="length, keyword stuffing, structure, links, AI clichés, duplicates" />
          <Node tone="gap" title="Gap: not yet run on save" sub="the gate exists on the server; the editor doesn't call it yet" />
        </Lane>
        <Arrow />
        <Lane label="4 · Output">
          <Node title="Dashboard" sub="saved articles" />
          <Node title="Export" sub="Markdown, DOCX, copy" />
        </Lane>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm border border-[var(--study-accent,var(--accent))] bg-[color-mix(in_srgb,var(--study-accent,var(--accent))_20%,transparent)]" /> AI step</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm border border-emerald-600/60 bg-emerald-500/20" /> Human step</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm border border-dashed border-amber-600/70 bg-amber-500/20" /> Known gap</span>
        <span className="inline-flex items-center gap-1.5">Guardrails across all steps: plan quotas, hourly limits, sign-in for paid routes, capped prompt size</span>
      </div>
      <figcaption className="mt-2 text-sm text-muted">RankFlowHQ architecture, from the code as of November 2026.</figcaption>
    </figure>
  )
}
