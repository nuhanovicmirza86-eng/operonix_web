import {
  BarChart3,
  Zap,
  Clock,
  Target,
  TrendingUp,
  Settings2,
  Database,
  Shield,
  Wrench,
  Truck,
  Factory,
} from "lucide-react"

type SolutionStat = {
  label: string
  value: string
}

type SolutionItem = {
  id: string
  title: string
  description: string
  stats: SolutionStat[]
  features: string[]
}

type CapabilityItem = {
  id: string
  label: string
}

type SolutionsMessages = {
  sectionLabel: string
  title: string
  description: string
  capabilities: CapabilityItem[]
  items: SolutionItem[]
}

type SolutionsProps = {
  messages: SolutionsMessages
}

const solutionIcons = {
  production: Factory,
  mesOee: BarChart3,
  maintenance: Wrench,
  quality: Target,
  logistics: Truck,
} as const

const capabilityIcons = {
  realTimeData: Zap,
  monitoring247: Clock,
  analytics: TrendingUp,
  configurable: Settings2,
  dataIntegration: Database,
  secure: Shield,
} as const

export function Solutions({ messages }: SolutionsProps) {
  return (
    <section id="solutions" className="py-24 sm:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-wider">
            {messages.sectionLabel}
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground">
            {messages.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {messages.description}
          </p>
        </div>

        {/* Capabilities */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {messages.capabilities.map((cap, index) => {
            const Icon =
              capabilityIcons[cap.id as keyof typeof capabilityIcons] ?? Zap

            return (
              <div key={index} className="flex items-center gap-2 text-muted-foreground">
                <Icon className="h-4 w-4 text-accent" />
                <span className="text-sm">{cap.label}</span>
              </div>
            )
          })}
        </div>

        {/* Solutions */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {messages.items.map((solution, index) => {
            const Icon =
              solutionIcons[solution.id as keyof typeof solutionIcons] ?? BarChart3

            return (
              <div
                key={index}
                className="rounded-lg border border-border bg-background p-8 hover:border-accent/50 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>

                  <div className="flex gap-4">
                    {solution.stats.map((stat, i) => (
                      <div key={i} className="text-right">
                        <div className="text-xl font-bold text-accent">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <h3 className="mt-6 text-xl font-bold text-foreground">
                  {solution.title}
                </h3>

                <p className="mt-2 text-muted-foreground">
                  {solution.description}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  {solution.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}