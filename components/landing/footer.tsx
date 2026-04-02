import Link from "next/link"
import Image from "next/image"
import { Globe } from "lucide-react"

const footerLinks = {
  Platform: [
    { name: "MES", href: "#" },
    { name: "OEE", href: "#" },
    { name: "Maintenance", href: "#" },
    { name: "Quality", href: "#" },
    { name: "Logistics", href: "#" },
    { name: "Production", href: "#" }, // ✅ DODANO
  ],
  Solutions: [
    { name: "Automotive", href: "#" },
    { name: "Discrete Manufacturing", href: "#" },
    { name: "Process Industries", href: "#" },
    { name: "Enterprise", href: "#" },
  ],
  Resources: [
    { name: "Documentation", href: "#" },
    { name: "API Reference", href: "#" },
    { name: "Case Studies", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Support", href: "#" },
  ],
  Company: [
    { name: "About", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Partners", href: "#" },
    { name: "Contact", href: "#" },
  ],
}

const languages = [
  { code: "ba", name: "Bosanski" },
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
  { code: "si", name: "Slovenski" },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              
              {/* ✅ PRAVI LOGO */}
              <Image
                src="/logo.png"
                alt="Operonix"
                width={140}
                height={40}
                className="h-10 w-auto object-contain"
              />

            </Link>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Enterprise manufacturing platform for industrial excellence.
            </p>
            
            {/* Language selector */}
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

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground">{category}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Operonix. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}