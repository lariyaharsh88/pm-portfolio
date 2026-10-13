"use client"

import { CountUp } from "@/components/motion/CountUp"
import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import { Card } from "@/components/ui/Card"
import { Container } from "@/components/ui/Container"

const metrics = [
  {
    value: "1–2h → 5m",
    label: "Client delivery time",
  },
  {
    value: "600+",
    label: "Clients at peak",
  },
  {
    value: "300K+",
    label: "Indexed pages",
  },
  {
    value: "~75%",
    label: "Leaner lead operations",
  },
] as const

export function Metrics() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
          Impact
        </p>
        <Stagger className="mt-8 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
          {metrics.map((metric) => (
            <StaggerItem key={metric.value}>
              <Card className="h-full p-5 md:p-6">
                <CountUp
                  value={metric.value}
                  className="text-3xl text-fg sm:text-4xl lg:text-5xl"
                />
                <p className="mt-4 text-sm leading-snug text-fg">{metric.label}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
