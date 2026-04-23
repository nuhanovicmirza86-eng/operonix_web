"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

type HeroRotatingHighlightsProps = {
  messages: string[]
  className?: string
}

export function HeroRotatingHighlights({
  messages,
  className,
}: HeroRotatingHighlightsProps) {
  const [i, setI] = useState(0)
  const safe = messages.length > 0 ? messages : [""]
  const n = safe.length

  useEffect(() => {
    if (n <= 1) return
    const t = setInterval(() => {
      setI((x) => (x + 1) % n)
    }, 5200)
    return () => clearInterval(t)
  }, [n])

  return (
    <div
      className={cn(
        "relative min-h-[3.25rem] sm:min-h-[3.5rem] flex items-center justify-center lg:justify-start",
        className
      )}
    >
      <div
        className="inline-flex w-full max-w-xl items-start gap-2.5 rounded-lg border border-accent/30 bg-accent/5 px-3.5 py-2.5 text-left sm:px-4"
        aria-live="polite"
        aria-atomic="true"
      >
        <Sparkles
          className="mt-0.5 h-4 w-4 shrink-0 text-accent"
          aria-hidden
        />
        <p
          key={i}
          className="text-sm sm:text-base font-medium text-foreground/95 leading-snug [animation:hero-rotate-fade_0.45s_ease-out]"
        >
          {safe[i]}
        </p>
      </div>
    </div>
  )
}
