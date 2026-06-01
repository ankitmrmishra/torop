"use client"

import { motion } from "framer-motion"
import { AnimatedCounter } from "./animated-counter"
import { SectionContainer } from "./section-container"

const stats = [
  { value: 100, suffix: "M+", label: "Events processed daily" },
  { value: 0.5, suffix: "s", label: "Sub-second query times", decimals: 1 },
  { value: 99.99, suffix: "%", label: "Uptime guarantee", decimals: 2 },
  { value: 10, suffix: "k+", label: "GitHub stars" },
]

export function StatsSection() {
  return (
    <SectionContainer className="bg-gradient-to-b from-[#0F0F13] to-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-white/5 bg-card p-6 text-center shadow-[0_0_30px_-10px_rgba(99,102,241,0.2)]"
          >
            <div className="mb-2">
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
                className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text font-bold text-4xl text-transparent lg:text-5xl"
              />
            </div>
            <p className="text-sm text-zinc-400">{stat.label}</p>

            {/* Subtle Glow */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  )
}
