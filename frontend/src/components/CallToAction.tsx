import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Users, Zap } from "lucide-react";

export function CallToAction() {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float blur-xl"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-bounce-gentle blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 bg-white/10 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-white/10 rounded-full animate-bounce-gentle blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Portal Visual */}
          <div className="relative mb-12">
            <div className="w-32 h-32 mx-auto rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center shadow-magical animate-bounce-gentle backdrop-blur-sm">
              <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center animate-sparkle">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -left-8 w-8 h-8 bg-white/20 rounded-full animate-float"></div>
            <div className="absolute -top-8 right-4 w-6 h-6 bg-white/20 rounded-full animate-bounce-gentle"></div>
            <div className="absolute bottom-4 -right-8 w-10 h-10 bg-white/20 rounded-full animate-float"></div>
            <div className="absolute bottom-8 -left-4 w-4 h-4 bg-white/20 rounded-full animate-bounce-gentle"></div>
          </div>

          {/* Headline */}
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Ready to Start the Adventure?
          </h2>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed animate-fade-in-up">
            Explore, Learn, and Grow—Every Mind 
          </p>

          {/* Stats */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 animate-fade-in-up">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/80 text-sm">Happy Learners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-white/80 text-sm">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/80 text-sm">AI Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">4</div>
              <div className="text-white/80 text-sm">Learning Zones</div>
            </div>
          </div> */}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-fade-in-up">
            <Button 
              variant="default" 
              size="lg" 
              className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90 shadow-magical hover:shadow-island hover:scale-105 transition-all duration-300 group"
            >
              <Zap className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Adventure
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            {/* <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10 shadow-card-float hover:shadow-magical transition-all duration-300 group backdrop-blur-sm"
            >
              <Users className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Educator Resources
            </Button> */}
          </div>

          {/* Trust Badge */}
          <div className="text-center text-white/80 text-sm animate-fade-in-up">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>Free 14-day trial</span>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>No credit card required</span>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}