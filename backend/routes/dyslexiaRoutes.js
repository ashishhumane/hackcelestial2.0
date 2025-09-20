const express = require('express')
const router = express.Router()
const gameModel = require('../models/gameplayedModel')
const authenticated = require('../middlewares/authmiddleware')
const { checkSession } = require('../middlewares/session')

router.post('/alphabet-game/result',authenticated,checkSession, async (req, res) => {
  try {
        const userId = req.user.id;
        const { gameName, score, timePlayed, gameData } = req.body;

        if (!userId || !gameName || score === undefined || timePlayed === undefined || !gameData) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newGame = await gameModel.create({
            userId,
            gameName,
            score,
            timePlayed,
            gameData
        });

        res.status(201).json({ message: 'Game data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})

module.exports = router
