"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import Image from "next/image"

const navLinks = [
  { name: "Product", href: "#product" },
  { name: "Docs", href: "#docs" },
  { name: "Customers", href: "#customers" },
  { name: "GitHub", href: "#github" },
]

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-1/2 z-50 hidden max-w-5xl -translate-x-1/2 md:top-6 lg:block"
      >
        <div
          className={cn(
            "flex items-center gap-1 rounded-full border border-white/6 bg-[#0B0B0F]/80 px-2 py-2 backdrop-blur-xl transition-all duration-300",
            isScrolled &&
              "border-white/10 bg-[#0B0B0F]/90 shadow-lg shadow-black/20"
          )}
        >
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 px-3 py-1.5 transition-opacity hover:opacity-80 lg:px-4"
          >
            <Image
              src="/logo.svg"
              alt="Torop"
              width={32}
              height={32}
              className="h-7 w-7 lg:h-8 lg:w-8"
            />
            <span className="font-medium text-sm tracking-tight text-[#F5F5F5]">
              Torop
            </span>
          </a>

          {/* Divider */}
          <div className="mx-0.5 h-4 w-px bg-white/6 lg:mx-1" />

          {/* Nav Links */}
          <div className="flex items-center gap-0.5 lg:gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm text-[#A1A1AA] transition-all hover:bg-white/5 hover:text-[#F5F5F5] lg:px-4"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="mx-0.5 h-4 w-px bg-white/6 lg:mx-1" />

          {/* CTA */}
          <Button
            size="sm"
            className="h-8 rounded-full bg-[#6366F1] px-3 font-medium text-xs text-white transition-all hover:bg-[#5558E3] hover:shadow-lg hover:shadow-[#6366F1]/20 lg:px-4"
          >
            Get Started
          </Button>
        </div>
      </motion.nav>

      {/* Mobile Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 right-0 left-0 z-50 border-b border-white/6 bg-[#0B0B0F]/80 backdrop-blur-xl transition-all duration-300 lg:hidden",
          isScrolled && "bg-[#0B0B0F]/90 shadow-lg shadow-black/20"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Image
              src="/logo.svg"
              alt="Torop"
              width={36}
              height={36}
              className="h-9 w-9 sm:h-10 sm:w-10"
            />
            <span className="font-bold text-lg tracking-tight text-[#F5F5F5] sm:text-xl">
              Torop
            </span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/6 text-[#F5F5F5] transition-all hover:border-white/10 hover:bg-white/5 active:scale-95"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-sm border-l border-white/6 bg-[#0B0B0F] shadow-2xl lg:hidden"
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/6 px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/logo.svg"
                      alt="Torop"
                      width={32}
                      height={32}
                      className="h-8 w-8"
                    />
                    <span className="font-bold text-xl text-[#F5F5F5]">
                      Menu
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/6 text-[#F5F5F5] transition-all hover:border-white/10 hover:bg-white/5"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto px-6 py-8">
                  <nav className="space-y-2">
                    {navLinks.map((link, i) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block rounded-lg border border-white/6 bg-[#101014] px-6 py-4 font-medium text-[#F5F5F5] transition-all hover:border-white/10 hover:bg-white/5"
                      >
                        {link.name}
                      </motion.a>
                    ))}
                  </nav>
                </div>

                {/* Footer CTA */}
                <div className="border-t border-white/6 p-6">
                  <Button
                    size="lg"
                    className="h-12 w-full rounded-lg bg-[#6366F1] font-medium text-white transition-all hover:bg-[#5558E3] hover:shadow-xl hover:shadow-[#6366F1]/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started Free
                  </Button>
                  <p className="mt-3 text-center text-xs text-[#A1A1AA]">
                    Start analyzing in minutes
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
