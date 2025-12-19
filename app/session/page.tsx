"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import PracticeSession from "@/components/practice-session"

export default function SessionPage() {
  const router = useRouter()
  const [sessionData, setSessionData] = useState<{
    section: "math" | "rw"
    session_id: string
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const initSession = async () => {
      try {
        const section = (localStorage.getItem("section") || "math") as "math" | "rw"
        const studentId = localStorage.getItem("student_id")
        const accessCode = localStorage.getItem("access_code")

        if (!studentId || !accessCode) {
          router.push("/access")
          return
        }

        // Call start session API
        const response = await fetch("/api/session/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            student_id: studentId,
            access_code: accessCode,
            section,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to start session")
        }

        const data = await response.json()
        setSessionData({
          section,
          session_id: data.session_id,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error starting session")
      } finally {
        setLoading(false)
      }
    }

    initSession()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Starting practice session...</p>
      </div>
    )
  }

  if (error || !sessionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold">{error || "Error loading session"}</p>
          <button onClick={() => router.push("/access")} className="text-accent hover:underline">
            Return to Access
          </button>
        </div>
      </div>
    )
  }

  return <PracticeSession sessionId={sessionData.session_id} section={sessionData.section} />
}
