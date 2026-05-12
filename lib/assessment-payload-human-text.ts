/**
 * Tekst za e-mail / administraciju: ista polja i redoslijed kao u digitalization formi,
 * s oznakama iz assessment-strings (ne camelCase iz JSON-a).
 */

import { EXTENDED_MODULE_SECTIONS, getExtendedStrings } from "./assessment-extended-data"
import type { AssessmentCopy } from "./assessment-strings"
import { getAssessmentCopy } from "./assessment-strings"
import type { Locale } from "./i18n"

type Loc = "bs" | "en"

function str(v: unknown): string {
  return v === null || v === undefined ? "" : String(v).trim()
}

function mapArr(keys: string[], dict: Record<string, (c: AssessmentCopy) => string>, c: AssessmentCopy): string {
  const parts: string[] = []
  for (const k of keys) {
    const fn = dict[k]
    if (fn) parts.push(fn(c))
  }
  return parts.join(", ")
}

function formatFormBlock(form: Record<string, unknown>, c: AssessmentCopy): string[] {
  const lines: string[] = []

  const flush = (title: string, section: string[]) => {
    if (section.length === 0) return
    lines.push("")
    lines.push(title)
    lines.push(...section)
  }

  const kv = (label: string, val: unknown): string | null => {
    const s = str(val)
    if (!s) return null
    return `  • ${label}: ${s}`
  }

  const add = (bucket: string[], label: string, val: unknown) => {
    const x = kv(label, val)
    if (x) bucket.push(x)
  }

  const mark = (bucket: string[], label: string, cond: boolean) => {
    if (cond) bucket.push(`  • ${label}`)
  }

  // --- 1 ---
  const s1: string[] = []
  add(s1, c.s1.company, form.companyName)
  add(s1, c.s1.industry, form.industry)
  const pt = Array.isArray(form.productionTypes) ? (form.productionTypes as string[]) : []
  if (pt.length) {
    const x = kv(
      c.s1.productionType,
      mapArr(pt, { serial: (x) => x.s1.ptSerial, project: (x) => x.s1.ptProject, mto: (x) => x.s1.ptMto, mts: (x) => x.s1.ptMts }, c)
    )
    if (x) s1.push(x)
  }
  add(s1, c.s1.employees, form.employees)
  add(s1, c.s1.plants, form.plants)
  if (form.certIso === true) s1.push(`  • ${c.s1.certIso}`)
  if (form.certIatf === true) s1.push(`  • ${c.s1.certIatf}`)
  add(s1, c.s1.certOtherPh, form.certOther)
  flush(c.s1.title, s1)

  // --- 2 ---
  const s2: string[] = []
  add(s2, c.s2.machines, form.machines)
  add(s2, c.s2.workCenters, form.workCenters)
  add(s2, c.s2.productCount, form.productCount)
  add(s2, c.s2.shifts, form.shifts)
  add(s2, c.s2.cycle, form.cycle)
  const tr = Array.isArray(form.trackProduction) ? (form.trackProduction as string[]) : []
  if (tr.length) {
    const x = kv(
      c.s2.track,
      mapArr(tr, { excel: (x) => x.s2.trExcel, paper: (x) => x.s2.trPaper, erp: (x) => x.s2.trErp, mes: (x) => x.s2.trMes, none: (x) => x.s2.trNone }, c)
    )
    if (x) s2.push(x)
  }
  flush(c.s2.title, s2)

  // --- 3 ---
  const s3: string[] = []
  const dec = Array.isArray(form.decisions) ? (form.decisions as string[]) : []
  if (dec.length) {
    const x = kv(
      c.s3.decisions,
      mapArr(
        dec,
        {
          experience: (x) => x.s3.dExp,
          excel: (x) => x.s3.dExcel,
          reports: (x) => x.s3.dRep,
          realtime: (x) => x.s3.dRt,
        },
        c
      )
    )
    if (x) s3.push(x)
  }
  if (form.hasErp === true) {
    const en = str(form.erpName)
    s3.push(en ? `  • ${c.s3.erp}: ${en}` : `  • ${c.s3.erp}`)
  }
  if (form.hasScada === true) s3.push(`  • ${c.s3.scada}`)
  if (form.hasMes === true) {
    const mn = str(form.mesName)
    s3.push(mn ? `  • ${c.s3.mes}: ${mn}` : `  • ${c.s3.mes}`)
  }
  const mp = Array.isArray(form.mainProblems) ? (form.mainProblems as string[]) : []
  if (mp.length) {
    const x = kv(
      c.s3.prob,
      mapArr(
        mp,
        { data: (x) => x.s3.pData, late: (x) => x.s3.pLate, manual: (x) => x.s3.pManual, oee: (x) => x.s3.pOee, unk: (x) => x.s3.pUnk },
        c
      )
    )
    if (x) s3.push(x)
  }
  flush(c.s3.title, s3)

  // --- 4 ---
  const s4: string[] = []
  if (form.oeeTracked === true) {
    s4.push(`  • ${c.s4.oeeQ}: ${c.s4.oeeYes}`)
    const how = str(form.oeeHow)
    if (how === "manual") add(s4, c.s4.oeeHow, c.s4.oMan)
    else if (how === "system") add(s4, c.s4.oeeHow, c.s4.oSys)
  } else if (form.oeeTracked === false) {
    s4.push(`  • ${c.s4.oeeQ}: ${c.s4.oeeNo}`)
  }
  add(s4, c.s4.dPct, form.downtimePct)
  add(s4, c.s4.sPct, form.scrapPct)
  add(s4, c.s4.uPct, form.utilPct)
  const ml = Array.isArray(form.mainLosses) ? (form.mainLosses as string[]) : []
  if (ml.length) {
    const x = kv(
      c.s4.losses,
      mapArr(ml, { breakdown: (x) => x.s4.lBreak, stops: (x) => x.s4.lStop, slow: (x) => x.s4.lSlow, scrap: (x) => x.s4.lScrap }, c)
    )
    if (x) s4.push(x)
  }
  flush(c.s4.title, s4)

  // --- 5 ---
  const s5: string[] = []
  add(s5, c.s5.ncr, form.ncrHow)
  add(s5, c.s5.capa, form.capaHow)
  mark(s5, c.s5.pfmea.split("(")[0].trim(), form.hasPfmea === true)
  if (form.hasPfmea === true) add(s5, c.s5.pfmea, form.pfmeaWhere)
  mark(s5, c.s5.controlPlan, form.hasControlPlan === true)
  mark(s5, c.s5.trace, form.hasTrace === true)
  const qcl = str(form.qualityClosedLoop)
  if (qcl) {
    const qmap: Record<string, (x: AssessmentCopy) => string> = {
      yes: (x) => x.s5.loopYes,
      partial: (x) => x.s5.loopPartial,
      no: (x) => x.s5.loopNo,
      unknown: (x) => x.s5.loopUnk,
    }
    const ql = qmap[qcl]?.(c)
    if (ql) add(s5, c.s5.loop, ql)
  }
  const pr = str(form.problemsRepeat)
  if (pr) {
    const pmap: Record<string, (x: AssessmentCopy) => string> = {
      often: (x) => x.s5.repO,
      rare: (x) => x.s5.repR,
      unknown: (x) => x.s5.repU,
    }
    const pl = pmap[pr]?.(c)
    if (pl) add(s5, c.s5.repeat, pl)
  }
  flush(c.s5.title, s5)

  // --- 6 ---
  const s6: string[] = []
  const mt = str(form.maintenanceType)
  if (mt) {
    const mtMap: Record<string, (x: AssessmentCopy) => string> = {
      reactive: (x) => x.s6.mtR,
      preventive: (x) => x.s6.mtP,
      predictive: (x) => x.s6.mtPr,
    }
    const mtl = mtMap[mt]?.(c)
    if (mtl) add(s6, c.s6.mtype, mtl)
  }
  mark(s6, c.s6.hFault, form.maintEvid === true)
  mark(s6, c.s6.hPm, form.maintPm === true)
  mark(s6, c.s6.hNone, form.maintNone === true)
  const us = str(form.unplannedStops)
  if (us) {
    const uMap: Record<string, (x: AssessmentCopy) => string> = {
      high: (x) => x.s6.uHigh,
      medium: (x) => x.s6.uMed,
      low: (x) => x.s6.uLow,
    }
    const ul = uMap[us]?.(c)
    if (ul) add(s6, c.s6.unplan, ul)
  }
  flush(c.s6.title, s6)

  // --- 7 ---
  const s7: string[] = []
  const trW: string[] = []
  if (form.wfA === true) trW.push(c.s7.tAtt)
  if (form.wfP === true) trW.push(c.s7.tPerf)
  if (form.wfN === true) trW.push(c.s7.tNeither)
  if (trW.length) add(s7, c.s7.track, trW.join(", "))
  const ha: string[] = []
  if (form.wfMat === true) ha.push(c.s7.hMat)
  if (form.wfTrain === true) ha.push(c.s7.hTrain)
  if (form.wfScat === true) ha.push(c.s7.hScat)
  if (ha.length) add(s7, c.s7.have, ha.join(", "))
  const lk = str(form.linkOperator)
  if (lk) {
    const lMap: Record<string, (x: AssessmentCopy) => string> = {
      yes: (x) => x.s7.lYes,
      partial: (x) => x.s7.lPartial,
      no: (x) => x.s7.lNo,
      unknown: (x) => x.s7.lUnk,
    }
    const ll = lMap[lk]?.(c)
    if (ll) add(s7, c.s7.link, ll)
  }
  flush(c.s7.title, s7)

  // --- 8 ---
  const s8: string[] = []
  const ph = str(form.planningHow)
  if (ph) {
    const phMap: Record<string, (x: AssessmentCopy) => string> = {
      excel: (x) => x.s8.hExcel,
      erp: (x) => x.s8.hErp,
      manual: (x) => x.s8.hMan,
      mixed: (x) => x.s8.hMix,
    }
    const phl = phMap[ph]?.(c)
    if (phl) add(s8, c.s8.how, phl)
  }
  const prl = str(form.planRealistic)
  if (prl === "mostly") add(s8, c.s8.real, c.s8.rYes)
  if (prl === "often_not") add(s8, c.s8.real, c.s8.rNo)
  const kc = str(form.knowsCapacity)
  if (kc) {
    const kMap: Record<string, (x: AssessmentCopy) => string> = {
      yes: (x) => x.s8.cYes,
      partial: (x) => x.s8.cPart,
      no: (x) => x.s8.cNo,
    }
    const kl = kMap[kc]?.(c)
    if (kl) add(s8, c.s8.cap, kl)
  }
  flush(c.s8.title, s8)

  // --- 9 ---
  const s9: string[] = []
  const infra: string[] = []
  if (form.infraPlc === true) infra.push(c.s9.imPlc)
  if (form.infraEthernet === true) infra.push(c.s9.imEth)
  if (form.infraScada === true) infra.push(c.s9.imSc)
  if (infra.length) {
    s9.push(`  • ${infra.join("; ")}`)
  }
  const cr = Array.isArray(form.canRead) ? (form.canRead as string[]) : []
  if (cr.length) {
    const x = kv(
      c.s9.canRead,
      mapArr(cr, { state: (x) => x.s9.crSt, cycle: (x) => x.s9.crCyc, alarm: (x) => x.s9.crAl, none: (x) => x.s9.crNo }, c)
    )
    if (x) s9.push(x)
  }
  const conn = str(form.connectivity)
  if (conn) {
    const nMap: Record<string, (x: AssessmentCopy) => string> = {
      stable: (x) => x.s9.nSt,
      partial: (x) => x.s9.nPart,
      weak: (x) => x.s9.nWeak,
    }
    const nl = nMap[conn]?.(c)
    if (nl) add(s9, c.s9.net, nl)
  }
  flush(c.s9.title, s9)

  // --- 10 priorities ---
  const prio = form.priorities
  if (prio && typeof prio === "object") {
    const p = prio as Record<string, unknown>
    const pk: Array<[keyof AssessmentCopy["s10"], string]> = [
      ["pRealtime", "realtime"],
      ["pOee", "oee"],
      ["pScrap", "scrap"],
      ["pDown", "down"],
      ["pDig", "dig"],
      ["pAuto", "auto"],
      ["pAi", "ai"],
    ]
    const s10: string[] = []
    for (const [lk, ik] of pk) {
      const v = p[ik]
      if (v === undefined || v === null || v === "") continue
      s10.push(`  • ${c.s10[lk]}: ${v} (${c.s10.oneToFive})`)
    }
    flush(c.s10.title, s10)
  }

  // --- 11 goals ---
  const s11: string[] = []
  const gl = Array.isArray(form.goals) ? (form.goals as string[]) : []
  if (gl.length) {
    const x = kv(
      c.s11.goal,
      mapArr(
        gl,
        {
          prod: (x) => x.s11.gProd,
          cost: (x) => x.s11.gCost,
          control: (x) => x.s11.gControl,
          dig: (x) => x.s11.gDig,
          iatf: (x) => x.s11.gIatf,
          other: (x) => x.s11.gOther,
        },
        c
      )
    )
    if (x) s11.push(x)
  }
  if (gl.includes("other")) add(s11, c.s11.gOtherPh, form.goalOther)
  add(s11, c.s11.expect, form.expectedResult)
  flush(c.s11.title, s11)

  // --- 12 budget ---
  const s12: string[] = []
  const bud = str(form.budget)
  if (bud) {
    const bMap: Record<string, (x: AssessmentCopy) => string> = {
      lt10: (x) => x.s12.b10,
      b50: (x) => x.s12.b50,
      b100: (x) => x.s12.b100,
      b100p: (x) => x.s12.b100p,
      unsure: (x) => x.s12.bUnsure,
    }
    const bl = bMap[bud]?.(c)
    if (bl) add(s12, c.s12.budget, bl)
  }
  const tl = str(form.timeline)
  if (tl) {
    const tMap: Record<string, (x: AssessmentCopy) => string> = {
      asap: (x) => x.s12.tAsap,
      "3m": (x) => x.s12.t3,
      "6m": (x) => x.s12.t6,
      deadline: (x) => x.s12.tDeadline,
    }
    const ttl = tMap[tl]?.(c)
    if (ttl) add(s12, c.s12.time, ttl)
  }
  if (tl === "deadline") add(s12, c.s12.deadlinePh, form.deadlineNote)
  flush(c.s12.title, s12)

  // --- 13 ---
  const s13: string[] = []
  add(s13, c.s13.notes, form.notes)
  flush(c.s13.title, s13)

  return lines
}

