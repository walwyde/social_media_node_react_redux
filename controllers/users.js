const { check, validationResult } = require("express-validator");
const config = require("config");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar")

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
    if(!users) return res.status(404).json({ errors: [{msg:"Users Not Found"}] })
    res.json(users)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ errors: [{msg:"Server Error"}] })
  }
}
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({ errors: [{msg:"User Not Found"}] })
    res.json(user)
  } catch (err) {
    console.log(err.message)
    if(err.kind == "ObjectId") return res.status(404).json({msg: "user not found"})
    res.status(500).json({ errors: [{msg:"Server Error"}] })
  }
}
exports.newUser = async (req, res) => {
  // input validations
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  const avatar = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "mm"
  });
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("user already exists");
      return res.status(400).json({ errors: [{msg:"email already exists"}] });
    }

    const user = new User({
      name,
      email,
      avatar,
      password,
    });
    //  generating salt and hashing password with bcryptjs
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    user.save();

    // generating jwt token
    const payLoad = {user: {
      id: user.id,
    }};
    jwt.sign(payLoad, config.get("jwtSecret"), {
      expiresIn: "2h",
    }, (err, token) => {
      if (err) {
        return res.status(500).json(err.message)
      }
      res.status(200).json(token)
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ errors: [err.message] });
  }
};
