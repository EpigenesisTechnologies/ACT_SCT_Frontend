"use client"

import { useState } from "react"
import RequestAccessCode from "@/components/request-access-code"
import VerifyAccessCode from "@/components/verify-access-code"

type AuthStep = "request" | "verify"

export default function AccessPage() {
  const [step, setStep] = useState<AuthStep>("request")
  const [email, setEmail] = useState("")

  const handleRequestSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail)
    setStep("verify")
  }

  const handleBackToRequest = () => {
    setStep("request")
    setEmail("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {step === "request" ? (
          <RequestAccessCode onSuccess={handleRequestSubmit} />
        ) : (
          <VerifyAccessCode email={email} onBack={handleBackToRequest} />
        )}
      </div>
    </div>
  )
}
