import { ImageResponse } from "next/og"
import { getCaseStudy } from "@/lib/case-studies"
import { clip, ogCard } from "@/lib/og"
import { site } from "@/lib/site"

export const alt = "Case study by Harsh Lariya"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function CaseStudyOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  const metric = study?.metrics[0]

  return new ImageResponse(
    ogCard({
      kicker: study ? "Case study" : site.name,
      title: clip(study?.title ?? "Case study", 80),
      detail: clip(
        study
          ? [metric ? `${metric.value} ${metric.label}` : "", study.summary].filter(Boolean).join(" — ")
          : site.description,
        140,
      ),
    }),
    { ...size },
  )
}
