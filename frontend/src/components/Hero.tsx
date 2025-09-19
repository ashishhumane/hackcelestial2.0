import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Users, Volume2, VolumeX } from "lucide-react";
import heroVideo from "@/assets/hero-learning-island.mp4"; // 🎥 import your video file

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 👀 Section in view → play video & unmute if user toggled
            video.play();
            video.muted = muted;
          } else {
            // 🚫 Section out of view → mute and pause
            video.muted = true;
            video.pause();
          }
        });
      },
      { threshold: 0.5 } // 50% of section must be visible
    );

    observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, [muted]);

  return (
    
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 🎥 Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={muted}
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔊 Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 bg-black/50 text-white p-3 rounded-full z-20 hover:bg-black/70 transition"
      >
        {muted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </button>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-400/30 rounded-full animate-float blur-xl"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400/30 rounded-full animate-bounce-gentle blur-xl"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-indigo-400/30 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-18 h-18 bg-teal-400/30 rounded-full animate-bounce-gentle blur-xl"></div>
      </div>

      {/* Overlay (darken video for readability) */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
         
         
          
          {/* Headline */}
          <h1
            className="text-8xl md:text-7xl font-poppins mb-6 
            bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 
            bg-clip-text text-white animate-fade-in-up"
          >
            Learning Adventures for Every Mind
          </h1>

          {/* Subtext */}
          <p
            className="text-xl md:text-2xl text-gray-200 mb-12 
            max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
          >
            AI-powered, gamified platform for{" "}
            <span className="text-pink-400 font-semibold">Dyslexia</span>,{" "}
            <span className="text-purple-400 font-semibold">Dyscalculia</span>,{" "}
            <span className="text-indigo-400 font-semibold">Dysgraphia</span>, and{" "}
            <span className="text-teal-400 font-semibold">ADHD</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up">
            <Button
              size="lg"
              className="text-lg px-8 py-4 group bg-pink-500 hover:bg-pink-600 text-white shadow-lg shadow-pink-500/30"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Your Adventure
            </Button>
            <Button
              size="lg"
              className="text-lg px-8 py-4 group bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
            >
              <Users className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              For Parents & Teachers
            </Button>
          </div>

          {/* Trust Indicators */}
          <div
            className="mt-16 flex flex-wrap justify-center items-center 
            gap-8 text-sm text-gray-300 animate-fade-in-up"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              AI-Powered Learning
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              Research-Based
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
              Personalized Coaching
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
              Gamified Experience
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
