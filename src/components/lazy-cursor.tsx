"use client"

import dynamic from "next/dynamic"

export const LazyCursor = dynamic(
  () => import("@/components/cursor").then((mod) => mod.Cursor),
  { ssr: false },
)
