"use client"

import { motion } from "framer-motion"
import { AnimatedCounter } from "./animated-counter"

const stats = [
  {
    value: 100,
    suffix: "M+",
    label: "Events Processed",
    decimals: 0,
  },
  {
    value: 99.99,
    suffix: "%",
    label: "Uptime",
    decimals: 2,
  },
  {
    value: 2,
    suffix: "B",
    label: "Sessions Tracked",
    decimals: 0,
  },
  {
    value: 0.1,
    suffix: "s",
    label: "Query Latency",
    decimals: 1,
  },
]

export function Stats() {
  return (
    <section className="py-32 lg:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="mb-6 font-bold text-4xl leading-tight tracking-tight text-[#F5F5F5] lg:text-6xl">
            Built for <span className="text-[#A1A1AA]">scale</span>
          </h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="mb-4 font-bold text-5xl text-[#F5F5F5] lg:text-6xl">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  duration={2}
                />
              </div>
              <div className="text-sm tracking-wider text-[#A1A1AA] uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
