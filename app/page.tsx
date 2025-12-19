import Hero from "@/components/hero"
import Overview from "@/components/overview"
import HowItWorks from "@/components/how-it-works"
import AdaptiveEngine from "@/components/adaptive-engine"
import Personas from "@/components/personas"
import Roadmap from "@/components/roadmap"
import CTA from "@/components/cta"

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Overview />
      <HowItWorks />
      <AdaptiveEngine />
      <Personas />
      <Roadmap />
      <CTA />
    </main>
  )
}
