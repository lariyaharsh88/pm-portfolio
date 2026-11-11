type Gtag = (command: "event", name: string, params?: Record<string, string>) => void

/** Sends a GA4 event when gtag is loaded; a no-op otherwise (local dev, GA not configured). */
export function track(name: string, params?: Record<string, string>) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  gtag?.("event", name, params)
}
