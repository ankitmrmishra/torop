"use client"

import { motion } from "framer-motion"
import { features } from "@/lib/constants/features"
import { SectionContainer } from "./section-container"
import { GradientText } from "./gradient-text"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function FeaturesGrid() {
  return (
    <SectionContainer
      id="features"
      className="bg-gradient-to-b from-background via-[#0F0F13] to-background"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h2 className="mb-4 font-bold text-3xl lg:text-4xl">
          Everything you need to{" "}
          <GradientText>understand your users</GradientText>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-zinc-400">
          Powerful analytics tools that help you make data-driven decisions
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-card p-6 shadow-[0_0_30px_-10px_rgba(99,102,241,0.2)] transition-all hover:border-white/10 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.4)]"
            >
              {/* Icon */}
              <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-3">
                <Icon className="h-6 w-6 text-indigo-400" />
              </div>

              {/* Content */}
              <h3 className="mb-2 font-bold text-xl text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-400">{feature.description}</p>

              {/* Hover Gradient Effect */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </SectionContainer>
  )
}
