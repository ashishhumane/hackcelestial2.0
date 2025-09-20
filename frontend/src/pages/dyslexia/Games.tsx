import React, { useRef, useEffect, useCallback, useState } from "react";
import { Volume2, VolumeX ,StepBack } from "lucide-react";
import { useNavigate } from "react-router-dom";

type GameCard = {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  to: string;
};

const Games: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);
  const [currentSpeaking, setCurrentSpeaking] = useState<string>("");

  const drawBackground = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const time = Date.now() * 0.001;

    // Ocean gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "hsl(220,100%,4%)");
    gradient.addColorStop(0.3, "hsl(200,100%,8%)");
    gradient.addColorStop(0.7, "hsl(180,100%,12%)");
    gradient.addColorStop(1, "hsl(170,100%,16%)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Floating particles / plankton
    ctx.fillStyle = "hsla(195,100%,80%,0.3)";
    for (let i = 0; i < 20; i++) {
      const x = Math.sin(time * 0.5 + i) * 30 + (canvas.width / 20) * i;
      const y = Math.cos(time * 0.3 + i) * 20 + (canvas.height / 4) * (i % 4);
      ctx.beginPath();
      ctx.arc(x, y, 1 + Math.sin(time + i) * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // ... (rest of your seaweed, fish, coral, bubbles drawing logic unchanged)
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawBackground(ctx, canvas);
    animationRef.current = requestAnimationFrame(animate);
  }, [drawBackground]);

  const speak = useCallback(
    (text: string, identifier: string) => {
      if (!speechEnabled || !("speechSynthesis" in window)) return;

      window.speechSynthesis.cancel();
      setCurrentSpeaking(identifier);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;

      utterance.onend = () => setCurrentSpeaking("");
      utterance.onerror = () => setCurrentSpeaking("");

      window.speechSynthesis.speak(utterance);
    },
    [speechEnabled]
  );

  const gameCards: GameCard[] = [
    {
      id: "word-puzzle",
      title: "Word Puzzle Ocean",
      description: "Dive deep and solve word mysteries in the coral reef",
      color: "from-cyan-400 to-blue-500",
      icon: "🧩",
      to: "/game-instruction",
    },
    {
      id: "Build the sentence",
      title: "Sentence building",
      description: "Swim through stories with friendly sea creatures",
      color: "from-teal-400 to-green-500",
      icon: "📖",
      to: "/buildsentence-instructions",
    },
    {
      id: "spelling-waves",
      title: "Spelling Waves",
      description: "Ride the waves while learning to spell",
      color: "from-purple-400 to-pink-500",
      icon: "🌊",
      to: "/bubble-game",
    },
    {
      id: "phonics-treasure",
      title: "Phonics Treasure Hunt",
      description: "Search for sound treasures in underwater caves",
      color: "from-orange-400 to-red-500",
      icon: "💎",
      to: "/bubble-game",
    },
  ];

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

  // if (!localStorage.getItem("welcomeSpoken")) {
  //   // Warm-up speechSynthesis
  //   const warmUp = new SpeechSynthesisUtterance(" ");
  //   window.speechSynthesis.speak(warmUp);

  //   setTimeout(() => {
  //     speak(
  //       "Welcome to Water World of Dyslexia! Explore amazing games designed just for you.",
  //       "welcome"
  //     );
  //     localStorage.setItem("welcomeSpoken", "true");
  //   }, 1500); // wait a bit longer
  // }

  return () => {
    window.removeEventListener("resize", resizeCanvas);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    window.speechSynthesis.cancel();
  };
}, [animate, speak]);


  const navigate = useNavigate();

  const handleCardClick = (card: GameCard) => {
    speak(`${card.title}. ${card.description}`, card.id);
    navigate(`${card.to}`);
  };

  const toggleSpeech = () => {
    if (speechEnabled) {
      window.speechSynthesis.cancel();
      setCurrentSpeaking("");
    }
    setSpeechEnabled(!speechEnabled);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "hsl(220,100%,4%)" }}
      />

      {/* Overlay UI */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Speech Toggle */}
        <button
          onClick={toggleSpeech}
          className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-all duration-300"
          aria-label={speechEnabled ? "Disable speech" : "Enable speech"}
        >
          {speechEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
        <button
          onClick={goto => navigate('/')}
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white hover:bg-white/30 transition-all duration-300 font-semibold flex"
          aria-label={speechEnabled ? "Disable speech" : "Enable speech"}
        >
          <StepBack />Home
        </button>

        {/* Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 mb-6 drop-shadow-2xl animate-pulse">
            Welcome to
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-300 drop-shadow-2xl">
            Water World of Dyslexia
          </h2>
          <div className="mt-6 text-xl text-cyan-100 font-medium">
            🐠 Dive into learning with fun and friendship! 🐠
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
          {gameCards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-110 hover:-translate-y-2 ${
                currentSpeaking === card.id ? "ring-4 ring-yellow-300 ring-opacity-75" : ""
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div
                className={`bg-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-md border border-white/20 hover:shadow-3xl transition-all duration-300 hover:bg-white/20`}
              >
                <div className="text-center">
                  <div className="text-5xl mb-4 group-hover:animate-bounce">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-cyan-100 mb-3 group-hover:text-yellow-100 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-cyan-200/90 text-sm leading-relaxed group-hover:text-white transition-colors">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-cyan-200 text-lg font-medium animate-bounce">
            🎯 Click on any game to hear about it! 🎯
          </p>
        </div>
      </div>

      {/* Floating Emojis */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-30"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          >
            <div className="text-3xl">
              {["🐟", "🐠", "🦑", "🐙", "🦀", "🐚"][i]}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float { animation: float ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Games;
