"use client"

import { Magnetic } from "@/components/motion/Magnetic"
import { SplitText } from "@/components/motion/SplitText"
import { Button } from "@/components/ui/Button"
import { Container } from "@/components/ui/Container"
import { site } from "@/lib/site"

export function CtaBand() {
  return (
    <section className="pb-24 md:pb-32">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl p-[1.5px]">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-[120%] bg-[conic-gradient(from_0deg,var(--accent),#c4b5fd,#818cf8,var(--accent))] motion-safe:animate-[border-spin_8s_linear_infinite]"
          />
          <div className="relative rounded-[calc(1.5rem-1.5px)] bg-bg-elevated px-6 py-14 sm:px-10 md:px-14 md:py-16">
            <SplitText
              text="Hiring a PM? Let's talk."
              className="max-w-3xl text-4xl text-balance text-fg sm:text-5xl md:text-6xl"
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Button href={site.emailLink}>Email</Button>
              </Magnetic>
              <Magnetic>
                <Button href={site.phone} variant="secondary">
                  Call
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  href={site.whatsapp}
                  variant="secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  href={site.linkedin}
                  variant="secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
