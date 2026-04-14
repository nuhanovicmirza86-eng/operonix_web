"use client"

import QRCode from "react-qr-code"

import { AppBrandIcon } from "@/components/landing/app-brand-icon"
import { OPERONIX_MOBILE_INSTALL_URLS } from "@/lib/app-urls"

export type HeroMobileQrMessages = {
  title: string
  subtitle: string
  androidLabel: string
  iosLabel: string
  productionName: string
  maintenanceName: string
}

type HeroMobileQrSectionProps = {
  messages: HeroMobileQrMessages
}

function QrTile({
  url,
  label,
  ariaScanLabel,
}: {
  url: string
  label: string
  ariaScanLabel: string
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div
        className="rounded-lg border border-border bg-white p-2 shadow-sm"
        aria-label={ariaScanLabel}
      >
        <QRCode
          value={url}
          size={108}
          level="M"
          bgColor="#ffffff"
          fgColor="#0f172a"
        />
      </div>
      <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

function AppQrRow({
  variant,
  name,
  messages,
}: {
  variant: "production" | "maintenance"
  name: string
  messages: HeroMobileQrMessages
}) {
  const urls = OPERONIX_MOBILE_INSTALL_URLS[variant]
  const scan = `${name} — ${messages.subtitle}`

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border/80 bg-background/50 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="flex items-center gap-3 min-w-0">
        <AppBrandIcon variant={variant} size={44} className="rounded-lg" />
        <span className="text-sm font-semibold text-foreground leading-snug">
          {name}
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-6 sm:justify-end">
        <QrTile
          url={urls.android}
          label={messages.androidLabel}
          ariaScanLabel={`${scan} (${messages.androidLabel})`}
        />
        <QrTile
          url={urls.ios}
          label={messages.iosLabel}
          ariaScanLabel={`${scan} (${messages.iosLabel})`}
        />
      </div>
    </div>
  )
}

export function HeroMobileQrSection({ messages }: HeroMobileQrSectionProps) {
  return (
    <div className="mt-4 w-full max-w-xl mx-auto lg:mx-0 rounded-xl border border-border bg-card/40 p-5 backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 text-center lg:text-left">
        {messages.title}
      </p>
      <p className="text-sm text-muted-foreground mb-4 text-center lg:text-left leading-relaxed">
        {messages.subtitle}
      </p>
      <div className="flex flex-col gap-3">
        <AppQrRow
          variant="production"
          name={messages.productionName}
          messages={messages}
        />
        <AppQrRow
          variant="maintenance"
          name={messages.maintenanceName}
          messages={messages}
        />
      </div>
    </div>
  )
}
