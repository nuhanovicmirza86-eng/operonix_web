import { Shield, FileCheck, Award, CheckCircle2 } from "lucide-react"

type CertificationItem = {
  title: string
  description: string
}

type AutomotiveMessages = {
  sectionLabel: string
  title: string
  description: string
  complianceTitle: string
  complianceSubtitle: string
  floatingBadge: string
  certifications: CertificationItem[]
  complianceFeatures: string[]
}

type AutomotiveProps = {
  messages: AutomotiveMessages
}

const certificationIcons = [Shield, FileCheck, Award]

export function Automotive({ messages }: AutomotiveProps) {
  return (
    <section id="automotive" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1f2c_1px,transparent_1px),linear-gradient(to_bottom,#1a1f2c_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <p className="text-sm font-medium text-accent uppercase tracking-wider">
              {messages.sectionLabel}
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {messages.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {messages.description}
            </p>

            {/* Certification cards */}
            <div className="mt-10 space-y-4">
              {messages.certifications.map((cert, index) => {
                const Icon = certificationIcons[index] ?? Shield

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
                  <h3 className="font-semibold text-foreground">{messages.complianceTitle}</h3>
                  <p className="text-sm text-muted-foreground">{messages.complianceSubtitle}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {messages.complianceFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-accent text-background px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              {messages.floatingBadge}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}