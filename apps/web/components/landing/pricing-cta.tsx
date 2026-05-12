"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { SectionContainer } from "./section-container"
import { GradientText } from "./gradient-text"

const selfHostedFeatures = [
  "All features included",
  "Unlimited events",
  "Community support",
  "Self-hosted deployment",
  "Full data ownership",
]

export function PricingCTA() {
  return (
    <SectionContainer className="bg-gradient-to-b from-[#0F0F13] to-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 font-bold text-3xl lg:text-4xl">
          <GradientText>Start free</GradientText>, scale forever
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-zinc-400">
          Choose the deployment option that works best for your team
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
        {/* Self-Hosted Plan */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl border-2 border-indigo-500/50 bg-card p-8 shadow-[0_0_40px_-10px_rgba(99,102,241,0.4)]"
        >
          {/* Popular Badge */}
          <div className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1 font-medium text-xs text-white">
            Popular
          </div>

          <h3 className="mb-2 font-bold text-2xl text-white">Self-Hosted</h3>
          <div className="mb-6">
            <span className="font-bold text-5xl text-white">Free</span>
            <span className="ml-2 text-zinc-400">forever</span>
          </div>

          <ul className="mb-8 space-y-3">
            {selfHostedFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-zinc-300"
              >
                <Check className="h-5 w-5 flex-shrink-0 text-indigo-400" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            size="lg"
            className="group w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white transition-all hover:scale-105 hover:from-indigo-600 hover:to-purple-700 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.5)]"
          >
            Deploy in 5 minutes
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>

          {/* Gradient Border Effect */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
        </motion.div>

        {/* Cloud Plan */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative overflow-hidden rounded-3xl border border-white/5 bg-card p-8 shadow-[0_0_30px_-10px_rgba(99,102,241,0.2)]"
        >
          <h3 className="mb-2 font-bold text-2xl text-white">Cloud</h3>
          <div className="mb-6">
            <span className="font-bold text-5xl text-white">Coming Soon</span>
          </div>

          <ul className="mb-8 space-y-3">
            <li className="flex items-center gap-3 text-zinc-300">
              <Check className="h-5 w-5 flex-shrink-0 text-teal-400" />
              <span>Managed infrastructure</span>
            </li>
            <li className="flex items-center gap-3 text-zinc-300">
              <Check className="h-5 w-5 flex-shrink-0 text-teal-400" />
              <span>Automatic scaling</span>
            </li>
            <li className="flex items-center gap-3 text-zinc-300">
              <Check className="h-5 w-5 flex-shrink-0 text-teal-400" />
              <span>Priority support</span>
            </li>
            <li className="flex items-center gap-3 text-zinc-300">
              <Check className="h-5 w-5 flex-shrink-0 text-teal-400" />
              <span>SLA guarantees</span>
            </li>
            <li className="flex items-center gap-3 text-zinc-300">
              <Check className="h-5 w-5 flex-shrink-0 text-teal-400" />
              <span>Advanced security</span>
            </li>
          </ul>

          <Button
            size="lg"
            variant="outline"
            disabled
            className="w-full border-white/10 bg-transparent text-white"
          >
            Notify Me
          </Button>
        </motion.div>
      </div>
    </SectionContainer>
  )
}
