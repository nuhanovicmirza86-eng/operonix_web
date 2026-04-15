import {
  operonixCookieSettingsUrl,
  operonixPrivacyPolicyUrl,
  operonixTermsOfServiceUrl,
} from "@/lib/app-urls"
import type { Locale } from "@/lib/i18n"

type LegalCrossLinksProps = {
  locale: Locale
  current: "privacy" | "terms" | "cookies"
  labels: {
    privacy: string
    terms: string
    cookies: string
  }
}

function NavItem({
  id,
  current,
  href,
  label,
}: {
  id: LegalCrossLinksProps["current"]
  current: LegalCrossLinksProps["current"]
  href: string
  label: string
}) {
  if (current === id) {
    return (
      <span className="font-medium text-foreground" aria-current="page">
        {label}
      </span>
    )
  }
  return (
    <a
      href={href}
      className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
    >
      {label}
    </a>
  )
}

export function LegalCrossLinks({
  locale,
  current,
  labels,
}: LegalCrossLinksProps) {
  const loc = locale === "bs" ? "bs" : "en"
  const privacyHref = operonixPrivacyPolicyUrl(loc)
  const termsHref = operonixTermsOfServiceUrl(loc)
  const cookieHref = operonixCookieSettingsUrl(loc)

  return (
    <nav
      className="mx-auto max-w-3xl border-t border-border px-6 py-8"
      aria-label="Legal documents"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm">
        <NavItem
          id="privacy"
          current={current}
          href={privacyHref}
          label={labels.privacy}
        />
        <span className="select-none text-muted-foreground" aria-hidden>
          ·
        </span>
        <NavItem
          id="terms"
          current={current}
          href={termsHref}
          label={labels.terms}
        />
        <span className="select-none text-muted-foreground" aria-hidden>
          ·
        </span>
        <NavItem
          id="cookies"
          current={current}
          href={cookieHref}
          label={labels.cookies}
        />
      </div>
    </nav>
  )
}
