// core dependencies
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// env variable
const secretKey = process.env.SECRET_KEY;

// model
const User = require("../models/User");

exports.register = async (req, res) => {
  const { userName, firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      userName,
      email,
      firstName,
      lastName,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });

    if (!user) {
      res.send("User Not Found!");
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ userName }, secretKey, { expiresIn: "1h" });
      res.json({ token });
      // res.header("Authorization", token);
    } else {
      res.send("Password Does not Match!");
    }
  } catch (error) {
    res.send(error);
  }
};
