import type { IndustrialPositioningMessages } from "@/lib/i18n"
import { ArrowDown } from "lucide-react"

type IndustrialPositioningSectionProps = {
  messages: IndustrialPositioningMessages
}

export function IndustrialPositioningSection({ messages }: IndustrialPositioningSectionProps) {
  return (
    <section
      id="industrial-positioning"
      className="scroll-mt-24 border-t border-border bg-card/40 py-20 sm:py-28"
      aria-labelledby="industrial-positioning-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            {messages.sectionLabel}
          </p>
          <h2
            id="industrial-positioning-heading"
            className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {messages.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{messages.lead}</p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="rounded-xl border border-border bg-background/80 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-foreground">{messages.notReplacementTitle}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{messages.notReplacementBody}</p>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-background/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {messages.contrastMostLabel}
            </p>
            <p className="mt-3 text-foreground leading-relaxed">{messages.contrastMost}</p>
          </div>
          <div className="rounded-xl border border-accent/25 bg-accent/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              {messages.contrastOperonixLabel}
            </p>
            <p className="mt-3 text-foreground leading-relaxed">{messages.contrastOperonix}</p>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <h3 className="text-lg font-semibold text-foreground">{messages.layerTitle}</h3>

          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {messages.diagramSourcesLabel}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {messages.diagramSources.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-medium text-foreground"
                >
                  {label}
                </span>
              ))}
            </div>
            <ArrowDown className="h-5 w-5 text-muted-foreground" aria-hidden />
            <div className="rounded-lg border-2 border-accent/40 bg-card px-6 py-3 text-center">
              <span className="text-sm font-bold tracking-wide text-foreground sm:text-base">
                {messages.diagramCenter}
              </span>
            </div>
            <ArrowDown className="h-5 w-5 text-muted-foreground" aria-hidden />
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {messages.diagramOutputsLabel}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {messages.diagramOutputs.map((label) => (
                <span
                  key={label}
                  className="rounded-md border border-border/80 bg-background px-3 py-1 text-xs text-muted-foreground"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <h3 className="text-center text-lg font-semibold text-foreground">{messages.problemsTitle}</h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {messages.problems.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-border bg-background/70 p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-foreground">{messages.aiTitle}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {messages.aiIntro}
          </p>
          <ul className="mt-5 space-y-2">
            {messages.aiBullets.map((line) => (
              <li key={line} className="flex gap-2 text-sm text-foreground">
                <span className="text-accent" aria-hidden>
                  —
                </span>
                <span className="leading-relaxed">{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mx-auto mt-14 max-w-3xl text-center text-base font-medium leading-relaxed text-foreground">
          {messages.closing}
        </p>
      </div>
    </section>
  )
}
