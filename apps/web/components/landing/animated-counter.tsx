"use client"

import { useCountAnimation } from "@/hooks/use-count-animation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedCounterProps {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
}

export function AnimatedCounter({
  target,
  duration = 2,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const { ref, value } = useCountAnimation(target, duration)
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const unsubscribe = value.on("change", (latest) => {
      setDisplayValue(latest)
    })

    return () => unsubscribe()
  }, [value])

  const formattedValue =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.floor(displayValue).toLocaleString()

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </motion.span>
  )
}