function formatScores(scores: unknown, c: AssessmentCopy): string[] {
  const body: string[] = []
  if (!scores || typeof scores !== "object") return []
  const s = scores as Record<string, unknown>
  const opp = s.opportunity
  if (opp && typeof opp === "object") {
    const o = opp as { points?: number; band?: string }
    let band = ""
    if (o.band === "LOW") band = c.bandLow
    else if (o.band === "MEDIUM") band = c.bandMedium
    else if (o.band === "HIGH") band = c.bandHigh
    body.push(`  • ${c.opportunity}: ${o.points ?? "—"} ${c.points}${band ? ` — ${band}` : ""}`)
  }
  const comp = s.complexity
  if (comp && typeof comp === "object") {
    const x = comp as { points?: number; band?: string }
    let band = ""
    if (x.band === "S") band = c.complexityS
    else if (x.band === "M") band = c.complexityM
    else if (x.band === "L") band = c.complexityL
    body.push(`  • ${c.complexity}: ${x.points ?? "—"} ${c.points}${band ? ` — ${band}` : ""}`)
  }
  if (body.length === 0) return []
  return ["", c.resultTitle, ...body]
}

function formatExtended(ext: Record<string, unknown>, locale: Locale): string[] {
  const tr = getExtendedStrings(locale)
  const lines: string[] = []
  for (const sec of EXTENDED_MODULE_SECTIONS) {
    const secLines: string[] = []
    const secTitle = tr(sec.titleKey)
    for (const q of sec.questions) {
      const v = str(ext[q.id])
      if (!v) continue
      const lab = tr(q.labelKey)
      secLines.push(`  • ${lab}: ${v}`)
    }
    if (secLines.length) {
      lines.push("")
      lines.push(secTitle)
      lines.push(...secLines)
    }
  }
  return lines
}

