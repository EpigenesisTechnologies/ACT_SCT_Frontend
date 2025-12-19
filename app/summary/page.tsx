"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import SessionSummary from "@/components/session-summary"
import type { SummaryResponse } from "@/lib/api-client"

export default function SummaryPage() {
  const router = useRouter()
  const [summary, setSummary] = useState<SummaryResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const sessionId = localStorage.getItem("current_session_id")

        if (!sessionId) {
          router.push("/access")
          return
        }

        const response = await fetch("/api/progress/summary", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Session-Id": sessionId,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to load summary")
        }

        const data: SummaryResponse = await response.json()
        setSummary(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading summary")
      } finally {
        setLoading(false)
      }
    }

    loadSummary()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading your results...</p>
      </div>
    )
  }

  if (error || !summary) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold text-destructive">{error || "Error loading summary"}</p>
          <button onClick={() => router.push("/section-select")} className="text-accent hover:underline">
            Start another session
          </button>
        </div>
      </div>
    )
  }

  return <SessionSummary summary={summary} />
}
