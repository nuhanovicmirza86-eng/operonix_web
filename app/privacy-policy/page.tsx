import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

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
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Operonix"
              width={140}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link
              href={pp.switchLanguage.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {pp.switchLanguage.label}
            </Link>
            <Link
              href="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {pp.home}
            </Link>
          </div>
        </div>
      </header>

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
    </div>
  )
}
