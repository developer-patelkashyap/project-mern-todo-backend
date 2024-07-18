// core dependencies
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// env variable
const secretKey = process.env.SECRET_KEY;

// model
const User = require("../models/User");

// dto
const ResponseDTO = require("../dto/Response");

exports.register = async (req, res) => {
  const { userName, firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({ userName });

    if (user) {
      let ResDTO = new ResponseDTO(409, "User already exists!", null);
      return res.json(ResDTO);
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

    let ResDTO = new ResponseDTO(201, "User registered successfully!", null);
    res.json(ResDTO);
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
      let ResDTO = new ResponseDTO(401, "User Not Found!", null);
      res.json(ResDTO);
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ userName }, secretKey, { expiresIn: "1h" });
      let ResDTO = new ResponseDTO(200, "Login Success", {
        userId: user._id,
        token,
      });
      res.json(ResDTO);
    } else {
      let ResDTO = new ResponseDTO(401, "Password Does not Match!", null);
      res.json(ResDTO);
    }
  } catch (error) {
    res.send(error);
  }
};
