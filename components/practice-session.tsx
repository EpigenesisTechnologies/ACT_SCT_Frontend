"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import QuestionRenderer from "@/components/question-renderer"
import SessionTimer from "@/components/session-timer"
import SessionProgress from "@/components/session-progress"
import type { QuestionData, SessionQuestionResponse } from "@/lib/api-client"

interface PracticeSessionProps {
  sessionId: string
  section: "math" | "rw"
}

export default function PracticeSession({ sessionId, section }: PracticeSessionProps) {
  const router = useRouter()
  const [question, setQuestion] = useState<QuestionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [answering, setAnswering] = useState(false)
  const [error, setError] = useState("")
  const [sessionComplete, setSessionComplete] = useState(false)
  const [questionsCompleted, setQuestionsCompleted] = useState(0)
  const [remainingTime, setRemainingTime] = useState(1200) // 20 minutes in seconds

  // Load first question
  useEffect(() => {
    loadNextQuestion()
  }, [])

  // Handle timer expiration
  useEffect(() => {
    if (remainingTime <= 0) {
      handleSessionEnd()
    }
  }, [remainingTime])

  const loadNextQuestion = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/session/next-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      })

      if (!response.ok) {
        throw new Error("Failed to load question")
      }

      const data: SessionQuestionResponse = await response.json()
      setQuestion(data.question)
      setQuestionsCompleted(data.questions_completed)
      setRemainingTime(data.remaining_time)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading question")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitAnswer = async (answer: string) => {
    if (!question) return

    setAnswering(true)
    setError("")

    try {
      const response = await fetch("/api/session/submit-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          question_id: question.question_id,
          answer,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit answer")
      }

      const data = await response.json()
      setRemainingTime(data.remaining_time)

      if (data.session_complete) {
        setSessionComplete(true)
      } else {
        // Show feedback briefly then load next question
        setTimeout(() => {
          loadNextQuestion()
        }, 1500)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error submitting answer")
    } finally {
      setAnswering(false)
    }
  }

  const handleSessionEnd = () => {
    // Store session ID for summary page
    localStorage.setItem("current_session_id", sessionId)
    router.push("/summary")
  }

  useEffect(() => {
    if (sessionComplete) {
      handleSessionEnd()
    }
  }, [sessionComplete])

  if (sessionComplete) {
    return null
  }

  if (error && !question) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold text-destructive">{error}</p>
          <button onClick={() => router.push("/section-select")} className="text-accent hover:underline">
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with timer and progress */}
        <div className="flex items-center justify-between">
          <SessionProgress completed={questionsCompleted} section={section} />
          <SessionTimer seconds={remainingTime} />
        </div>

        {/* Question renderer */}
        {question && !loading ? (
          <QuestionRenderer question={question} onSubmit={handleSubmitAnswer} disabled={answering} />
        ) : (
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Loading question...</p>
          </div>
        )}
      </div>
    </div>
  )
}
