import type { Metadata } from "next"
import { pageMetadata } from "@/lib/site"
import { Magnetic } from "@/components/motion/Magnetic"
import { ResumeLink, ResumeTextLink } from "@/components/resume-link"
import { Container } from "@/components/ui/Container"
import { resumeHref } from "@/lib/resume-path"

export const metadata: Metadata = pageMetadata({
  title: "Resume",
  description:
    "Download Harsh Lariya’s one-page Product Manager resume (PDF): data platforms, automation, technical SEO and applied AI.",
  path: "/resume",
})

export default function ResumePage() {
  return (
    <main className="pb-24">
      <Container>
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Resume</p>
        <h1 className="mt-3 max-w-3xl text-4xl text-fg md:text-6xl">The PDF.</h1>
        <div className="mt-6 max-w-xl space-y-3 text-base leading-relaxed text-muted">
          <p>Product work at KollegeApply and Collegedunia, plus the applied-AI projects beside it.</p>
          <p>This is the same file linked from the rest of the site.</p>
        </div>
        <div className="mt-8">
          <Magnetic className="inline-flex">
            <ResumeLink location="resume">Download PDF</ResumeLink>
          </Magnetic>
        </div>
        <iframe
          src={resumeHref}
          title="Harsh Lariya resume PDF"
          className="mt-10 hidden h-[80vh] w-full rounded-3xl border border-border bg-bg-elevated md:block"
        />
        <p className="mt-8 text-base text-muted md:hidden">
          <ResumeTextLink location="resume-mobile" className="text-base">
            Open the resume PDF
          </ResumeTextLink>
        </p>
      </Container>
    </main>
  )
}
