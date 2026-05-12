import "@workspace/ui/globals.css"
import { cn } from "@workspace/ui/lib/utils"

export const metadata = {
  title: "Torop - Product Analytics That Knows Your Data",
  description:
    "Understand every user journey with proactive insights, session replay, and developer-first analytics. Open source and built for scale.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Torop - Product Analytics That Knows Your Data",
    description:
      "Understand every user journey with proactive insights, session replay, and developer-first analytics. Open source and built for scale.",
    images: ["/logo.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Torop - Product Analytics That Knows Your Data",
    description:
      "Understand every user journey with proactive insights, session replay, and developer-first analytics. Open source and built for scale.",
    images: ["/logo.svg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        {children}
      </body>
    </html>
  )
}
