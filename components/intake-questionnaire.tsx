"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

interface IntakeQuestionnaireProps {
  onComplete: (data: Record<string, string>) => void
  loading?: boolean
}

export default function IntakeQuestionnaire({ onComplete, loading = false }: IntakeQuestionnaireProps) {
  const [formData, setFormData] = useState({
    grade: "",
    experience: "",
    goal: "",
    challenges: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(formData)
  }

  const questions = [
    {
      id: "grade",
      label: "What grade are you in?",
      options: ["9th Grade", "10th Grade", "11th Grade", "12th Grade"],
    },
    {
      id: "experience",
      label: "Previous SAT/ACT experience?",
      options: ["First time", "Taken once", "Taken 2+ times"],
    },
    {
      id: "goal",
      label: "What's your target score range?",
      options: ["1200-1250", "1250-1350", "1350-1450", "1450+"],
    },
    {
      id: "challenges",
      label: "Main areas of challenge?",
      options: ["Time management", "Math concepts", "Reading comprehension", "Writing", "Multiple areas"],
    },
  ]

  const isComplete = Object.values(formData).every((v) => v !== "")

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">Welcome to Your Next Steps</h1>
        <p className="text-muted-foreground">Help us personalize your learning experience with a few quick questions</p>
      </div>

      <div className="space-y-6">
        {questions.map((question) => (
          <Card key={question.id} className="p-6">
            <Label className="text-base font-semibold mb-4 block">{question.label}</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {question.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleChange(question.id, option)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    formData[question.id as keyof typeof formData] === option
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={!isComplete || loading}>
        {loading ? "Continue..." : "Continue"}
      </Button>
    </form>
  )
}
