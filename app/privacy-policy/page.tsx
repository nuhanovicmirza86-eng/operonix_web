import type { Metadata } from "next"

import { LegalCrossLinks } from "@/components/landing/legal-cross-links"
import { LegalDocShell } from "@/components/landing/legal-doc-shell"
import { getMessages, localeFromQueryLang, type Locale } from "@/lib/i18n"

const CONTACT_EMAIL = "info@operonixindustrial.com"
const WEBSITE_HREF = "https://www.operonixindustrial.com"

type PrivacyPageProps = {
  searchParams?: Promise<{
    lang?: string | string[]
  }>
}

export async function generateMetadata({
  searchParams,
}: PrivacyPageProps): Promise<Metadata> {
  const params = searchParams ? await searchParams : {}
  const locale = localeFromQueryLang(params?.lang)
  const messages = await getMessages(locale)
  const { metaTitle, metaDescription } = messages.privacyPolicy

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: "/privacy-policy",
      languages: {
        en: "/privacy-policy",
        bs: "/privacy-policy?lang=bs",
      },
    },
  }
}

export default async function PrivacyPolicyPage({
  searchParams,
}: PrivacyPageProps) {
  const params = searchParams ? await searchParams : {}
  const locale: Locale = localeFromQueryLang(params?.lang)
  const messages = await getMessages(locale)
  const pp = messages.privacyPolicy
  const articleLang = locale === "bs" ? "bs" : "en"

  return (
    <LegalDocShell homeLabel={pp.home} switchLanguage={pp.switchLanguage}>
      <article
        lang={articleLang}
        className="mx-auto max-w-3xl px-6 py-12 text-muted-foreground"
      >
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {pp.title}
        </h1>

        <p className="mt-6 leading-relaxed">{pp.intro}</p>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">
            {pp.collection.heading}
          </h2>
          <p className="mt-3 leading-relaxed">{pp.collection.lead}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">
            {pp.collection.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">
            {pp.use.heading}
          </h2>
          <p className="mt-3 leading-relaxed">{pp.use.lead}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">
            {pp.use.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">
            {pp.sharing.heading}
          </h2>
          <p className="mt-3 leading-relaxed">{pp.sharing.body}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">
            {pp.security.heading}
          </h2>
          <p className="mt-3 leading-relaxed">{pp.security.body}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">
            {pp.deletion.heading}
          </h2>
          <p className="mt-3 leading-relaxed">
            {pp.deletion.lead}{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </section>

        <section className="mt-10 rounded-lg border border-border bg-card/50 p-6">
          <h2 className="text-lg font-semibold text-foreground">
            {pp.contact.heading}
          </h2>
          <p className="mt-3 leading-relaxed text-foreground">
            {pp.contact.company}
          </p>
          <ul className="mt-3 space-y-2 leading-relaxed">
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-accent underline-offset-4 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a
                href={WEBSITE_HREF}
                className="text-accent underline-offset-4 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {pp.contact.website}
              </a>
            </li>
          </ul>
        </section>
      </article>
      <LegalCrossLinks
        locale={locale}
        current="privacy"
        labels={{
          privacy: messages.footer.links.privacy,
          terms: messages.footer.links.terms,
          cookies: messages.footer.links.cookies,
        }}
      />
    </LegalDocShell>
  )
}
