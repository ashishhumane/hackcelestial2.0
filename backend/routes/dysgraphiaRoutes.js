const express = require('express')
const router = express.Router()
const authenticated = require('../middlewares/authmiddleware')
const API_KEY = process.env.API_KEY;
const axios = require('axios');
const multer = require('multer');
// const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path');
const { checkSession } = require('../middlewares/session');


// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

router.get('/story',checkSession, async (req, res) => {
  try {
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "contents": [
            {
              "role": "user",
              "parts": [
                {
                  text: `Generate a short forest-themed story suitable for dysgraphia students. 
Use simple words, short sentences, and a clear structure. 
Include 8-10 sentences. 
Make it engaging and easy to write. 
Return only the story text — do not add any introductions, explanations, or comments.
                  `
                }
              ]
            }
          ]
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google API error:', errorText);
      return res.status(response.status).json({ message: 'Google API error', details: errorText });
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content.parts[0] || '';

    res.json({ response: generatedText });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
})

router.post("/handwriting/upload",checkSession, upload.single("handwriting"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded." });

  const imagePath = req.file.path;

  try {
    // Step 1: Convert image to base64
    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = imageBuffer.toString("base64");

    // Step 2: Detect MIME type dynamically
    const mimeType =
      req.file.mimetype && req.file.mimetype.startsWith("image/")
        ? req.file.mimetype
        : "image/png";

    // Step 3: Prompt for structured JSON
    const prompt = `
      You are an expert handwriting analyst.
      Analyze the uploaded handwriting image and return your response in STRICT JSON format only.
      Do not include explanations outside JSON. 
      Use this exact schema:

      {
        "score": number (0-100),
        "encouragement": string,
        "strengths": [string],
        "focusAreas": [string],
        "tips": [string],
        "recommendedGames": [string]
      }

      Example:
      {
        "score": 78,
        "encouragement": "Great Job! 🎉 You're making wonderful progress on your writing journey!",
        "strengths": ["Great letter spacing", "Consistent size for capitals"],
        "focusAreas": ["Some letters lean right", "Spacing between words could be more uniform"],
        "tips": ["Practice writing between guidelines", "Slow down to form letters"],
        "recommendedGames": ["Letter Spacing Challenge", "Baseline Balancer"]
      }
    `;

    // Step 4: Call Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: mimeType,
                  data: imageBase64
                }
              }
            ]
          }
        ]
      },
      { headers: { "Content-Type": "application/json" } }
    );

    // Step 5: Extract AI JSON output
    let rawText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    rawText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();

    let analysis;
    try {
      analysis = JSON.parse(rawText);
    } catch (e) {
      console.error("Failed to parse Gemini response:", rawText);
      analysis = { error: "Invalid JSON returned from Gemini", rawText };
    }

    // Step 6: Delete file to save space
    fs.unlinkSync(imagePath);

    // Step 7: Send JSON to frontend
    res.json({
      message: "Handwriting analysis complete",
      analysis
    });

  } catch (err) {
    console.error("Gemini analysis error:", err.response?.data || err.message);
    res.status(500).json({ error: "Error analyzing handwriting", details: err.response?.data });
  }
});


module.exports = router

