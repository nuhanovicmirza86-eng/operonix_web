import Image from "next/image"

const productionSrc = "/branding/operonix-production.png"
const maintenanceSrc = "/branding/operonix-maintenance.png"

type AppBrandIconProps = {
  variant: "production" | "maintenance"
  size?: number
  className?: string
}

/** Brendirane PNG ikone iz `public/branding/` (iz Flutter `branding/` projekata). */
export function AppBrandIcon({ variant, size = 22, className }: AppBrandIconProps) {
  const src = variant === "production" ? productionSrc : maintenanceSrc
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className ?? ""}`}
      aria-hidden
    />
  )
}
