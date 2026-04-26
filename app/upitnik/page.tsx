import type { Metadata } from "next"
import { DigitalizationAssessmentPageView } from "@/components/assessment/digitalization-assessment-form"
import { UpitnikLanguageGate } from "@/components/assessment/upitnik-language-gate"
import { getAssessmentCopy } from "@/lib/assessment-strings"
import { getMessages, localeFromQueryLang, type Locale } from "@/lib/i18n"

export const dynamic = "force-dynamic"
export const revalidate = 0

type PageProps = {
  searchParams?: Promise<{ lang?: string | string[] }>
}

function hasLanguageChoice(raw: string | string[] | undefined): boolean {
  if (raw === undefined) return false
  const v = Array.isArray(raw) ? raw[0] : raw
  return v === "bs" || v === "en"
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = searchParams ? await searchParams : {}
  if (!hasLanguageChoice(params?.lang)) {
    return {
      title: "Upitnik · Questionnaire | Operonix",
      description: "Jezik upitnika / Choose language: Bosanski or English.",
    }
  }
  const loc: Locale = localeFromQueryLang(params?.lang)
  const t = getAssessmentCopy(loc)
  return {
    title: t.metaTitle,
    description: t.metaDescription,
  }
}

export default async function UpitnikPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {}
  if (!hasLanguageChoice(params?.lang)) {
    const messages = await getMessages("bs")
    return <UpitnikLanguageGate messages={messages} />
  }
  const locale = localeFromQueryLang(params?.lang)
  const messages = await getMessages(locale)
  const t = getAssessmentCopy(locale)

  return <DigitalizationAssessmentPageView t={t} currentLang={locale} headerFooterMessages={messages} />
}
