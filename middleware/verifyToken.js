const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    // console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        // Token verification failed
        console.error("JWT verification failed:", err.message);
        return res.status(401).json({ message: "Invalid token" });
      }
    });

    next();
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

module.exports = verifyToken;
