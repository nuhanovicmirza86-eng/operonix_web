import type { Locale } from "./i18n"

export type SectionTier = "basic" | "operational" | "technical"

export type QuestionKind = "interest" | "text" | "textarea"

export type QuestionDef = {
  id: string
  kind: QuestionKind
  /** i18n key under `questions` in ExtendedCopy */
  labelKey: string
  placeholderKey?: string
}

export type SectionDef = {
  id: string
  sort: number
  tier: SectionTier
  titleKey: string
  leadKey: string
  questions: QuestionDef[]
}

/** Redoslijed: osnovno → moduli (operativno) → AI/analitika → personal → tehničko */
export const EXTENDED_MODULE_SECTIONS: SectionDef[] = [
  {
    id: "production_module",
    sort: 10,
    tier: "operational",
    titleKey: "sec_production_title",
    leadKey: "sec_production_lead",
    questions: [
      { id: "int_production", kind: "interest", labelKey: "q_interest" },
      {
        id: "production_orders_depth",
        kind: "textarea",
        labelKey: "q_production_orders",
        placeholderKey: "ph_production_orders",
      },
      {
        id: "production_erp_touches",
        kind: "textarea",
        labelKey: "q_production_erp",
        placeholderKey: "ph_production_erp",
      },
    ],
  },
  {
    id: "mes",
    sort: 20,
    tier: "operational",
    titleKey: "sec_mes_title",
    leadKey: "sec_mes_lead",
    questions: [
      { id: "int_mes", kind: "interest", labelKey: "q_interest" },
      { id: "mes_today", kind: "textarea", labelKey: "q_mes_today", placeholderKey: "ph_mes_today" },
      { id: "mes_target", kind: "textarea", labelKey: "q_mes_target", placeholderKey: "ph_mes_target" },
    ],
  },
  {
    id: "oee_performance",
    sort: 30,
    tier: "operational",
    titleKey: "sec_oee_title",
    leadKey: "sec_oee_lead",
    questions: [
      { id: "int_oee_layer", kind: "interest", labelKey: "q_interest" },
      { id: "oee_tpm_losses", kind: "textarea", labelKey: "q_tpm", placeholderKey: "ph_tpm" },
      { id: "teep_capacity", kind: "textarea", labelKey: "q_teep", placeholderKey: "ph_teep" },
    ],
  },
  {
    id: "quality",
    sort: 40,
    tier: "operational",
    titleKey: "sec_quality_title",
    leadKey: "sec_quality_lead",
    questions: [
      { id: "int_quality", kind: "interest", labelKey: "q_interest" },
      { id: "quality_iatf_depth", kind: "textarea", labelKey: "q_iatf", placeholderKey: "ph_iatf" },
      { id: "quality_trace", kind: "textarea", labelKey: "q_trace", placeholderKey: "ph_trace" },
    ],
  },
  {
    id: "maintenance",
    sort: 50,
    tier: "operational",
    titleKey: "sec_maint_title",
    leadKey: "sec_maint_lead",
    questions: [
      { id: "int_maintenance", kind: "interest", labelKey: "q_interest" },
      { id: "cmms_today", kind: "textarea", labelKey: "q_cmms", placeholderKey: "ph_cmms" },
      { id: "mtbf_mttr", kind: "text", labelKey: "q_mtbf", placeholderKey: "ph_mtbf" },
    ],
  },
  {
    id: "logistics",
    sort: 60,
    tier: "operational",
    titleKey: "sec_logistics_title",
    leadKey: "sec_logistics_lead",
    questions: [
      { id: "int_logistics", kind: "interest", labelKey: "q_interest" },
      { id: "log_wms", kind: "textarea", labelKey: "q_wms", placeholderKey: "ph_wms" },
      { id: "log_integrations", kind: "textarea", labelKey: "q_log_int", placeholderKey: "ph_log_int" },
    ],
  },
  {
    id: "scada_live",
    sort: 70,
    tier: "operational",
    titleKey: "sec_scada_title",
    leadKey: "sec_scada_lead",
    questions: [
      { id: "int_scada", kind: "interest", labelKey: "q_interest_addon" },
      { id: "scada_screens", kind: "text", labelKey: "q_screens", placeholderKey: "ph_screens" },
      { id: "scada_plc", kind: "textarea", labelKey: "q_plc", placeholderKey: "ph_plc" },
    ],
  },
  {
    id: "energy",
    sort: 80,
    tier: "operational",
    titleKey: "sec_energy_title",
    leadKey: "sec_energy_lead",
    questions: [
      { id: "int_energy", kind: "interest", labelKey: "q_interest" },
      { id: "energy_meters", kind: "textarea", labelKey: "q_meters", placeholderKey: "ph_meters" },
    ],
  },
  {
    id: "microclimate",
    sort: 90,
    tier: "operational",
    titleKey: "sec_micro_title",
    leadKey: "sec_micro_lead",
    questions: [
      { id: "int_micro", kind: "interest", labelKey: "q_interest" },
      { id: "micro_use_case", kind: "textarea", labelKey: "q_micro", placeholderKey: "ph_micro" },
    ],
  },
  {
    id: "ai_packages",
    sort: 100,
    tier: "operational",
    titleKey: "sec_ai_title",
    leadKey: "sec_ai_lead",
    questions: [
      { id: "int_ai_basic", kind: "interest", labelKey: "q_ai_basic" },
      { id: "int_ai_maint", kind: "interest", labelKey: "q_ai_maint" },
      { id: "int_ai_prod", kind: "interest", labelKey: "q_ai_prod" },
      { id: "int_ai_full", kind: "interest", labelKey: "q_ai_full" },
      { id: "ai_use_cases", kind: "textarea", labelKey: "q_ai_use", placeholderKey: "ph_ai_use" },
    ],
  },
  {
    id: "ai_reports",
    sort: 110,
    tier: "operational",
    titleKey: "sec_ai_rep_title",
    leadKey: "sec_ai_rep_lead",
    questions: [
      { id: "int_ai_reports", kind: "interest", labelKey: "q_interest_addon" },
      { id: "ai_rep_freq", kind: "text", labelKey: "q_md_reports", placeholderKey: "ph_md" },
    ],
  },
  {
    id: "analytics_bi",
    sort: 120,
    tier: "technical",
    titleKey: "sec_bi_title",
    leadKey: "sec_bi_lead",
    questions: [
      { id: "int_analytics", kind: "interest", labelKey: "q_interest_bonus" },
      { id: "bi_downtime_trends", kind: "textarea", labelKey: "q_bi", placeholderKey: "ph_bi" },
      { id: "bi_management_kpis", kind: "textarea", labelKey: "q_mgmt_kpi", placeholderKey: "ph_mgmt" },
    ],
  },
  {
    id: "personal_worktime",
    sort: 130,
    tier: "operational",
    titleKey: "sec_personal_title",
    leadKey: "sec_personal_lead",
    questions: [
      { id: "int_personal", kind: "interest", labelKey: "q_interest" },
      { id: "personal_ta_export", kind: "textarea", labelKey: "q_ta", placeholderKey: "ph_ta" },
    ],
  },
  {
    id: "workforce",
    sort: 140,
    tier: "basic",
    titleKey: "sec_wf_title",
    leadKey: "sec_wf_lead",
    questions: [
      { id: "int_workforce", kind: "interest", labelKey: "q_interest" },
      { id: "wf_shifts", kind: "textarea", labelKey: "q_shifts", placeholderKey: "ph_shifts" },
      { id: "wf_compliance", kind: "textarea", labelKey: "q_compliance", placeholderKey: "ph_compliance" },
    ],
  },
  {
    id: "it_security",
    sort: 200,
    tier: "technical",
    titleKey: "sec_it_title",
    leadKey: "sec_it_lead",
    questions: [
      { id: "it_identity", kind: "textarea", labelKey: "q_idp", placeholderKey: "ph_idp" },
      { id: "it_api", kind: "textarea", labelKey: "q_api", placeholderKey: "ph_api" },
      { id: "it_data_residency", kind: "text", labelKey: "q_residency", placeholderKey: "ph_res" },
    ],
  },
]

