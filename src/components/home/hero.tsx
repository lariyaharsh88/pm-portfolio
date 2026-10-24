"use client"

import { m, useMotionValue, useScroll, useSpring, useTransform } from "motion/react"
import Image from "next/image"
import { useRef, type MouseEvent } from "react"
import { Magnetic } from "@/components/motion/Magnetic"
import { Reveal } from "@/components/motion/Reveal"
import { SplitText } from "@/components/motion/SplitText"
import { ResumeLink } from "@/components/resume-link"
import { SocialLinks } from "@/components/social-links"
import { Button } from "@/components/ui/Button"
import { Container } from "@/components/ui/Container"
import { useFinePointer } from "@/hooks/useFinePointer"
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe"
import { ease, spring } from "@/lib/motion"
import { site } from "@/lib/site"

export function Hero({
  hasResume,
  headshotBlur,
  portraitBlur,
}: {
  hasResume: boolean
  headshotBlur: string
  portraitBlur: string
}) {
  const fine = useFinePointer()
  const reduced = useReducedMotionSafe()
  const parallax = fine && !reduced
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, {
    stiffness: spring.stiffness,
    damping: spring.damping,
  })
  const y = useSpring(pointerY, {
    stiffness: spring.stiffness,
    damping: spring.damping,
  })
  const x1 = useTransform(x, (value) => value)
  const y1 = useTransform(y, (value) => value)
  const x2 = useTransform(x, (value) => value * -0.65)
  const y2 = useTransform(y, (value) => value * 0.4)
  const x3 = useTransform(x, (value) => value * 0.35)
  const y3 = useTransform(y, (value) => value * -0.55)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 36])

  function onMouseMove(event: MouseEvent<HTMLElement>) {
    if (!parallax) return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    pointerX.set(px * 36)
    pointerY.set(py * 24)
  }

  function onMouseLeave() {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <section
      ref={sectionRef}
      className="relative -mt-24 flex min-h-[calc(90vh+6rem)] items-center overflow-hidden pt-24"
      onMouseMove={parallax ? onMouseMove : undefined}
      onMouseLeave={parallax ? onMouseLeave : undefined}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--fg) 7%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--fg) 7%, transparent) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse at 28% 42%, black 12%, transparent 68%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 28% 42%, black 12%, transparent 68%)",
        }}
      />
      <m.div
        aria-hidden
        className="pointer-events-none absolute top-[8%] left-[-10%]"
        style={{ x: x1, y: y1 }}
      >
        <div className="blob-drift h-72 w-72 rounded-full bg-accent/40 blur-2xl motion-reduce:animate-none md:blur-3xl" />
      </m.div>
      <m.div
        aria-hidden
        className="pointer-events-none absolute top-[18%] right-[-8%] hidden md:block"
        style={{ x: x2, y: y2 }}
      >
        <div className="blob-drift h-80 w-80 rounded-full bg-accent/25 blur-2xl [animation-delay:-7s] motion-reduce:animate-none md:blur-3xl" />
      </m.div>
      <m.div
        aria-hidden
        className="pointer-events-none absolute bottom-[6%] left-[28%] hidden md:block"
        style={{ x: x3, y: y3 }}
      >
        <div className="blob-drift h-64 w-64 rounded-full bg-[#7a7af8]/30 blur-2xl [animation-delay:-13s] motion-reduce:animate-none md:blur-3xl" />
      </m.div>

      <Container className="relative py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          <div>
        <Reveal instant>
          <div className="flex flex-wrap items-center gap-3">
            <Image
              src="/me-headshot.jpg"
              alt={site.name}
              width={56}
              height={56}
              sizes="56px"
              priority
              placeholder="blur"
              blurDataURL={headshotBlur}
              className="h-14 w-14 rounded-full object-cover object-[center_18%]"
            />
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-bg/70 px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-700 opacity-70 motion-safe:animate-ping dark:bg-emerald-400" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-700 dark:bg-emerald-400" />
              </span>
              Open to PM / AI PM roles · 2026
            </p>
          </div>
        </Reveal>
        <SplitText
          as="h1"
          instant
          text={site.headline}
          className="mt-6 max-w-4xl text-4xl text-balance text-fg sm:text-5xl md:text-6xl"
        />
        <Reveal instant>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Product Manager at KollegeApply, previously Collegedunia. 5 years
            in EdTech & B2B SaaS. I have also shipped 6 live products of my own, from AI
            SEO to programmatic search sites.
          </p>
        </Reveal>
        <Reveal instant>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button href="#work">View case studies</Button>
            </Magnetic>
            {hasResume ? (
              <Magnetic>
                <ResumeLink location="hero" variant="secondary" download>
                  Download resume
                </ResumeLink>
              </Magnetic>
            ) : null}
            <SocialLinks withLabel />
          </div>
        </Reveal>
        <div className="mt-16 flex items-center gap-3 text-muted md:mt-24">
          <div
            aria-hidden
            className="flex h-9 w-5 items-start justify-center rounded-full border border-fg/25 p-1"
          >
            <m.span
              className="block h-1.5 w-1 rounded-full bg-fg/70"
              animate={reduced ? undefined : { y: [0, 10, 0], opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase">
            Scroll
          </span>
        </div>
          </div>
          <HeroPortrait blur={portraitBlur} y={portraitY} reduced={reduced} />
        </div>
      </Container>
    </section>
  )
}

function HeroPortrait({
  blur,
  y,
  reduced,
}: {
  blur: string
  y: ReturnType<typeof useTransform<number, number>>
  reduced: boolean
}) {
  return (
    <div className="relative hidden lg:block">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-accent/30 blur-3xl"
      />
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-bg-elevated">
        <m.div
          className="absolute inset-x-0 -top-10 -bottom-10"
          style={{ y }}
          initial={reduced ? { scale: 1 } : { scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduced ? 0 : 1.15, ease }}
        >
          <Image
            src="/me.jpg"
            alt={site.name}
            fill
            priority
            sizes="(max-width: 1023px) 32px, 352px"
            placeholder="blur"
            blurDataURL={blur}
            className="object-cover object-[center_18%]"
          />
        </m.div>
      </div>
    </div>
  )
}
