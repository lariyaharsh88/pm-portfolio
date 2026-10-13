"use client"

import { m, useMotionValue, useSpring } from "motion/react"
import { useRef, type MouseEvent, type ReactNode } from "react"
import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import { Container } from "@/components/ui/Container"
import { skillGroups } from "@/content/experience"
import { useFinePointer } from "@/hooks/useFinePointer"
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe"
import { cn } from "@/lib/cn"
import { spring } from "@/lib/motion"
import { groupIcons, SkillIcon } from "@/components/experience/skill-icons"

const layouts = ["md:col-span-2", "md:row-span-2", "", "", "md:col-span-3"] as const

export function SkillsBento() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <h2 className="text-3xl text-fg md:text-4xl">Skills</h2>
        <Stagger className="mt-8 grid gap-4 md:grid-cols-3">
          {skillGroups.map((group, index) => (
            <StaggerItem key={group.title} className={cn("h-full", layouts[index])}>
              <TiltCard>
                <GroupHeader title={group.title} />
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg px-3 py-1.5 text-sm text-fg"
                    >
                      <SkillIcon name={item} />
                      {item}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}

function GroupHeader({ title }: { title: string }) {
  const Icon = groupIcons[title]
  return (
    <div className="flex items-center gap-3">
      {Icon ? (
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent-ink">
          <Icon className="size-[18px]" aria-hidden />
        </span>
      ) : null}
      <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{title}</p>
    </div>
  )
}

function TiltCard({ children }: { children: ReactNode }) {
  const fine = useFinePointer()
  const reduced = useReducedMotionSafe()
  const enabled = fine && !reduced
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: spring.stiffness, damping: spring.damping })
  const springY = useSpring(rotateY, { stiffness: spring.stiffness, damping: spring.damping })

  function onMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!enabled) return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rotateX.set(clamp(py * -12))
    rotateY.set(clamp(px * 12))
  }

  function onMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div className="h-full [perspective:800px]">
      <m.div
        ref={ref}
        onMouseMove={enabled ? onMouseMove : undefined}
        onMouseLeave={enabled ? onMouseLeave : undefined}
        style={enabled ? { rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" } : undefined}
        className="h-full rounded-3xl border border-border bg-bg-elevated p-6"
      >
        {children}
      </m.div>
    </div>
  )
}

function clamp(value: number) {
  return Math.max(-6, Math.min(6, value))
}
