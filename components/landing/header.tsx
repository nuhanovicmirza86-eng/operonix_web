"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AppBrandIcon } from "@/components/landing/app-brand-icon"
import { OPERONIX_APP_URLS } from "@/lib/app-urls"
import { Globe, Menu, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type HeaderMessages = {
  modules: string
  scada: string
  automotive: string
  solutions: string
  about: string
  signIn: string
  requestDemo: string
  productionApp: string
  maintenanceApp: string
}

type HeaderProps = {
  messages: HeaderMessages
  currentLang?: "en" | "bs"
}

const languages = [
  { code: "bs", name: "Bosanski" },
  { code: "en", name: "English" },
]

export function Header({ messages, currentLang = "en" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: messages.modules, href: "#modules" },
    { name: messages.scada, href: "#scada" },
    { name: messages.automotive, href: "#automotive" },
    { name: messages.solutions, href: "#solutions" },
    { name: messages.about, href: "#about" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          <div className="flex lg:flex-1">
            <Link href={`/?lang=${currentLang}`} className="-m-1.5 p-1.5 flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Operonix"
                width={160}
                height={160}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 lg:items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <span className="uppercase">{currentLang}</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="bg-card border-border">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} asChild className="cursor-pointer">
                    <Link href={`/?lang=${lang.code}`}>{lang.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-2 border-l border-border pl-4">
              <Button variant="outline" size="sm" className="gap-1.5 text-foreground" asChild>
                <a
                  href={OPERONIX_APP_URLS.production}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={messages.productionApp}
                >
                  <AppBrandIcon variant="production" size={20} />
                  <span className="max-w-[5.5rem] truncate sm:max-w-none">{messages.productionApp}</span>
                </a>
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5 text-foreground" asChild>
                <a
                  href={OPERONIX_APP_URLS.maintenance}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={messages.maintenanceApp}
                >
                  <AppBrandIcon variant="maintenance" size={20} />
                  <span className="max-w-[5.5rem] truncate sm:max-w-none">{messages.maintenanceApp}</span>
                </a>
              </Button>
            </div>

            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              {messages.signIn}
            </Button>

            <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
              {messages.requestDemo}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="grid grid-cols-2 gap-2 px-3 pt-2">
                <Button variant="outline" size="sm" className="gap-1.5 justify-center text-foreground" asChild>
                  <a
                    href={OPERONIX_APP_URLS.production}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <AppBrandIcon variant="production" size={20} />
                    {messages.productionApp}
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 justify-center text-foreground" asChild>
                  <a
                    href={OPERONIX_APP_URLS.maintenance}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <AppBrandIcon variant="maintenance" size={20} />
                    {messages.maintenanceApp}
                  </a>
                </Button>
              </div>

              <div className="px-3 py-2">
                <div className="mb-2 text-sm font-medium text-muted-foreground">
                  Language
                </div>

                <div className="flex flex-col gap-1">
                  {languages.map((lang) => (
                    <Link
                      key={lang.code}
                      href={`/?lang=${lang.code}`}
                      className="rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {lang.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <Button variant="ghost" className="justify-start text-muted-foreground">
                  {messages.signIn}
                </Button>

                <Button className="bg-foreground text-background">
                  {messages.requestDemo}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}