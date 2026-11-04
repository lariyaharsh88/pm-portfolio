import { ArrowUpRight } from "lucide-react"
import { Container } from "@/components/ui/Container"

const STORE = "https://epicjourneys0.gumroad.com/l"

const templates = [
  { name: "Local SEO Site", stack: "Next.js 15 + agency scripts", price: "$39", href: `${STORE}/local-seo-site` },
  { name: "DegreeHub lead-gen portal + CMS", stack: "Next.js 15 + Prisma", price: "$39", href: `${STORE}/degreehub` },
  { name: "Free Tools Hub", stack: "Cloudflare Worker", price: "$19", href: `${STORE}/free-tools-hub` },
  { name: "All three, bundled", stack: "Save $18", price: "$79", href: `${STORE}/template-bundle` },
] as const

export function TemplatesStrip() {
  return (
    <section id="templates" className="scroll-mt-28 border-t border-border py-20 md:py-28">
      <Container>
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Templates · full source, lifetime updates</p>
        <h2 className="mt-4 max-w-3xl text-3xl text-fg md:text-5xl">Three of these sites, packaged for you to launch.</h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Each template runs a real site of mine first. Buy the source on Gumroad, rebrand in one file, deploy on Vercel or Cloudflare.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {templates.map((t) => (
            <li key={t.href}>
              <a
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-bg-elevated p-5 transition-colors hover:border-accent/50 hover:bg-accent-soft"
              >
                <span>
                  <span className="block font-medium text-fg">{t.name}</span>
                  <span className="mt-1 block text-sm text-muted">{t.stack}</span>
                </span>
                <span className="flex items-center gap-2 font-mono text-sm text-fg">
                  {t.price}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
