import { NextResponse } from "next/server"

export const runtime = "nodejs"

const MAX_LEN = 450_000

const DEFAULT_ASSESSMENT_RECIPIENTS = [
  "nuhanovic.mirza86@gmail.com",
  "info@operonixindustrial.com",
] as const

function parseAdminEmails(env: string | undefined): string[] {
  const s = (env || "").trim()
  if (!s) return [...DEFAULT_ASSESSMENT_RECIPIENTS]
  return s
    .split(/[,;]/)
    .map((x) => x.trim())
    .filter((x) => x.length > 0)
}

type Body = {
  contactEmail?: string
  contactName?: string
  contactPhone?: string
  companyName?: string
  payload?: unknown
}

function thanksEmailText(locale: string): { subject: string; text: string } {
  const bs = locale === "bs"
  if (bs) {
    return {
      subject: "Zahvala na upitu – Operonix Industrial",
      text:
        "Poštovani,\n\n" +
        "Zahvaljujemo vam se na upitu i interesovanju za Operonix Industrial inteligence platformu. " +
        "Naš tim će pregledati upitnik; odgovor možete očekivati u najkraćem mogućem roku.\n\n" +
        "— Tim Operonix Industrial\n",
    }
  }
  return {
    subject: "Thank you for your inquiry – Operonix Industrial",
    text:
      "Hello,\n\n" +
      "Thank you for your inquiry and for your interest in the Operonix Industrial intelligence platform. " +
      "Our team will review your questionnaire; you can expect a response in the shortest time possible.\n\n" +
      "— Operonix Industrial team\n",
  }
}

function localeFromPayload(payload: unknown): string {
  if (payload && typeof payload === "object" && "locale" in payload) {
    const l = String((payload as { locale?: string }).locale || "").toLowerCase()
    return l.startsWith("bs") ? "bs" : "en"
  }
  return "en"
}

export async function POST(request: Request) {
  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 })
  }

  const email = (body.contactEmail || "").trim()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 })
  }

  const text =
    typeof body.payload === "object" && body.payload !== null
      ? JSON.stringify(body.payload, null, 2)
      : String(body.payload ?? "")

  if (text.length > MAX_LEN) {
    return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 400 })
  }

  const company =
    (typeof body.companyName === "string" && body.companyName.trim()) || "Operonix assessment"
  const loc = localeFromPayload(body.payload)
  const thanks = thanksEmailText(loc)

  const fnUrl = (process.env.OPERONIX_QUOTE_FUNCTION_URL || "").trim()
  const ingestSecret = (process.env.OPERONIX_QUOTE_INGEST_SECRET || "").trim()

  if (fnUrl && ingestSecret.length >= 8) {
    try {
      const r = await fetch(fnUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Operonix-Quote-Secret": ingestSecret,
        },
        body: JSON.stringify({
          contactEmail: email,
          contactName: (body.contactName || "").trim(),
          contactPhone: (body.contactPhone || "").trim(),
          companyName: company,
          payload: body.payload,
        }),
      })
      const j = (await r.json()) as { ok?: boolean; id?: string; error?: string }
      if (!r.ok || !j.ok) {
        return NextResponse.json(
          { ok: false, error: "ingest_failed", detail: j },
          { status: r.status >= 400 ? r.status : 502 }
        )
      }
      return NextResponse.json({
        ok: true,
        channel: "firebase_ingest",
        id: j.id,
        delivered: true,
      })
    } catch (e) {
      return NextResponse.json(
        { ok: false, error: "ingest_unreachable", detail: String(e) },
        { status: 502 }
      )
    }
  }

  const w3k = process.env.WEB3FORMS_ACCESS_KEY
  if (w3k) {
    const r = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: w3k,
        subject: `[Operonix upitnik] ${company}`,
        from_name: (body.contactName || "").trim() || company,
        email,
        message: `Reply-To: ${email}\nName: ${(body.contactName || "").trim()}\nPhone: ${(body.contactPhone || "").trim()}\n\n${text}`,
      }),
    })
    const j = (await r.json()) as { success?: boolean; message?: string }
    if (!r.ok || !j.success) {
      return NextResponse.json(
        { ok: false, error: "web3forms", detail: j.message || String(r.status) },
        { status: 502 }
      )
    }
    return NextResponse.json({ ok: true, channel: "web3forms", delivered: true })
  }

  const resend = process.env.RESEND_API_KEY
  if (resend) {
    const adminRecipients = parseAdminEmails(process.env.ASSESSMENT_TO_EMAIL)
    const from = process.env.RESEND_FROM || "Operonix <onboarding@resend.dev>"
    const adminBody = `Kontakt: ${email}\nIme: ${(body.contactName || "").trim()}\nTel: ${(body.contactPhone || "").trim()}\n\n${text}`

    const r1 = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resend}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: adminRecipients,
        reply_to: email,
        subject: `[Operonix upitnik] ${company}`,
        text: adminBody,
      }),
    })
    if (!r1.ok) {
      const err = await r1.text()
      return NextResponse.json({ ok: false, error: "resend_admin", detail: err }, { status: 502 })
    }

    const r2 = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resend}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: thanks.subject,
        text: thanks.text,
      }),
    })
    if (!r2.ok) {
      return NextResponse.json(
        { ok: true, channel: "resend", delivered: "partial", note: "admin_ok_user_failed" },
        { status: 200 }
      )
    }
    return NextResponse.json({ ok: true, channel: "resend", delivered: true })
  }

  return NextResponse.json({
    ok: true,
    delivered: false,
    message: "no_server_email",
  })
}
