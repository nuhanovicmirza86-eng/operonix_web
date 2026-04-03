type HeroStat = {
  value: string
  label: string
  sublabel: string
}

type ModuleItem = {
  id: string
  name: string
  fullName: string
  description: string
  features: string[]
}

type CertificationItem = {
  title: string
  description: string
}

type SolutionStat = {
  label: string
  value: string
}

type SolutionItem = {
  id: string
  title: string
  description: string
  stats: SolutionStat[]
  features: string[]
}

type CapabilityItem = {
  id: string
  label: string
}

type CtaStat = {
  value: string
  label: string
}

type FooterLinks = {
  mes: string
  oee: string
  maintenance: string
  quality: string
  logistics: string
  production: string
  automotive: string
  discrete: string
  process: string
  enterprise: string
  documentation: string
  api: string
  caseStudies: string
  blog: string
  support: string
  about: string
  careers: string
  partners: string
  contact: string
  privacy: string
  terms: string
  cookies: string
}

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
  hero: {
    badge: string
    titleLine1: string
    titleAccent: string
    titleLine2: string
    description: string
    primaryCta: string
    secondaryCta: string
    trustedBy: string
    companies: string[]
    stats: HeroStat[]
  }
  modules: {
    sectionLabel: string
    title: string
    description: string
    dashboardLabel: string
    metrics: string[]
    items: ModuleItem[]
  }
  automotive: {
    sectionLabel: string
    title: string
    description: string
    complianceTitle: string
    complianceSubtitle: string
    floatingBadge: string
    certifications: CertificationItem[]
    complianceFeatures: string[]
  }
  solutions: {
    sectionLabel: string
    title: string
    description: string
    capabilities: CapabilityItem[]
    items: SolutionItem[]
  }
  cta: {
    title: string
    description: string
    primaryCta: string
    secondaryCta: string
    trustItems: string[]
    stats: CtaStat[]
  }
  footer: {
    description: string
    platform: string
    solutions: string
    resources: string
    company: string
    links: FooterLinks
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