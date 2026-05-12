import fs from "fs"
import path from "path"

/**
 * Logo iz `public/logo.png` za ugradnju u PDF (samo server / Node).
 */
export function getOperonixLogoDataUrl(): string | null {
  try {
    const p = path.join(process.cwd(), "public", "logo.png")
    if (!fs.existsSync(p)) return null
    const buf = fs.readFileSync(p)
    return `data:image/png;base64,${buf.toString("base64")}`
  } catch {
    return null
  }
}
