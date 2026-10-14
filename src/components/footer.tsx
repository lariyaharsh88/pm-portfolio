import { Clock } from "@/components/clock"
import { SplitText } from "@/components/motion/SplitText"
import { Container } from "@/components/ui/Container"
import { site } from "@/lib/site"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="py-20 md:py-28">
        <SplitText
          text="Let's build something."
          className="max-w-4xl text-4xl text-balance text-fg sm:text-6xl md:text-7xl"
        />
        <a href={`mailto:${site.email}`} className="link-draw mt-8 inline-block text-lg text-fg">
          {site.email}
        </a>
        <div className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-6 text-sm text-muted">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-fg"
            >
              LinkedIn
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
          </div>
          <Clock />
        </div>
        <p className="mt-8 font-mono text-xs text-muted">© 2026</p>
      </Container>
    </footer>
  )
}
