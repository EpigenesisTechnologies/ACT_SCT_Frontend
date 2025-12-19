export default function Personas() {
  const personas = [
    {
      title: "Student (Primary)",
      items: ["Wants quick start", "Targeted practice", "Clear progress visibility"],
    },
    {
      title: "Teacher/Coordinator (Phase 2)",
      items: ["Needs cohort insights", "Class assignments", "Exportable reports"],
    },
    {
      title: "Admin (Internal)",
      items: ["Content management", "Item calibration", "System monitoring"],
    },
  ]

  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-8 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Program Roles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {personas.map((persona, idx) => (
            <div key={idx} className="p-8 rounded-lg border border-border bg-card">
              <h3 className="font-semibold text-xl mb-4">{persona.title}</h3>
              <ul className="space-y-3">
                {persona.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
