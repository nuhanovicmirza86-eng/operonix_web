const PDF_BODY_MAX = 180_000

type PdfMakeFactory = {
  vfs: Record<string, string>
  createPdf: (def: unknown) => { getBuffer: () => Promise<Buffer> }
}

export type AssessmentPdfBranding = {
  /** Puno ime kompanije u zaglavlju (npr. Operonix Industrial). */
  companyName: string
  /** Podnaslov dokumenta (npr. vrsta upitnika + klijent). */
  documentHeading: string
  /** Sitna napomena u podnožju stranice. */
  footerNote: string
  /** data:image/png;base64,... ili null ako logo nedostaje. */
  logoDataUrl: string | null
}

export async function buildAssessmentPdfBuffer(
  humanBlock: string,
  branding: AssessmentPdfBranding
): Promise<Buffer> {
  let body = humanBlock
  if (body.length > PDF_BODY_MAX) {
    body =
      body.slice(0, PDF_BODY_MAX) +
      "\n\n[… tijelo skraćeno — potpuni tekst u ovom PDF-u je obrezan zbog veličine.]"
  }

  const pdfMake = (await import("pdfmake/build/pdfmake")).default as PdfMakeFactory
  const pdfFonts = (await import("pdfmake/build/vfs_fonts"))
    .default as Record<string, string>
  pdfMake.vfs = pdfFonts

  const docDefinition = {
    pageSize: "A4" as const,
    pageMargins: [48, 116, 48, 76] as [number, number, number, number],
    header: function (
      currentPage: number,
      _pageCount: number,
      pageSize: { width: number; height: number }
    ) {
      const narrow = currentPage > 1
      const logoW = narrow ? 72 : 108
      const leftCol = branding.logoDataUrl
        ? { image: branding.logoDataUrl, width: logoW, margin: [0, 0, 14, 0] }
        : { width: logoW, text: "" }

      return {
        margin: [48, 22, 48, 0],
        stack: [
          {
            columns: [
              leftCol,
              {
                width: "*",
                stack: [
                  {
                    text: branding.companyName,
                    bold: true,
                    fontSize: narrow ? 11 : 14,
                    alignment: "right" as const,
                    color: "#0B1F3A",
                  },
                  {
                    text: branding.documentHeading,
                    fontSize: narrow ? 8 : 10,
                    alignment: "right" as const,
                    color: "#333333",
                    margin: [0, 3, 0, 0],
                  },
                ],
              },
            ],
          },
          {
            canvas: [
              {
                type: "line" as const,
                x1: 0,
                y1: 8,
                x2: pageSize.width - 96,
                y2: 8,
                lineWidth: 0.85,
                lineColor: "#0B1F3A",
              },
            ],
            margin: [0, 12, 0, 0],
          },
        ],
      }
    },
    footer: function (currentPage: number, pageCount: number) {
      return {
        margin: [48, 4, 48, 28],
        stack: [
          {
            text: branding.footerNote,
            fontSize: 7,
            color: "#555555",
            alignment: "center" as const,
            italics: true,
          },
          {
            text: `${currentPage} / ${pageCount}`,
            fontSize: 8,
            color: "#666666",
            alignment: "center" as const,
            margin: [0, 6, 0, 0],
          },
        ],
      }
    },
    content: [{ text: body, fontSize: 9, lineHeight: 1.22 }],
    defaultStyle: { font: "Roboto" },
  }

  const pdf = pdfMake.createPdf(docDefinition)
  return pdf.getBuffer()
}

export function safeAttachmentSlug(raw: string, max = 48): string {
  const t = raw
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/gi, "")
  return (t || "upit").slice(0, max)
}
