const mongoose = require('mongoose')

const playedGameSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    gameName: { type: String, required: true },
    world:{ type: String, required: true},
    score: { type: Number, required: true },
    timePlayed: { type: Number, default: 60 }, // in seconds
    gameData: { type: mongoose.Schema.Types.Mixed }, // store any extra info here
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PlayedGame", playedGameSchema);

