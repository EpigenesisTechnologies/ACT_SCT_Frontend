export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Enter Your Code",
      description: "Receive or enter your unique 8–12 character code",
    },
    {
      number: "2",
      title: "Quick Intake",
      description: "Complete a short questionnaire about your background",
    },
    {
      number: "3",
      title: "Optional Baseline",
      description: "Take a quick diagnostic to calibrate the system (5–8 questions)",
    },
    {
      number: "4",
      title: "Pick a Section",
      description: "Choose Math or Reading & Writing",
    },
    {
      number: "5",
      title: "Practice Block",
      description: "Complete a 20-minute adaptive practice session",
    },
    {
      number: "6",
      title: "Get Feedback",
      description: "Receive personalized insights and next-step recommendations",
    },
  ]

  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-8 bg-muted/50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
          <p className="text-lg text-muted-foreground">Six simple steps from code entry to personalized feedback</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-start">
              <div className="w-12 h-12 rounded-full bg-[#b8502c] text-white flex items-center justify-center font-bold text-lg mb-4">
                {step.number}
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
