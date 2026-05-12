import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Samo znamenke (prazan string dozvoljen) — procjene „broj …“ bez slova. */
export function sanitizeIntegerDigits(value: string): string {
  return value.replace(/\D/g, '')
}

/** Nepozitivni decimalni unos: znamenke i najviše jedna točka (npr. postoci). */
export function sanitizeUnsignedDecimalString(value: string): string {
  let s = value.replace(/[^\d.]/g, '')
  const i = s.indexOf('.')
  if (i === -1) return s
  return s.slice(0, i + 1) + s.slice(i + 1).replace(/\./g, '')
}
