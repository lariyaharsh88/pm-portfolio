import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Bike, Bot, Clapperboard, Hammer, PenLine } from "lucide-react"
import { ResumeTextLink } from "@/components/resume-link"
import { Container } from "@/components/ui/Container"
import { photoBlur } from "@/lib/photo-blur"
import { hasResume } from "@/lib/resume"
import { site, pageMetadata } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "About Harsh Lariya: DTU engineer turned Product Manager. From content analyst to PM in 2 years, now building data platforms and applied-AI products.",
  path: "/about",
})

const interests = [
  {
    icon: Clapperboard,
    title: "Travel content creator",
    text: "264+ YouTube Shorts on road trips, treks and hidden places as @harshonroads. My most-watched Short has 9.5K views.",
    href: "https://www.youtube.com/@Harshonroads/shorts",
  },
  {
    icon: Bike,
    title: "Road trips",
    text: "Weekend escapes to the hills and Rajasthan. Every trip becomes a HarshOnRoads itinerary.",
    href: "https://www.harshonroads.com/",
  },
  {
    icon: Hammer,
    title: "Building on weekends",
    text: "Shipping side products like RankFlowHQ and HarshOnRoads. Building is how I learn.",
    href: "/products",
  },
  {
    icon: Bot,
    title: "Playing with AI tools",
    text: "Testing new models and agents, and breaking them to see where they fail.",
  },
  {
    icon: PenLine,
    title: "Writing",
    text: "Working on notes about product, SEO and evaluating AI features.",
    href: "/writing",
  },
] as const

const contacts = [
  { label: "Email", href: `mailto:${site.email}` },
  { label: "WhatsApp", href: site.whatsapp, external: true },
  { label: `Call ${site.phoneLabel}`, href: site.phone },
  { label: "LinkedIn", href: site.linkedin, external: true },
  { label: "GitHub", href: site.github, external: true },
  { label: "YouTube", href: "https://www.youtube.com/@Harshonroads", external: true },
  { label: "Instagram", href: "https://www.instagram.com/harshonroads/", external: true },
] as const

export default async function AboutPage() {
  const [portraitBlur, momentBlur, resume] = await Promise.all([
    photoBlur("me.jpg"),
    photoBlur("ignite-2026.jpg"),
    hasResume(),
  ])

  return (
    <main className="pb-24">
      <section>
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <Portrait blur={portraitBlur} />
            <div>
              <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">About</p>
              <h1 className="mt-3 text-4xl text-fg md:text-6xl">{site.name}</h1>
              <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-muted">
                <p>
                  I studied Electrical Engineering at Delhi Technological University. I started as a
                  digital content analyst, became an associate product manager in seven months, and
                  I am a product manager now.
                </p>
                <p>
                  I like products where data quality decides the user experience. I am focused on
                  applied AI, where evaluation and reliability matter.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pt-16 md:pt-24">
        <Container>
          <article className="rounded-3xl border border-border bg-bg-elevated p-6 md:p-8">
            <h2 className="text-2xl text-fg">Currently</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-3">
              <li>
                <p className="text-sm text-muted">Roles</p>
                <p className="mt-1 text-fg">Open to PM / AI PM roles</p>
              </li>
              <li>
                <p className="text-sm text-muted">Based in</p>
                <p className="mt-1 text-fg">Gurugram</p>
              </li>
              <li>
                <p className="text-sm text-muted">Also open to</p>
                <p className="mt-1 text-fg">Bengaluru, remote, and relocation</p>
              </li>
            </ul>
          </article>
        </Container>
      </section>

      <section className="pt-16 md:pt-24">
        <Container>
          <h2 className="text-2xl text-fg">Moments</h2>
          <figure className="mt-6 max-w-sm overflow-hidden rounded-3xl border border-border bg-bg-elevated">
            <Image
              src="/ignite-2026.jpg"
              alt="Harsh Lariya at IGNITE 2026, a KollegeApply and Sportsdunia event"
              width={1126}
              height={2000}
              sizes="(min-width: 768px) 24rem, 90vw"
              placeholder="blur"
              blurDataURL={momentBlur}
              className="h-auto w-full object-cover"
            />
            <figcaption className="space-y-1 px-5 py-4">
              <p className="text-sm text-fg">IGNITE 2026 — KollegeApply × Sportsdunia</p>
              <p className="text-sm text-muted">At the KollegeApply and Sportsdunia event.</p>
            </figcaption>
          </figure>
        </Container>
      </section>

      <section className="pt-16 md:pt-24">
        <Container>
          <h2 className="text-2xl text-fg">Beyond work</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {interests.map((interest, index) => {
              const Icon = interest.icon
              const body = (
                <>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-ink transition-transform duration-300 group-hover:-rotate-6">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="mt-6 flex items-center gap-1 text-base text-fg">
                    {interest.title}
                    {"href" in interest ? (
                      <ArrowUpRight
                        className="size-4 text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        aria-hidden
                      />
                    ) : null}
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-muted">{interest.text}</span>
                </>
              )
              const card =
                "group flex h-full flex-col rounded-2xl border border-border bg-bg-elevated p-5 transition-colors duration-300"
              return (
                <li key={interest.title} className={index === 0 ? "lg:col-span-2" : undefined}>
                  {"href" in interest ? (
                    interest.href.startsWith("http") ? (
                      <a
                        href={interest.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${card} hover:border-accent/40`}
                      >
                        {body}
                      </a>
                    ) : (
                      <Link href={interest.href} className={`${card} hover:border-accent/40`}>
                        {body}
                      </Link>
                    )
                  ) : (
                    <div className={card}>{body}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </Container>
      </section>

      <section className="pt-16 md:pt-24">
        <Container>
          <h2 className="text-2xl text-fg">Contact</h2>
          <ul className="mt-6 flex flex-col items-start gap-4">
            {contacts.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="link-draw text-lg text-fg"
                  {...("external" in item
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.label}
                </a>
              </li>
            ))}
            {resume ? (
              <li>
                <ResumeTextLink location="about">Resume</ResumeTextLink>
              </li>
            ) : null}
          </ul>
        </Container>
      </section>
    </main>
  )
}

function Portrait({ blur }: { blur: string }) {
  return (
    <figure className="group relative mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-[1.75rem] border border-border bg-bg-elevated">
        <Image
          src="/me.jpg"
          alt={site.name}
          width={700}
          height={875}
          priority
          sizes="(min-width: 768px) 28rem, 90vw"
          placeholder="blur"
          blurDataURL={blur}
          className="aspect-[4/5] w-full object-cover grayscale transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:grayscale-0 motion-reduce:transition-none motion-reduce:grayscale-0 motion-reduce:group-hover:scale-100"
        />
      </div>
      <div
        className="pointer-events-none absolute right-3 bottom-3 h-28 w-28 motion-safe:animate-[spin_18s_linear_infinite] sm:h-32 sm:w-32"
        aria-hidden
      >
        <svg viewBox="0 0 100 100" className="h-full w-full fill-fg">
          <defs>
            <path
              id="about-ring"
              d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
            />
          </defs>
          <text
            fontSize="9.5"
            letterSpacing="2.2"
            style={{ fontFamily: "var(--font-jetbrains), ui-monospace, monospace" }}
          >
            <textPath href="#about-ring" textLength="226" lengthAdjust="spacing">
              Product · Data · Applied AI ·
            </textPath>
          </text>
        </svg>
      </div>
    </figure>
  )
}
