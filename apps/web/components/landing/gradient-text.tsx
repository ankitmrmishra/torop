import { cn } from "@workspace/ui/lib/utils"
import { ReactNode } from "react"

interface GradientTextProps {
  children: ReactNode
  className?: string
  from?: string
  via?: string
  to?: string
}

export function GradientText({
  children,
  className,
  from = "from-indigo-400",
  via = "via-purple-400",
  to = "to-purple-600",
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        from,
        via,
        to,
        className
      )}
    >
      {children}
    </span>
  )
}
