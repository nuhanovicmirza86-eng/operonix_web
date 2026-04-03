"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Factory,
  Gauge,
  Wrench,
  ClipboardCheck,
  Truck,
  Settings2,
  ChevronRight,
} from "lucide-react"

type ModuleItem = {
  id: string
  name: string
  fullName: string
  description: string
  features: string[]
}

type ModulesMessages = {
  sectionLabel: string
  title: string
  description: string
  dashboardLabel: string
  metrics: string[]
  items: ModuleItem[]
}

type ModulesProps = {
  messages: ModulesMessages
}

const moduleIcons = {
  production: Settings2,
  mes: Factory,
  oee: Gauge,
  maintenance: Wrench,
  quality: ClipboardCheck,
  logistics: Truck,
} as const

export function Modules({ messages }: ModulesProps) {
  const [activeModule, setActiveModule] = useState(messages.items[0])

  const ActiveIcon =
    moduleIcons[activeModule.id as keyof typeof moduleIcons] ?? Factory

  return (
    <section id="modules" className="py-24 sm:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-wider">
            {messages.sectionLabel}
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {messages.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {messages.description}
          </p>
        </div>

        <div className="mt-16">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {messages.items.map((module) => {
              const Icon =
                moduleIcons[module.id as keyof typeof moduleIcons] ?? Factory

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

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-accent">
                <ActiveIcon className="h-6 w-6 text-background" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-foreground">
                {activeModule.fullName}
              </h3>

              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {activeModule.description}
              </p>

              <ul className="mt-8 space-y-3">
                {activeModule.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-foreground"
                  >
                    <ChevronRight className="h-4 w-4 text-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-lg border border-border bg-background overflow-hidden">
                <div className="p-4 border-b border-border flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-destructive/50" />
                    <div className="h-3 w-3 rounded-full bg-chart-4/50" />
                    <div className="h-3 w-3 rounded-full bg-accent/50" />
                  </div>
                  <div className="flex-1 text-center text-xs text-muted-foreground">
                    {activeModule.fullName} {messages.dashboardLabel}
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[85, 92, 78].map((value, i) => (
                      <div
                        key={i}
                        className="rounded border border-border p-3 bg-secondary/30"
                      >
                        <div className="text-2xl font-bold text-foreground">
                          {value}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {messages.metrics[i]}
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
                        <span className="text-xs text-muted-foreground">
                          {70 + i * 10}%
                        </span>
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