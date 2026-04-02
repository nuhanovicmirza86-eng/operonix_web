"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { 
  Factory, 
  Gauge, 
  Wrench, 
  ClipboardCheck, 
  Truck,
  ChevronRight 
} from "lucide-react"

const modules = [
  {
    id: "mes",
    name: "MES",
    fullName: "Manufacturing Execution System",
    icon: Factory,
    description: "Real-time production tracking, work order management, and shop floor control for complete manufacturing visibility.",
    features: [
      "Real-time production monitoring",
      "Work order management",
      "Material traceability",
      "Shop floor data collection",
      "Process routing control",
    ],
    color: "bg-accent",
  },
  {
    id: "oee",
    name: "OEE",
    fullName: "Overall Equipment Effectiveness",
    icon: Gauge,
    description: "Comprehensive equipment performance tracking with availability, performance, and quality metrics at your fingertips.",
    features: [
      "Real-time OEE calculation",
      "Downtime tracking & analysis",
      "Performance benchmarking",
      "Loss categorization",
      "Trend analysis dashboards",
    ],
    color: "bg-accent",
  },
  {
    id: "maintenance",
    name: "Maintenance",
    fullName: "Maintenance Management",
    icon: Wrench,
    description: "Predictive and preventive maintenance scheduling to maximize equipment uptime and extend asset lifecycle.",
    features: [
      "Preventive maintenance scheduling",
      "Work order management",
      "Spare parts inventory",
      "Asset lifecycle tracking",
      "Predictive analytics",
    ],
    color: "bg-accent",
  },
  {
    id: "quality",
    name: "Quality",
    fullName: "Quality Management System",
    icon: ClipboardCheck,
    description: "End-to-end quality control with inspection planning, non-conformance handling, and statistical process control.",
    features: [
      "Inspection planning",
      "SPC / Statistical analysis",
      "Non-conformance management",
      "CAPA workflow",
      "Document control",
    ],
    color: "bg-accent",
  },
  {
    id: "logistics",
    name: "Logistics",
    fullName: "Logistics & Warehouse",
    icon: Truck,
    description: "Streamlined material flow from receiving to shipping with barcode/RFID integration and inventory optimization.",
    features: [
      "Warehouse management",
      "Inventory optimization",
      "Barcode/RFID integration",
      "Shipping & receiving",
      "Kanban automation",
    ],
    color: "bg-accent",
  },
]

export function Modules() {
  const [activeModule, setActiveModule] = useState(modules[0])

  return (
    <section id="modules" className="py-24 sm:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-wider">
            Platform Modules
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            One platform. Complete control.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Integrated modules that work together seamlessly to digitize your entire manufacturing operation.
          </p>
        </div>

        {/* Module tabs */}
        <div className="mt-16">
          {/* Tab navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {modules.map((module) => {
              const Icon = module.icon
              return (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                    activeModule.id === module.id
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {module.name}
                </button>
              )
            })}
          </div>

          {/* Active module content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Description */}
            <div>
              <div className={cn("inline-flex items-center justify-center h-12 w-12 rounded-lg", activeModule.color)}>
                <activeModule.icon className="h-6 w-6 text-background" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-foreground">
                {activeModule.fullName}
              </h3>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {activeModule.description}
              </p>
              <ul className="mt-8 space-y-3">
                {activeModule.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground">
                    <ChevronRight className="h-4 w-4 text-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - Visual */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg border border-border bg-background overflow-hidden">
                {/* Simulated dashboard UI */}
                <div className="p-4 border-b border-border flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-destructive/50" />
                    <div className="h-3 w-3 rounded-full bg-chart-4/50" />
                    <div className="h-3 w-3 rounded-full bg-accent/50" />
                  </div>
                  <div className="flex-1 text-center text-xs text-muted-foreground">
                    {activeModule.fullName} Dashboard
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[85, 92, 78].map((value, i) => (
                      <div key={i} className="rounded border border-border p-3 bg-secondary/30">
                        <div className="text-2xl font-bold text-foreground">{value}%</div>
                        <div className="text-xs text-muted-foreground">
                          {["Efficiency", "Quality", "Availability"][i]}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-accent" />
                        <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                          <div 
                            className="h-full bg-accent/50 rounded-full" 
                            style={{ width: `${70 + i * 10}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{70 + i * 10}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
