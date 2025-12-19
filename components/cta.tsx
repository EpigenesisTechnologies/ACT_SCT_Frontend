"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTA() {
  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-primary to-primary/90 text-primary-foreground">
      <div className="container mx-auto max-w-3xl text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold">Ready to Begin?</h2>
        <p className="text-lg opacity-90">Start your first 20-minute adaptive practice block today.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/access">
            <Button size="lg" className="w-full sm:w-auto px-8 bg-accent text-accent-foreground hover:bg-accent/90">
              Start Practicing
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
          >
            Contact Program Coordinator
          </Button>
        </div>

        <div className="pt-8 border-t border-primary-foreground/20 text-sm opacity-75 space-y-2">
          <p>Privacy Policy · COPPA/FERPA Compliance · Accessibility</p>
        </div>
      </div>
    </section>
  )
}
