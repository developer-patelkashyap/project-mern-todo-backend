// core dependencies
require("dotenv").config();
const jwt = require("jsonwebtoken");

// env variable
const secretKey = process.env.SECRET_KEY;

const requireAuth = (req, res, next) => {
  const token = req.header("authorization");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = requireAuth;
