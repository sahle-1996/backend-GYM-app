const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.registerUser = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body); // Log the request body

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ token, user });
  } catch (err) {
    console.error("Registration error:", err); // 👀 Log the full error
    res.status(500).json({ msg: "Server error" });
  }
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // ✅ Log response before sending
    console.log("Login response:", { token, user });

    res.json({ token, user });
  } catch (err) {
    console.error("Login error:", err); // Log any errors
    res.status(500).json({ msg: err.message });
  }
};