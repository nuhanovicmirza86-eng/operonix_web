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
