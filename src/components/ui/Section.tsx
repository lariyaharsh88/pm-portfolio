import type { ReactNode } from "react"
import { cn } from "@/lib/cn"
import { Container } from "@/components/ui/Container"

type SectionProps = {
  id?: string
  eyebrow?: string
  title?: ReactNode
  children: ReactNode
  className?: string
}

export function Section({
  id,
  eyebrow,
  title,
  children,
  className,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-24 md:py-32", className)}>
      <Container>
        {eyebrow || title ? (
          <header className="mb-12 max-w-3xl">
            {eyebrow ? (
              <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
                {eyebrow}
              </p>
            ) : null}
            {title ? <SectionTitle>{title}</SectionTitle> : null}
          </header>
        ) : null}
        {children}
      </Container>
    </section>
  )
}

function SectionTitle({ children }: { children: ReactNode }) {
  if (typeof children === "string") {
    return (
      <h2 className="mt-3 text-3xl font-medium text-balance text-fg md:text-5xl">
        {children}
      </h2>
    )
  }

  return <div className="mt-3">{children}</div>
}