export function assessmentPayloadToHumanText(payload: unknown, loc: Loc): string {
  const locale: Locale = loc === "bs" ? "bs" : "en"
  const c = getAssessmentCopy(locale)

  const L =
    loc === "bs"
      ? {
          head: "Operonix — zahtjev za ponudu (sažetak upitnika)",
          submitted: "Vrijeme slanja",
          sendContact: "Kontakt pri slanju obrasca",
          email: "E-mail",
          name: "Ime i prezime",
          phone: "Telefon",
          companyField: "Kompanija (iz obrasca)",
          formBlock: "Odgovori klijenta",
          foot:
            "Orijentacioni skor u tekstu ne zamjenjuje pisanu ponudu. " +
            "Puni zapis upita nalazi se u Operonix aplikaciji (Super Admin → Upiti s weba).",
        }
      : {
          head: "Operonix — quote request (questionnaire summary)",
          submitted: "Submitted at",
          sendContact: "Submit form contact",
          email: "E-mail",
          name: "Name",
          phone: "Phone",
          companyField: "Company (from form)",
          formBlock: "Client answers",
          foot:
            "The indicative score in this text does not replace a formal quote. " +
            "The full request is stored in the Operonix app (Super Admin → Web inquiries).",
        }

  if (!payload || typeof payload !== "object") {
    return `${L.head}\n\n${String(payload ?? "")}\n\n${L.foot}`
  }

  const p = payload as Record<string, unknown>
  const out: string[] = [L.head, ""]

  if (typeof p.submittedAt === "string") out.push(`${L.submitted}: ${p.submittedAt}`)
  out.push("")

  const contact = p.contact
  if (contact && typeof contact === "object") {
    const co = contact as Record<string, unknown>
    out.push(L.sendContact)
    pushContactLine(out, L.email, co.email)
    pushContactLine(out, L.name, co.name)
    pushContactLine(out, L.phone, co.phone)
    out.push("")
  }

  if (typeof p.companyName === "string" && p.companyName.trim()) {
    out.push(`${L.companyField}: ${p.companyName.trim()}`)
    out.push("")
  }

  out.push(...formatScores(p.scores, c))
  out.push("")

  out.push(L.formBlock)
  const form = p.form
  if (form && typeof form === "object") {
    out.push(...formatFormBlock(form as Record<string, unknown>, c))
  } else {
    out.push("")
    out.push(loc === "bs" ? "  (Nema podataka obrasca.)" : "  (No form data.)")
  }
  out.push("")

  const ext = p.extended
  if (ext && typeof ext === "object") {
    out.push(...formatExtended(ext as Record<string, unknown>, locale))
  }

  out.push("")
  out.push(L.foot)
  return out.filter((line, idx, arr) => !(line === "" && arr[idx - 1] === "")).join("\n")
}

function pushContactLine(out: string[], label: string, v: unknown) {
  const s = str(v)
  if (!s) return
  out.push(`  ${label}: ${s}`)
}
