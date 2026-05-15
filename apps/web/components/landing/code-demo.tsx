"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { SectionContainer } from "./section-container"
import { GradientText } from "./gradient-text"
import { useTypewriter } from "@/hooks/use-typewriter"

const codeSnippet = `curl -X POST https://api.torop.dev/events \\
  -H "Content-Type: application/json" \\
  -d '{
    "event": "user_signup",
    "user_id": "usr_123",
    "properties": {
      "plan": "pro",
      "source": "landing_page"
    }
  }'`

export function CodeDemo() {
  const { displayedText, isComplete, reset } = useTypewriter(codeSnippet, 20)
  const [chartHeight, setChartHeight] = useState([40, 60, 45, 70, 55])

  useEffect(() => {
    if (isComplete) {
      const timeout = setTimeout(() => {
        reset()
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [isComplete, reset])

  useEffect(() => {
    const interval = setInterval(() => {
      setChartHeight((prev) => prev.map(() => Math.random() * 60 + 20))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

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
          <GradientText>One API call</GradientText>, infinite insights
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-zinc-400">
          Send events from your backend or frontend with a single line of code
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Code Block */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative min-w-0 overflow-hidden rounded-2xl border border-white/5 bg-[#0A0A0B] p-6 shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)]"
        >
          {/* Terminal Header */}
          <div className="mb-4 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-zinc-500">terminal</span>
          </div>

          {/* Code Content */}
          <pre className="min-w-0 overflow-x-auto text-sm">
            <code className="block font-mono text-zinc-300">
              {displayedText}
              <span className="animate-pulse">|</span>
            </code>
          </pre>
        </motion.div>

        {/* Live Chart Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative overflow-hidden rounded-2xl border border-white/5 bg-card p-6 shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)]"
        >
          <div className="mb-4">
            <h3 className="font-medium text-sm text-zinc-400">
              Real-time Events
            </h3>
            <p className="font-bold text-2xl text-white">
              {Math.floor(Math.random() * 1000 + 5000).toLocaleString()}
            </p>
          </div>

          {/* Animated Bar Chart */}
          <div className="flex h-48 items-end justify-between gap-2">
            {chartHeight.map((height, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full rounded-t-lg bg-gradient-to-t from-indigo-500 to-purple-500"
              />
            ))}
          </div>

          {/* Chart Labels */}
          <div className="mt-2 flex justify-between text-xs text-zinc-500">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  )
}
