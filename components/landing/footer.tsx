import Link from "next/link"
import Image from "next/image"
import type { LucideIcon } from "lucide-react"
import { Factory, Globe, Wrench } from "lucide-react"

import { OPERONIX_APP_URLS } from "@/lib/app-urls"

type FooterMessages = {
  description: string
  platform: string
  solutions: string
  resources: string
  company: string
  links: {
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
}

type FooterProps = {
  messages: FooterMessages
}

type FooterLinkItem = {
  name: string
  href: string
  icon?: LucideIcon
}

const languages = [
  { code: "bs", name: "Bosanski" },
  { code: "en", name: "English" },
]

export function Footer({ messages }: FooterProps) {
  const footerLinks: Record<string, FooterLinkItem[]> = {
    [messages.platform]: [
      { name: messages.links.mes, href: "#" },
      { name: messages.links.oee, href: "#" },
      {
        name: messages.links.maintenance,
        href: OPERONIX_APP_URLS.maintenance,
        icon: Wrench,
      },
      { name: messages.links.quality, href: "#" },
      { name: messages.links.logistics, href: "#" },
      {
        name: messages.links.production,
        href: OPERONIX_APP_URLS.production,
        icon: Factory,
      },
    ],
    [messages.solutions]: [
      { name: messages.links.automotive, href: "#" },
      { name: messages.links.discrete, href: "#" },
      { name: messages.links.process, href: "#" },
      { name: messages.links.enterprise, href: "#" },
    ],
    [messages.resources]: [
      { name: messages.links.documentation, href: "#" },
      { name: messages.links.api, href: "#" },
      { name: messages.links.caseStudies, href: "#" },
      { name: messages.links.blog, href: "#" },
      { name: messages.links.support, href: "#" },
    ],
    [messages.company]: [
      { name: messages.links.about, href: "#" },
      { name: messages.links.careers, href: "#" },
      { name: messages.links.partners, href: "#" },
      { name: messages.links.contact, href: "#" },
    ],
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Operonix"
                width={140}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {messages.description}
            </p>
            
            <div className="mt-6 flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <select className="bg-transparent text-sm text-muted-foreground border-none focus:ring-0 cursor-pointer">
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground">{category}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => {
                  const Icon = link.icon
                  return (
                    <li key={link.name} className="flex items-center gap-2">
                      {Icon ? (
                        <Icon
                          className="h-4 w-4 shrink-0 text-muted-foreground"
                          aria-hidden
                        />
                      ) : null}
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        {...(link.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Operonix. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">
              {messages.links.privacy}
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              {messages.links.terms}
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              {messages.links.cookies}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}