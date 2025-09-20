const express = require('express');
const router = express.Router();
const gameModel = require('../models/gameplayedModel');
const authenticated = require('../middlewares/authmiddleware');

// ✅ Save game score
router.post('/score', authenticated, async (req, res) => {
    try {
        const userId = req.user._id;
        const { gameName, world, score, timePlayed, gameData } = req.body;

        // wait for the document to be saved
        const newGame = await gameModel.create({
            userId,
            gameName,
            world,
            score,
            timePlayed,
            gameData,
        });

        res.status(201).json({
            message: "Game result saved successfully",
            game: newGame
        });
    } catch (error) {
        console.error("Error saving played game:", error);
        res.status(500).json({ message: "Failed to save game result" });
    }
});

module.exports = router;
