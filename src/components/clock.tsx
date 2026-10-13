"use client"

import { useSyncExternalStore } from "react"

function formatIst(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date)
}

function subscribe(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 1000)
  return () => window.clearInterval(id)
}

function getSnapshot() {
  return formatIst(new Date())
}

function getServerSnapshot() {
  return "--:--"
}

export function Clock() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return (
    <time dateTime={time} suppressHydrationWarning className="font-mono text-xs text-muted">
      Gurugram, IST {time}
    </time>
  )
}
