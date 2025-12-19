"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function SectionSelectPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<"math" | "rw" | null>(null)
  const [loading, setLoading] = useState(false)

  const handleContinue = async () => {
    if (!selected) return

    setLoading(true)
    try {
      localStorage.setItem("section", selected)
      router.push("/session")
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold">Choose a Section</h1>
            <p className="text-muted-foreground">Select which section you'd like to practice</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Math Card */}
            <Card
              className={`p-8 cursor-pointer transition-all border-2 ${
                selected === "math" ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
              }`}
              onClick={() => setSelected("math")}
            >
              <div className="space-y-4">
                <div className="text-4xl font-bold text-accent">∑</div>
                <h2 className="text-2xl font-semibold">Math</h2>
                <p className="text-muted-foreground">Algebra, advanced math, problem-solving, and data analysis</p>
                <div className="pt-4 space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Duration:</span> 20 minutes
                  </p>
                  <p>
                    <span className="font-semibold">Questions:</span> ~18-20
                  </p>
                </div>
              </div>
            </Card>

            {/* Reading & Writing Card */}
            <Card
              className={`p-8 cursor-pointer transition-all border-2 ${
                selected === "rw" ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
              }`}
              onClick={() => setSelected("rw")}
            >
              <div className="space-y-4">
                <div className="text-4xl font-bold text-accent">📖</div>
                <h2 className="text-2xl font-semibold">Reading & Writing</h2>
                <p className="text-muted-foreground">Reading comprehension, grammar, vocabulary, and rhetoric</p>
                <div className="pt-4 space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Duration:</span> 20 minutes
                  </p>
                  <p>
                    <span className="font-semibold">Questions:</span> ~22-24
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Button size="lg" className="w-full" disabled={!selected || loading} onClick={handleContinue}>
            {loading ? "Starting..." : "Start Practice Block"}
          </Button>
        </div>
      </div>
    </div>
  )
}
