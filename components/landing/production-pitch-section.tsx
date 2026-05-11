import Link from "next/link"
import { ArrowRight, CheckCircle2, Factory, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Locale, Messages } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type ProductionPitchSectionProps = {
  messages: Messages["productionPitch"]
  currentLang: Locale
}

export function ProductionPitchSection({
  messages,
  currentLang,
}: ProductionPitchSectionProps) {
  const upitnikHref = `/upitnik?lang=${currentLang}`

  return (
    <section
      className="relative border-b border-border/80 bg-card/30 py-16 sm:py-20"
      aria-labelledby="production-pitch-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.65_0.15_180_/_0.12),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent">
            <Sparkles className="size-3.5" aria-hidden />
            Operonix Industrial
          </p>
          <h2
            id="production-pitch-title"
            className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
          >
            {messages.title}
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>{messages.lead}</p>
          <p>{messages.scope}</p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div
            className={cn(
              "rounded-2xl border border-border/80 bg-background/60 p-6 shadow-sm backdrop-blur-sm sm:p-8",
              "ring-1 ring-white/5"
            )}
          >
            <div className="mb-6 flex items-center gap-2 text-foreground">
              <Factory className="size-5 text-accent shrink-0" aria-hidden />
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {messages.whatYouGetTitle}
              </h3>
            </div>
            <ul className="space-y-3">
              {messages.whatYouGetItems.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-snug text-muted-foreground sm:text-base">
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-accent"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <div className="rounded-2xl border border-border/80 bg-gradient-to-br from-secondary/40 via-background/80 to-background/40 p-6 sm:p-8">
              <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {messages.whyTitle}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {messages.whyBody}
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-background/60 p-6 backdrop-blur-sm sm:p-8">
              <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {messages.yourProductionTitle}
              </h3>
              <p className="mt-3 text-sm font-medium text-foreground sm:text-base">
                {messages.yourProductionIntro}
              </p>
              <ul className="mt-4 space-y-2.5">
                {messages.yourProductionItems.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm text-muted-foreground sm:text-base"
                  >
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {messages.yourProductionClosing}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-accent/25 bg-accent/5 p-8 text-center sm:p-10">
          <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
            {messages.ctaTitle}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {messages.ctaBody}
          </p>
          <Button
            size="lg"
            className="mt-8 gap-2 bg-foreground text-background hover:bg-foreground/90"
            asChild
          >
            <Link href={upitnikHref}>
              {messages.ctaButton}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-2 text-center">
          <p className="text-lg font-medium text-foreground sm:text-xl">
            {messages.tagline1}
          </p>
          <p className="text-sm font-medium text-accent sm:text-base">
            {messages.tagline2}
          </p>
        </div>
      </div>
    </section>
  )
}
