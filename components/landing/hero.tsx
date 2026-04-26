import Link from "next/link"
import { AppBrandIcon } from "@/components/landing/app-brand-icon"
import { HeroMobileQrSection } from "@/components/landing/hero-mobile-qr-section"
import { HeroProductVisuals } from "@/components/landing/hero-product-visuals"
import { HeroRotatingHighlights } from "@/components/landing/hero-rotating-highlights"
import { Button } from "@/components/ui/button"
import { OPERONIX_APP_URLS } from "@/lib/app-urls"
import { ArrowRight, Play } from "lucide-react"

type HeroStat = {
  value: string
  label: string
  sublabel: string
}

type HeroMessages = {
  badge: string
  titleLine1: string
  titleAccent: string
  titleLine2: string
  description: string
  rotatingHighlights: string[]
  visualLabels: {
    scada: string
    performance: string
    production: string
    footnote: string
  }
  primaryCta: string
  secondaryCta: string
  appLinksTitle: string
  productionApp: string
  maintenanceApp: string
  mobileQrTitle: string
  mobileQrSubtitleStore: string
  mobileQrSubtitleWeb: string
  mobileQrSubtitleMixed: string
  mobileQrAndroid: string
  mobileQrIos: string
  mobileQrRowWebBadge: string
  trustedBy: string
  companies: string[]
  stats: HeroStat[]
}

type HeroProps = {
  messages: HeroMessages
}

export function Hero({ messages }: HeroProps) {
  const upitnikHref = "/upitnik"
  return (
    <section className="relative min-h-screen overflow-x-hidden pt-16">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1f2c_1px,transparent_1px),linear-gradient(to_bottom,#1a1f2c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[128px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.22fr)] lg:items-stretch">
          {/* Left content (definira min. visinu reda) */}
          <div className="text-center lg:text-left lg:min-h-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              {messages.badge}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              <span className="text-balance">{messages.titleLine1}</span>{" "}
              <span className="text-accent">{messages.titleAccent}</span>{" "}
              <span className="text-balance">{messages.titleLine2}</span>
            </h1>

            <div className="mt-5">
              <HeroRotatingHighlights
                messages={messages.rotatingHighlights}
                className="max-w-xl mx-auto lg:mx-0"
              />
            </div>

            <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {messages.description}
            </p>

            <div className="mt-8 w-full max-w-xl mx-auto lg:mx-0 rounded-xl border border-border bg-card/40 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 text-center lg:text-left">
                {messages.appLinksTitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button
                  variant="secondary"
                  size="lg"
                  className="gap-2.5 justify-center border border-border bg-background/80 text-foreground hover:bg-secondary"
                  asChild
                >
                  <a
                    href={OPERONIX_APP_URLS.production}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AppBrandIcon variant="production" size={24} />
                    {messages.productionApp}
                  </a>
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="gap-2.5 justify-center border border-border bg-background/80 text-foreground hover:bg-secondary"
                  asChild
                >
                  <a
                    href={OPERONIX_APP_URLS.maintenance}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AppBrandIcon variant="maintenance" size={24} />
                    {messages.maintenanceApp}
                  </a>
                </Button>
              </div>
            </div>

            <HeroMobileQrSection
              messages={{
                title: messages.mobileQrTitle,
                subtitleStore: messages.mobileQrSubtitleStore,
                subtitleWeb: messages.mobileQrSubtitleWeb,
                subtitleMixed: messages.mobileQrSubtitleMixed,
                androidLabel: messages.mobileQrAndroid,
                iosLabel: messages.mobileQrIos,
                rowWebBadge: messages.mobileQrRowWebBadge,
                productionName: messages.productionApp,
                maintenanceName: messages.maintenanceApp,
              }}
            />

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 gap-2" asChild>
                <Link href={upitnikHref}>
                  {messages.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary gap-2" asChild>
                <Link href="#modules">
                  <Play className="h-4 w-4" />
                  {messages.secondaryCta}
                </Link>
              </Button>
            </div>
          </div>

          {/* Desno: ista visina kao lijevo (stretch) — slika raste, statovi na dnu */}
          <div className="mx-auto flex min-h-0 w-full min-w-0 max-w-xl flex-col gap-6 lg:mx-0 lg:h-full lg:max-w-none">
            <HeroProductVisuals
              labels={messages.visualLabels}
              className="min-h-0 flex-1"
            />
            <div className="grid shrink-0 grid-cols-2 gap-3 sm:gap-4">
              {messages.stats.map((stat, index) => (
                <div
                  key={index}
                  className="relative group rounded-lg border border-border bg-card/50 p-4 sm:p-5 hover:border-accent/50 transition-colors"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="mt-1.5 text-sm font-medium text-foreground">
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.sublabel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trusted by logos */}
        <div className="mt-20 border-t border-border pt-12">
          <p className="text-center text-sm text-muted-foreground mb-8">
            {messages.trustedBy}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {messages.companies.map((company) => (
              <div key={company} className="text-muted-foreground/50 font-semibold text-lg tracking-wider">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}