"use client"

import { useCallback, useMemo, useRef, useState, type FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { Printer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { AssessmentModularSections } from "@/components/assessment/assessment-modular-sections"
import { defaultExtendedAnswers, getExtendedStrings } from "@/lib/assessment-extended-data"
import {
  type AssessmentFormState,
  type OpportunityBand,
  type ComplexityBand,
  computeComplexityScore,
  computeOpportunityScore,
  defaultAssessmentState,
  toScoreInput,
} from "@/lib/assessment-scoring"
import type { AssessmentCopy } from "@/lib/assessment-strings"
import type { Locale, Messages } from "@/lib/i18n"

type Extras = {
  companyName: string
  industry: string
  productionTypes: string[]
  certIso: boolean
  certOther: string
  machines: string
  productCount: string
  shifts: string
  cycle: string
  erpName: string
  mesName: string
  hasErp: boolean
  hasScada: boolean
  mainProblems: string[]
  ncrHow: string
  capaHow: string
  hasPfmea: boolean
  pfmeaWhere: string
  hasControlPlan: boolean
  hasTrace: boolean
  utilPct: string
  maintEvid: boolean
  maintPm: boolean
  maintNone: boolean
  wfA: boolean
  wfP: boolean
  wfN: boolean
  wfMat: boolean
  wfTrain: boolean
  wfScat: boolean
  planningHow: "excel" | "erp" | "manual" | "mixed" | ""
  goals: string[]
  goalOther: string
  expectedResult: string
  budget: "lt10" | "b50" | "b100" | "b100p" | "unsure" | ""
  timeline: "asap" | "3m" | "6m" | "deadline" | ""
  deadlineNote: string
  notes: string
  connectivity: "stable" | "partial" | "weak" | ""
  priorities: {
    realtime: number
    oee: number
    scrap: number
    down: number
    dig: number
    auto: number
    ai: number
  }
}

type PageState = AssessmentFormState & Extras

const emptyExtras = (): Extras => ({
  companyName: "",
  industry: "",
  productionTypes: [],
  certIso: false,
  certOther: "",
  machines: "",
  productCount: "",
  shifts: "",
  cycle: "",
  erpName: "",
  mesName: "",
  hasErp: false,
  hasScada: false,
  mainProblems: [],
  ncrHow: "",
  capaHow: "",
  hasPfmea: false,
  pfmeaWhere: "",
  hasControlPlan: false,
  hasTrace: false,
  utilPct: "",
  maintEvid: false,
  maintPm: false,
  maintNone: false,
  wfA: false,
  wfP: false,
  wfN: false,
  wfMat: false,
  wfTrain: false,
  wfScat: false,
  planningHow: "",
  goals: [],
  goalOther: "",
  expectedResult: "",
  budget: "",
  timeline: "",
  deadlineNote: "",
  notes: "",
  connectivity: "",
  priorities: { realtime: 3, oee: 3, scrap: 3, down: 3, dig: 3, auto: 3, ai: 3 },
})

function initPageState(): PageState {
  return { ...defaultAssessmentState, ...emptyExtras() }
}

function toggle<T extends string>(arr: T[], v: T, on: boolean): T[] {
  if (on) return arr.includes(v) ? arr : [...arr, v]
  return arr.filter((x) => x !== v)
}

function setTrack(
  prev: string[],
  val: "excel" | "paper" | "erp" | "mes" | "none",
  on: boolean
) {
  if (val === "none" && on) return ["none"]
  let next = prev.filter((x) => x !== "none")
  if (on) return [...new Set([...next, val])]
  return next.filter((x) => x !== val)
}

function bandOpp(
  b: OpportunityBand,
  t: AssessmentCopy
): { label: string; className: string } {
  if (b === "LOW") return { label: t.bandLow, className: "text-muted-foreground" }
  if (b === "MEDIUM")
    return { label: t.bandMedium, className: "text-amber-600 dark:text-amber-400" }
  return { label: t.bandHigh, className: "text-[#00C2FF]" }
}

function bandComp(
  b: ComplexityBand,
  t: AssessmentCopy
): { label: string; className: string } {
  if (b === "S")
    return { label: t.complexityS, className: "text-emerald-600 dark:text-emerald-400" }
  if (b === "M")
    return { label: t.complexityM, className: "text-amber-600 dark:text-amber-400" }
  return { label: t.complexityL, className: "text-orange-500" }
}

const priorityList = [
  { key: "realtime" as const, labelKey: "pRealtime" as const },
  { key: "oee" as const, labelKey: "pOee" as const },
  { key: "scrap" as const, labelKey: "pScrap" as const },
  { key: "down" as const, labelKey: "pDown" as const },
  { key: "dig" as const, labelKey: "pDig" as const },
  { key: "auto" as const, labelKey: "pAuto" as const },
  { key: "ai" as const, labelKey: "pAi" as const },
]

type Props = {
  t: AssessmentCopy
  currentLang: Locale
  headerFooterMessages: Messages
}

export function DigitalizationAssessmentPageView({ t, currentLang, headerFooterMessages }: Props) {
  const [st, setSt] = useState<PageState>(initPageState)
  const [ext, setExt] = useState<Record<string, string>>(defaultExtendedAnswers)
  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [sendState, setSendState] = useState<"idle" | "sending" | "ok" | "err">("idle")
  const [deliveryStatus, setDeliveryStatus] = useState<"full" | "partial" | "none" | null>(null)
  const [formErr, setFormErr] = useState<string | null>(null)
  const thankYouRef = useRef<HTMLDivElement>(null)
  const trEx = getExtendedStrings(currentLang)

  const scoreIn = useMemo(
    () => toScoreInput(st as AssessmentFormState & Record<string, unknown>),
    [st]
  )
  const opportunity = useMemo(() => computeOpportunityScore(scoreIn), [scoreIn])
  const complexity = useMemo(() => computeComplexityScore(scoreIn), [scoreIn])

  const oBand = bandOpp(opportunity.band, t)
  const cBand = bandComp(complexity.band, t)
  const s10 = t.s10

  const onSubmit = (e: FormEvent) => e.preventDefault()

  const buildPayload = useCallback(() => {
    return {
      submittedAt: new Date().toISOString(),
      locale: currentLang,
      contact: {
        name: contactName.trim(),
        email: contactEmail.trim(),
        phone: contactPhone.trim(),
      },
      companyName: st.companyName.trim(),
      scores: { opportunity, complexity },
      form: { ...st },
      extended: { ...ext },
    }
  }, [
    st,
    ext,
    contactName,
    contactEmail,
    contactPhone,
    currentLang,
    opportunity,
    complexity,
  ])

  const handleSend = async () => {
    setFormErr(null)
    setDeliveryStatus(null)
    const em = contactEmail.trim()
    if (!em || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      setFormErr(trEx("sendEmailRequired"))
      return
    }
    setSendState("sending")
    const payload = buildPayload()
    try {
      const r = await fetch("/api/assessment-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactEmail: em,
          contactName: contactName.trim(),
          contactPhone: contactPhone.trim(),
          companyName: st.companyName.trim(),
          payload,
        }),
      })
      const j = (await r.json()) as {
        ok?: boolean
        delivered?: boolean | "partial"
        message?: string
      }
      if (r.ok && j.ok) {
        let d: "full" | "partial" | "none" = "full"
        if (j.delivered === false) d = "none"
        else if (j.delivered === "partial") d = "partial"
        setDeliveryStatus(d)
        setSendState("ok")
        setTimeout(() => {
          thankYouRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
      } else {
        setSendState("err")
        setFormErr(null)
      }
    } catch {
      setSendState("err")
    }
  }

  const copyAll = async () => {
    const text = JSON.stringify(buildPayload(), null, 2)
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // ignore
    }
  }

  return (
    <div className="min-h-screen bg-background print:bg-white">
      <div className="w-full bg-foreground text-background text-center text-sm py-2 print:hidden">
        {headerFooterMessages.notice.text}
      </div>

      <div className="print:hidden">
        <Header messages={headerFooterMessages.header} currentLang={currentLang} />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-10 print:max-w-none print:px-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between print:mb-4">
          <div className="flex items-center gap-3 print:block">
            <Image
              src="/logo.png"
              alt="Operonix"
              width={160}
              height={48}
              className="h-10 w-auto object-contain print:h-8"
            />
            <p className="text-xs text-muted-foreground sm:hidden print:block print:mt-1 print:text-[10px] max-w-sm">
              {t.metaDescription}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 print:justify-end">
            <Button type="button" variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="h-4 w-4" />
              {t.print}
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/?lang=${currentLang === "bs" ? "bs" : "en"}`}>{t.backHome}</Link>
            </Button>
          </div>
        </div>

        <div className="mb-8 space-y-1 print:mb-4">
          <h1 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight">{t.title}</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">{t.lead}</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-8 print:space-y-4 print:[&_h2]:text-sm print:[&_input]:h-7 print:[&_input]:text-[11px] print:[&_label]:text-[10px] print:[&_button]:h-7 print:[&_button]:px-2 print:[&_button]:text-[10px]"
        >
          {/* 1 — Company */}
          <Card className="print:break-inside-avoid">
            <CardHeader>
              <CardTitle className="text-lg">{t.s1.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">{t.s1.company}</Label>
                <Input
                  id="companyName"
                  value={st.companyName}
                  onChange={(e) => setSt((s) => ({ ...s, companyName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">{t.s1.industry}</Label>
                <Input
                  id="industry"
                  value={st.industry}
                  onChange={(e) => setSt((s) => ({ ...s, industry: e.target.value }))}
                />
              </div>
              <div>
                <Label className="mb-2 block">{t.s1.productionType}</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {(
                    [
                      ["serial", t.s1.ptSerial],
                      ["project", t.s1.ptProject],
                      ["mto", t.s1.ptMto],
                      ["mts", t.s1.ptMts],
                    ] as const
                  ).map(([k, lab]) => (
                    <label key={k} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={st.productionTypes.includes(k)}
                        onCheckedChange={(v) =>
                          setSt((s) => ({
                            ...s,
                            productionTypes: toggle(s.productionTypes, k, v === true),
                          }))
                        }
                      />
                      {lab}
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="emp">{t.s1.employees}</Label>
                  <Input
                    id="emp"
                    value={st.employees}
                    onChange={(e) => setSt((s) => ({ ...s, employees: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pl">{t.s1.plants}</Label>
                  <Input
                    id="pl"
                    value={st.plants}
                    onChange={(e) => setSt((s) => ({ ...s, plants: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <span className="text-sm font-medium">
                  {t.s1.certIso} / {t.s1.certIatf} / {t.s1.certOther}
                </span>
                <div className="mt-2 flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={st.certIso}
                      onCheckedChange={(v) => setSt((s) => ({ ...s, certIso: v === true }))}
                    />
                    {t.s1.certIso}
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={st.certIatf}
                      onCheckedChange={(v) => setSt((s) => ({ ...s, certIatf: v === true }))}
                    />
                    {t.s1.certIatf}
                  </label>
                </div>
                <Input
                  className="mt-2"
                  placeholder={t.s1.certOtherPh}
                  value={st.certOther}
                  onChange={(e) => setSt((s) => ({ ...s, certOther: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* 2 — Production */}
          <Card className="print:break-inside-avoid">
            <CardHeader>
              <CardTitle className="text-lg">{t.s2.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {(
                  [
                    ["machines", t.s2.machines],
                    ["workCenters", t.s2.workCenters],
                    ["productCount", t.s2.productCount],
                    ["shifts", t.s2.shifts],
                    ["cycle", t.s2.cycle],
                  ] as const
                ).map(([id, label]) => (
                  <div key={id} className="space-y-2 sm:col-span-1">
                    <Label htmlFor={id}>{label}</Label>
                    <Input
                      id={id}
                      value={st[id as "machines" | "workCenters" | "productCount" | "shifts" | "cycle"]}
                      onChange={(e) => setSt((s) => ({ ...s, [id]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
              <div>
                <Label className="mb-2 block">{t.s2.track}</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {(
                    [
                      ["excel", t.s2.trExcel],
                      ["paper", t.s2.trPaper],
                      ["erp", t.s2.trErp],
                      ["mes", t.s2.trMes],
                      ["none", t.s2.trNone],
                    ] as const
                  ).map(([k, lab]) => (
                    <label key={k} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={st.trackProduction.includes(k)}
                        onCheckedChange={(v) =>
                          setSt((s) => ({
                            ...s,
                            trackProduction: setTrack(s.trackProduction, k, v === true),
                          }))
                        }
                      />
                      {lab}
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3 — Maturity */}
          <Card className="print:break-inside-avoid">
            <CardHeader>
              <CardTitle className="text-lg">{t.s3.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-2 block">{t.s3.decisions}</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {(
                    [
                      ["experience", t.s3.dExp],
                      ["excel", t.s3.dExcel],
                      ["reports", t.s3.dRep],
                      ["realtime", t.s3.dRt],
                    ] as const
                  ).map(([k, lab]) => (
                    <label key={k} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={st.decisions.includes(k)}
                        onCheckedChange={(v) =>
                          setSt((s) => ({ ...s, decisions: toggle(s.decisions, k, v === true) }))
                        }
                      />
                      {lab}
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t.s3.has}</Label>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={st.hasErp}
                    onCheckedChange={(v) => setSt((s) => ({ ...s, hasErp: v === true }))}
                  />
                  {t.s3.erp}
                </label>
                {st.hasErp && (
                  <Input
                    value={st.erpName}
                    onChange={(e) => setSt((s) => ({ ...s, erpName: e.target.value }))}
                  />
                )}
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={st.hasScada}
                    onCheckedChange={(v) => setSt((s) => ({ ...s, hasScada: v === true }))}
                  />
                  {t.s3.scada}
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={st.hasMes}
                    onCheckedChange={(v) => setSt((s) => ({ ...s, hasMes: v === true }))}
                  />
                  {t.s3.mes}
                </label>
                {st.hasMes && (
                  <Input
                    value={st.mesName}
                    onChange={(e) => setSt((s) => ({ ...s, mesName: e.target.value }))}
                  />
                )}
              </div>
              <div>
                <Label className="mb-2 block">{t.s3.prob}</Label>
                <div className="grid gap-2">
                  {(
                    [
                      ["data", t.s3.pData],
                      ["late", t.s3.pLate],
                      ["manual", t.s3.pManual],
                      ["oee", t.s3.pOee],
                      ["unk", t.s3.pUnk],
                    ] as const
                  ).map(([k, lab]) => (
                    <label key={k} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={st.mainProblems.includes(k)}
                        onCheckedChange={(v) =>
                          setSt((s) => ({
                            ...s,
                            mainProblems: toggle(s.mainProblems, k, v === true),
                          }))
                        }
                      />
                      {lab}
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4 — OEE */}
          <Card className="print:break-inside-avoid">
            <CardHeader>
              <CardTitle className="text-lg">{t.s4.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-2 block">{t.s4.oeeQ}</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant={st.oeeTracked ? "default" : "outline"}
                    onClick={() =>
                      setSt((s) => ({ ...s, oeeTracked: true, oeeHow: s.oeeHow || "manual" }))
                    }
                  >
                    {t.s4.oeeYes}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={!st.oeeTracked ? "default" : "outline"}
                    onClick={() => setSt((s) => ({ ...s, oeeTracked: false, oeeHow: "" }))}
                  >
                    {t.s4.oeeNo}
                  </Button>
                </div>
              </div>
              {st.oeeTracked && (
                <div>
                  <Label className="mb-2 block">{t.s4.oeeHow}</Label>
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        ["manual", t.s4.oMan],
                        ["system", t.s4.oSys],
                      ] as const
                    ).map(([k, lab]) => (
                      <Button
                        key={k}
                        type="button"
                        size="sm"
                        variant={st.oeeHow === k ? "default" : "outline"}
                        onClick={() => setSt((s) => ({ ...s, oeeHow: k }))}
                      >
                        {lab}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="downtimePct">{t.s4.dPct}</Label>
                  <Input
                    id="downtimePct"
                    value={st.downtimePct}
                    onChange={(e) => setSt((s) => ({ ...s, downtimePct: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scrapPct">{t.s4.sPct}</Label>
                  <Input
                    id="scrapPct"
                    value={st.scrapPct}
                    onChange={(e) => setSt((s) => ({ ...s, scrapPct: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="utilPct">{t.s4.uPct}</Label>
                  <Input
                    id="utilPct"
                    value={st.utilPct}
                    onChange={(e) => setSt((s) => ({ ...s, utilPct: e.target.value }))}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{t.s4.foot}</p>
              <div>
                <Label className="mb-2 block">{t.s4.losses}</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {(
                    [
                      ["breakdown", t.s4.lBreak],
                      ["stops", t.s4.lStop],
                      ["slow", t.s4.lSlow],
                      ["scrap", t.s4.lScrap],
                    ] as const
                  ).map(([k, lab]) => (
                    <label key={k} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={st.mainLosses.includes(k)}
                        onCheckedChange={(v) =>
                          setSt((s) => ({
                            ...s,
                            mainLosses: toggle(s.mainLosses, k, v === true),
                          }))
                        }
                      />
                      {lab}
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5 — Quality */}
          <Card className="print:break-inside-avoid">
            <CardHeader>
              <CardTitle className="text-lg">{t.s5.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>{t.s5.ncr}</Label>
                  <Input
                    value={st.ncrHow}
                    onChange={(e) => setSt((s) => ({ ...s, ncrHow: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t.s5.capa}</Label>
                  <Input
                    value={st.capaHow}
                    onChange={(e) => setSt((s) => ({ ...s, capaHow: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label className="mb-2 block">{t.s5.have}</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={st.hasPfmea}
                      onCheckedChange={(v) => setSt((s) => ({ ...s, hasPfmea: v === true }))}
                    />
                    {t.s5.pfmea}
                  </label>
                  {st.hasPfmea && (
                    <Input
                      value={st.pfmeaWhere}
                      onChange={(e) => setSt((s) => ({ ...s, pfmeaWhere: e.target.value }))}
                    />
                  )}
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={st.hasControlPlan}
                      onCheckedChange={(v) => setSt((s) => ({ ...s, hasControlPlan: v === true }))}
                    />
                    {t.s5.controlPlan}
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={st.hasTrace}
                      onCheckedChange={(v) => setSt((s) => ({ ...s, hasTrace: v === true }))}
                    />
                    {t.s5.trace}
                  </label>
                </div>
              </div>
              <div>
                <Label className="mb-2 block">{t.s5.loop}</Label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["yes", t.s5.loopYes],
                      ["partial", t.s5.loopPartial],
                      ["no", t.s5.loopNo],
                      ["unknown", t.s5.loopUnk],
                    ] as const
                  ).map(([k, lab]) => (
                    <Button
                      key={k}
                      type="button"
                      size="sm"
                      variant={st.qualityClosedLoop === k ? "default" : "outline"}
                      onClick={() => setSt((s) => ({ ...s, qualityClosedLoop: k }))}
                    >
                      {lab}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="mb-2 block">{t.s5.repeat}</Label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["often", t.s5.repO],
                      ["rare", t.s5.repR],
                      ["unknown", t.s5.repU],
                    ] as const
                  ).map(([k, lab]) => (
                    <Button
                      key={k}
                      type="button"
                      size="sm"
                      variant={st.problemsRepeat === k ? "default" : "outline"}
                      onClick={() => setSt((s) => ({ ...s, problemsRepeat: k }))}
                    >
                      {lab}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 6 — Maintenance */}
          <Card className="print:break-inside-avoid">
            <CardHeader>
              <CardTitle className="text-lg">{t.s6.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-2 block">{t.s6.mtype}</Label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["reactive", t.s6.mtR],
                      ["preventive", t.s6.mtP],
                      ["predictive", t.s6.mtPr],
                    ] as const
                  ).map(([k, lab]) => (
                    <Button
                      key={k}
                      type="button"
                      size="sm"
                      variant={st.maintenanceType === k ? "default" : "outline"}
                      onClick={() => setSt((s) => ({ ...s, maintenanceType: k }))}
                    >
                      {lab}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="mb-2 block">{t.s6.have}</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={st.maintEvid}
                      onCheckedChange={(v) => setSt((s) => ({ ...s, maintEvid: v === true }))}
                    />
                    {t.s6.hFault}
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={st.maintPm}
                      onCheckedChange={(v) => setSt((s) => ({ ...s, maintPm: v === true }))}
                    />
                    {t.s6.hPm}
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={st.maintNone}
                      onCheckedChange={(v) => setSt((s) => ({ ...s, maintNone: v === true }))}
                    />
                    {t.s6.hNone}
                  </label>
                </div>
              </div>
              <div>
                <Label className="mb-2 block">{t.s6.unplan}</Label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["high", t.s6.uHigh],
                      ["medium", t.s6.uMed],
                      ["low", t.s6.uLow],
                    ] as const
                  ).map(([k, lab]) => (
                    <Button
                      key={k}
                      type="button"
                      size="sm"
                      variant={st.unplannedStops === k ? "default" : "outline"}
                      onClick={() => setSt((s) => ({ ...s, unplannedStops: k }))}
                    >
                      {lab}
                    </Button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{t.s6.foot}</p>
            </CardContent>
          </Card>

          {/* 7 — Workforce */}
          <Card className="print:break-inside-avoid">
            <CardHeader>
              <CardTitle className="text-lg">{t.s7.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-2 block">{t.s7.track}</Label>
                <div className="space-y-2">
                  {(
                    [
                      ["att", t.s7.tAtt, "wfA"],
                      ["perf", t.s7.tPerf, "wfP"],
                    ] as const
                  ).map(([_k, lab, _]) => (
                    <label key={_k} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={_k === "att" ? st.wfA : st.wfP}
                        onCheckedChange={(v) =>
                          setSt((s) =>
                            _k === "att" ? { ...s, wfA: v === true } : { ...s, wfP: v === true }
                          )
                        }
                      />
                      {lab}
                    </label>
                  ))}
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={st.wfN}
                      onCheckedChange={(v) => setSt((s) => ({ ...s, wfN: v === true }))}
                    />
                    {t.s7.tNeither}
                  </label>
                </div>
              </div>
              <div>
                <Label className="mb-2 block">{t.s7.have}</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={st.wfMat}
                      onCheckedChange={(v) => setSt((s) => ({ ...s, wfMat: v === true }))}
                    />
                    {t.s7.hMat}
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={st.wfTrain}
                      onCheckedChange={(v) => setSt((s) => ({ ...s, wfTrain: v === true }))}
                    />
                    {t.s7.hTrain}
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={st.wfScat}
                      onCheckedChange={(v) => setSt((s) => ({ ...s, wfScat: v === true }))}
                    />
                    {t.s7.hScat}
                  </label>
                </div>
              </div>
              <div>
                <Label className="mb-2 block">{t.s7.link}</Label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["yes", t.s7.lYes],
                      ["partial", t.s7.lPartial],
                      ["no", t.s7.lNo],
                      ["unknown", t.s7.lUnk],
                    ] as const
                  ).map(([k, lab]) => (
                    <Button
                      key={k}
                      type="button"
                      size="sm"
                      variant={st.linkOperator === k ? "default" : "outline"}
                      onClick={() => setSt((s) => ({ ...s, linkOperator: k }))}
                    >
                      {lab}
                    </Button>
                  ))}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Da / djelimično / ne / ne znamo</p>
              </div>
            </CardContent>
          </Card>

          {/* 8 — Planning */}
          <Card className="print:break-inside-avoid">
            <CardHeader>
              <CardTitle className="text-lg">{t.s8.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-2 block">{t.s8.how}</Label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["excel", t.s8.hExcel],
                      ["erp", t.s8.hErp],
                      ["manual", t.s8.hMan],
                      ["mixed", t.s8.hMix],
                    ] as const
                  ).map(([k, lab]) => (
                    <Button
                      key={k}
                      type="button"
                      size="sm"
                      variant={st.planningHow === k ? "default" : "outline"}
                      onClick={() => setSt((s) => ({ ...s, planningHow: k }))}
                    >
                      {lab}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="mb-2 block">{t.s8.real}</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant={st.planRealistic === "mostly" ? "default" : "outline"}
                    onClick={() => setSt((s) => ({ ...s, planRealistic: "mostly" }))}
                  >
                    {t.s8.rYes}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={st.planRealistic === "often_not" ? "default" : "outline"}
                    onClick={() => setSt((s) => ({ ...s, planRealistic: "often_not" }))}
                  >
                    {t.s8.rNo}
                  </Button>
                </div>
              </div>
              <div>
                <Label className="mb-2 block">{t.s8.cap}</Label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["yes", t.s8.cYes],
                      ["partial", t.s8.cPart],
                      ["no", t.s8.cNo],
                    ] as const
                  ).map(([k, lab]) => (
                    <Button
                      key={k}
                      type="button"
                      size="sm"
                      variant={st.knowsCapacity === k ? "default" : "outline"}
                      onClick={() => setSt((s) => ({ ...s, knowsCapacity: k }))}
                    >
                      {lab}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 9 — Infra */}
          <Card className="print:break-inside-avoid">
            <CardHeader>
              <CardTitle className="text-lg">{t.s9.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={st.infraPlc}
                    onCheckedChange={(v) => setSt((s) => ({ ...s, infraPlc: v === true }))}
                  />
                  {t.s9.imPlc}
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={st.infraEthernet}
                    onCheckedChange={(v) => setSt((s) => ({ ...s, infraEthernet: v === true }))}
                  />
                  {t.s9.imEth}
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={st.infraScada}
                    onCheckedChange={(v) => setSt((s) => ({ ...s, infraScada: v === true }))}
                  />
                  {t.s9.imSc}
                </label>
              </div>
              <div>
                <Label className="mb-2 block">{t.s9.canRead}</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {(
                    [
                      ["state", t.s9.crSt],
                      ["cycle", t.s9.crCyc],
                      ["alarm", t.s9.crAl],
                      ["none", t.s9.crNo],
                    ] as const
                  ).map(([k, lab]) => (
                    <label key={k} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={st.canRead.includes(k)}
                        onCheckedChange={(v) =>
                          setSt((s) => ({
                            ...s,
                            canRead: toggle(s.canRead, k, v === true),
                          }))
                        }
                      />
                      {lab}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <Label className="mb-2 block">{t.s9.net}</Label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["stable", t.s9.nSt],
                      ["partial", t.s9.nPart],
                      ["weak", t.s9.nWeak],
                    ] as const
                  ).map(([k, lab]) => (
                    <Button
                      key={k}
                      type="button"
                      size="sm"
                      variant={st.connectivity === k ? "default" : "outline"}
                      onClick={() => setSt((s) => ({ ...s, connectivity: k }))}
                    >
                      {lab}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 10 — Priorities */}
          <Card className="print:break-inside-avoid">
            <CardHeader>
              <CardTitle className="text-lg">{t.s10.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {priorityList.map(({ key, labelKey }) => (
                <div key={key} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                  <span className="min-w-0 flex-1 text-sm">{s10[labelKey]}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-6">{s10.oneToFive}</span>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      className="w-16 h-9"
                      value={st.priorities[key]}
                      onChange={(e) => {
                        const n = Math.min(5, Math.max(1, Number.parseInt(e.target.value, 10) || 1))
                        setSt((s) => ({
                          ...s,
                          priorities: { ...s.priorities, [key]: n },
                        }))
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 11 — Goals */}
          <Card className="print:break-inside-avoid">
            <CardHeader>
              <CardTitle className="text-lg">{t.s11.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-2 block">{t.s11.goal}</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {(
                    [
                      ["prod", t.s11.gProd],
                      ["cost", t.s11.gCost],
                      ["control", t.s11.gControl],
                      ["dig", t.s11.gDig],
                      ["iatf", t.s11.gIatf],
                      ["other", t.s11.gOther],
                    ] as const
                  ).map(([k, lab]) => (
                    <label key={k} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={st.goals.includes(k)}
                        onCheckedChange={(v) =>
                          setSt((s) => ({ ...s, goals: toggle(s.goals, k, v === true) }))
                        }
                      />
                      {lab}
                    </label>
                  ))}
                </div>
                {st.goals.includes("other") && (
                  <Input
                    className="mt-2"
                    placeholder={t.s11.gOtherPh}
                    value={st.goalOther}
                    onChange={(e) => setSt((s) => ({ ...s, goalOther: e.target.value }))}
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label>{t.s11.expect}</Label>
                <Textarea
                  value={st.expectedResult}
                  onChange={(e) => setSt((s) => ({ ...s, expectedResult: e.target.value }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* 12 — Budget */}
          <Card className="print:break-inside-avoid">
            <CardHeader>
              <CardTitle className="text-lg">{t.s12.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-2 block">{t.s12.budget}</Label>
                <div className="flex flex-col gap-2">
                  {(
                    [
                      ["lt10", t.s12.b10],
                      ["b50", t.s12.b50],
                      ["b100", t.s12.b100],
                      ["b100p", t.s12.b100p],
                      ["unsure", t.s12.bUnsure],
                    ] as const
                  ).map(([k, lab]) => (
                    <label key={k} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={st.budget === k}
                        onCheckedChange={() =>
                          setSt((s) => ({ ...s, budget: s.budget === k ? "" : k }))
                        }
                      />
                      {lab}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <Label className="mb-2 block">{t.s12.time}</Label>
                <div className="flex flex-col gap-2">
                  {(
                    [
                      ["asap", t.s12.tAsap],
                      ["3m", t.s12.t3],
                      ["6m", t.s12.t6],
                      ["deadline", t.s12.tDeadline],
                    ] as const
                  ).map(([k, lab]) => (
                    <label key={k} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={st.timeline === k}
                        onCheckedChange={() =>
                          setSt((s) => ({ ...s, timeline: s.timeline === k ? "" : k }))
                        }
                      />
                      {lab}
                    </label>
                  ))}
                </div>
                {st.timeline === "deadline" && (
                  <Input
                    className="mt-2"
                    placeholder={t.s12.deadlinePh}
                    value={st.deadlineNote}
                    onChange={(e) => setSt((s) => ({ ...s, deadlineNote: e.target.value }))}
                  />
                )}
              </div>
            </CardContent>
          </Card>

          {/* 13 — Notes */}
          <Card className="print:break-inside-avoid">
            <CardHeader>
              <CardTitle className="text-lg">{t.s13.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={t.s13.notesPh}
                value={st.notes}
                onChange={(e) => setSt((s) => ({ ...s, notes: e.target.value }))}
                rows={4}
              />
            </CardContent>
          </Card>

          <div className="print:break-inside-avoid space-y-6">
            <AssessmentModularSections locale={currentLang} value={ext} onChange={setExt} />
            <Card className="border-[#00C2FF]/30 print:hidden">
              <CardHeader>
                <CardTitle className="text-lg">{trEx("sendBlockTitle")}</CardTitle>
                <p className="text-sm text-muted-foreground">{trEx("sendBlockLead")}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cname">{trEx("contactName")}</Label>
                    <Input
                      id="cname"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="cemail">{trEx("contactEmail")}</Label>
                    <Input
                      id="cemail"
                      type="email"
                      required
                      autoComplete="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="cphone">{trEx("contactPhone")}</Label>
                    <Input
                      id="cphone"
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                    />
                  </div>
                </div>
                {formErr && <p className="text-sm text-amber-600 dark:text-amber-400">{formErr}</p>}
                {sendState === "ok" && (
                  <div
                    ref={thankYouRef}
                    className="rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-4 space-y-2"
                  >
                    <p className="text-base font-semibold text-foreground">{trEx("thankYouTitle")}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {trEx("thankYouBody")}
                    </p>
                    {deliveryStatus === "none" && (
                      <p className="text-sm text-amber-700 dark:text-amber-300 pt-1">
                        {trEx("sendWarnNoBackend")}
                      </p>
                    )}
                    {deliveryStatus === "partial" && (
                      <p className="text-sm text-amber-700 dark:text-amber-300 pt-1">
                        {trEx("sendWarnPartial")}
                      </p>
                    )}
                  </div>
                )}
                {sendState === "err" && !formErr && (
                  <p className="text-sm text-destructive">{trEx("sendErr")}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    className="bg-[#0B1F3A] text-background hover:bg-[#1E3A5F]"
                    disabled={sendState === "sending" || !contactEmail.trim()}
                    onClick={handleSend}
                  >
                    {sendState === "sending" ? trEx("sendSending") : trEx("sendButton")}
                  </Button>
                  <Button type="button" variant="outline" onClick={copyAll}>
                    {trEx("sendCopy")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scoring (visible on web + print) */}
          <Card className="border-[#1E3A5F] bg-[#0B1F3A]/5 print:break-inside-avoid">
            <CardHeader>
              <CardTitle className="text-lg">{t.resultTitle}</CardTitle>
              <p className="text-xs text-muted-foreground">{t.resultDisclaimer}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t.opportunity}</p>
                <p className="text-2xl font-semibold tabular-nums">
                  {opportunity.points} {t.points}
                </p>
                <p className={oBand.className}>{oBand.label}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t.complexity}</p>
                <p className="text-2xl font-semibold">
                  {complexity.band} ({complexity.points} {t.points})
                </p>
                <p className={cBand.className}>{cBand.label}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t.next.title}</CardTitle>
            </CardHeader>
            <CardContent className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <p>{t.next.b1}</p>
              <p>{t.next.b2}</p>
              <p>{t.next.b3}</p>
            </CardContent>
          </Card>
        </form>
      </div>

      <div className="print:hidden">
        <Footer messages={headerFooterMessages.footer} currentLang={currentLang} />
      </div>
    </div>
  )
}
