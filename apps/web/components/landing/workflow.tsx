"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Capture Events",
    description: "Auto-capture or send custom events from any platform",
  },
  {
    number: "02",
    title: "Process & Enrich",
    description: "Real-time processing with user properties and context",
  },
  {
    number: "03",
    title: "Analyze & Visualize",
    description: "Query data instantly with our powerful analytics engine",
  },
  {
    number: "04",
    title: "Act on Insights",
    description: "Get alerts and export data to your tools",
  },
]

export function Workflow() {
  return (
    <section className="overflow-hidden py-20 sm:py-24 lg:py-32 xl:py-44">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* LEFT: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h2 className="mb-4 font-bold text-3xl leading-tight tracking-tight text-[#F5F5F5] sm:mb-6 sm:text-4xl lg:text-6xl">
              Built for{" "}
              <span className="text-[#A1A1AA]">developer velocity</span>
            </h2>
            <p className="mb-8 max-w-[600px] text-base leading-relaxed text-[#A1A1AA] sm:mb-10 sm:text-lg lg:mb-12 lg:text-xl">
              From event ingestion to insights in milliseconds. Our pipeline is
              designed for scale.
            </p>

            <div className="space-y-6 sm:space-y-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex gap-4 sm:gap-6"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/6 bg-[#0B0B0F] font-mono text-xs text-[#6366F1] sm:h-12 sm:w-12 sm:text-sm">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-base text-[#F5F5F5] sm:mb-2 sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#A1A1AA] sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Workflow Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center"
          >
            <div className="relative w-full">
              {/* Pipeline Visualization */}
              <div className="space-y-4 sm:space-y-6">
                {["Ingest", "Transform", "Store", "Query"].map((label, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3 sm:gap-4"
                  >
                    <div className="flex-1 rounded-lg border border-white/6 bg-[#0B0B0F] p-4 sm:rounded-xl sm:p-6">
                      <div className="mb-2 text-xs tracking-wider text-[#A1A1AA] uppercase">
                        {label}
                      </div>
                      <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]" />
                    </div>
                    {i < 3 && (
                      <ArrowRight className="h-4 w-4 flex-shrink-0 text-[#6366F1] sm:h-5 sm:w-5" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Ambient Glow */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#6366F1]/10 to-transparent blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
