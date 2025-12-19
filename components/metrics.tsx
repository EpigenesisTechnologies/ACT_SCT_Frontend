export default function Metrics() {
  const metrics = [
    {
      label: "Learning Gains",
      value: "Skill level delta per 60 minutes",
    },
    {
      label: "Engagement",
      value: "Return rate by code, session completion",
    },
    {
      label: "Item Quality",
      value: "p-value, discrimination, avg. time",
    },
    {
      label: "Performance",
      value: "p95 < 300ms for next-question API",
    },
    {
      label: "Availability",
      value: "99.5%+ for student flows",
    },
  ]

  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-8 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Success Metrics</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, idx) => (
            <div key={idx} className="p-6 rounded-lg border border-border bg-card">
              <p className="text-sm font-semibold text-accent mb-2">{metric.label}</p>
              <p className="text-muted-foreground">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
