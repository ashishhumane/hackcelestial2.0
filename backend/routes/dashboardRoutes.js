const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')
const gameModel = require('../models/gameplayedModel')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generateToken')
const db = require('../configs/mongoose.connection')
const verify = require('../middlewares/authmiddleware')
const API_KEY = process.env.API_KEY
router.get('/user', verify, (req, res) => {
  try {
    // req.user is already set by the middleware
    res.json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.fullname,
        email: req.user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/games', verify, async (req, res) => {
  try {
    const games = await gameModel.find({ userId: req.user._id }).sort({ timestamp: -1 });
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch games" });
  }
});

router.get('/report', verify, async (req, res) => {
  try {
    const games = await gameModel.find({ userId: req.user._id }).sort({ "gameData.timestamp": -1 });

    const systemPrompt = `
You are an educational game performance analyst.
Analyze the following JSON game data and return a structured JSON report with this exact format:

{
  "summary": {
    "totalGamesPlayed": number,
    "averageScore": number,
    "averageAccuracy": number,
    "highestScore": {
      "value": number,
      "game": string,
      "date": string,
      "accuracy": number
    },
    "mostPlayedGame": string
  },
  "trend": string
}

Rules:
- Always respond with valid JSON only.
- Do NOT include markdown code fences (like \`\`\`json).
- "date" must be in YYYY-MM-DD format.
- Use "accuracy" from gameData, ignore other gameData fields since they may vary.
`;


    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: systemPrompt },
                { text: JSON.stringify(games, null, 2) }
              ]
            }
          ]
        }),
      }
    );

    const data = await response.json();

    let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';

    // 🔥 strip ```json ... ``` if Gemini adds them
    rawText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();

    let generatedReport;
    try {
      generatedReport = JSON.parse(rawText);
    } catch (err) {
      console.error("Failed to parse AI JSON:", err, rawText);
      generatedReport = { error: "Invalid JSON from AI", raw: rawText };
    }

    res.json(generatedReport);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate report" });
  }
});

router.get("/report/data", verify, async (req, res) => {
  try {
    // Fetch games for the logged-in user
    const games = await gameModel.find({ userId: req.user._id }).sort({ timestamp: 1 });

    // Transform into recharts-friendly dataset
    const dataset = games.map(game => ({
      date: new Date(game.timestamp).toLocaleDateString("en-GB"), // format date like DD/MM/YYYY
      score: game.score,
      accuracy: game.gameData?.accuracy ? Number((game.gameData.accuracy * 100).toFixed(2)) : null, // convert to %
      timePlayed: game.timePlayed
    }));

    res.json({ dataset });
  } catch (error) {
    console.error("Error generating dataset:", error);
    res.status(500).json({ message: "Failed to generate dataset" });
  }
});



module.exports = router;