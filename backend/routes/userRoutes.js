const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generateToken')
const db = require('../configs/mongoose.connection')
const Session = require('../models/sessionModel')
const jwt = require('jsonwebtoken')

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email);

    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(existingUser);

    // Create session
    const session = await Session.create({
      userId: existingUser._id,
      activeTimeMinutes: 5, // set max active time here
    });

    // Attach session ID to token
    const tokenWithSession = jwt.sign(
      { userId: existingUser._id, sessionId: session._id },
      process.env.JWT_KEY
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: existingUser._id,
        fullName: existingUser.fullname,
        email: existingUser.email,
      },
      token: tokenWithSession
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    console.log(fullName, email, password);

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists, please login." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      fullname: fullName, // make sure your schema matches this field
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser);

  
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: newUser._id,
        fullName: newUser.fullname,
        email: newUser.email,
      }, token
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({ message: "No active session" });
    }

    // Clear cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      sameSite: "Lax",
    });

    // Optional: deactivate session in DB
    // If you included sessionId in JWT payload
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // await Session.findByIdAndUpdate(decoded.sessionId, { isActive: false });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


module.exports = router