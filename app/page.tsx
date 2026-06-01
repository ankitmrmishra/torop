import { NavBar } from "@/components/landing/nav-bar"
import { HeroSection } from "@/components/landing/hero-section"
import { TrustedBy } from "@/components/landing/trusted-by"
import { DashboardPreview } from "@/components/landing/dashboard-preview"
import { Features } from "@/components/landing/features"
import { Workflow } from "@/components/landing/workflow"
import { DeveloperAPI } from "@/components/landing/developer-api"
import { Stats } from "@/components/landing/stats"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { Pricing } from "@/components/landing/pricing"
import { Footer } from "@/components/landing/footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <NavBar />
      <main>
        <HeroSection />
        <TrustedBy />
        <DashboardPreview />
        <Features />
        <Workflow />
        <DeveloperAPI />
        <Stats />
        <TestimonialsSection />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}
