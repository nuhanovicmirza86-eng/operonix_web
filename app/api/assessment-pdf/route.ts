import { NextResponse } from "next/server"

import { assessmentPayloadToHumanText } from "@/lib/assessment-payload-human-text"
import {
  OPERONIX_DOCUMENT_COMPANY_NAME,
  assessmentPdfFooterNote,
} from "@/lib/assessment-document-branding"
import { buildAssessmentPdfBuffer } from "@/lib/assessment-quote-attachments"
import { getOperonixLogoDataUrl } from "@/lib/load-operonix-logo"

export const runtime = "nodejs"

const MAX_LEN = 450_000

type PostBody = {
  payload?: unknown
  locale?: string
}

export async function POST(request: Request) {
  let body: PostBody
  try {
    body = (await request.json()) as PostBody
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 })
  }

  const payload = body.payload
  const text =
    typeof payload === "object" && payload !== null
      ? JSON.stringify(payload)
      : String(payload ?? "")

  if (text.length > MAX_LEN) {
    return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 400 })
  }

  const loc = body.locale === "bs" ? "bs" : "en"
  const humanBlock = assessmentPayloadToHumanText(payload, loc)

  let company = ""
  if (payload && typeof payload === "object" && "companyName" in payload) {
    company = String((payload as { companyName?: unknown }).companyName ?? "").trim()
  }

  const docHeading =
    loc === "bs"
      ? `Upitnik za digitalizaciju proizvodnje${company ? ` — ${company}` : ""}`
      : `Production digitalization questionnaire${company ? ` — ${company}` : ""}`

  try {
    const buf = await buildAssessmentPdfBuffer(humanBlock, {
      companyName: OPERONIX_DOCUMENT_COMPANY_NAME,
      documentHeading: docHeading,
      footerNote: assessmentPdfFooterNote(loc),
      logoDataUrl: getOperonixLogoDataUrl(),
    })

    const safeSlug =
      company
        .replace(/[^\w\u00C0-\u024f\-]+/gi, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 48) || "upitnik"

    const filename =
      loc === "bs"
        ? `operonix-industrial-upitnik-${safeSlug}.pdf`
        : `operonix-industrial-questionnaire-${safeSlug}.pdf`

    return new NextResponse(new Uint8Array(buf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (e) {
    console.error("[assessment-pdf]", e)
    return NextResponse.json({ ok: false, error: "pdf_build_failed" }, { status: 500 })
  }
}
