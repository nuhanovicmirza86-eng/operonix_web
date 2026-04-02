import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Modules } from "@/components/landing/modules"
import { Automotive } from "@/components/landing/automotive"
import { Solutions } from "@/components/landing/solutions"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"

import { getMessages, defaultLocale } from "@/lib/i18n"

export default async function Home() {
  const messages = await getMessages(defaultLocale)

  return (
    <main className="min-h-screen bg-background pt-20">
      <Header />

      {/* NOTICE */}
      <div className="w-full bg-foreground text-background text-center text-sm py-2">
        {messages.notice.text}
      </div>

      <Hero />
      <Modules />
      <Automotive />
      <Solutions />
      <CTA />
      <Footer />
    </main>
  )
}