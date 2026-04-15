import type { Metadata } from "next"

import { LegalDocShell } from "@/components/landing/legal-doc-shell"
import { LegalSectionsArticle } from "@/components/landing/legal-sections-article"
import { getMessages, localeFromQueryLang, type Locale } from "@/lib/i18n"

type PageProps = {
  searchParams?: Promise<{
    lang?: string | string[]
  }>
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = searchParams ? await searchParams : {}
  const locale = localeFromQueryLang(params?.lang)
  const messages = await getMessages(locale)
  const { metaTitle, metaDescription } = messages.termsOfService

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: "/terms-of-service",
      languages: {
        en: "/terms-of-service",
        bs: "/terms-of-service?lang=bs",
      },
    },
  }
}

export default async function TermsOfServicePage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {}
  const locale: Locale = localeFromQueryLang(params?.lang)
  const messages = await getMessages(locale)
  const doc = messages.termsOfService
  const articleLang = locale === "bs" ? "bs" : "en"

  return (
    <LegalDocShell
      homeLabel={doc.home}
      switchLanguage={doc.switchLanguage}
    >
      <LegalSectionsArticle articleLang={articleLang} doc={doc} />
    </LegalDocShell>
  )
}
