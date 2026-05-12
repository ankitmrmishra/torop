"use client"

import { motion } from "framer-motion"
import { BarChart3, Play, Flag, Filter, Database, Sparkles } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Product Analytics",
    description:
      "Track events, user properties, and custom metrics with unlimited data retention",
  },
  {
    icon: Play,
    title: "Session Replay",
    description:
      "Watch user sessions with privacy controls and performance insights",
  },
  {
    icon: Flag,
    title: "Feature Flags",
    description: "Roll out features safely with targeting and gradual rollouts",
  },
  {
    icon: Filter,
    title: "Funnel Analysis",
    description: "Identify drop-off points and optimize conversion rates",
  },
  {
    icon: Database,
    title: "Warehouse Sync",
    description:
      "Export data to your warehouse with automatic schema management",
  },
  {
    icon: Sparkles,
    title: "AI Insights",
    description: "Get proactive alerts about anomalies and opportunities",
  },
]

export function Features() {
  return (
    <section className="py-20 sm:py-24 lg:py-32 xl:py-44">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="mb-4 font-bold text-3xl leading-tight tracking-tight text-[#F5F5F5] sm:mb-6 sm:text-4xl lg:text-6xl">
            Everything you need to{" "}
            <span className="text-[#A1A1AA]">understand users</span>
          </h2>
          <p className="max-w-[600px] text-base leading-relaxed text-[#A1A1AA] sm:text-lg lg:text-xl">
            A complete analytics platform built for modern product teams.
          </p>
        </motion.div>

        {/* Asymmetrical Grid */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group relative overflow-hidden rounded-xl border border-white/6 bg-[#0B0B0F] p-6 transition-all hover:border-white/10 sm:rounded-2xl sm:p-8 ${
                  i === 0 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <Icon className="mb-4 h-8 w-8 text-[#6366F1] transition-transform group-hover:scale-110 sm:mb-6 sm:h-10 sm:w-10" />
                <h3 className="mb-2 font-bold text-lg text-[#F5F5F5] sm:mb-3 sm:text-xl">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#A1A1AA] sm:text-base">
                  {feature.description}
                </p>

                {/* Hover Glow */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#6366F1]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
