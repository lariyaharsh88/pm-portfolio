import { Clock } from "@/components/clock"
import { SplitText } from "@/components/motion/SplitText"
import { Container } from "@/components/ui/Container"
import { site } from "@/lib/site"

export function Footer() {
  return (
    <footer className="border-t border-border print:hidden">
      <Container className="py-12 md:py-16">
        <SplitText
          text="Let's build something."
          className="max-w-4xl text-4xl text-balance text-fg sm:text-6xl md:text-7xl"
        />
        <a href={`mailto:${site.email}`} className="link-draw mt-8 inline-block text-lg text-fg">
          {site.email}
        </a>
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-fg"
            >
              LinkedIn
            </a>
            <a href={site.phone} className="transition-colors duration-300 hover:text-fg">
              {site.phoneLabel}
            </a>
            <a href={site.phone2} className="transition-colors duration-300 hover:text-fg">
              {site.phone2Label}
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-fg"
            >
              WhatsApp
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-fg"
            >
              GitHub
            </a>
            <a href="/products#templates" className="transition-colors duration-300 hover:text-fg">
              Templates
            </a>
          </div>
          <Clock />
        </div>
        <p className="mt-8 font-mono text-xs text-muted">© 2026</p>
      </Container>
      {/* Sister sites */}
      <p className="mx-auto max-w-6xl px-4 pb-6 text-xs opacity-75">More from Harsh Lariya: <a href="https://kundlijyoti.com" className="underline-offset-2 hover:underline">Kundli Jyoti (free kundli & panchang)</a> · <a href="https://payhourscalc.com" className="underline-offset-2 hover:underline">PayHours (US pay calculators)</a> · <a href="https://invoice.rankflowhq.com" className="underline-offset-2 hover:underline">BillKaro (GST invoice maker)</a> · <a href="https://tools.rankflowhq.com" className="underline-offset-2 hover:underline">Free SEO tools</a> · <a href="https://rankflowhq.com" className="underline-offset-2 hover:underline">RankFlowHQ (SEO agency)</a> · <a href="https://anilumi.in" className="underline-offset-2 hover:underline">AniLumi (anime guide)</a></p>
      <div aria-hidden className="overflow-hidden select-none">
        <p className="footer-wordmark -mb-[0.12em] text-center font-heading leading-[0.8] font-semibold tracking-[-0.06em] whitespace-nowrap">
          Harsh Lariya
        </p>
      </div>
    </footer>
  )
}
