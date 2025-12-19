"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface VerifyAccessCodeProps {
  email: string
  onBack: () => void
}

export default function VerifyAccessCode({ email, onBack }: VerifyAccessCodeProps) {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [emailField, setEmailField] = useState(email)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!code) {
      setError("Please enter your access code")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.toUpperCase().replace(/[^A-Z0-9-]/g, ""),
          email: emailField || undefined,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Invalid or expired code")
      }

      const data = await response.json()

      // Store session data
      localStorage.setItem("student_id", data.student_id)
      localStorage.setItem("access_code", code)
      localStorage.setItem("section", data.section || "")
      localStorage.setItem("current_step", data.current_step)

      toast({
        title: "Success!",
        description: "Access verified. Redirecting...",
      })

      // Route based on current_step
      if (data.current_step === "intake") {
        router.push("/intake")
      } else if (data.current_step === "in_session") {
        router.push("/session")
      } else if (data.current_step === "summary") {
        router.push("/summary")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify code. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">Enter Your Code</h1>
        <p className="text-muted-foreground">We sent a code to {email}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="code" className="text-sm font-medium">
            Access Code
          </Label>
          <Input
            id="code"
            type="text"
            placeholder="e.g. C7M4-K2P9"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            disabled={loading}
            maxLength={20}
            className="h-11 font-mono tracking-wide text-center text-lg"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email-verify" className="text-sm font-medium">
            Email (Optional)
          </Label>
          <Input
            id="email-verify"
            type="email"
            placeholder="student@example.com"
            value={emailField}
            onChange={(e) => setEmailField(e.target.value)}
            disabled={loading}
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">For extra verification, you can provide your email</p>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "Verifying..." : "Continue"}
        </Button>
      </form>

      {/* Back Button */}
      <Button type="button" variant="outline" className="w-full bg-transparent" onClick={onBack} disabled={loading}>
        Use Different Email
      </Button>

      {/* Info */}
      <div className="p-4 rounded-lg bg-muted/50 border border-border">
        <p className="text-sm text-muted-foreground text-center">
          Codes are case-insensitive and expire after 24 hours.
        </p>
      </div>
    </div>
  )
}
