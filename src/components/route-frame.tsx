export function RouteFrame({ label }: { label: string }) {
  return (
    <main className="min-h-[160vh] px-6 md:px-8">
      <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">{label}</p>
    </main>
  )
}
