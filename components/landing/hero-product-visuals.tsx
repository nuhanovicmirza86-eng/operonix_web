"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Activity, BarChart2, Grid3X3 } from "lucide-react"

type VisualLabels = {
  scada: string
  performance: string
  production: string
  footnote: string
}

type HeroProductVisualsProps = {
  labels: VisualLabels
  className?: string
}

type Panel = "scada" | "performance" | "production"

const order: Panel[] = ["scada", "performance", "production"]

const panelImages: Record<Panel, { src: string; alt: string }> = {
  scada: {
    src: "/hero/scada-live.png",
    alt: "SCADA live prikaz pogona i statusa strojeva",
  },
  performance: {
    src: "/hero/performance-dashboard.png",
    alt: "Factory performance dashboard sa OEE i A/P/Q metrikama",
  },
  production: {
    src: "/hero/production-tracking.png",
    alt: "Praćenje proizvodnje sa dnevnim i smjenskim uvidom",
  },
}

export function HeroProductVisuals({ labels, className }: HeroProductVisualsProps) {
  const [active, setActive] = useState(0)
  const panel: Panel = order[active]!

  useEffect(() => {
    const t = setInterval(() => {
      setActive((a) => (a + 1) % order.length)
    }, 7000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-end">
        {order.map((key, idx) => {
          const label =
            key === "scada"
              ? labels.scada
              : key === "performance"
                ? labels.performance
                : labels.production
          const Icon = key === "scada" ? Grid3X3 : key === "performance" ? BarChart2 : Activity
          const isOn = idx === active
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActive(idx)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors",
                isOn
                  ? "border-accent/60 bg-accent/15 text-foreground"
                  : "border-border/80 bg-card/30 text-muted-foreground hover:border-accent/30 hover:text-foreground"
              )}
            >
              <Icon className="h-3.5 w-3.5 opacity-80" aria-hidden />
              {label}
            </button>
          )
        })}
      </div>

      <div
        className="relative aspect-[20/11] w-full min-h-[200px] overflow-hidden rounded-xl border border-border/90 bg-gradient-to-b from-card/80 to-card/40 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_50px_-20px_rgba(0,0,0,0.55)]"
      >
        <div className="absolute inset-0 p-2 sm:p-3">
          <div
            key={panel}
            className="relative h-full w-full overflow-hidden rounded-lg [animation:hero-panel-crossfade_0.4s_ease-out]"
          >
            <Image
              src={panelImages[panel].src}
              alt={panelImages[panel].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent py-2 px-3 text-[10px] text-muted-foreground/90 sm:text-xs">
          {labels.footnote}
        </div>
      </div>
    </div>
  )
}
