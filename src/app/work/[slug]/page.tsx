import { MDXRemote } from "next-mdx-remote/rsc"
import type { Metadata } from "next"
import { pageMetadata } from "@/lib/site"
import { notFound } from "next/navigation"
import { mdxComponents } from "@/components/mdx/mdx-components"
import { CaseStudyView } from "@/components/work/case-study-view"
import {
  getCaseStudies,
  getCaseStudy,
  getPublishedCaseStudies,
  getNextCaseStudy,
  toCaseMeta,
} from "@/lib/case-studies"
import remarkGfm from "remark-gfm"
import { remarkStripMdxComments, remarkWrapSections } from "@/lib/remark-sections"

type Props = {
  params: Promise<{ slug: string }>
}

export const instant = false

export function generateStaticParams() {
  const studies =
    process.env.NODE_ENV === "development" ? getCaseStudies() : getPublishedCaseStudies()
  return studies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return { title: "Case study" }

  return {
    ...pageMetadata({ title: study.title, description: study.summary, path: `/work/${study.slug}` }),
    robots: study.status === "draft" ? { index: false, follow: false } : undefined,
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()
  if (study.status === "draft" && process.env.NODE_ENV !== "development") notFound()

  return (
    <CaseStudyView
      study={toCaseMeta(study)}
      nextStudy={getNextCaseStudy(slug)}
      showTodo={process.env.NODE_ENV === "development" && study.hasTodo}
    >
      <MDXRemote
        source={study.content}
        components={mdxComponents}
        options={{
          blockJS: false,
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkStripMdxComments, remarkWrapSections],
          },
        }}
      />
    </CaseStudyView>
  )
}
