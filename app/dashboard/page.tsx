"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface ProgressData {
  totalSessions: number
  skillLevel: number
  lastSession?: {
    section: string
    score: number
    date: string
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const [progress, setProgress] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const studentId = localStorage.getItem("student_id")

    if (!studentId) {
      router.push("/access")
      return
    }

    // Simulate loading progress data
    setProgress({
      totalSessions: 5,
      skillLevel: 3,
      lastSession: {
        section: "Math",
        score: 75,
        date: new Date().toLocaleDateString(),
      },
    })
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Your Progress</h1>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">Total Sessions</p>
            <p className="text-4xl font-bold text-accent">{progress?.totalSessions}</p>
          </Card>

          <Card className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">Current Skill Level</p>
            <div className="space-y-2">
              <p className="text-4xl font-bold">L{progress?.skillLevel}</p>
              <p className="text-xs text-muted-foreground">Level 0-5</p>
            </div>
          </Card>

          <Card className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">Last Session</p>
            {progress?.lastSession ? (
              <div className="space-y-1">
                <p className="text-2xl font-bold">{progress.lastSession.score}%</p>
                <p className="text-xs text-muted-foreground">{progress.lastSession.section}</p>
              </div>
            ) : (
              <p className="text-muted-foreground">No sessions yet</p>
            )}
          </Card>
        </div>

        {/* Recent Sessions */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Recent Sessions</h2>
          <p className="text-muted-foreground text-center py-8">No sessions recorded yet. Start practicing!</p>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-4">
          <Link href="/section-select">
            <Button size="lg">Start New Practice Block</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
