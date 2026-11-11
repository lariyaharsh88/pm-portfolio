"use client"

import Image from "next/image"
import { useEffect, useRef, useState, type PointerEvent } from "react"
import { ArrowUpRight } from "lucide-react"
import { SplitText } from "@/components/motion/SplitText"
import { Container } from "@/components/ui/Container"
import { products } from "@/content/products"
import { cn } from "@/lib/cn"

/** Numbered product list; on a mouse, hovering a row floats its screenshot beside the cursor. */
export function ProductIndex() {
  const previewRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)

  // Rows move under a still cursor while scrolling, so drop the preview until the mouse moves again.
  useEffect(() => {
    if (active === null) return
    const clear = () => setActive(null)
    window.addEventListener("scroll", clear, { passive: true, once: true })
    return () => window.removeEventListener("scroll", clear)
  }, [active])

  function onMove(e: PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse" || !previewRef.current) return
    const r = e.currentTarget.getBoundingClientRect()
    previewRef.current.style.transform = `translate3d(${e.clientX - r.left + 28}px, ${e.clientY - r.top - 120}px, 0)`
  }

  return (
    <section className="py-20 md:py-28">
      <Container>
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Index · {products.length} live products</p>
        <SplitText text="Things I've shipped on my own." className="mt-4 max-w-3xl text-4xl text-balance text-fg md:text-6xl" />

        <div className="relative mt-12" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
          <ul className="border-t border-border">
            {products.map((product, i) => (
              <li key={product.slug}>
                <a
                  href={"caseStudy" in product && product.caseStudy ? product.caseStudy : `/products#${product.slug}`}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 border-b border-border py-6 md:grid-cols-[4rem_1fr_16rem_auto] md:py-8"
                >
                  <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={cn(
                      "font-heading text-2xl tracking-[-0.03em] text-fg transition-[color,translate] duration-500 group-hover:translate-x-2 md:text-5xl",
                      active !== null && active !== i && "md:text-muted/60",
                    )}
                  >
                    {product.name}
                  </span>
                  <span className="hidden text-sm text-muted md:block">{product.urlLabel}</span>
                  <ArrowUpRight className="size-5 text-muted transition-[color,rotate] duration-500 group-hover:rotate-45 group-hover:text-accent-ink" />
                </a>
              </li>
            ))}
          </ul>

          <div
            ref={previewRef}
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 z-10 hidden w-80 md:block"
          >
            {products.map((product, i) => (
              <Image
                key={product.slug}
                src={product.screenshot}
                alt=""
                width={1440}
                height={900}
                loading="lazy"
                className={cn(
                  "absolute inset-x-0 top-0 rounded-xl border border-border shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)] transition-[opacity,scale] duration-300",
                  active === i ? "scale-100 opacity-100" : "scale-90 opacity-0",
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
