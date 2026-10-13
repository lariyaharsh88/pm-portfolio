"use client"

import { useSyncExternalStore } from "react"

function subscribe(onStoreChange: () => void) {
  const media = window.matchMedia("(pointer: fine)")
  media.addEventListener("change", onStoreChange)
  return () => media.removeEventListener("change", onStoreChange)
}

function getSnapshot() {
  return window.matchMedia("(pointer: fine)").matches
}

function getServerSnapshot() {
  return false
}

export function useFinePointer(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
