/**
 * Heuristički model usklađen s `docs/operonix-upitnik-digitalizacija/OPERONIX_UPITNIK_PROCJENA_DIGITALIZACIJE.md`.
 * Kalibrirajte pragove nakon stvarnih ponuda.
 */

export type OpportunityBand = "LOW" | "MEDIUM" | "HIGH"
export type ComplexityBand = "S" | "M" | "L"

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n))
}

function parseOptionalPercent(raw: string): number | null {
  const t = raw.trim().replace("%", "")
  if (t === "") return null
  const n = Number.parseFloat(t.replace(",", "."))
  return Number.isFinite(n) ? n : null
}

function parseOptionalInt(raw: string): number | null {
  const t = raw.trim()
  if (t === "") return null
  const n = Number.parseInt(t.replace(/\D/g, ""), 10)
  return Number.isFinite(n) ? n : null
}

export type AssessmentFormState = {
  trackProduction: string[]
  hasMes: boolean
  decisions: string[]
  oeeTracked: boolean
  oeeHow: "manual" | "system" | ""
  scrapPct: string
  downtimePct: string
  mainLosses: string[]
  unplannedStops: "high" | "medium" | "low" | ""
  knowsCapacity: "yes" | "partial" | "no" | ""
  planRealistic: "mostly" | "often_not" | ""
  linkOperator: "yes" | "partial" | "no" | "unknown" | ""
  qualityClosedLoop: "yes" | "partial" | "no" | "unknown" | ""
  problemsRepeat: "often" | "rare" | "unknown" | ""
  certIatf: boolean
  maintenanceType: "reactive" | "preventive" | "predictive" | ""
  employees: string
  plants: string
  workCenters: string
  infraPlc: boolean
  infraEthernet: boolean
  infraScada: boolean
  canRead: string[]
}

const DEFAULT_STATE: AssessmentFormState = {
  trackProduction: [],
  hasMes: false,
  decisions: [],
  oeeTracked: false,
  oeeHow: "",
  scrapPct: "",
  downtimePct: "",
  mainLosses: [],
  unplannedStops: "",
  knowsCapacity: "",
  planRealistic: "",
  linkOperator: "",
  qualityClosedLoop: "",
  problemsRepeat: "",
  certIatf: false,
  maintenanceType: "",
  employees: "",
  plants: "",
  workCenters: "",
  infraPlc: false,
  infraEthernet: false,
  infraScada: false,
  canRead: [],
}

export { DEFAULT_STATE as defaultAssessmentState }

export function toScoreInput(
  p: AssessmentFormState & Record<string, unknown>
): AssessmentFormState {
  return {
    trackProduction: p.trackProduction,
    hasMes: p.hasMes,
    decisions: p.decisions,
    oeeTracked: p.oeeTracked,
    oeeHow: p.oeeHow,
    scrapPct: p.scrapPct,
    downtimePct: p.downtimePct,
    mainLosses: p.mainLosses,
    unplannedStops: p.unplannedStops,
    knowsCapacity: p.knowsCapacity,
    planRealistic: p.planRealistic,
    linkOperator: p.linkOperator,
    qualityClosedLoop: p.qualityClosedLoop,
    problemsRepeat: p.problemsRepeat,
    certIatf: p.certIatf,
    maintenanceType: p.maintenanceType,
    employees: p.employees,
    plants: p.plants,
    workCenters: p.workCenters,
    infraPlc: p.infraPlc,
    infraEthernet: p.infraEthernet,
    infraScada: p.infraScada,
    canRead: p.canRead,
  }
}

export function computeOpportunityScore(s: AssessmentFormState): {
  points: number
  band: OpportunityBand
} {
  let p = 0

  const tp = s.trackProduction
  if (tp.includes("none") || tp.includes("paper")) p += 4
  else if (tp.includes("excel")) p += 3

  if (!s.hasMes) p += 10

  if (s.decisions.length > 0 && !s.decisions.includes("realtime")) p += 3

  if (!s.oeeTracked) p += 5

  const scrap = parseOptionalPercent(s.scrapPct)
  if (scrap !== null && scrap >= 5) p += 5
  else if (s.mainLosses.includes("scrap")) p += 2

  const down = parseOptionalPercent(s.downtimePct)
  if (down !== null && down >= 8) p += 3
  else if (s.unplannedStops === "high") p += 3

  if (s.knowsCapacity === "no") p += 2
  if (s.planRealistic === "often_not") p += 2

  if (s.linkOperator === "no") p += 3

  if (
    s.qualityClosedLoop === "no" ||
    s.qualityClosedLoop === "unknown" ||
    s.qualityClosedLoop === "partial"
  )
    p += 2
  if (s.problemsRepeat === "often") p += 2

  if (s.certIatf && s.qualityClosedLoop !== "yes") p += 2

  if (s.maintenanceType === "reactive") p += 2

  if (s.hasMes) p -= 8
  if (s.oeeTracked && s.oeeHow === "system") p -= 4
  if (s.decisions.includes("realtime")) p -= 3
  if (s.maintenanceType === "predictive") p -= 2

  p = clamp(Math.round(p), 0, 100)

  const band: OpportunityBand =
    p <= 30 ? "LOW" : p <= 60 ? "MEDIUM" : "HIGH"

  return { points: p, band }
}

export function computeComplexityScore(s: AssessmentFormState): {
  points: number
  band: ComplexityBand
} {
  let c = 0

  const e = parseOptionalInt(s.employees) ?? 0
  if (e >= 250) c += 3
  else if (e >= 50) c += 1

  const pl = parseOptionalInt(s.plants) ?? 1
  if (pl >= 4) c += 3
  else if (pl >= 2) c += 1

  const wc = parseOptionalInt(s.workCenters) ?? 0
  if (wc >= 30) c += 3
  else if (wc >= 15) c += 2
  else if (wc >= 5) c += 1

  const infraCount = [s.infraPlc, s.infraEthernet, s.infraScada].filter(Boolean).length
  const canRead = s.canRead
  if (canRead.length === 0 && infraCount === 0) c += 2
  else if (canRead.length < 2 && infraCount < 2) c += 1

  if (s.certIatf) c += 1
  if (s.linkOperator === "no" && s.certIatf) c += 1

  c = clamp(c, 0, 24)

  const band: ComplexityBand = c <= 7 ? "S" : c <= 14 ? "M" : "L"
  return { points: c, band }
}
