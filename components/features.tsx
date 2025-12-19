export default function Features() {
  const features = [
    {
      title: "Unique Code Access",
      description: "Start instantly with an 8–12 character code; no login required.",
    },
    {
      title: "20-Minute Timed Blocks",
      description: "Designed for busy students; high efficiency, low friction.",
    },
    {
      title: "Adaptive Difficulty",
      description: "System uses accuracy, time, and recency to select the right next item.",
    },
    {
      title: "Skill Progress Dashboard",
      description: "Mastery tracking across Algebra, Advanced Math, Grammar, and more.",
    },
    {
      title: "Micro-Lessons & Rationales",
      description: "Every incorrect answer includes an explanation and a short reteach.",
    },
    {
      title: "Mobile-First Design",
      description: "Runs smoothly on any modern phone, tablet, or laptop.",
    },
  ]

  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-8 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Features</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-lg border border-border bg-card">
              <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
