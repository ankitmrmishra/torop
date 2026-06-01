"use client"

import { useState, useEffect, useCallback } from "react"

export function useTypewriter(text: string, speed: number = 50) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, text, speed])

  const reset = useCallback(() => {
    setDisplayedText("")
    setCurrentIndex(0)
    setIsComplete(false)
  }, [])

  return { displayedText, isComplete, reset }
}
