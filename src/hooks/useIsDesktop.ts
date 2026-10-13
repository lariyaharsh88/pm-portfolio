"use client"

import { useSyncExternalStore } from "react"

function subscribe(onStoreChange: () => void) {
  const media = window.matchMedia("(min-width: 768px)")
  media.addEventListener("change", onStoreChange)
  return () => media.removeEventListener("change", onStoreChange)
}

function getSnapshot() {
  return window.matchMedia("(min-width: 768px)").matches
}

function getServerSnapshot() {
  return false
}

export function useIsDesktop() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
