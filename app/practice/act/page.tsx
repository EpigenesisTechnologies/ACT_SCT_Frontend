"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

const sections = [
  { id: "English", label: "English" },
  { id: "Math", label: "Math" },
  { id: "Reading", label: "Reading" },
  { id: "Science", label: "Science" },
]

export default function ACTPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            ACT Practice
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose a section to begin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((section) => (
            <Link key={section.id} href={`/practice/act/${section.id.toLowerCase()}`}>
              <Button
                className="w-full h-auto py-6 text-lg bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {section.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/practice">
            <Button variant="link" className="text-muted-foreground">
              Back to Exam Selection
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
