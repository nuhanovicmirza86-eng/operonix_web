"use client"

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

function PanelScada() {
  return (
    <svg
      viewBox="0 0 400 220"
      className="h-full w-full"
      role="img"
      aria-label="SCADA — plant board"
    >
      <defs>
        <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.2 0.02 250)" />
          <stop offset="100%" stopColor="oklch(0.14 0.02 250)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="400" height="220" fill="url(#hg)" />
      <g opacity="0.15" stroke="oklch(0.4 0.02 250)" strokeWidth="0.5">
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 40}
            y1={0}
            x2={i * 40}
            y2={220}
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={i * 44}
            x2={400}
            y2={i * 44}
          />
        ))}
      </g>
      <text
        x="12"
        y="22"
        fill="oklch(0.7 0.01 250)"
        fontSize="9"
        fontFamily="ui-sans-serif, system-ui"
        letterSpacing="0.12em"
      >
        PLANT OVERVIEW
      </text>
      <rect
        x="10"
        y="34"
        width="186"
        height="168"
        rx="4"
        fill="oklch(0.12 0.01 250)"
        stroke="oklch(0.3 0.01 250)"
        strokeWidth="0.7"
      />
      {[
        { x: 22, y: 50, c: "oklch(0.55 0.18 145)" },
        { x: 104, y: 50, c: "oklch(0.55 0.18 145)" },
        { x: 22, y: 118, c: "oklch(0.6 0.2 25)" },
        { x: 104, y: 118, c: "oklch(0.72 0.16 80)" },
      ].map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={b.y}
            width="70"
            height="54"
            rx="3"
            fill="oklch(0.16 0.01 250)"
            stroke="oklch(0.32 0.01 250)"
            strokeWidth="0.5"
          />
          <circle
            cx={b.x + 12}
            cy={b.y + 14}
            r="4"
            fill={b.c}
            filter="url(#glow)"
            opacity="0.95"
          />
          <rect
            x={b.x + 24}
            y={b.y + 22}
            width="46"
            height="3"
            rx="1"
            fill="oklch(0.35 0.01 250)"
          />
          <rect
            x={b.x + 24}
            y={b.y + 30}
            width="32"
            height="3"
            rx="1"
            fill="oklch(0.3 0.01 250)"
          />
        </g>
      ))}
      <path
        d="M 30 200 Q 100 180 200 198 T 360 192"
        fill="none"
        stroke="oklch(0.65 0.15 180)"
        strokeWidth="1.2"
        opacity="0.7"
      />
      <rect
        x="210"
        y="40"
        width="180"
        height="158"
        rx="4"
        fill="oklch(0.1 0.01 250)"
        stroke="oklch(0.28 0.01 250)"
        strokeWidth="0.6"
      />
      <text
        x="220"
        y="60"
        fill="oklch(0.55 0.01 250)"
        fontSize="8"
        fontFamily="ui-sans-serif, system-ui"
      >
        ACTIVE ALARMS
      </text>
      {[
        { y: 78, c: "oklch(0.55 0.2 25)" },
        { y: 100, c: "oklch(0.7 0.15 60)" },
        { y: 122, c: "oklch(0.72 0.14 80)" },
      ].map((r, i) => (
        <g key={i}>
          <rect
            x="218"
            y={r.y}
            width="164"
            height="16"
            rx="2"
            fill={r.c}
            opacity="0.22"
          />
          <rect
            x="220"
            y={r.y + 5}
            width="40"
            height="6"
            rx="1"
            fill="oklch(0.4 0.01 250)"
            opacity="0.5"
          />
        </g>
      ))}
    </svg>
  )
}

