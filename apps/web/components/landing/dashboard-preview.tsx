"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, Activity, BarChart3 } from "lucide-react"

export function DashboardPreview() {
  return (
    <section className="py-20 sm:py-24 lg:py-32 xl:py-44">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center sm:mb-16"
        >
          <h2 className="mb-4 font-bold text-3xl leading-tight tracking-tight text-[#F5F5F5] sm:mb-6 sm:text-4xl lg:text-6xl">
            Analytics that feel <span className="text-[#A1A1AA]">alive</span>
          </h2>
          <p className="mx-auto max-w-[600px] text-base leading-relaxed text-[#A1A1AA] sm:text-lg lg:text-xl">
            Real-time insights, session replay, and behavioral analytics in one
            unified platform.
          </p>
        </motion.div>

        {/* Interactive Dashboard Grid */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Large Feature Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 lg:row-span-2"
          >
            <div className="group relative h-full overflow-hidden rounded-xl border border-white/6 bg-[#0B0B0F] p-6 transition-all hover:border-white/10 sm:rounded-2xl sm:p-8">
              <div className="mb-6">
                <TrendingUp className="mb-4 h-6 w-6 text-[#6366F1] sm:h-8 sm:w-8" />
                <h3 className="mb-2 font-bold text-xl text-[#F5F5F5] sm:text-2xl">
                  Real-time Analytics
                </h3>
                <p className="text-sm text-[#A1A1AA] sm:text-base">
                  Track user behavior as it happens with sub-second latency
                </p>
              </div>

              {/* Chart Visualization */}
              <div className="relative h-48 rounded-xl border border-white/6 bg-[#101014] p-4 sm:h-64 sm:p-6">
                <div className="flex h-full items-end justify-between gap-1 sm:gap-2">
                  {[40, 70, 45, 80, 60, 90, 55, 75, 85, 65, 95, 70].map(
                    (height, i) => (
                      <motion.div
                        key={i}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 + i * 0.05 }}
                        className="w-full origin-bottom rounded-t bg-gradient-to-t from-[#6366F1] to-[#8B5CF6]"
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Ambient Glow */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#6366F1]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </motion.div>

          {/* Supporting Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative overflow-hidden rounded-xl border border-white/6 bg-[#0B0B0F] p-6 transition-all hover:border-white/10 sm:rounded-2xl sm:p-8"
          >
            <Users className="mb-4 h-6 w-6 text-[#6366F1] sm:h-8 sm:w-8" />
            <h3 className="mb-2 font-bold text-lg text-[#F5F5F5] sm:text-xl">
              User Cohorts
            </h3>
            <p className="mb-4 text-xs text-[#A1A1AA] sm:mb-6 sm:text-sm">
              Segment users by behavior and attributes
            </p>
            <div className="space-y-2">
              {[85, 62, 48].map((width, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#6366F1]" />
                  <div
                    className="h-2 rounded-full bg-white/10"
                    style={{ width: `${width}%` }}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group relative overflow-hidden rounded-xl border border-white/6 bg-[#0B0B0F] p-6 transition-all hover:border-white/10 sm:rounded-2xl sm:p-8"
          >
            <Activity className="mb-4 h-6 w-6 text-[#6366F1] sm:h-8 sm:w-8" />
            <h3 className="mb-2 font-bold text-lg text-[#F5F5F5] sm:text-xl">
              Session Replay
            </h3>
            <p className="mb-4 text-xs text-[#A1A1AA] sm:mb-6 sm:text-sm">
              Watch exactly what users do
            </p>
            <div className="rounded-lg border border-white/6 bg-[#101014] p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                <span className="text-xs text-[#A1A1AA]">Recording</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-1.5 w-full rounded-full bg-white/10" />
                <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="group relative overflow-hidden rounded-xl border border-white/6 bg-[#0B0B0F] p-6 transition-all hover:border-white/10 sm:rounded-2xl sm:p-8"
          >
            <BarChart3 className="mb-4 h-6 w-6 text-[#6366F1] sm:h-8 sm:w-8" />
            <h3 className="mb-2 font-bold text-lg text-[#F5F5F5] sm:text-xl">
              Funnel Analysis
            </h3>
            <p className="mb-4 text-xs text-[#A1A1AA] sm:mb-6 sm:text-sm">
              Optimize conversion at every step
            </p>
            <div className="space-y-2">
              {[100, 75, 45, 28].map((width, i) => (
                <div
                  key={i}
                  className="h-6 rounded bg-gradient-to-r from-[#6366F1]/20 to-transparent sm:h-8"
                  style={{ width: `${width}%` }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
