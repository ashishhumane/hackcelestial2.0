import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "My daughter with dyslexia finally loves reading! The interactive stories make learning feel like playing her favorite game.",
    author: "Sarah M.",
    role: "Parent of 8-year-old with Dyslexia",
    gradient: "from-dyslexia/20 to-dyslexia/5"
  },
  {
    quote: "Numbers finally make sense to my son! The visual math games have transformed his relationship with mathematics completely.",
    author: "Michael R.", 
    role: "Parent of 10-year-old with Dyscalculia",
    gradient: "from-dyscalculia/20 to-dyscalculia/5"
  },
  {
    quote: "The writing exercises are incredible. My student's handwriting has improved dramatically, and she actually enjoys practicing now.",
    author: "Mrs. Johnson",
    role: "Special Education Teacher",
    gradient: "from-dysgraphia/20 to-dysgraphia/5"
  },
  {
    quote: "The attention games are perfect for my ADHD son. He can focus for longer periods and his confidence has soared.",
    author: "David L.",
    role: "Parent of 9-year-old with ADHD", 
    gradient: "from-adhd/20 to-adhd/5"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const previousTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Stories of Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            families and educators sharing their learning journey transformations
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Card */}
          <div className={`relative p-8 md:p-12 rounded-3xl border border-border shadow-magical bg-gradient-to-br ${testimonials[currentIndex].gradient} transition-all duration-500 animate-fade-in-up`}>
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-card-float">
              <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl leading-relaxed text-foreground mb-8 font-medium italic">
              "{testimonials[currentIndex].quote}"
            </blockquote>

            {/* Author */}
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground mb-1">
                {testimonials[currentIndex].author}
              </div>
              <div className="text-muted-foreground">
                {testimonials[currentIndex].role}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={previousTestimonial}
              className="w-12 h-12 rounded-full hover:scale-110 transition-transform"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary scale-125 shadow-magical"
                      : "bg-muted hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline" 
              size="icon"
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full hover:scale-110 transition-transform"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        {/* <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-dyslexia rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">98%</span>
              </div>
              <span>Reading Improvement</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-dyscalculia rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">95%</span>
              </div>
              <span>Math Confidence</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-dysgraphia rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">92%</span>
              </div>
              <span>Writing Skills</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-adhd rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">90%</span>
              </div>
              <span>Focus Duration</span>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}