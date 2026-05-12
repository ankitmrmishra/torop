import { cn } from "@workspace/ui/lib/utils"
import { ReactNode } from "react"

interface SectionContainerProps {
  children: ReactNode
  className?: string
  id?: string
}

export function SectionContainer({
  children,
  className,
  id,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </section>
  )
}
