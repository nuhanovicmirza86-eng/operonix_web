import type { LegalArticlePageMessages } from "@/lib/i18n"

const CONTACT_EMAIL = "info@operonixindustrial.com"
const WEBSITE_HREF = "https://www.operonixindustrial.com"

type LegalSectionsArticleProps = {
  articleLang: "en" | "bs"
  doc: LegalArticlePageMessages
}

export function LegalSectionsArticle({
  articleLang,
  doc,
}: LegalSectionsArticleProps) {
  return (
    <article
      lang={articleLang}
      className="mx-auto max-w-3xl px-6 py-12 text-muted-foreground"
    >
      <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {doc.title}
      </h1>

      <p className="mt-6 leading-relaxed">{doc.intro}</p>

      {doc.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">
            {section.heading}
          </h2>
          <p className="mt-3 leading-relaxed whitespace-pre-line">
            {section.body}
          </p>
        </section>
      ))}

      <section className="mt-10 rounded-lg border border-border bg-card/50 p-6">
        <h2 className="text-lg font-semibold text-foreground">
          {doc.contact.heading}
        </h2>
        <p className="mt-3 leading-relaxed text-foreground">
          {doc.contact.company}
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
              {doc.contact.website}
            </a>
          </li>
        </ul>
      </section>
    </article>
  )
}
