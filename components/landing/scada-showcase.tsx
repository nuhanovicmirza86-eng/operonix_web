import Link from "next/link"
import { Monitor, Gauge, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import { OPERONIX_APP_URLS } from "@/lib/app-urls"

type ScadaItem = {
  title: string
  caption: string
}

type ScadaMessages = {
  sectionLabel: string
  title: string
  lead: string
  highlights: string[]
  items: ScadaItem[]
  cta: {
    title: string
    body: string
    button: string
  }
}

type ScadaShowcaseProps = {
  messages: ScadaMessages
}

const itemIcons = [Monitor, Gauge, Bell] as const

const productionUrl = OPERONIX_APP_URLS.production

export function ScadaShowcase({ messages }: ScadaShowcaseProps) {
  return (
    <section
      id="scada"
      className="py-24 sm:py-32 border-t border-border bg-gradient-to-b from-background to-card/50"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-wider">
            {messages.sectionLabel}
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {messages.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {messages.lead}
          </p>
          <ul className="mt-6 mx-auto max-w-2xl list-disc pl-5 sm:pl-0 sm:list-inside text-left sm:text-center space-y-2 text-sm sm:text-base text-muted-foreground">
            {messages.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {messages.items.map((item, i) => {
            const Icon = itemIcons[Math.min(i, itemIcons.length - 1)]
            return (
              <article
                key={item.title}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className={cn(
                    "relative flex aspect-[16/9] w-full items-center justify-center",
                    "bg-gradient-to-br from-secondary/50 via-card to-secondary/30",
                    "border-b border-border/60"
                  )}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,hsl(var(--accent)/0.12),transparent_50%)]" />
                  <Icon
                    className="relative z-[1] h-16 w-16 text-accent/90 transition-transform duration-300 group-hover:scale-105"
                    aria-hidden
                  />
                </div>
                <div className="p-4 border-t border-border/80 text-center">
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.caption}
                  </p>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-14 mx-auto max-w-2xl rounded-xl border border-border bg-card/80 p-6 sm:p-8 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-foreground">
            {messages.cta.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {messages.cta.body}
          </p>
          <Link
            href={productionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {messages.cta.button}
          </Link>
        </div>
      </div>
    </section>
  )
}
