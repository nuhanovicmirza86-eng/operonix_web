import Image from "next/image"
import Link from "next/link"

type LegalDocShellProps = {
  homeLabel: string
  switchLanguage: { label: string; href: string }
  children: React.ReactNode
}

export function LegalDocShell({
  homeLabel,
  switchLanguage,
  children,
}: LegalDocShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="relative z-10 border-b border-border">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Operonix"
              width={140}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link
              href={switchLanguage.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {switchLanguage.label}
            </Link>
            <Link
              href="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {homeLabel}
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}
