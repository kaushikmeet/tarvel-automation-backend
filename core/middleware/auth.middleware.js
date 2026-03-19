// core/middleware/auth.middleware.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Grab the string AFTER the space
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "SECRET"); // MUST match your login secret
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid or expired" });
  }
};