import { Shield, FileCheck, Award, CheckCircle2 } from "lucide-react"

const certifications = [
  {
    icon: Shield,
    title: "IATF 16949 Ready",
    description: "Built-in compliance features for automotive quality management system requirements.",
  },
  {
    icon: FileCheck,
    title: "APQP / PPAP Support",
    description: "Integrated tools for Advanced Product Quality Planning and Production Part Approval Process.",
  },
  {
    icon: Award,
    title: "VDA 6.3 Aligned",
    description: "Process audit tools aligned with German Automotive Industry Association standards.",
  },
]

const complianceFeatures = [
  "Full traceability from raw material to finished product",
  "Automated FMEA documentation and updates",
  "Control plan integration with inspection",
  "8D problem-solving workflow",
  "Supplier quality management",
  "Customer-specific requirements tracking",
  "Audit trail for all quality events",
  "Real-time alerting for quality escapes",
]

export function Automotive() {
  return (
    <section id="automotive" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1f2c_1px,transparent_1px),linear-gradient(to_bottom,#1a1f2c_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <p className="text-sm font-medium text-accent uppercase tracking-wider">
              Automotive Excellence
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Built for the most demanding industry standards.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              From Tier 1 suppliers to OEMs, Operonix provides the tools and documentation 
              infrastructure needed to meet and exceed automotive quality requirements.
            </p>

            {/* Certification cards */}
            <div className="mt-10 space-y-4">
              {certifications.map((cert, index) => {
                const Icon = cert.icon
                return (
                  <div
                    key={index}
                    className="flex gap-4 p-4 rounded-lg border border-border bg-card/50 hover:border-accent/50 transition-colors"
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{cert.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right - Compliance checklist */}
          <div className="relative">
            <div className="rounded-lg border border-border bg-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-background" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Compliance Features</h3>
                  <p className="text-sm text-muted-foreground">Built-in automotive standards</p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {complianceFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-accent text-background px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              OEM Approved
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
