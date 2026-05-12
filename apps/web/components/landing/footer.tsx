"use client"

import { Code, Mail, MessageCircle } from "lucide-react"
import Image from "next/image"

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Changelog", href: "#" },
    { name: "Roadmap", href: "#" },
  ],
  resources: [
    { name: "Documentation", href: "#" },
    { name: "API Reference", href: "#" },
    { name: "Guides", href: "#" },
    { name: "Blog", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "GitHub", href: "#" },
    { name: "Discord", href: "#" },
    { name: "Twitter", href: "#" },
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "License", href: "#" },
    { name: "Security", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-white/6 bg-[#050505] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a
              href="#"
              className="flex items-center gap-3 transition-opacity hover:opacity-80"
            >
              <Image
                src="/logo.svg"
                alt="Torop"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <span className="font-bold text-2xl text-[#F5F5F5]">Torop</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#A1A1AA]">
              Open-source product analytics for modern teams. Built with privacy
              and performance in mind.
            </p>

            {/* Social Links */}
            <div className="mt-8 flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/6 text-[#A1A1AA] transition-all hover:border-white/10 hover:text-[#F5F5F5]"
              >
                <Code className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/6 text-[#A1A1AA] transition-all hover:border-white/10 hover:text-[#F5F5F5]"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/6 text-[#A1A1AA] transition-all hover:border-white/10 hover:text-[#F5F5F5]"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="mb-4 font-medium text-sm text-[#F5F5F5]">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-[#A1A1AA] transition-colors hover:text-[#F5F5F5]"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-medium text-sm text-[#F5F5F5]">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-[#A1A1AA] transition-colors hover:text-[#F5F5F5]"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-medium text-sm text-[#F5F5F5]">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-[#A1A1AA] transition-colors hover:text-[#F5F5F5]"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/6 pt-8">
          <p className="text-center text-xs text-[#A1A1AA]">
            © {new Date().getFullYear()} Torop. Open source under MIT license.
          </p>
        </div>
      </div>
    </footer>
  )
}
