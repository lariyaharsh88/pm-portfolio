"use client"

import { track } from "@vercel/analytics"
import { useEffect } from "react"
import { site } from "@/lib/site"

// Tracks email and LinkedIn clicks anywhere on the site.
export function LinkTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a")
      if (!link) return
      const href = link.getAttribute("href") ?? ""
      if (href.startsWith("mailto:")) track("email_click", { path: location.pathname })
      else if (href.startsWith(site.linkedin)) track("linkedin_click", { path: location.pathname })
      else if (href.startsWith("tel:")) track("phone_click", { path: location.pathname })
      else if (href.startsWith("https://wa.me/")) track("whatsapp_click", { path: location.pathname })
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return null
}
