// sessionModel.js
const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  loginTime: { type: Date, default: Date.now },
  activeTimeMinutes: { type: Number, default: 10 },
  usedActiveTime: { type: Number, default: 0 },
  lastActivity: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
})

module.exports = mongoose.model('Session', sessionSchema)
