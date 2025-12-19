"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { SummaryResponse } from "@/lib/api-client"

interface SessionSummaryProps {
  summary: SummaryResponse
}

export default function SessionSummary({ summary }: SessionSummaryProps) {
  const router = useRouter()

  const accuracy = Math.round((summary.correct_answers / summary.total_questions) * 100)
  const skillLevelLabels = {
    0: "Beginner",
    1: "Developing",
    2: "Proficient",
    3: "Advanced",
    4: "Mastery",
    5: "Expert",
  }
  const skillLabel = skillLevelLabels[summary.skill_level as keyof typeof skillLevelLabels] || "Unknown"

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Celebration header */}
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-4xl font-bold">Session Complete!</h1>
          <p className="text-lg text-muted-foreground">Great work on completing this practice block.</p>
        </div>

        {/* Score card */}
        <Card className="p-8 bg-gradient-to-br from-accent/10 to-transparent border-accent/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Section</p>
              <p className="text-2xl font-bold capitalize">
                {summary.section === "math" ? "Math" : "Reading & Writing"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Correct Answers</p>
              <p className="text-2xl font-bold">
                {summary.correct_answers}/{summary.total_questions}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Accuracy</p>
              <p className="text-2xl font-bold">{accuracy}%</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Skill Level</p>
              <p className="text-2xl font-bold">
                L{summary.skill_level} <span className="text-base text-muted-foreground">{skillLabel}</span>
              </p>
            </div>
          </div>
        </Card>

        {/* Skill gaps */}
        {summary.skill_gaps && summary.skill_gaps.length > 0 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Areas to Focus On</h2>
            <ul className="space-y-3">
              {summary.skill_gaps.map((gap, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span className="text-muted-foreground">{gap}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Recommendations */}
        {summary.recommendations && summary.recommendations.length > 0 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
            <ul className="space-y-3">
              {summary.recommendations.map((rec, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-secondary font-bold">→</span>
                  <span className="text-muted-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => router.push("/section-select")} className="px-8">
            Start Another Block
          </Button>
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="px-8 bg-transparent w-full sm:w-auto">
              View Dashboard
            </Button>
          </Link>
        </div>

        {/* Footer CTA */}
        <div className="text-center space-y-3 pt-4 border-t border-border">
          <p className="text-muted-foreground">Ready to continue your training journey?</p>
          <Link href="/">
            <Button variant="link" className="text-accent">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
