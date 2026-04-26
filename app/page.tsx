import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
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

      <div className="w-full bg-foreground text-background text-center text-sm py-2">
        {messages.notice.text}
      </div>

      <Hero messages={messages.hero} />
      <Modules messages={messages.modules} />
      <ScadaShowcase messages={messages.scada} />
      <Automotive messages={messages.automotive} />
      <Solutions messages={messages.solutions} />
      <CTA messages={messages.cta} currentLang={locale} />
      <Footer messages={messages.footer} currentLang={locale} />
    </main>
  )
}