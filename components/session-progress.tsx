interface SessionProgressProps {
  completed: number
  section: "math" | "rw"
}

export default function SessionProgress({ completed, section }: SessionProgressProps) {
  const total = section === "math" ? 20 : 24
  const percentage = (completed / total) * 100

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-muted-foreground">
        Question {completed} of {total}
      </p>
      <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-accent transition-all duration-300" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