export function defaultExtendedAnswers(): Record<string, string> {
  const o: Record<string, string> = {}
  for (const s of EXTENDED_MODULE_SECTIONS) {
    for (const q of s.questions) {
      o[q.id] = ""
    }
  }
  return o
}

const BS: Record<string, string> = {
  blockTitle: "Moduli i rješenja Operonix (dodatna pitanja)",
  blockLead:
    "Ispod su pitanja po modulima i add-on rješenjima, poredane od operativnih prema tehničkim. Označite interes i ukratko opišite kontekst — pomaže nam tačnija ponuda.",
  tierLabel: "Nivo",
  q_interest: "Razmatrate li ovaj opseg u projektu?",
  q_interest_addon: "Razmatrate li ovaj add-on (doplatak)?",
  q_interest_bonus: "Razmatrate li bonus+ / add-on analitiku?",
  sec_production_title: "Modul: proizvodnja (nalozi, izvršenje)",
  sec_production_lead: "Praćenje naloga, WMS tačke, veza s ERP-om i shop floor-om.",
  q_production_orders: "Kako danas upravljate proizvodnim nalozima i stanjem na linijama? Šta biste željeli automatizirati prvo?",
  ph_production_orders: "Kratki opis toka, pain points…",
  q_production_erp: "Koji ERP / izvor podataka o planu i stvarnom stanju koristite (naziv, integracije)?",
  ph_production_erp: "Npr. SAP, lokalno, CSV…",
  sec_mes_title: "Modul: MES (izvršenje, radni centri, telemetrija)",
  sec_mes_lead: "Stvarno izvođenje, radni centri, veza mašina–nalozi u jednom okruženju.",
  q_mes_today: "Imate li današnji MES (koji vendor / stanje) i šta vam fali u izvršenju?",
  ph_mes_today: "Ili nema MES uopće…",
  q_mes_target: "Cilj: šta MES treba pružiti u prvoj fazi (prioritet 1–3 točke)?",
  ph_mes_target: "Npr. kvačenje rada, brojanje, veza sa šifrom proizvoda…",
  sec_oee_title: "OOE / OEE / TEEP, zastoji, TPM gubici",
  sec_oee_lead: "Sloj performansi, katalog gubitaka, povezivanje s zastojima.",
  q_tpm: "Koje gubitke danas mjerite, a koje ne? Imate li interni TPM katalog uz Operonix šifrarnik?",
  ph_tpm: "A/P/Q, planirani zastoji, sečenje, setup…",
  q_teep: "Treba li vam vidljivost kapaciteta / TEEP (smjene, plan vs. stvarno)?",
  ph_teep: "Broj smjena, pitanje kalendara, planiranog vs. radnog vremena…",
  sec_quality_title: "Modul: kvalitet (QMS, IATF alati)",
  sec_quality_lead: "NCR, CAPA, kontrola plan, sljedivost, audit traga.",
  q_iatf: "Koji IATF / kvalitativni alati su vam kritični u sljedećih 12 mjeseci?",
  ph_iatf: "Iznad već navedenog u upitniku…",
  q_trace: "Sljedivost: lot, serijski, reworking — koji format mora ući u Operonix?",
  ph_trace: "Kupac, regulatorno…",
  sec_maint_title: "Modul: održavanje (CMMS)",
  sec_maint_lead: "Radni nalozi, imovina, kvar–proizvodnja, notifikacije.",
  q_cmms: "Današnji CMMS / Excel / papir: volumen kvarova i zatvaranje RN-ova (mjesečno)?",
  ph_cmms: "Broj otvorenih RN, srednje vrijeme otklona…",
  q_mtbf: "Ako imate, navedite okvirno MTBF/MTTR ili ostavite prazno.",
  ph_mtbf: "Samo orijentaciono",
  sec_logistics_title: "Modul: logistika (skladišta, kretanja, lotovi)",
  sec_logistics_lead: "Zalihe, kretanje prema MES/ERP, identifikatori.",
  q_wms: "Kako danas upravljate zalihama, ulaz-izlaz, lotovima prema proizvodnji?",
  ph_wms: "Jedno ili više skladišta, barkod, RF…",
  q_log_int: "Potrebne integracije: prevoz, carina, 3PL, drugi WMS/ERP polja?",
  ph_log_int: "API, fajl, ručno…",
  sec_scada_title: "Add-on: SCADA uživo (živi zid, PLC)",
  sec_scada_lead: "Bonus modul: SCADA live na istom tenantu — odvojeno od osnovne pretplate.",
  q_screens: "Procjena: koliko ekrana / panela biste željeli u pilotu (broj, jedinica: ekran)?",
  ph_screens: "Npr. 2–3 linije, 1 ekran po liniji…",
  q_plc: "Koji PLC/SCADA proizvođači, protokol (OPC UA, Modbus, drugo) i ograničenja mreže?",
  ph_plc: "Starija oprema, segmentacija, DMZ…",
  sec_energy_title: "Modul: energetika (mjerači, dashboard)",
  sec_energy_lead: "Evidencija potrošnje po pogonu / metru.",
  q_meters: "Imate li mjerne tačke (struja, plin, pritisak) koje treba povezati? Red tačaka?",
  ph_meters: "Broj mjerila, trenutno očitavanje…",
  sec_micro_title: "Modul: mikroklima / uvjeti (unosi, izvještaji)",
  sec_micro_lead: "Dnevni/periodični unosi, izvještaji za hale.",
  q_micro: "Koje hale/zone treba pratiti i u kojim intervalima? Postoje li već senzori?",
  ph_micro: "Temperatura, vlaga, pritisak…",
  sec_ai_title: "Operonix AI (Basic / Održavanje / Proizvodnja / puni enterprise sloj)",
  sec_ai_lead: "Koji AI paket razmatrate (odvojeni entitlementi) — obavezno potvrdite interes zasebno ispod.",
  q_ai_basic: "AI Basic (opći pristup, ograničene uloge)",
  q_ai_maint: "AI Maintenance (kvarovi, RN, prediktiv u fazama)",
  q_ai_prod: "AI Production (OEE, nalozi, tumačenje signala, SCADA pri kontekstu)",
  q_ai_full: "Puni AI sloj (legacy enterprise ekvivalent)",
  q_ai_use: "Koji operativni scenariji (3–5 rečenica) — šta asistent MORA pomoći u pogonu/uredu?",
  ph_ai_use: "Primjeri: brži odgovor na zastoj, prijedloge RN…",
  sec_ai_rep_title: "Add-on: AI Markdown izvještaji (management pack)",
  sec_ai_rep_lead: "Strukturirani izvještaji, periodično, uz odgovarajući AI entitelment.",
  q_md_reports: "Koliko često biste očekivali AI izvještaj (npr. sedmični) i tko ga čita?",
  ph_md: "Npr. sedmični, direktor, shift leader…",
  sec_bi_title: "Add-on: Operonix Analytics (MES BI, TEEP, dnevni zastoji, trendovi)",
  sec_bi_lead: "Povezivanje s zastojima, TEEP, callable analiza — nije univerzalni data warehouse.",
  q_bi: "Koje odluke (3 primjera) želite donositi s ovim ekranom: smjene, proizvodi, linije?",
  ph_bi: "KPI koji danas nema, a trebaju vam u jednom mjestu",
  q_mgmt_kpi: "Koje KPI-je menadžment traži tjedno (format, kupac, interno)?",
  ph_mgmt: "Npr. OEE, TEEP, FPY, PPM, COPQ…",
  sec_personal_title: "Modul: personal (obračun radnog vremena, T&A, exporti)",
  sec_personal_lead: "Odvojen od MES/OOE ekrana; tri sloja agregata do exporta u plaću.",
  q_ta: "Koliko zaposlenih u smjenama, postoje li čitači, gateway, povezivanje s kvalitetom (tko, kad)?",
  ph_ta: "Broj učitavanja, iznimke, nadoknade, GDPR fokus…",
  sec_wf_title: "Radna snaga, smjene, kompetencije (People ops — sažetak)",
  sec_wf_lead: "Bez pune HR tabele: samo operativne potrebe povezane s proizvodnjom i kvalitetom.",
  q_shifts: "Kako se danas rade smjene, rukovanje odsutnostima, kvalifikacija za liniju?",
  ph_shifts: "Matrica, obuke, istek kvalifikacije…",
  q_compliance: "Postoje li IATF / kupčevi zahtjevi za evideniju kompetencija na mašinama?",
  ph_compliance: "Audit trail, periodična provjera…",
  sec_it_title: "IT, integracija, sigurnost, tenant",
  sec_it_lead: "Tehnički završni blok — ključ za procjenu truda integracije i sigurnosnog modela.",
  q_idp: "Identitet: Azure AD, Google, LDAP, lokalno? SSO zahtjevi?",
  ph_idp: "Tko je vlasnik identiteta…",
  q_api: "Potrebne integracije u drugi sustav: naziv, smer, protokol (REST, fajl, message bus).",
  ph_api: "Jednokratno vs. stalan tok…",
  q_residency: "Zahtjevi prema pružatelju (EU podaci, region, isključenje PII u logovima) — ukratko.",
  ph_res: "GDPR, retention…",
  sendBlockTitle: "Slanje upitnika",
  sendBlockLead:
    "Unesite e-mail (obavezno). Tim Operonix prima sadržaj upitnika; u pregledniku će se prikazati zahvalnica nakon uspješnog slanja.",
  contactName: "Kontakt osoba",
  contactEmail: "E-mail (obavezno)",
  contactPhone: "Telefon (neobavezno)",
  sendButton: "Pošalji upitnik",
  sendSending: "Šaljem…",
  sendOk: "Hvala — upitnik je zaprimljen. Javit ćemo se e-mailom.",
  sendErr: "Slanje nije uspjelo. Pokušajte kasnije ili kopirajte sadržaj (gumb ispod) i pošaljite ručno.",
  sendCopy: "Kopiraj JSON u međuspremnik",
  sendCopied: "Kopirano",
  sendEmailRequired: "Unesite ispravnu e-mail adresu prije slanja.",
  thankYouTitle: "Hvala vam",
  thankYouBody:
    "Zahvaljujemo vam se na upitu i interesovanju za Operonix Industrial inteligence platformu. " +
    "Odgovorit ćemo u najkraćem mogućem roku nakon što tim Operonix pregleda upitnik. " +
    "Ako ste naveli e-mail, poslana je i automatska potvrda (provjerite u neželjena pošta/spam).",
  sendWarnNoBackend:
    "Napomena: e-mail poslužitelj nije konfiguriran — upitnik nije automatski poslan. Koristite „Kopiraj JSON“ i pošaljite ručno.",
  sendWarnPartial:
    "Upitnik je zaprimljen, ali automatska potvrda na vaš e-mail možda nije stigla. Glavni odgovor stiže od tima Operonix.",
}

