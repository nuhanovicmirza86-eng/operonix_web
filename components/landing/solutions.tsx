import { 
  BarChart3, 
  Zap, 
  Clock, 
  Target,
  TrendingUp,
  Settings2,
  Database,
  Shield
} from "lucide-react"

const solutions = [
  {
    title: "MES / OEE",
    description: "Real-time visibility into production performance",
    icon: BarChart3,
    stats: [
      { label: "OEE Increase", value: "+40%" },
      { label: "Downtime Reduction", value: "-35%" },
    ],
    features: [
      "Live production dashboards",
      "Automatic data collection",
      "Bottleneck identification",
      "Shift handover reports",
    ],
  },
  {
    title: "Maintenance",
    description: "Maximize asset availability and lifecycle",
    icon: Wrench,
    stats: [
      { label: "Uptime Improvement", value: "+25%" },
      { label: "Maintenance Costs", value: "-30%" },
    ],
    features: [
      "Predictive maintenance",
      "Mobile work orders",
      "Spare parts management",
      "Condition monitoring",
    ],
  },
  {
    title: "Quality",
    description: "Zero-defect manufacturing with full traceability",
    icon: Target,
    stats: [
      { label: "Defect Reduction", value: "-60%" },
      { label: "Audit Time", value: "-50%" },
    ],
    features: [
      "SPC and control charts",
      "Non-conformance workflow",
      "CAPA management",
      "Supplier quality",
    ],
  },
  {
    title: "Logistics",
    description: "Optimized material flow and inventory",
    icon: Truck,
    stats: [
      { label: "Inventory Accuracy", value: "99.5%" },
      { label: "Pick Time", value: "-40%" },
    ],
    features: [
      "Warehouse management",
      "Kanban automation",
      "Barcode/RFID",
      "JIT delivery",
    ],
  },
]

import { Wrench, Truck } from "lucide-react"

const capabilities = [
  { icon: Zap, label: "Real-time Data" },
  { icon: Clock, label: "24/7 Monitoring" },
  { icon: TrendingUp, label: "Analytics" },
  { icon: Settings2, label: "Configurable" },
  { icon: Database, label: "Data Integration" },
  { icon: Shield, label: "Secure" },
]

export function Solutions() {
  return (
    <section id="solutions" className="py-24 sm:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-wider">
            Solutions
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Transform every aspect of manufacturing.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Purpose-built solutions that deliver measurable results across your operations.
          </p>
        </div>

        {/* Capabilities bar */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon
            return (
              <div key={index} className="flex items-center gap-2 text-muted-foreground">
                <Icon className="h-4 w-4 text-accent" />
                <span className="text-sm">{cap.label}</span>
              </div>
            )
          })}
        </div>

        {/* Solutions grid */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {solutions.map((solution, index) => {
            const Icon = solution.icon
            return (
              <div
                key={index}
                className="group rounded-lg border border-border bg-background p-8 hover:border-accent/50 transition-all"
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

                <h3 className="mt-6 text-xl font-bold text-foreground">{solution.title}</h3>
                <p className="mt-2 text-muted-foreground">{solution.description}</p>

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
