"use client"

import { motion } from "framer-motion"

const testimonials = [
  {
    quote:
      "Torop replaced three tools for us. The session replay alone is worth it.",
    author: "Sarah Chen",
    role: "Head of Product",
    company: "Acme Corp",
  },
  {
    quote:
      "Finally, analytics that doesn't require a PhD to understand. Setup took 10 minutes.",
    author: "Marcus Rodriguez",
    role: "Engineering Lead",
    company: "TechFlow",
  },
  {
    quote:
      "The real-time insights helped us increase conversion by 40% in two weeks.",
    author: "Emily Watson",
    role: "Growth Manager",
    company: "StartupXYZ",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-32 lg:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="mb-6 font-bold text-4xl leading-tight tracking-tight text-[#F5F5F5] lg:text-6xl">
            Loved by <span className="text-[#A1A1AA]">product teams</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl border border-white/6 bg-[#0B0B0F] p-8"
            >
              <p className="mb-6 leading-relaxed text-[#F5F5F5]">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]" />
                <div>
                  <div className="font-medium text-sm text-[#F5F5F5]">
                    {testimonial.author}
                  </div>
                  <div className="text-xs text-[#A1A1AA]">
                    {testimonial.role} · {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
