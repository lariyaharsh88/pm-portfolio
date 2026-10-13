import type { Metadata } from "next"
import { NotFoundView } from "@/components/not-found-view"

export const metadata: Metadata = {
  title: "Not found",
  description: "This page is not on Harsh Lariya's site.",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return <NotFoundView />
}
