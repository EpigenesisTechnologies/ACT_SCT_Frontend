"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import IntakeQuestionnaire from "@/components/intake-questionnaire"

export default function IntakePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleIntakeComplete = async (data: Record<string, string>) => {
    setLoading(true)
    try {
      // Store intake data
      localStorage.setItem("intake_data", JSON.stringify(data))

      // Move to section selection
      router.push("/section-select")
    } catch (error) {
      console.error("Error completing intake:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl">
        <IntakeQuestionnaire onComplete={handleIntakeComplete} loading={loading} />
      </div>
    </div>
  )
}
