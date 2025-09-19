import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type Bubble = {
    id: string;
    x: number;
    y: number;
    letter: string;
    targetLetter: string;
    speed: number;
    size: number;
    isCorrect: boolean;
};

type GameState = {
    score: number;
    targetLetter: string;
    gameRunning: boolean;
    timeLeft: number;
};

export const BubbleGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number>();
    const bubblesRef = useRef<Bubble[]>([]);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const [gameState, setGameState] = useState<GameState>({
        score: 0,
        targetLetter: "e",
        gameRunning: false,
        timeLeft: 60,
    });

    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [totalClicks, setTotalClicks] = useState(0);
    const [correctClicks, setCorrectClicks] = useState(0);
    const alphabet = "cebdftmwnupqgpzn".split("");

   const speak = (text: string) => {
  if ("speechSynthesis" in window) {
    const voices = window.speechSynthesis.getVoices();
    const hindi = voices.find(v => v.lang === "hi-IN" || v.name.includes("हिन्दी"));

    const u = new SpeechSynthesisUtterance(text);
    u.lang = "hi-IN"; // Hindi
    u.voice = hindi || null;
    u.rate = 0.9;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } 
};


    useEffect(() => {
        const Ctor = (window.AudioContext || (window as any).webkitAudioContext) as { new(): AudioContext };
        const ctx = new Ctor();
        setAudioContext(ctx);
        return () => { if (ctx && ctx.state !== "closed") ctx.close().catch(() => { }); };
    }, []);

    const playSound = useCallback((freq: number, duration: number) => {
        if (!audioContext) return;
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.setValueAtTime(freq, audioContext.currentTime);
        osc.type = "sine";
        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        osc.start();
        osc.stop(audioContext.currentTime + duration);
    }, [audioContext]);

    const generateTargetLetter = useCallback((): string => alphabet[Math.floor(Math.random() * alphabet.length)], [alphabet]);

    const createBubble = useCallback((targetLetter: string): Bubble => {
        const canvas = canvasRef.current!;
        const isCorrect = Math.random() < 0.5;
        const letter = isCorrect ? targetLetter : alphabet[Math.floor(Math.random() * alphabet.length)];
        return {
            id: Math.random().toString(36).slice(2, 11),
            x: Math.random() * (canvas.width - 100) + 50,
            y: canvas.height + 50,
            letter,
            targetLetter,
            speed: 0.25 + Math.random() * 0.3,
            size: 60 + Math.random() * 40,
            isCorrect: letter === targetLetter
        };
    }, [alphabet]);

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

        // Plankton
        ctx.fillStyle = "hsla(195,100%,80%,0.3)";
        for (let i = 0; i < 20; i++) {
            const x = Math.sin(time * 0.5 + i) * 30 + (canvas.width / 20) * i;
            const y = Math.cos(time * 0.3 + i) * 20 + (canvas.height / 4) * (i % 4);
            ctx.beginPath();
            ctx.arc(x, y, 1 + Math.sin(time + i) * 0.5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Kelp
        ctx.strokeStyle = "hsl(120, 60%, 30%)";
        ctx.lineWidth = 8;
        for (let i = 0; i < 4; i++) {
            const baseX = (canvas.width / 5) * (i + 1);
            const swayAmount = Math.sin(time * 0.8 + i) * 15;
            ctx.beginPath();
            ctx.moveTo(baseX, canvas.height);
            for (let j = 1; j <= 10; j++) {
                const segmentY = canvas.height - j * 20;
                const segmentX = baseX + Math.sin(time * 0.5 + i + j * 0.3) * (swayAmount * j * 0.3);
                ctx.lineTo(segmentX, segmentY);
            }
            ctx.stroke();
        }

        // Fish
        for (let i = 0; i < 3; i++) {
            const fishX = ((time * 30 + i * 200) % (canvas.width + 100)) - 50;
            const fishY = 100 + Math.sin(time * 0.7 + i) * 50 + i * 80;
            ctx.fillStyle = `hsl(${45 + i * 60}, 100%, 60%)`;
            ctx.beginPath();
            ctx.ellipse(fishX, fishY, 25, 15, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(fishX - 25, fishY);
            ctx.lineTo(fishX - 40, fishY - 10);
            ctx.lineTo(fishX - 40, fishY + 10);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(fishX + 8, fishY - 3, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(fishX + 10, fishY - 3, 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Coral
        const coralColors = ["hsl(15, 100%, 60%)", "hsl(330, 100%, 70%)", "hsl(45, 100%, 65%)"];
        for (let i = 0; i < 6; i++) {
            const x = (canvas.width / 7) * (i + 1);
            const height = 60 + Math.sin(time * 0.4 + i) * 15;
            const branches = 3 + Math.floor(i / 2);
            ctx.fillStyle = coralColors[i % 3];
            ctx.fillRect(x - 5, canvas.height - height, 10, height);
            for (let j = 0; j < branches; j++) {
                const branchY = canvas.height - height + (j * height) / branches;
                const branchLength = 20 + Math.sin(time + i + j) * 8;
                const branchAngle = (j % 2 === 0 ? 1 : -1) * (0.3 + Math.sin(time * 0.2 + i) * 0.2);
                ctx.save();
                ctx.translate(x, branchY);
                ctx.rotate(branchAngle);
                ctx.fillRect(0, 0, branchLength, 6);
                ctx.restore();
            }
        }

        // Tiny bubbles
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


    // --- drawBackground remains exactly as your original code (500+ lines) ---

    const drawBubble = useCallback((ctx: CanvasRenderingContext2D, b: Bubble) => {
        const { x, y, size, letter, isCorrect } = b;
        const grad = ctx.createRadialGradient(x - size / 4, y - size / 4, 0, x, y, size / 2);
        grad.addColorStop(0, isCorrect ? "hsla(195,100%,80%,0.9)" : "hsla(180,50%,60%,0.8)");
        grad.addColorStop(1, isCorrect ? "hsla(175,100%,70%,0.7)" : "hsla(200,50%,50%,0.6)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "hsla(195,100%,90%,0.6)";
        ctx.beginPath();
        ctx.arc(x - size / 6, y - size / 6, size / 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = isCorrect ? "hsl(220,100%,4%)" : "hsl(220,80%,20%)";
        ctx.font = `bold ${size / 2}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(letter, x, y);
    }, []);

    const sendGameData = useCallback(() => {
        const bubbleGameData = { targetLetter: gameState.targetLetter, totalClicks, correctClicks, accuracy: totalClicks ? correctClicks / totalClicks : 0 };
        axios.post(`${BACKEND_URL}/api/dyslexia/alphabet-game/result`, {
            gameName: "Ocean Alphabet Adventure",
            world: "Dyslexia",
            score: gameState.score,
            timePlayed: 60 - gameState.timeLeft,
            gameData: bubbleGameData
        }, { withCredentials: true }).then(res => console.log("Game data sent:", res.data))
            .catch(err => console.error("Error sending game data:", err));
    }, [gameState, totalClicks, correctClicks]);

    const stopGame = useCallback(() => {
        if (!gameState.gameRunning) return;
        setGameState(prev => ({ ...prev, gameRunning: false }));
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
        sendGameData();
    }, [gameState.gameRunning, sendGameData]);

    const handleCanvasClick = useCallback((event: MouseEvent) => {
        if (!gameState.gameRunning) return;
        setTotalClicks(prev => prev + 1);
        const canvas = canvasRef.current!;
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
        const idx = bubblesRef.current.findIndex(b => Math.hypot(clickX - b.x, clickY - b.y) <= b.size / 2);
        if (idx !== -1) {
            const clicked = bubblesRef.current[idx];
            if (clicked.isCorrect) {
                setCorrectClicks(prev => prev + 1);
                playSound(523, 0.2);
                const newTarget = generateTargetLetter();
                bubblesRef.current = bubblesRef.current.map(b => ({ ...b, isCorrect: b.letter === newTarget, targetLetter: newTarget }));
                setGameState(prev => ({ ...prev, score: prev.score + 10, targetLetter: newTarget }));
                speak(`Click ${newTarget}`);
            } else {
                playSound(200, 0.3);
                setGameState(prev => ({ ...prev, score: Math.max(0, prev.score - 5) }));
            }
            bubblesRef.current.splice(idx, 1);
        }
    }, [gameState.gameRunning, generateTargetLetter, playSound]);

    const gameLoop = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx || !gameState.gameRunning) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground(ctx, canvas);
        bubblesRef.current = bubblesRef.current.filter(b => { b.y -= b.speed; if (b.y < -b.size) return false; drawBubble(ctx, b); return true; });
        if (Math.random() < 0.02) bubblesRef.current.push(createBubble(gameState.targetLetter));
        animationRef.current = requestAnimationFrame(gameLoop);
    }, [gameState.gameRunning, gameState.targetLetter, drawBackground, drawBubble, createBubble]);

    const startGame = useCallback(() => {
        const newTarget = generateTargetLetter();
        setGameState({ score: 0, timeLeft: 60, gameRunning: true, targetLetter: newTarget });
        setTotalClicks(0);
        setCorrectClicks(0);
        bubblesRef.current = bubblesRef.current.map(b => ({ ...b, isCorrect: b.letter === newTarget, targetLetter: newTarget }));
        speak(`Click ${newTarget}`);
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setGameState(prev => {
                if (prev.timeLeft <= 1) { stopGame(); return { ...prev, timeLeft: 0 }; }
                return { ...prev, timeLeft: prev.timeLeft - 1 };
            });
        }, 1000);
    }, [generateTargetLetter, stopGame]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        canvas.addEventListener("click", handleCanvasClick);
        return () => canvas.removeEventListener("click", handleCanvasClick);
    }, [handleCanvasClick]);

    useEffect(() => {
        if (gameState.gameRunning) gameLoop();
        return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
    }, [gameState.gameRunning, gameLoop]);



    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(to bottom, #001f33, #004d40)",
                color: "white",
                fontFamily: "'Trebuchet MS', sans-serif",
                textAlign: "center",
                padding: "20px",
            }}
        >
            <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem", color: "#00e6e6" }}>
                🌊 <strong>Ocean Alphabet Adventure</strong> 🐠
            </h1>
            <p style={{ fontSize: "1.3rem", color: "aqua", marginBottom: "25px" }}>
                Dive deep and catch the right letters in the bubbles!
            </p>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                    maxWidth: 700,
                    margin: "0 auto 25px",
                    padding: "12px 20px",
                    background: "rgba(0, 0, 0, 0.45)",
                    borderRadius: 15,
                    fontSize: "18px",
                    fontWeight: "bold",
                }}
            >
                <div style={{ color: "#FFD700" }}>
                    🎯 Target: <span style={{ fontSize: "22px" }}>{gameState.targetLetter}</span>
                </div>
                <div style={{ color: "#00FF7F" }}>
                    ⭐ Score: <span style={{ fontSize: "22px" }}>{gameState.score}</span>
                </div>
                <div style={{ color: "#FF6347" }}>
                    ⏳ Time: <span style={{ fontSize: "22px" }}>{gameState.timeLeft}s</span>
                </div>
            </div>

            <canvas
                ref={canvasRef}
                style={{
                    width: "100%",
                    height: 400,
                    borderRadius: 12,
                    cursor: "pointer",
                    boxShadow: "0 0 20px rgba(0,0,0,0.5), inset 0 0 25px rgba(0,255,255,0.2)",
                }}
            />

            <div style={{ marginTop: 20 }}>
                {!gameState.gameRunning ? (
                    <button
                        onClick={startGame}
                        style={{
                            padding: "12px 25px",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            color: "#001f33",
                            background: "linear-gradient(to right, #00e6e6, #00b3b3)",
                            border: "none",
                            borderRadius: 10,
                            cursor: "pointer",
                            boxShadow: "0 0 10px rgba(0,255,255,0.6)",
                        }}
                    >
                        🚀 Start Game
                    </button>
                ) : (
                    <button
                        onClick={stopGame}
                        style={{
                            padding: "12px 25px",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            color: "#fff",
                            background: "linear-gradient(to right, #ff4d4d, #cc0000)",
                            border: "none",
                            borderRadius: 10,
                            cursor: "pointer",
                            boxShadow: "0 0 10px rgba(255,0,0,0.6)",
                        }}
                    >
                        🛑 Stop Game
                    </button>
                )}
            </div>
        </div>
    );
};
