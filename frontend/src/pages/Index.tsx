import { Hero } from "@/components/Hero";
import { LearningZones } from "@/components/LearningZones";
import { Features } from "@/components/Features";
import { DemoWidget } from "@/components/DemoWidget";
import { Testimonials } from "@/components/Testimonials";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import "@fontsource/poppins/800.css";
import welcomeAudio from "@/assets/welcome-neurovia.mp3";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Geometric from "@/components/Geometric";


const Index = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    // check localStorage on initial load
    return localStorage.getItem("introPlayed") !== "true";
  });

  const handleEnter = () => {
    if (audioRef.current) {
      audioRef.current.play(); // play welcome voice
    }

    setTimeout(() => {
      setShowIntro(false);
      localStorage.setItem("introPlayed", "true"); // save flag
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      {showIntro ? (
        <section className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 via-white-500 to-black-600 text-white transition-opacity duration-700">
          <h1 className="text-6xl font-bold mb-8 animate-bounce">NeuroVia</h1>
          <Button
            size="lg"
            onClick={handleEnter}
            className="px-10 py-6 text-2xl bg-black/70 hover:bg-black rounded-2xl shadow-xl"
          >
            Enter into NeuroVia
          </Button>
          <audio ref={audioRef} src={welcomeAudio} preload="auto" />
        </section>
      ) : (
        <>
          <Navbar />
          <Hero />
          <LearningZones />
          <Features />
          <Testimonials />
          <CallToAction />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
