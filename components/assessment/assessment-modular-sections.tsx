"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  EXTENDED_MODULE_SECTIONS,
  getExtendedStrings,
  getTierLabel,
  type SectionDef,
  type QuestionDef,
} from "@/lib/assessment-extended-data"
import type { Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

/** Kontrast na tamnoj kartici: bijela polja (usklađeno s glavnim upitnikom). */
const upitnikFieldSurface =
  "!bg-white !text-neutral-900 !border-neutral-400 placeholder:!text-neutral-500 shadow-sm"

type Props = {
  locale: Locale
  value: Record<string, string>
  onChange: (next: Record<string, string>) => void
}

const interestValues = ["yes", "maybe", "no"] as const

function InterestRow({
  label,
  val,
  onPick,
  yes,
  maybe,
  no,
}: {
  label: string
  val: string
  onPick: (v: string) => void
  yes: string
  maybe: string
  no: string
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <div className="flex flex-wrap gap-1.5">
        {interestValues.map((k) => (
          <Button
            key={k}
            type="button"
            size="sm"
            variant={val === k ? "default" : "outline"}
            className={cn("h-8 text-xs", val === k && "bg-[#1E3A5F]")}
            onClick={() => onPick(val === k ? "" : k)}
          >
            {k === "yes" ? yes : k === "maybe" ? maybe : no}
          </Button>
        ))}
      </div>
    </div>
  )
}

function Field({
  q,
  tr,
  val,
  set,
  locale,
}: {
  q: QuestionDef
  tr: (k: string) => string
  val: string
  set: (v: string) => void
  locale: Locale
}) {
  const lab = tr(q.labelKey)
  const ph = q.placeholderKey ? tr(q.placeholderKey) : ""

  if (q.kind === "interest") {
    const yes = locale === "bs" ? "Da" : "Yes"
    const maybe = locale === "bs" ? "Razmatramo" : "Considering"
    const no = locale === "bs" ? "Ne" : "No"
    return (
      <InterestRow
        label={lab}
        val={val}
        onPick={set}
        yes={yes}
        maybe={maybe}
        no={no}
      />
    )
  }

  if (q.kind === "textarea") {
    return (
      <div className="space-y-1.5">
        <Label htmlFor={q.id} className="text-sm">
          {lab}
        </Label>
        <Textarea
          id={q.id}
          value={val}
          onChange={(e) => set(e.target.value)}
          placeholder={ph}
          rows={3}
          className={cn("text-sm", upitnikFieldSurface)}
        />
      </div>
    )
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor={q.id} className="text-sm">
        {lab}
      </Label>
      <Input
        id={q.id}
        value={val}
        onChange={(e) => set(e.target.value)}
        placeholder={ph}
        className={cn("text-sm", upitnikFieldSurface)}
      />
    </div>
  )
}

export function AssessmentModularSections({ locale, value, onChange }: Props) {
  const tr = getExtendedStrings(locale)

  const setField = (id: string, v: string) => {
    onChange({ ...value, [id]: v })
  }

  return (
    <div className="space-y-2">
      <div className="rounded-xl border border-[#1E3A5F]/30 bg-[#0B1F3A]/[0.03] p-4 sm:p-6">
        <h2 className="font-serif text-xl text-foreground">{tr("blockTitle")}</h2>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{tr("blockLead")}</p>
      </div>

      <Accordion type="multiple" className="w-full rounded-xl border bg-card">
        {EXTENDED_MODULE_SECTIONS.map((section: SectionDef) => (
          <AccordionItem key={section.id} value={section.id} className="border-b px-4 last:border-0">
            <AccordionTrigger className="hover:no-underline py-4 text-left">
              <span className="flex flex-1 flex-col items-start gap-2 sm:flex-row sm:items-center">
                <Badge
                  variant="outline"
                  className="shrink-0 border-[#00C2FF]/40 text-[11px] text-[#00C2FF]"
                >
                  {tr("tierLabel")}: {getTierLabel(locale, section.tier)}
                </Badge>
                <span className="font-medium">{tr(section.titleKey)}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-6 pt-0">
              <p className="text-sm text-muted-foreground">{tr(section.leadKey)}</p>
              {section.questions.map((q) => (
                <Field
                  key={q.id}
                  q={q}
                  tr={tr}
                  val={value[q.id] ?? ""}
                  set={(v) => setField(q.id, v)}
                  locale={locale}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
