"use client"

import { motion } from "framer-motion"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

const codeExample = `// Track an event
analytics.track('button_clicked', {
  button_id: 'signup_cta',
  page: '/pricing',
  user_plan: 'free'
})

// Identify a user
analytics.identify('user_123', {
  email: 'user@example.com',
  plan: 'pro',
  created_at: '2024-01-15'
})`

export function DeveloperAPI() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="overflow-hidden py-20 sm:py-24 lg:py-32 xl:py-44">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16 xl:gap-24">
          {/* LEFT: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h2 className="mb-4 font-bold text-3xl leading-tight tracking-tight text-[#F5F5F5] sm:mb-6 sm:text-4xl lg:text-6xl">
              Developer-first <span className="text-[#A1A1AA]">by design</span>
            </h2>
            <p className="mb-6 max-w-[600px] text-base leading-relaxed text-[#A1A1AA] sm:mb-8 sm:text-lg lg:text-xl">
              Simple SDKs for every platform. Comprehensive APIs. Complete
              control over your data.
            </p>

            <div className="space-y-3 sm:space-y-4">
              {[
                "Type-safe SDKs for TypeScript, Python, Go, Ruby",
                "REST & GraphQL APIs with full documentation",
                "Webhook support for real-time integrations",
                "Self-host or use our cloud infrastructure",
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#6366F1]" />
                  <span className="text-sm text-[#F5F5F5] sm:text-base">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Code Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative min-w-0"
          >
            <div className="overflow-hidden rounded-lg border border-white/6 bg-[#0B0B0F] shadow-2xl sm:rounded-xl">
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-white/6 bg-[#101014] px-3 py-2 sm:px-4 sm:py-3">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57] sm:h-3 sm:w-3" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] sm:h-3 sm:w-3" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#28CA42] sm:h-3 sm:w-3" />
                </div>
                <div className="font-mono text-[10px] text-[#A1A1AA] sm:text-xs">
                  analytics.ts
                </div>
                <button
                  onClick={handleCopy}
                  className="rounded-lg p-1 text-[#A1A1AA] transition-colors hover:bg-white/5 hover:text-[#F5F5F5] sm:p-1.5"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  )}
                </button>
              </div>

              {/* Code Content */}
              <div className="overflow-x-auto p-4 sm:p-6">
                <pre className="min-w-0 font-mono text-xs leading-relaxed sm:text-sm">
                  <code className="block">
                    <span className="text-[#A1A1AA]">// Track an event</span>
                    {"\n"}
                    <span className="text-[#F5F5F5]">analytics.</span>
                    <span className="text-[#6366F1]">track</span>
                    <span className="text-[#F5F5F5]">(</span>
                    <span className="text-[#8B5CF6]">'button_clicked'</span>
                    <span className="text-[#F5F5F5]">, {"{"}</span>
                    {"\n  "}
                    <span className="text-[#F5F5F5]">button_id: </span>
                    <span className="text-[#8B5CF6]">'signup_cta'</span>
                    <span className="text-[#F5F5F5]">,</span>
                    {"\n  "}
                    <span className="text-[#F5F5F5]">page: </span>
                    <span className="text-[#8B5CF6]">'/pricing'</span>
                    <span className="text-[#F5F5F5]">,</span>
                    {"\n  "}
                    <span className="text-[#F5F5F5]">user_plan: </span>
                    <span className="text-[#8B5CF6]">'free'</span>
                    {"\n"}
                    <span className="text-[#F5F5F5]">{"})"})</span>
                    {"\n\n"}
                    <span className="text-[#A1A1AA]">// Identify a user</span>
                    {"\n"}
                    <span className="text-[#F5F5F5]">analytics.</span>
                    <span className="text-[#6366F1]">identify</span>
                    <span className="text-[#F5F5F5]">(</span>
                    <span className="text-[#8B5CF6]">'user_123'</span>
                    <span className="text-[#F5F5F5]">, {"{"}</span>
                    {"\n  "}
                    <span className="text-[#F5F5F5]">email: </span>
                    <span className="text-[#8B5CF6]">'user@example.com'</span>
                    <span className="text-[#F5F5F5]">,</span>
                    {"\n  "}
                    <span className="text-[#F5F5F5]">plan: </span>
                    <span className="text-[#8B5CF6]">'pro'</span>
                    <span className="text-[#F5F5F5]">,</span>
                    {"\n  "}
                    <span className="text-[#F5F5F5]">created_at: </span>
                    <span className="text-[#8B5CF6]">'2024-01-15'</span>
                    {"\n"}
                    <span className="text-[#F5F5F5]">{"})"})</span>
                  </code>
                </pre>

                {/* Cursor Blink */}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block h-4 w-1.5 bg-[#6366F1] sm:h-5 sm:w-2"
                />
              </div>

              {/* Terminal Footer - Response */}
              <div className="border-t border-white/6 bg-[#101014] p-3 sm:p-4">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#28CA42] sm:h-2 sm:w-2" />
                  <span className="font-mono text-[10px] text-[#28CA42] sm:text-xs">
                    Event tracked successfully
                  </span>
                </div>
              </div>
            </div>

            {/* Ambient Glow */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#6366F1]/10 to-transparent blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
