"use client"

import type { ReactNode } from "react"
import { Reveal } from "@/components/motion/Reveal"

export function Section({ children }: { children: ReactNode }) {
  return <Reveal amount={0.12}>{children}</Reveal>
}
