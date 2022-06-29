const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
}