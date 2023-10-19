const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error(400, "Something went wrong! Please try after some time.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error(400, "Something went wrong! Please try after some time.");
  }

  const payload = {
    name: user.name,
    email: user.email,
    id: user._id,
  };
  const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN, {
    expiresIn: "45m",
  });

  return res.status(200).json({ token: access_token, user: payload });
};

const register = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, email, phone, password } = req.body;

    const user = await User.findOne({ $or: [{ phone }, { email }] });
    if (user) {
      throw new Error(400, "Email or Phone already registerd");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    return res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
