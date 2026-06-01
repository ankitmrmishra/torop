"use client"

import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"

export function useCountAnimation(target: number, duration: number = 2) {
  const ref = useRef<HTMLElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "0px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(target)
    }
  }, [motionValue, isInView, target])

  return { ref, value: springValue }
}
