import { NextResponse } from "next/server"

export const runtime = "nodejs"

const MAX_LEN = 450_000

const DEFAULT_ASSESSMENT_RECIPIENTS = [
  "info@operonixindustrial.com",
  "nuhanovic.mirza86@gmail.com",
] as const

/** ASSESMENT = česta pogreška u imenu varijable na Vercelu (jedno "s"). */
function parseAdminEmails(): string[] {
  const s =
    (process.env.ASSESSMENT_TO_EMAIL || "").trim() ||
    (process.env.ASSESMENT_TO_EMAIL || "").trim()
  if (!s) return [...DEFAULT_ASSESSMENT_RECIPIENTS]
  return s
    .split(/[,;]/)
    .map((x) => x.trim())
    .filter((x) => x.length > 0)
}

const RESEND_BODY_MAX = 900_000

function clipForResendBody(s: string): string {
  if (s.length <= RESEND_BODY_MAX) return s
  return (
    s.slice(0, RESEND_BODY_MAX) +
    `\n\n[… tijelo skraćeno (${s.length} znakova) — potpuni JSON u prilogu ili kopiju zatražite od korisnika.]`
  )
}

function providerMessageFromResend(raw: string): string | undefined {
  const t = raw.trim().slice(0, 4000)
  try {
    const o = JSON.parse(t) as { message?: unknown; error?: unknown }
    if (typeof o.message === "string" && o.message.length > 0) {
      return o.message.slice(0, 600)
    }
    if (typeof o.error === "string" && o.error.length > 0) {
      return o.error.slice(0, 600)
    }
  } catch {
    /* nije JSON */
  }
  if (t.length > 0 && t.length < 500) return t
  return undefined
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

function emailChannelEnvChecks() {
  return {
    hasResendApiKey: Boolean((process.env.RESEND_API_KEY || "").trim()),
    hasResendFrom: Boolean((process.env.RESEND_FROM || "").trim()),
    hasAssessmentToEmail:
      Boolean((process.env.ASSESSMENT_TO_EMAIL || "").trim()) ||
      Boolean((process.env.ASSESMENT_TO_EMAIL || "").trim()),
  }
}

function localeFromPayload(payload: unknown): string {
  if (payload && typeof payload === "object" && "locale" in payload) {
    const l = String((payload as { locale?: string }).locale || "").toLowerCase()
    return l.startsWith("bs") ? "bs" : "en"
  }
  return "en"
}

/**
 * Dijagnostika: isti runtime env kao POST na ovoj domeni / deployu.
 * Otvorite u pregledniku nakon Redeploy — bez tajni; samo booleani i Vercel meta.
 */
export async function GET() {
  const checks = emailChannelEnvChecks()
  const ready =
    checks.hasResendApiKey && checks.hasResendFrom && checks.hasAssessmentToEmail
  return NextResponse.json({
    route: "operonix_web/app/api/assessment-submit",
    checks,
    resendChannelReady: ready,
    vercel: {
      env: process.env.VERCEL_ENV ?? null,
      url: process.env.VERCEL_URL ?? null,
      gitCommit: process.env.VERCEL_GIT_COMMIT_SHA
        ? process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 12)
        : null,
    },
    interpret: ready
      ? "U ovom serverless procesu tri varijable su vidljive; ako POST i dalje pada, greška je u Resend API (ključ/domena) — gledajte poruku u odgovoru ili Resend Logs."
      : "U ovom serverless procesu bar jedna od RESEND_API_KEY / RESEND_FROM / ASSESSMENT_TO_EMAIL je prazna. Varijable su vjerovatnije na drugom Vercel projektu od domene, ili nisu u Production / nije Redeploy.",
  })
}

export async function POST(request: Request) {
  console.info("[assessment-submit] POST")
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

  /** Vercel/Resend prvo: pogrešni OPERONIX_* u env često blokiraju slanje ako je Firebase ispred. */
  const resend = (process.env.RESEND_API_KEY || "").trim()
  if (resend) {
    const adminRecipients = parseAdminEmails()
    if (adminRecipients.length === 0) {
      return NextResponse.json(
        { ok: false, error: "no_admin_recipients", message: "ASSESSMENT_TO_EMAIL prazan nakon parsiranja" },
        { status: 400 }
      )
    }
    const from = (process.env.RESEND_FROM || "").trim() || "Operonix <onboarding@resend.dev>"
    const adminBody = clipForResendBody(
      `Kontakt: ${email}\nIme: ${(body.contactName || "").trim()}\nTel: ${(body.contactPhone || "").trim()}\n\n${text}`
    )

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
      const providerMessage = providerMessageFromResend(err)
      console.error("[assessment-submit] resend admin failed", r1.status, err.slice(0, 800))
      return NextResponse.json(
        {
          ok: false,
          error: "resend_admin",
          providerMessage,
          detail: err.slice(0, 1500),
        },
        { status: 502 }
      )
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
      const err2 = await r2.text()
      console.error("[assessment-submit] resend user thank-you failed", r2.status, err2.slice(0, 800))
      return NextResponse.json(
        { ok: true, channel: "resend", delivered: "partial", note: "admin_ok_user_failed" },
        { status: 200 }
      )
    }
    return NextResponse.json({ ok: true, channel: "resend", delivered: true })
  }

  const w3k = (process.env.WEB3FORMS_ACCESS_KEY || "").trim()
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
        console.error("[assessment-submit] firebase ingest failed", r.status, j)
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
      console.error("[assessment-submit] firebase ingest unreachable", e)
      return NextResponse.json(
        { ok: false, error: "ingest_unreachable", detail: String(e) },
        { status: 502 }
      )
    }
  }

  const checks = emailChannelEnvChecks()
  console.error("[assessment-submit] No email channel configured", {
    ...checks,
    hasWeb3Forms: Boolean((process.env.WEB3FORMS_ACCESS_KEY || "").trim()),
    hasFirebaseIngest:
      Boolean((process.env.OPERONIX_QUOTE_FUNCTION_URL || "").trim()) &&
      (process.env.OPERONIX_QUOTE_INGEST_SECRET || "").trim().length >= 8,
  })

  return NextResponse.json(
    {
      ok: false,
      error: "no_server_email",
      checks,
      message:
        "Server is missing OPERONIX_QUOTE_FUNCTION_URL+SECRET, WEB3FORMS_ACCESS_KEY, or RESEND_API_KEY",
    },
    { status: 503 }
  )
}
