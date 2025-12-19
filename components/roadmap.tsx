export default function Roadmap() {
  const mvp = [
    "Unique code authentication",
    "Intake + optional diagnostic",
    "Adaptive engine",
    "Timed blocks",
    "Progress dashboard",
    "Admin item CRUD + basic analytics",
  ]

  const phase2 = [
    "Teacher dashboards",
    "Full-length SAT practice mode",
    "Gamification (XP, streaks, badges)",
    "Read-aloud & multilingual hints",
    "Deep IRT calibration & A/B testing",
    "SSO (Google/Microsoft)",
    "Offline caching (PWA)",
  ]

  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-8 bg-muted/50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Roadmap</h2>
          <p className="text-lg text-muted-foreground">From MVP to Phase 2</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent"></span>
              MVP Features
            </h3>
            <ul className="space-y-3">
              {mvp.map((feature, idx) => (
                <li key={idx} className="flex gap-3 text-muted-foreground">
                  <span className="text-accent">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-secondary"></span>
              Phase 2 Enhancements
            </h3>
            <ul className="space-y-3">
              {phase2.map((feature, idx) => (
                <li key={idx} className="flex gap-3 text-muted-foreground">
                  <span className="text-secondary">→</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
