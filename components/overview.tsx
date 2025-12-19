export default function Overview() {
  const features = [
    {
      title: "No Account Needed",
      description: "Start instantly with a unique code—no signup required.",
    },
    {
      title: "Adaptive Engine",
      description: "Difficulty adjusts based on your performance in real time.",
    },
    {
      title: "20-Minute Blocks",
      description: "Perfect for busy students. High efficiency, low friction.",
    },
    {
      title: "Clear Progress",
      description: "Skill dashboards and personalized recommendations after each session.",
    },
    {
      title: "Instant Feedback",
      description: "Every answer includes explanations and micro-lessons.",
    },
    {
      title: "Mobile-First",
      description: "Practice anywhere, anytime on any device.",
    },
  ]

  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-8 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Program Overview</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your Next Steps delivers a no-friction SAT/ACT practice experience designed for high-school students.
            Complete adaptive 20-minute practice blocks and receive personalized micro-lessons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
