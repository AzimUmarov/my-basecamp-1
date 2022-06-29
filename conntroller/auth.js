const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

class Auth {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.send(409).json({ message: "This user already exist" });
      }
      const hashPassword = await bcrypt.hashSync(password, 16);
      const user = new User({ name, email, password: hashPassword });
      await user.save();
      const token = jwt.sign(
        { userId: user.id },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );
      return res.status(200).json({ token, userId: user.id, message: "User created successfully" });
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User is not exist" });
      }
      const pass = await bcrypt.compareSync(password, user.password);
      if (!pass) {
        return res.status(403).json({ message: "Incorrect password." });
      }
      const token = jwt.sign(
        { userId: user.id },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );
      return res.status(200).json({ token: token, userId: user.id });
    } catch (e) {
      return res.status(500).json({ message: `Error in ${e}, pls try again` });
    }
  }
}

module.exports = new Auth();
