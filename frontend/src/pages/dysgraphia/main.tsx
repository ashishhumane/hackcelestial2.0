import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
const backendurl = import.meta.env.VITE_BACKEND_URL

interface ForestItem {
  id: number;
}

const App: React.FC = () => {
  const [screen, setScreen] = useState<
    | "welcome"
    | "storyPrompt"
    | "handwritingInput"
    | "processing"
    | "feedback"
    | "gameSelection"
    | "gamePlay"
    | "reward"
  >("welcome");

  const [feedback, setFeedback] = useState<string>("");
  const [gameType, setGameType] = useState<string>("");
  const [gameLevel, setGameLevel] = useState<number>(0);
  const [forestItems, setForestItems] = useState<ForestItem[]>([]);
  const [story, setStory] = useState<string>("");

  // Fetch story from backend when entering storyPrompt
  useEffect(() => {
    if (screen === "storyPrompt") {
      const fetchStory = async () => {
        try {
          const res = await axios.get(`${backendurl}/api/dysgraphia/story`);
          setStory(res.data.story);
        } catch (err) {
          console.error("Failed to fetch story", err);
          setStory("Failed to load story. Please try again.");
        }
      };
      fetchStory();
    }
  }, [screen, gameLevel]);

  // Fake AI processing for feedback
  useEffect(() => {
    if (screen === "processing") {
      const timer = setTimeout(() => {
        const suggestions = [
          {
            feedback:
              "Great work! Your words are a bit too close. Let's practice spacing.",
            game: "Spacing and Alignment Game",
          },
          {
            feedback:
              "Good effort! Let's focus on those tricky letters that look similar.",
            game: "Letter Confusion Game",
          },
          {
            feedback:
              "Nice job with your writing! Try to break your sentences into smaller, clearer parts.",
            game: "Sentence Breaking Game",
          },
          {
            feedback:
              "Fantastic! To build confidence, let's try a typing and writing combo.",
            game: "Typing + Writing Hybrid Game",
          },
        ];
        const randomSuggestion =
          suggestions[Math.floor(Math.random() * suggestions.length)];
        setFeedback(randomSuggestion.feedback);
        setGameType(randomSuggestion.game);
        setScreen("feedback");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const handleNextChallenge = () => {
    setGameLevel((prev) => prev + 1);
    setScreen("gamePlay");
  };

  const handleTryAgain = () => {
    setGameLevel(0);
    setScreen("gamePlay");
  };

  const renderScreen = () => {
    switch (screen) {
      case "welcome":
        return (
          <div className="flex flex-col items-center justify-center min-h-screen text-center bg-green-50 p-5">
            <div className="bg-white rounded-2xl p-8 m-auto max-w-lg shadow-md">
              <h1 className="text-3xl font-bold mb-6 text-green-800">
                Welcome to Doodle Forest
              </h1>
              <button
                onClick={() => setScreen("storyPrompt")}
                className="bg-blue-600 text-white px-6 py-3 mt-5 rounded-lg font-bold hover:bg-blue-800"
              >
                Start Your Adventure
              </button>
            </div>
          </div>
        );

      case "storyPrompt":
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-green-50">
            <div className="bg-white rounded-2xl p-8 m-auto max-w-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Help the squirrel by writing this story!
              </h2>
              <div className="bg-gray-100 p-5 rounded-lg text-left mb-5">
                <ReactMarkdown>
                  {story || "Loading story..."}
                </ReactMarkdown>
              </div>
              <button
                onClick={() => setScreen("handwritingInput")}
                className="bg-blue-600 text-white px-6 py-3 mt-5 rounded-lg font-bold hover:bg-blue-800"
              >
                Start Writing
              </button>
            </div>
          </div>
        );

      case "handwritingInput":
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-green-50">
            <div className="bg-white rounded-2xl p-8 m-auto max-w-lg shadow-md text-center">
              <h2 className="text-xl font-semibold mb-4">
                Take a picture of your handwriting
              </h2>
              <div className="border-2 border-dashed border-gray-400 p-10 rounded-xl mb-5 flex flex-col items-center">
                <span role="img" aria-label="upload" className="text-5xl mb-2">
                  🖼
                </span>
                <p className="mb-2">Upload Photo</p>
                <input type="file" accept="image/*" />
              </div>
              <button
                onClick={() => setScreen("processing")}
                className="bg-blue-600 text-white px-6 py-3 mt-5 rounded-lg font-bold hover:bg-blue-800"
              >
                Submit Handwriting
              </button>
            </div>
          </div>
        );

      case "processing":
        return (
          <div className="flex flex-col items-center justify-center min-h-screen text-center bg-green-50 p-5">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto my-5"></div>
            <h2 className="text-xl font-semibold">Checking your writing...</h2>
            <p className="text-gray-600">
              Almost done! The magical forest is growing...
            </p>
          </div>
        );

      case "feedback":
        return (
          <div className="flex flex-col items-center justify-center min-h-screen text-center bg-green-50 p-5">
            <div className="bg-white rounded-2xl p-8 m-auto max-w-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-green-700">
                Your Magical Feedback!
              </h2>
              <p className="mb-6 text-lg">{feedback}</p>
              <button
                onClick={() => setScreen("gameSelection")}
                className="bg-blue-600 text-white px-6 py-3 mt-5 rounded-lg font-bold hover:bg-blue-800"
              >
                Play Game to Grow Your Forest!
              </button>
            </div>
          </div>
        );

      case "gameSelection":
        return (
          <div className="flex flex-col items-center justify-center min-h-screen text-center bg-green-50 p-5">
            <div className="bg-white rounded-2xl p-8 m-auto max-w-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">{gameType} Unlocked!</h2>
              <p className="mb-6">
                This game will help you improve your handwriting!
              </p>
              <button
                onClick={() => setScreen("gamePlay")}
                className="bg-blue-600 text-white px-6 py-3 mt-5 rounded-lg font-bold hover:bg-blue-800"
              >
                Start Game
              </button>
            </div>
          </div>
        );

      case "gamePlay":
        return (
          <div className="flex flex-col items-center justify-center min-h-screen text-center bg-green-50 p-5">
            <div className="bg-white rounded-2xl p-8 m-auto max-w-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Playing: {gameType}</h2>
              <p className="mb-6">[ Imagine the game here 🎮 ]</p>
              <button
                onClick={() => setScreen("reward")}
                className="bg-blue-600 text-white px-6 py-3 mt-5 rounded-lg font-bold hover:bg-blue-800"
              >
                Finish Game
              </button>
            </div>
          </div>
        );

      case "reward":
        return (
          <div className="flex flex-col items-center justify-center min-h-screen text-center bg-green-50 p-5">
            <div className="bg-white rounded-2xl p-8 m-auto max-w-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-pink-600">
                You did it! 🎉
              </h2>
              <p className="mb-6">Your forest grew bigger and brighter!</p>
              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={handleTryAgain}
                  className="bg-yellow-500 text-white px-5 py-2 rounded-lg font-bold hover:bg-yellow-600"
                >
                  Try This Again
                </button>
                <button
                  onClick={handleNextChallenge}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-green-700"
                >
                  Next Challenge
                </button>
              </div>
              <div className="flex justify-center gap-2 flex-wrap">
                {forestItems.map((item) => (
                  <div
                    key={item.id}
                    className="w-8 h-16 bg-green-700 rounded-b-lg"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="font-sans">{renderScreen()}</div>;
};

export default App;
