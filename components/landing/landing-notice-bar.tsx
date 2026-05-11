"use client"

import { Mail, Sparkles } from "lucide-react"

import type { Messages } from "@/lib/i18n"

type LandingNoticeBarProps = {
  notice: Messages["notice"]
}

export function LandingNoticeBar({ notice }: LandingNoticeBarProps) {
  const ticker = `${notice.headline} · ${notice.body}`

  return (
    <div
      className="landing-notice-backdrop relative w-full overflow-hidden border-b border-white/10 text-background"
      role="region"
      aria-label={notice.label}
    >
      <div
        className="landing-notice-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-sm"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:gap-4 sm:py-3">
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <span className="landing-notice-badge-pulse inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/90">
            <Sparkles className="size-3 text-teal-200" aria-hidden />
            {notice.label}
          </span>
        </div>

        <div className="min-h-[1.25rem] min-w-0 flex-1 overflow-hidden">
          <p className="text-sm leading-snug text-white/95 sm:hidden">
            <span className="font-semibold">{notice.headline}</span>
            <span className="text-white/85"> {notice.body}</span>
          </p>

          <div className="relative hidden mask-[linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] sm:block">
            <div className="landing-notice-marquee-track flex w-max gap-0">
              <span className="shrink-0 pr-16 text-sm font-medium text-white/95">
                {ticker}
              </span>
              <span className="shrink-0 pr-16 text-sm font-medium text-white/95" aria-hidden>
                {ticker}
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 justify-center sm:justify-end">
          <a
            href={`mailto:${notice.email}?subject=${encodeURIComponent(notice.headline)}`}
            className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:border-teal-200/60 hover:bg-white/15 hover:shadow-[0_0_24px_-4px_oklch(0.75_0.12_190_/_0.35)]"
          >
            <Mail className="size-4 shrink-0 text-teal-200 transition group-hover:scale-110" aria-hidden />
            <span className="whitespace-nowrap">
              <span className="text-white/75">{notice.contactLabel}</span>
              <span className="mx-1.5 text-white/40" aria-hidden>
                —
              </span>
              <span className="font-semibold tracking-tight">{notice.email}</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
