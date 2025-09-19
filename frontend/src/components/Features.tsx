import { Brain, Gamepad2, TrendingUp, Shuffle } from "lucide-react";

const features = [
  {
    icon: Gamepad2,
    title: "Gamified Learning Worlds", 
    description: "Story-based challenges tailored to each disorder with immersive adventure gameplay",
    gradient: "from-dyslexia to-dyscalculia"
  },
  {
    icon: TrendingUp,
    title: "Progress Tracker",
    description: "Parent/teacher dashboards plus child-friendly XP meter and achievement system",
    gradient: "from-dysgraphia to-adhd"
  },
  {
    icon: Shuffle,
    title: "Cross-Disorder Integration",
    description: "Adaptive path that balances learning across Dyslexia, Dyscalculia, Dysgraphia, and ADHD",
    gradient: "from-accent to-primary"
  }
];

export function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Powerful Learning Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced technology meets educational expertise to create the most effective learning experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-3xl border border-border shadow-card-float hover:shadow-magical transition-all duration-500 hover:scale-105 bg-gradient-card animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Feature Icon */}
              <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-card-float`}>
                <feature.icon className="w-10 h-10 text-white" />
              </div>

              {/* Feature Content */}
              <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground text-lg leading-relaxed">
                {feature.description}
              </p>

              {/* Interactive Elements */}
              <div className="mt-6 flex space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-dyslexia rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              </div>

              {/* Hover Glow */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}