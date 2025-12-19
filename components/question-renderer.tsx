"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { QuestionData } from "@/lib/api-client"

interface QuestionRendererProps {
  question: QuestionData
  onSubmit: (answer: string) => void
  disabled?: boolean
}

export default function QuestionRenderer({ question, onSubmit, disabled = false }: QuestionRendererProps) {
  const [selectedAnswer, setSelectedAnswer] = useState("")

  const handleSubmit = () => {
    if (selectedAnswer) {
      onSubmit(selectedAnswer)
    }
  }

  return (
    <Card className="p-8 space-y-6">
      {/* Question text */}
      <div className="space-y-4">
        <p className="text-lg font-semibold text-foreground">{question.question_text}</p>

        {/* Image if present */}
        {question.image_url && (
          <div className="rounded-lg border border-border overflow-hidden bg-muted/50 flex items-center justify-center p-4">
            <img
              src={question.image_url || "/placeholder.svg"}
              alt="Question"
              className="max-w-full max-h-64 object-contain"
            />
          </div>
        )}
      </div>

      {/* Answer options */}
      {question.question_type === "multiple_choice" && question.options ? (
        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} disabled={disabled}>
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => !disabled && setSelectedAnswer(option)}
              >
                <RadioGroupItem value={option} id={`option-${idx}`} disabled={disabled} />
                <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer font-normal">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      ) : (
        <div className="space-y-3">
          <Label className="text-sm">Enter your answer</Label>
          <input
            type="text"
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            disabled={disabled}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Type your answer..."
          />
        </div>
      )}

      {/* Submit button */}
      <Button onClick={handleSubmit} disabled={!selectedAnswer || disabled} size="lg" className="w-full">
        {disabled ? "Submitting..." : "Submit Answer"}
      </Button>
    </Card>
  )
}
