import type { Locale } from "@/lib/i18n"

/**
 * Naziv tvrtke u zaglavlju PDF-a i službenim dokumentima (usklađeno s potvrdama e-poštom).
 */
export const OPERONIX_DOCUMENT_COMPANY_NAME = "Operonix Industrial"

export function assessmentPdfFooterNote(locale: Locale): string {
  if (locale === "bs") {
    return (
      "Ovaj dokument je informativni sažetak upitnika; ne predstavlja ponudu ni ugovor. " +
      "Obvezujući su tek pisan dokument tima Operonix Industrial."
    )
  }
  return (
    "This PDF is an informative questionnaire summary; it is not a quote or contract. " +
    "Only a written proposal from Operonix Industrial is binding."
  )
}
