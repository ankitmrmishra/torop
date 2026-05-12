"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Code } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { useRef } from "react"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] overflow-hidden px-4 pt-20 pb-12 sm:px-6 sm:pt-24 sm:pb-16 md:pt-28 lg:min-h-screen lg:pt-32 lg:pb-20"
    >
      <motion.div style={{ y, opacity }} className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20 xl:gap-24">
          {/* LEFT: Massive Typography */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            <h1 className="mb-4 font-bold text-[2.5rem] leading-[1.1] tracking-tight text-[#F5F5F5] sm:mb-6 sm:text-5xl sm:leading-[1.05] md:text-6xl md:leading-[1] lg:mb-8 lg:text-7xl xl:text-8xl">
              Product analytics that{" "}
              <span className="text-[#A1A1AA]">knows your data.</span>
            </h1>

            <p className="mb-6 max-w-[600px] text-base leading-relaxed text-[#A1A1AA] sm:mb-8 sm:text-lg md:text-xl lg:mb-12">
              Understand every user journey with proactive insights, session
              replay, and developer-first analytics.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button
                size="lg"
                className="group h-12 w-full rounded-lg bg-[#6366F1] px-6 font-medium text-base text-white transition-all hover:bg-[#5558E3] hover:shadow-xl hover:shadow-[#6366F1]/20 active:scale-[0.98] sm:h-12 sm:w-auto sm:px-8"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-lg border-white/6 bg-transparent px-6 font-medium text-base text-[#F5F5F5] transition-all hover:border-white/10 hover:bg-white/5 active:scale-[0.98] sm:w-auto sm:px-8"
              >
                <Code className="mr-2 h-4 w-4" />
                View GitHub
              </Button>
            </div>
          </motion.div>

          {/* RIGHT: High-End Dashboard Composition */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative block"
          >
            <DashboardVisual />
          </motion.div>
        </div>
      </motion.div>

      {/* Ambient Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#6366F1]/10 via-transparent to-transparent" />
    </section>
  )
}

function DashboardVisual() {
  return (
    <div className="relative h-[600px]">
      {/* Main Chart Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute top-0 right-16 left-0 h-64 rounded-xl border border-white/6 bg-[#0B0B0F]/80 p-6 shadow-2xl backdrop-blur-sm"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="h-2 w-24 rounded-full bg-white/10" />
          <div className="h-2 w-16 rounded-full bg-white/10" />
        </div>
        <div className="space-y-3">
          {[60, 80, 40, 90, 50].map((width, i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
              className="h-8 origin-left rounded bg-gradient-to-r from-[#6366F1]/20 to-[#6366F1]/5"
              style={{ width: `${width}%` }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating Metric Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute top-48 right-0 w-48 rounded-xl border border-white/6 bg-[#101014]/90 p-5 shadow-xl backdrop-blur-sm"
      >
        <div className="mb-2 text-xs tracking-wider text-[#A1A1AA] uppercase">
          Active Users
        </div>
        <div className="font-bold text-3xl text-[#F5F5F5]">24,891</div>
        <div className="mt-2 text-xs text-[#6366F1]">+12.5% from last week</div>
      </motion.div>

      {/* Event Stream */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute top-80 right-0 left-0 rounded-xl border border-white/6 bg-[#0B0B0F]/80 p-5 shadow-xl backdrop-blur-sm"
      >
        <div className="mb-3 text-xs tracking-wider text-[#A1A1AA] uppercase">
          Live Events
        </div>
        <div className="space-y-2">
          {["page_view", "button_click", "form_submit"].map((event, i) => (
            <motion.div
              key={event}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1 + i * 0.15 }}
              className="flex items-center gap-3 rounded-lg bg-white/5 p-2"
            >
              <div className="h-2 w-2 rounded-full bg-[#6366F1]" />
              <div className="font-mono text-xs text-[#F5F5F5]">{event}</div>
              <div className="ml-auto text-xs text-[#A1A1AA]">just now</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#6366F1]/5 via-transparent to-[#8B5CF6]/5 blur-3xl" />
    </div>
  )
}