const EN: Record<string, string> = {
  blockTitle: "Operonix modules and solutions (additional questions)",
  blockLead:
    "Module-by-module and add-on questions, ordered from operational to technical. Mark interest and add short context for a more accurate quote.",
  tierLabel: "Level",
  q_interest: "Are you considering this area in the project?",
  q_interest_addon: "Are you considering this add-on?",
  q_interest_bonus: "Are you considering bonus+ / add-on analytics?",
  ph_ignore: "…",
  sec_production_title: "Module: production (orders, execution)",
  sec_production_lead: "Order execution, WMS touchpoints, ERP linkage with shop floor.",
  q_production_orders: "How do you run production orders and line state today? What to automate first?",
  ph_production_orders: "Short flow, pain points…",
  q_production_erp: "Which ERP / source for plan vs actual? Integrations in place?",
  ph_production_erp: "e.g. SAP, CSV, manual",
  sec_mes_title: "Module: MES (execution, work centers, telemetry)",
  sec_mes_lead: "Real execution, work centers, machine–order link in one layer.",
  q_mes_today: "Current MES (vendor, maturity) and what is missing in execution? Or no MES?",
  ph_mes_today: "If none, say so",
  q_mes_target: "What must MES deliver in phase 1 (1–3 priorities)?",
  ph_mes_target: "e.g. run/idle, counts, product codes…",
  sec_oee_title: "OOE / OEE / TEEP, downtime, TPM loss catalog",
  sec_oee_lead: "Performance layer, loss catalog, tie-in with downtimes.",
  q_tpm: "Which losses do you measure today, which not? Internal TPM list vs Operonix catalog alignment?",
  ph_tpm: "A/P/Q, planned stops, changeover…",
  q_teep: "Need capacity / TEEP view (shifts, calendar, planned vs actual time)?",
  ph_teep: "Shifts, working calendar…",
  sec_quality_title: "Module: quality (QMS, IATF tools)",
  sec_quality_lead: "NCR, CAPA, control plan, traceability, audit trail.",
  q_iatf: "Which IATF / quality tools are critical in the next 12 months? (Beyond earlier answers.)",
  ph_iatf: "Complement the main questionnaire",
  q_trace: "Traceability: lot, serial, rework — what must land in Operonix?",
  ph_trace: "Customer, regulatory…",
  sec_maint_title: "Module: maintenance (CMMS)",
  sec_maint_lead: "Work orders, assets, production linkage, notifications.",
  q_cmms: "Current CMMS / Excel / paper: volume and WO closure cadence (monthly)?",
  ph_cmms: "Open WOs, mean time to restore…",
  q_mtbf: "If available, MTBF/MTTR ballpark, else leave empty.",
  ph_mtbf: "Approximate",
  sec_logistics_title: "Module: logistics (warehouses, movements, lots)",
  sec_logistics_lead: "Stock, MES/ERP movement identifiers.",
  q_wms: "How do you manage stock, in/out, lots vs production today?",
  ph_wms: "One or many sites, barcode, RF…",
  q_log_int: "Integrations: freight, customs, 3PL, other WMS/ERP fields needed?",
  ph_log_int: "API, file, manual",
  sec_scada_title: "Add-on: SCADA live (wall, PLC)",
  sec_scada_lead: "SCADA add-on on same tenant — separate from base subscription.",
  q_screens: "How many live screens/panels in a pilot (count)?",
  ph_screens: "e.g. 2–3 lines, one wall per line…",
  q_plc: "PLC/SCADA vendors, protocol (OPC UA, Modbus…), network constraints?",
  ph_plc: "Legacy gear, segmentation, DMZ…",
  sec_energy_title: "Module: energy (meters, dashboard)",
  sec_energy_lead: "Energy trace per plant / meter point.",
  q_meters: "Metering points to connect? Order of roll-out?",
  ph_meters: "Count, today’s readout method…",
  sec_micro_title: "Module: microclimate (entries, reports)",
  sec_micro_lead: "Entries and reports for halls/zones.",
  q_micro: "Which halls/zones, intervals, existing sensors?",
  ph_micro: "T, RH, pressure…",
  sec_ai_title: "Operonix AI (Basic / Maintenance / Production / full enterprise layer)",
  sec_ai_lead: "Select interest per AI entitlements separately (each is a different module key).",
  q_ai_basic: "AI Basic (general, limited roles)",
  q_ai_maint: "AI Maintenance (WOs, faults, predictive in phases)",
  q_ai_prod: "AI Production (OEE, orders, signal interpretation, SCADA in context)",
  q_ai_full: "Full AI layer (legacy enterprise-style)",
  q_ai_use: "Operational scenarios (3–5 sentences) the assistant must support on floor or office —",
  ph_ai_use: "e.g. faster response to a stop, suggested WO text…",
  sec_ai_rep_title: "Add-on: AI Markdown reports (management pack)",
  sec_ai_rep_lead: "Structured periodic reports, needs matching AI entitlements.",
  q_md_reports: "Expected cadence of AI report and primary readers?",
  ph_md: "e.g. weekly, plant manager…",
  sec_bi_title: "Add-on: Operonix Analytics (MES BI, TEEP, daily downtime, trends)",
  sec_bi_lead: "Tied to downtimes, TEEP, callable analysis — not a full data warehouse.",
  q_bi: "Which decisions (3 examples) you want to drive from this: shifts, product, line?",
  ph_bi: "KPIs missing in one place today",
  q_mgmt_kpi: "Which management KPIs weekly (format, customer, internal)?",
  ph_mgmt: "OEE, TEEP, FPY, PPM, COPQ…",
  sec_personal_title: "Module: personal (T&A, payroll export layers)",
  sec_personal_lead: "Separate from MES/OEE; three aggregate layers to payroll export.",
  q_ta: "How many people on shifts, card readers, gateway, link to quality (who, when) and GDPR needs?",
  ph_ta: "Readers, exceptions, make-up time…",
  sec_wf_title: "Workforce, shifts, competencies (People ops — summary)",
  sec_wf_lead: "Not full HR: operational links to production and quality only.",
  q_shifts: "Shifts, absence handling, line qualification process today?",
  ph_shifts: "Matrix, training, expiring quals…",
  q_compliance: "IATF / customer needs for machine competency records and audit trail?",
  ph_compliance: "Recertification, evidence…",
  sec_it_title: "IT, integration, security, tenant",
  sec_it_lead: "Technical closing block for integration effort and security posture.",
  q_idp: "Identity: Azure AD, Google, LDAP, on-prem? SSO needs?",
  ph_idp: "Who owns IdP",
  q_api: "Downstream/ upstream systems: name, direction, protocol (REST, file, bus).",
  ph_api: "One-off vs continuous",
  q_residency: "Data residency, EU region, PII in logs — short note.",
  ph_res: "GDPR, retention",
  sendBlockTitle: "Submit the assessment",
  sendBlockLead:
    "E-mail is required. The Operonix team receives your questionnaire; a thank-you message appears in the browser after a successful send.",
  contactName: "Contact name",
  contactEmail: "E-mail (required)",
  contactPhone: "Phone (optional)",
  sendButton: "Send questionnaire",
  sendSending: "Sending…",
  sendOk: "Thank you — your response was received. We will e-mail you.",
  sendErr: "Send failed. Try again or copy the JSON below and e-mail it manually.",
  sendCopy: "Copy JSON to clipboard",
  sendCopied: "Copied",
  sendEmailRequired: "Enter a valid e-mail before sending.",
  thankYouTitle: "Thank you",
  thankYouBody:
    "We appreciate your inquiry and your interest in the Operonix Industrial intelligence platform. " +
    "We will respond in the shortest time possible after the Operonix team reviews your questionnaire. " +
    "If you provided an e-mail, a confirmation has also been sent (check spam/junk).",
  sendWarnNoBackend:
    "Note: e-mail is not configured on the server — your response was not sent automatically. Use “Copy JSON” and e-mail it manually.",
  sendWarnPartial:
    "Your assessment was received, but the automatic confirmation to your inbox may not have been sent. The Operonix team will still follow up.",
}

export function getExtendedStrings(locale: Locale) {
  const map = locale === "bs" ? BS : EN
  return (key: string): string => map[key] ?? (locale === "bs" ? EN[key] : BS[key]) ?? key
}

type TierL10n = { basic: string; operational: string; technical: string }

const tierLabels: { bs: TierL10n; en: TierL10n } = {
  bs: { basic: "Osnovno", operational: "Operativno", technical: "Tehnički" },
  en: { basic: "Basic", operational: "Operational", technical: "Technical" },
}

export function getTierLabel(locale: Locale, tier: SectionTier): string {
  const t = locale === "bs" ? tierLabels.bs : tierLabels.en
  return t[tier]
}
