"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-background to-muted/30 overflow-hidden pt-20 md:pt-0">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 text-sm font-medium">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            Adaptive Learning Powered by AI
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
            AI-Powered ACT & SAT Training
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            Personalized 20-minute practice blocks with instant feedback and progress tracking—no login required. Start
            with a unique code.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/practice">
              <Button size="lg" className="w-full sm:w-auto px-8">
                Start Practicing
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 bg-transparent">
              How It Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
