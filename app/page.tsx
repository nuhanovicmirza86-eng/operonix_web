import { ProductionPitchSection } from "@/components/landing/production-pitch-section"
import { LandingNoticeBar } from "@/components/landing/landing-notice-bar"
import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { IndustrialPositioningSection } from "@/components/landing/industrial-positioning-section"
import { Modules } from "@/components/landing/modules"
import { Automotive } from "@/components/landing/automotive"
import { Solutions } from "@/components/landing/solutions"
import { CTA } from "@/components/landing/cta"
import { ScadaShowcase } from "@/components/landing/scada-showcase"
import { Footer } from "@/components/landing/footer"

import { getMessages, localeFromQueryLang } from "@/lib/i18n"

export const dynamic = "force-dynamic"
export const revalidate = 0

type HomeProps = {
  searchParams?: Promise<{
    lang?: string | string[]
  }>
}

export default async function Home({ searchParams }: HomeProps) {
  const params = searchParams ? await searchParams : {}
  const locale = localeFromQueryLang(params?.lang)

  const messages = await getMessages(locale)

  return (
    <main className="min-h-screen bg-background pt-20">
      <Header messages={messages.header} currentLang={locale} />

      <LandingNoticeBar notice={messages.notice} />

      <ProductionPitchSection
        messages={messages.productionPitch}
        currentLang={locale}
      />

      <Hero messages={messages.hero} />
      <IndustrialPositioningSection messages={messages.industrialPositioning} />
      <Modules messages={messages.modules} />
      <ScadaShowcase messages={messages.scada} />
      <Automotive messages={messages.automotive} />
      <Solutions messages={messages.solutions} />
      <CTA messages={messages.cta} currentLang={locale} />
      <Footer messages={messages.footer} currentLang={locale} />
    </main>
  )
}