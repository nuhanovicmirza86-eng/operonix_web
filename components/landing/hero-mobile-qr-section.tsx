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

const QR_SIZE = 96

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
    <div className="flex shrink-0 flex-col items-center gap-2">
      <div
        className="rounded-md border border-border/80 bg-white p-1.5 shadow-sm"
        aria-label={ariaScanLabel}
      >
        <QRCode
          value={url}
          size={QR_SIZE}
          level="M"
          bgColor="#ffffff"
          fgColor="#0f172a"
        />
      </div>
      <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

function AppQrRow({
  variant,
  name,
  messages,
  isFirst,
}: {
  variant: "production" | "maintenance"
  name: string
  messages: HeroMobileQrMessages
  isFirst: boolean
}) {
  const urls = OPERONIX_MOBILE_INSTALL_URLS[variant]
  const scan = `${name} — ${messages.subtitle}`

  return (
    <div
      className={
        isFirst
          ? "pb-5"
          : "border-t border-border/50 pt-5"
      }
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
        {/* Ista širina za oba naziva — dosljedno prelamanje u 2 reda */}
        <div className="flex shrink-0 items-center gap-3 sm:w-[10.5rem] sm:min-w-[10.5rem]">
          <AppBrandIcon variant={variant} size={40} className="shrink-0 rounded-lg" />
          <span className="text-sm font-semibold leading-snug text-foreground">
            {name}
          </span>
        </div>

        {/* Uvijek dva QR-a u jednom redu — bez wrap-a */}
        <div className="flex shrink-0 flex-nowrap items-start justify-center gap-6 sm:flex-1 sm:justify-end sm:gap-8">
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
    </div>
  )
}

export function HeroMobileQrSection({ messages }: HeroMobileQrSectionProps) {
  return (
    <div className="mt-4 w-full max-w-xl mx-auto lg:mx-0 rounded-xl border border-border bg-card/40 px-4 py-4 backdrop-blur-sm sm:px-5 sm:py-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center lg:text-left">
        {messages.title}
      </p>
      <p className="mt-1 text-sm text-muted-foreground text-center lg:text-left leading-relaxed">
        {messages.subtitle}
      </p>

      <div className="mt-4">
        <AppQrRow
          variant="production"
          name={messages.productionName}
          messages={messages}
          isFirst
        />
        <AppQrRow
          variant="maintenance"
          name={messages.maintenanceName}
          messages={messages}
          isFirst={false}
        />
      </div>
    </div>
  )
}
