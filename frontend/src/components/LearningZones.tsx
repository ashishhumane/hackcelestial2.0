"use client";
import { motion } from "framer-motion";
import { BookOpen, Calculator, PenTool, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const zones = [
  {
    id: "dysgraphia",
    category: "Dysgraphia",
    title: "Enchanted Story Forest",
    tagline: "A magical forest where letters and sounds come alive.",
    // description:
    //   "Enter a magical forest where letters and sounds come alive through stories and adventures.",
    icon: BookOpen,
    bgGradient: "from-green-200 to-green-50", // Forest - Green
    buttonColor: "bg-green-500",
    features: [
      "Word-building treehouse 🌳",
      "Talking animal phonics 🦉",
      "Story path comprehension trails 🌲",
    ],
    to: "https://doodle-path-stories.vercel.app/"
  },
  {
    id: "dyscalculia",
    category: "Dyscalculia",
    title: "Candy Island",
    tagline: "A sweet world where numbers turn into candies and puzzles.",
    // description:
    //   "A sweet journey where numbers turn into candies, lollipops, and chocolate puzzles!",
    icon: Calculator,
    bgGradient: "from-pink-200 to-pink-50", // Candy Island - Pink
    buttonColor: "bg-pink-500",
    features: [
      "Candy counting quests 🍬",
      "Chocolate bar number lines 🍫",
      "Lollipop pattern recognition 🍭",
    ],
    to: "https://candyisland.vercel.app/"
  },
  {
    id: "dyslexia",
    category: "Dyslexia",
    title: "Ocean Quest",
    tagline: "Dive underwater where writing and drawing unlock treasures.",
    // description:
    //   "Dive into the ocean world, where writing and drawing unlock treasures hidden under the sea.",
    icon: PenTool,
    bgGradient: "from-sky-200 to-sky-50", // Ocean - Sky Blue
    buttonColor: "bg-sky-500",
    features: [
      "Letter tracing on seashells 🐚",
      "Drawing sea creatures 🐠",
      "Treasure map writing challenges 🏴‍☠️",
    ],
    to: "/dyslexia-games"
  },
  {
    id: "adhd",
    category: "ADHD",
    title: "Space Mission",
    tagline: "Blast off into focus missions and memory challenges.",
    // description:
    //   "Blast off into space with focus missions, memory challenges, and mindful stargazing!",
    icon: Zap,
    bgGradient: "from-blue-200 to-blue-50", // Space - Blue
    buttonColor: "bg-blue-500",
    features: [
      "Rocket launch focus games 🚀",
      "Memory matching with planets 🪐",
      "Breathing with shooting stars 🌠",
    ],
    to: "https://finalneurovia.vercel.app/",
  },
];

export function LearningZones() {

  const Navigate = useNavigate()

  return (
    <section className="py-24 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Explore Your Learning Adventure
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Each zone is a magical world designed to support different learning
            needs and make learning fun and engaging!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {zones.map((zone, index) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, x: 150 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: index * 0.3,
                duration: 0.8,
                ease: "easeOut",
              }}
              className={`group relative p-8 rounded-3xl border border-border shadow-card-float 
                hover:shadow-magical transition-all duration-500 
                bg-gradient-to-br ${zone.bgGradient} cursor-pointer flex flex-col justify-between`}
            >
              {/* Category */}
              <span className="text-sm font-semibold uppercase tracking-wide text-primary mb-2 block">
                {zone.category}
              </span>

              {/* Zone Content */}
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {zone.title}
                </h3>

                {/* Tagline */}
                <p className="text-sm italic text-muted-foreground mb-4">
                  {zone.tagline}
                </p>

                {/* <p className="text-muted-foreground mb-6 leading-relaxed">
                  {zone.description}
                </p> */}

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {zone.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <div className="w-2 h-2 bg-current rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                className={`mt-auto px-4 py-2 rounded-xl ${zone.buttonColor} text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-transform`}

                onClick={() => {
                  if (zone.to.startsWith("http")) {
                    // External link → redirect browser
                    window.location.href = zone.to;
                  } else {
                    // Internal route → use React Router
                    Navigate(zone.to);
                  }
                }}
              >
                Start Adventure
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
