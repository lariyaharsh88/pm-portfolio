import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Architecture } from "@/components/rankflow/architecture"
import { RankflowHero } from "@/components/rankflow/hero"

const Discovery = dynamic(() =>
  import("@/components/rankflow/discovery").then((mod) => mod.Discovery),
)
const ProblemUsers = dynamic(() =>
  import("@/components/rankflow/sections").then((mod) => mod.ProblemUsers),
)
const MvpScope = dynamic(() => import("@/components/rankflow/sections").then((mod) => mod.MvpScope))
const Evaluation = dynamic(() =>
  import("@/components/rankflow/sections").then((mod) => mod.Evaluation),
)
const IterationLog = dynamic(() =>
  import("@/components/rankflow/sections").then((mod) => mod.IterationLog),
)
const Limitations = dynamic(() =>
  import("@/components/rankflow/sections").then((mod) => mod.Limitations),
)

export const metadata: Metadata = {
  title: "RankFlowHQ",
  description: "Independent project — built and shipped by me outside my full-time role.",
  alternates: { canonical: "/rankflowhq" },
}

function liveDemoUrl() {
  const url = process.env.NEXT_PUBLIC_RANKFLOW_URL
  if (!url || !/^https?:\/\//.test(url)) return null
  return url
}

export default function RankFlowPage() {
  return (
    <main>
      <RankflowHero demoUrl={liveDemoUrl()} />
      <ProblemUsers />
      <Discovery />
      <MvpScope />
      <Architecture />
      <Evaluation />
      <IterationLog />
      <Limitations />
    </main>
  )
}
