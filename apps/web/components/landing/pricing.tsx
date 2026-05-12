"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

export function Pricing() {
  return (
    <section className="py-32 lg:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl border border-white/6 bg-[#0B0B0F] p-12 text-center lg:p-20"
        >
          <h2 className="mb-6 font-bold text-4xl leading-tight tracking-tight text-[#F5F5F5] lg:text-6xl">
            Start free. Scale infinitely.
          </h2>
          <p className="mx-auto mb-12 max-w-[600px] text-xl leading-relaxed text-[#A1A1AA]">
            No credit card required. Unlimited events. Cancel anytime.
          </p>

          <Button
            size="lg"
            className="group h-14 rounded-lg bg-[#6366F1] px-10 font-medium text-lg text-white transition-all hover:bg-[#5558E3] hover:shadow-2xl hover:shadow-[#6366F1]/30"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>

          {/* Radial Glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#6366F1]/20 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
