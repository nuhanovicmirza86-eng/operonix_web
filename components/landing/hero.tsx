import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1f2c_1px,transparent_1px),linear-gradient(to_bottom,#1a1f2c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[128px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              IATF 16949 Compliant Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              <span className="text-balance">The complete platform to</span>{" "}
              <span className="text-accent">build manufacturing</span>{" "}
              <span className="text-balance">excellence.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Unified MES, OEE, Quality, Maintenance, and Logistics in one enterprise platform. 
              Built for automotive standards and industrial scale.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 gap-2">
                Get a Demo
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary gap-2">
                <Play className="h-4 w-4" />
                Watch Overview
              </Button>
            </div>
          </div>

          {/* Right content - Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "99.7%", label: "System Uptime", sublabel: "Enterprise SLA" },
              { value: "40%", label: "OEE Improvement", sublabel: "Average increase" },
              { value: "60%", label: "Faster Audits", sublabel: "With IATF tools" },
              { value: "500+", label: "Manufacturers", sublabel: "Global customers" },
            ].map((stat, index) => (
              <div
                key={index}
                className="relative group rounded-lg border border-border bg-card/50 p-6 hover:border-accent/50 transition-colors"
              >
                <div className="text-3xl sm:text-4xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-foreground">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted by logos */}
        <div className="mt-20 border-t border-border pt-12">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by leading manufacturers worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {["AutoTech", "PrecisionMfg", "IndustrialCo", "GlobalParts", "MetalWorks"].map((company) => (
              <div key={company} className="text-muted-foreground/50 font-semibold text-lg tracking-wider">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
