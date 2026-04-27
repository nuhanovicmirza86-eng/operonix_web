import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import type { Messages } from "@/lib/i18n"

type Props = {
  messages: Messages
}

export function UpitnikLanguageGate({ messages }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full bg-foreground text-background text-center text-sm py-2">
        {messages.notice.text}
      </div>
      <Header messages={messages.header} currentLang="bs" />

      <div className="mx-auto max-w-lg px-4 sm:px-6 py-16 sm:py-20">
        <Card className="border-[#00C2FF]/30 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-serif">
              {messages.upitnikGate.heading}
            </CardTitle>
            <p className="text-sm text-neutral-200 leading-relaxed sm:text-[15px]">
              {messages.upitnikGate.intro}
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              asChild
              className="w-full h-12 text-base font-medium justify-center border border-neutral-300 bg-white !text-neutral-900 shadow-sm hover:bg-neutral-100"
            >
              <Link href="/upitnik?lang=bs">{messages.upitnikGate.langBs}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full h-12 text-base font-medium justify-center border-2 border-neutral-300 bg-white !text-neutral-900 shadow-sm hover:bg-neutral-100"
            >
              <Link href="/upitnik?lang=en">{messages.upitnikGate.langEn}</Link>
            </Button>
            <p className="pt-2 text-center">
              <Link
                href="/?lang=bs"
                className="text-sm text-neutral-300 hover:text-white underline-offset-4 hover:underline"
              >
                {messages.upitnikGate.backHome}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer messages={messages.footer} currentLang="bs" />
    </div>
  )
}
