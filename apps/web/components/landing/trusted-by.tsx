"use client"

import { motion } from "framer-motion"

const companies = ["Stripe", "Vercel", "Linear", "Notion", "Figma", "GitHub"]

export function TrustedBy() {
  return (
    <section className="border-y border-white/6 bg-[#0B0B0F]/50 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center text-sm tracking-wider text-[#A1A1AA] uppercase"
        >
          Trusted by modern product teams
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
          {companies.map((company, i) => (
            <motion.div
              key={company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="font-medium text-2xl text-[#A1A1AA]/40 transition-colors hover:text-[#A1A1AA]/60"
            >
              {company}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
