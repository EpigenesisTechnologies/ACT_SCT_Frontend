"use client"

import { useEffect, useState } from "react"

interface SessionTimerProps {
  seconds: number
}

export default function SessionTimer({ seconds }: SessionTimerProps) {
  const [displayTime, setDisplayTime] = useState(seconds)

  useEffect(() => {
    setDisplayTime(seconds)
  }, [seconds])

  const minutes = Math.floor(displayTime / 60)
  const secs = displayTime % 60

  const isLowTime = displayTime < 300 // 5 minutes
  const isCritical = displayTime < 60 // 1 minute

  return (
    <div
      className={`px-6 py-3 rounded-lg font-mono text-lg font-semibold ${
        isCritical
          ? "bg-destructive/10 text-destructive border border-destructive"
          : isLowTime
            ? "bg-yellow-500/10 text-yellow-700 border border-yellow-200"
            : "bg-muted border border-border text-foreground"
      }`}
    >
      {minutes}:{secs.toString().padStart(2, "0")}
    </div>
  )
}
