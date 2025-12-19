export default function AdaptiveEngine() {
  const capabilities = [
    "Skill-level tracking from L0–L5 across all SAT domains",
    "Skill gaps identified in real time",
    "Next-best-question engine selects optimal difficulty",
    "Immediate feedback with explanations",
    "Micro-lessons (60–120 sec) for misconceptions",
    "Recommendations for the next session",
  ]

  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-8 bg-muted/50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Adaptive Learning Engine</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A smarter learning model that adapts to you in real time
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-accent-foreground text-xs font-bold">✓</span>
                </div>
                <p className="text-foreground">{cap}</p>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-lg border border-border p-8 h-64 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p className="font-semibold mb-2">Your Learning Progress</p>
              <svg viewBox="0 0 300 200" className="w-full h-full max-h-48">
                <polyline
                  points="10,150 70,120 130,80 190,50 250,20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-accent"
                />
                <polyline
                  points="10,150 70,120 130,80 190,50 250,20"
                  fill="url(#gradient)"
                  opacity="0.1"
                  className="text-accent"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="currentColor" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
