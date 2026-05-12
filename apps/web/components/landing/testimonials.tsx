"use client"

import { motion } from "framer-motion"
import { SectionContainer } from "./section-container"
import { GradientText } from "./gradient-text"

const testimonials = [
  {
    quote:
      "Finally a self-hosted analytics tool that doesn't suck. The session replay feature is a game-changer.",
    author: "Alex Chen",
    role: "CTO at TechStart",
  },
  {
    quote:
      "We switched from Mixpanel and never looked back. Open source, powerful, and actually respects our data privacy.",
    author: "Sarah Johnson",
    role: "Head of Product at DataFlow",
  },
  {
    quote:
      "The AI insights feature saves us hours every week. It's like having a data analyst on demand.",
    author: "Michael Rodriguez",
    role: "Founder at GrowthLabs",
  },
]

export function Testimonials() {
  return (
    <SectionContainer className="bg-gradient-to-b from-background to-[#0F0F13]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 font-bold text-3xl lg:text-4xl">
          Loved by <GradientText>developers</GradientText> worldwide
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-zinc-400">
          See what teams are saying about Torop
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.author}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="relative overflow-hidden rounded-2xl border border-white/5 bg-card p-6 shadow-[0_0_30px_-10px_rgba(99,102,241,0.2)] transition-all hover:border-white/10"
          >
            {/* Quote */}
            <p className="mb-6 text-zinc-300">
              &ldquo;{testimonial.quote}&rdquo;
            </p>

            {/* Author */}
            <div>
              <p className="font-medium text-white">{testimonial.author}</p>
              <p className="text-sm text-zinc-500">{testimonial.role}</p>
            </div>

            {/* Gradient Accent */}
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-500" />
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  )
}
