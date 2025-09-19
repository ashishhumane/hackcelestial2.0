import React, { useRef, useEffect, useCallback, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Instruction: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [speechEnabled, setSpeechEnabled] = useState(true); // start enabled

  const instructionText = `
    Welcome to Sentence Building game.
    Words will appear randomly arranged on your screen.
    Drag and drop the words to create a correct sentence.
    You have no time restrictions.
    Each correct sentence increases your score.
    But be careful, wrong arrangements will reduce your points.
    Press the Begin Game button when you are ready.
  `;

  // Speak helper
  const speak = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const voices = window.speechSynthesis.getVoices();
    const hindiVoice =
      voices.find(v => v.name.includes("हिन्दी") || v.lang === "hi-IN") ||
      voices[0];

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = hindiVoice || null;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    window.speechSynthesis.speak(utterance);
  }, []);

  // Background animation
  const drawBackground = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const time = Date.now() * 0.001;
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "hsl(220,100%,4%)");
    gradient.addColorStop(0.3, "hsl(200,100%,8%)");
    gradient.addColorStop(0.7, "hsl(180,100%,12%)");
    gradient.addColorStop(1, "hsl(170,100%,16%)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "hsla(195, 100%, 90%, 0.4)";
    for (let i = 0; i < 15; i++) {
      const bubbleX = (time * 20 + i * 40) % canvas.width;
      const bubbleY = canvas.height - ((time * 15 + i * 30) % canvas.height);
      const bubbleSize = 2 + Math.sin(time + i) * 1;
      ctx.beginPath();
      ctx.arc(bubbleX, bubbleY, bubbleSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawBackground(ctx, canvas);
    animationRef.current = requestAnimationFrame(animate);
  }, [drawBackground]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animate();

    // ✅ Speak on page load once voices are ready
    const handleVoicesReady = () => {
      if (speechEnabled) {
        setTimeout(() => speak(instructionText), 500);
      }
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      handleVoicesReady();
    } else {
      window.speechSynthesis.onvoiceschanged = handleVoicesReady;
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.speechSynthesis.cancel();
    };
  }, [animate, speak, speechEnabled]);

  // 🔊 When toggled ON → re-speak instructions
  useEffect(() => {
    if (speechEnabled) {
      if (window.speechSynthesis.getVoices().length > 0) {
        speak(instructionText);
      } else {
        window.speechSynthesis.onvoiceschanged = () => speak(instructionText);
      }
    } else {
      window.speechSynthesis.cancel();
    }
  }, [speechEnabled, speak]);

  const toggleSpeech = () => setSpeechEnabled(prev => !prev);

  const navigate = useNavigate();
  const startGame = () => {
    window.location.href = "https://aqua-sentence-scramble.vercel.app/";
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "hsl(220,100%,4%)" }}
      />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div
          className="
          bg-white/10 backdrop-blur-md rounded-3xl p-10 max-w-2xl w-[90%]
          border border-white/20 shadow-2xl text-center text-cyan-100
        "
        >
          {/* Toggle button */}
          <button
            onClick={toggleSpeech}
            className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-all duration-300"
          >
            {speechEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>

          <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
            Instructions
          </h1>
          <ul className="text-lg space-y-3 text-cyan-200 text-left mb-8 list-disc list-inside">
            <li>📝 Words will appear randomly arranged on your screen.</li>
            <li>🖱️ Drag and drop the words to create a correct sentence.</li>
            <li>⏳ You don't have any time restriction.</li>
            <li>🎯 Each correct sentence increases your score.</li>
            <li>❌ Wrong arrangements will reduce your points.</li>
          </ul>
          <button
            onClick={startGame}
            className="px-8 py-3 text-lg font-semibold rounded-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg transition-all duration-300"
          >
            Begin Game 🎮
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instruction;