function PanelPerformance() {
  return (
    <svg
      viewBox="0 0 400 220"
      className="h-full w-full"
      role="img"
      aria-label="OOE / OEE performance"
    >
      <defs>
        <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.5 0.2 25)" />
          <stop offset="50%" stopColor="oklch(0.72 0.16 80)" />
          <stop offset="100%" stopColor="oklch(0.58 0.16 150)" />
        </linearGradient>
      </defs>
      <rect
        width="400"
        height="220"
        fill="oklch(0.12 0.01 250)"
      />
      <text
        x="12"
        y="22"
        fill="oklch(0.7 0.01 250)"
        fontSize="9"
        fontFamily="ui-sans-serif, system-ui"
        letterSpacing="0.1em"
      >
        OEE & SHIFT
      </text>
      <path
        d="M 80 150 A 120 120 0 0 1 320 150"
        fill="none"
        stroke="url(#arcGrad)"
        strokeWidth="16"
        strokeLinecap="round"
        opacity="0.9"
      />
      <text
        x="200"
        y="128"
        textAnchor="middle"
        fill="oklch(0.98 0 0)"
        fontSize="24"
        fontWeight="600"
        fontFamily="ui-sans-serif, system-ui"
      >
        87%
      </text>
      <text
        x="200"
        y="148"
        textAnchor="middle"
        fill="oklch(0.6 0.01 250)"
        fontSize="9"
        fontFamily="ui-sans-serif, system-ui"
      >
        OEE · LINE 4
      </text>
      {[
        { x: 50, h: 52, a: 0.75 },
        { x: 150, h: 44, a: 0.65 },
        { x: 250, h: 48, a: 0.85 },
        { x: 310, h: 36, a: 0.55 },
      ].map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={170 - b.h}
            width="32"
            height={b.h}
            rx="2"
            fill="oklch(0.55 0.12 200)"
            opacity={b.a}
          />
        </g>
      ))}
      <text
        x="12"
        y="208"
        fill="oklch(0.5 0.01 250)"
        fontSize="7"
        fontFamily="ui-sans-serif, system-ui"
      >
        A · P · Q · availability / performance / quality
      </text>
    </svg>
  )
}

function PanelProduction() {
  return (
    <svg
      viewBox="0 0 400 220"
      className="h-full w-full"
      role="img"
      aria-label="Production tracking"
    >
      <rect width="400" height="220" fill="oklch(0.12 0.01 250)" />
      <text
        x="12"
        y="22"
        fill="oklch(0.7 0.01 250)"
        fontSize="9"
        fontFamily="ui-sans-serif, system-ui"
        letterSpacing="0.1em"
      >
        PRODUCTION PULSE
      </text>
      <text
        x="12"
        y="50"
        fill="oklch(0.55 0.01 250)"
        fontSize="8"
        fontFamily="ui-sans-serif, system-ui"
      >
        UNITS (SHIFT)
      </text>
      <text
        x="12"
        y="80"
        fill="oklch(0.98 0 0)"
        fontSize="32"
        fontWeight="600"
        fontFamily="ui-sans-serif, system-ui, monospace"
      >
        18 204
      </text>
      <text
        x="12"
        y="100"
        fill="oklch(0.55 0.01 250)"
        fontSize="7"
        fontFamily="ui-sans-serif, system-ui"
      >
        good · target aligned · live count
      </text>
      <rect
        x="12"
        y="118"
        width="376"
        height="78"
        rx="4"
        fill="oklch(0.1 0.01 250)"
        stroke="oklch(0.3 0.01 250)"
        strokeWidth="0.5"
      />
      <polyline
        points="32,180 80,150 120,170 180,120 240,160 300,100 360,140"
        fill="none"
        stroke="oklch(0.65 0.15 180)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.85"
      />
      {[
        { x: 32, c: 180 },
        { x: 120, c: 170 },
        { x: 240, c: 160 },
        { x: 360, c: 140 },
      ].map((p) => (
        <circle
          key={p.x}
          cx={p.x}
          cy={p.c}
          r="3"
          fill="oklch(0.7 0.14 180)"
        />
      ))}
    </svg>
  )
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
          {panel === "scada" && (
            <div
              key="scada"
              className="h-full w-full [animation:hero-panel-crossfade_0.4s_ease-out]"
            >
              <PanelScada />
            </div>
          )}
          {panel === "performance" && (
            <div
              key="perf"
              className="h-full w-full [animation:hero-panel-crossfade_0.4s_ease-out]"
            >
              <PanelPerformance />
            </div>
          )}
          {panel === "production" && (
            <div
              key="prod"
              className="h-full w-full [animation:hero-panel-crossfade_0.4s_ease-out]"
            >
              <PanelProduction />
            </div>
          )}
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent py-2 px-3 text-[10px] text-muted-foreground/90 sm:text-xs">
          {labels.footnote}
        </div>
      </div>
    </div>
  )
}
