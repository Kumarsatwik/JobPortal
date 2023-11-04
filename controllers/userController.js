const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const registerValidation = require("../utils/validation");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(403).send({ message: "Invalid Credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(403).send({ message: "Invalid Credentials" });
  }

  const payload = {
    name: user.name,
    email: user.email,
    id: user._id,
  };
  const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN, {
    expiresIn: "10m",
  });

  return res.status(200).json({
    token: access_token,
    user: payload,
    message: "SuccessFully Logged In",
  });
};

const register = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { error } = registerValidation.validate(req.body);

    if (error) {
      console.log(error.details[0].message);
      throw new Error(error.details[0].message);
    }
    const { name, email, phone, password } = req.body;

    const user = await User.findOne({ $or: [{ phone }, { email }] });
    if (user) {
      throw new Error("Email or Phone already registerd");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
