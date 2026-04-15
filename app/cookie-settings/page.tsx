import type { Metadata } from "next"

import { LegalCrossLinks } from "@/components/landing/legal-cross-links"
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
  const { metaTitle, metaDescription } = messages.cookieSettings

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: "/cookie-settings",
      languages: {
        en: "/cookie-settings",
        bs: "/cookie-settings?lang=bs",
      },
    },
  }
}

export default async function CookieSettingsPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {}
  const locale: Locale = localeFromQueryLang(params?.lang)
  const messages = await getMessages(locale)
  const doc = messages.cookieSettings
  const articleLang = locale === "bs" ? "bs" : "en"

  return (
    <LegalDocShell
      homeLabel={doc.home}
      switchLanguage={doc.switchLanguage}
    >
      <LegalSectionsArticle articleLang={articleLang} doc={doc} />
      <LegalCrossLinks
        locale={locale}
        current="cookies"
        labels={{
          privacy: messages.footer.links.privacy,
          terms: messages.footer.links.terms,
          cookies: messages.footer.links.cookies,
        }}
      />
    </LegalDocShell>
  )
}
