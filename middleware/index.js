const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
exports.auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) {
      return res.status(401).json("authorization denied, no signed token");
    }
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;

    return next();
  } catch (err) {
    console.log(err);
    res.status(401).json("authorization denied");
  }
};
