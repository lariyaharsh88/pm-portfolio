import type { Transition, Variants } from "motion/react"

export const ease = [0.22, 1, 0.36, 1] as const

export const spring = {
  type: "spring",
  stiffness: 260,
  damping: 30,
} as const satisfies Transition

const enter = {
  duration: 0.8,
  ease,
} as const satisfies Transition

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: enter,
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: enter,
  },
}

export function stagger(staggerChildren = 0.08): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren },
    },
  }
}
