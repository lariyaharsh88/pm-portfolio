import { Button } from "@/components/ui/Button"
import { Container } from "@/components/ui/Container"

export function NotFoundView() {
  return (
    <main className="flex min-h-[70vh] items-center">
      <Container className="py-24">
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">404</p>
        <h1 className="mt-3 max-w-3xl text-4xl text-balance text-fg sm:text-5xl md:text-7xl">
          This page is not here.
        </h1>
        <div className="mt-8">
          <Button href="/">Back home</Button>
        </div>
      </Container>
    </main>
  )
}
