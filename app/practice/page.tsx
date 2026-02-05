"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Choose Your Exam
          </h1>
          <p className="text-lg text-muted-foreground">
            Select the exam you'd like to practice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SAT Option - Disabled */}
          <div className="border border-border rounded-lg p-8 bg-card opacity-50">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-card-foreground">SAT</h2>
              <p className="text-muted-foreground">
                Practice SAT sections and questions
              </p>
              <Button disabled className="w-full" variant="outline">
                Coming Soon
              </Button>
            </div>
          </div>

          {/* ACT Option - Active */}
          <Link href="/practice/act" className="block">
            <div className="border border-primary rounded-lg p-8 bg-card hover:shadow-lg transition-shadow cursor-pointer h-full">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">ACT</h2>
                <p className="text-muted-foreground">
                  Practice ACT sections and questions
                </p>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Started
                </Button>
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center">
          <Link href="/">
            <Button variant="link" className="text-muted-foreground">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
