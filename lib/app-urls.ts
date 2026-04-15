/** Javni marketing sajt (landing, politika privatnosti). */
export const OPERONIX_MARKETING_ORIGIN = "https://operonixindustrial.com" as const

/**
 * Kanonski URL stranice politike privatnosti.
 * Koristi puni origin da navigacija uvijek otvori marketing sajt (stabilno i kad
 * korisnik nije na istom hostu npr. Flutter web na poddomenu).
 */
export function operonixPrivacyPolicyUrl(locale: "en" | "bs"): string {
  const q = locale === "bs" ? "?lang=bs" : ""
  return `${OPERONIX_MARKETING_ORIGIN}/privacy-policy${q}`
}

/** Javni URL-ovi Flutter web aplikacija (Firebase Hosting / custom domen). */
export const OPERONIX_APP_URLS = {
  production: "https://production.operonixindustrial.com",
  maintenance: "https://maintenance.operonixindustrial.com",
} as const

/**
 * URL-ovi za QR kodove (Android / iOS) na landing stranici.
 * Kad objavite native aplikacije, postavite odgovarajuće `NEXT_PUBLIC_*` varijable u build okruženju;
 * inače se koristi web URL aplikacije (isti link na oba koda dok nisu različiti store linkovi).
 */
function mobileInstallUrl(
  envKey: string,
  webFallback: string
): string {
  const raw = process.env[envKey]
  if (typeof raw === "string") {
    const t = raw.trim()
    if (t.length > 0) return t
  }
  return webFallback
}

export const OPERONIX_MOBILE_INSTALL_URLS = {
  production: {
    android: mobileInstallUrl(
      "NEXT_PUBLIC_PRODUCTION_ANDROID_URL",
      OPERONIX_APP_URLS.production
    ),
    ios: mobileInstallUrl(
      "NEXT_PUBLIC_PRODUCTION_IOS_URL",
      OPERONIX_APP_URLS.production
    ),
  },
  maintenance: {
    android: mobileInstallUrl(
      "NEXT_PUBLIC_MAINTENANCE_ANDROID_URL",
      OPERONIX_APP_URLS.maintenance
    ),
    ios: mobileInstallUrl(
      "NEXT_PUBLIC_MAINTENANCE_IOS_URL",
      OPERONIX_APP_URLS.maintenance
    ),
  },
} as const

export type OperonixAppVariant = keyof typeof OPERONIX_MOBILE_INSTALL_URLS

/** True kad QR još uvijek pokazuje na web URL (nema posebnog Play / App Store linka). */
export function mobileQrRowOpensWebOnly(variant: OperonixAppVariant): boolean {
  const web = OPERONIX_APP_URLS[variant]
  const u = OPERONIX_MOBILE_INSTALL_URLS[variant]
  return u.android === web && u.ios === web
}

/*
 * Za instalaciju native aplikacije skeniranjem QR-a, postavite URL trgovina u Vercel env (build):
 *
 *   NEXT_PUBLIC_PRODUCTION_ANDROID_URL=https://play.google.com/store/apps/details?id=com.operonix.production
 *   NEXT_PUBLIC_PRODUCTION_IOS_URL=https://apps.apple.com/... (App Store Connect)
 *   NEXT_PUBLIC_MAINTENANCE_ANDROID_URL=...
 *   NEXT_PUBLIC_MAINTENANCE_IOS_URL=...
 *
 * Android: Play Console → aplikacija → „View on Play“ kopira link.
 * iOS: App Store Connect → App Information → Apple ID link.
 */
