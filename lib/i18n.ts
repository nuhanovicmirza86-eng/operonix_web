type Messages = {
  notice: {
    label: string
    text: string
  }
  header: {
    modules: string
    automotive: string
    solutions: string
    about: string
    signIn: string
    requestDemo: string
  }
  footer: {
    description: string
  }
}

export const locales = ["en", "bs"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export async function getMessages(locale: Locale): Promise<Messages> {
  switch (locale) {
    case "bs":
      return (await import("../messages/bs.json")).default
    case "en":
    default:
      return (await import("../messages/en.json")).default
  }
}