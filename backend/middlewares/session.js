// middleware/checkSession.js
import jwt from "jsonwebtoken";
import Session from "../models/sessionModel.js";

export const checkSession = async (req, res, next) => {
  try {
    const token = req.cookies.sessionToken;
    if (!token) return res.status(401).json({ message: "No session" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const session = await Session.findById(decoded.sessionId);
    if (!session || !session.isActive) return res.status(401).json({ message: "Session expired" });

    const now = new Date();
    const elapsedSinceLastActivity = (now - session.lastActivity) / 1000; // in seconds
    session.usedActiveTime += elapsedSinceLastActivity;
    session.lastActivity = now;

    // Check if max active time reached
    if (session.usedActiveTime / 60 >= session.activeTimeMinutes) {
      session.isActive = false;
      await session.save();
      return res.status(401).json({ message: "Active time exceeded" });
    }

    await session.save();
    req.user = { id: decoded.userId, sessionId: session._id };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid session" });
  }
};
