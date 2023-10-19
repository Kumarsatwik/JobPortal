const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/ErrorHandler");

require("dotenv").config();

app.use(express.json());


const userRoutes = require("./routes/userRoutes");

// Database
require("./config/MongoDb");

// Routes
app.use("/api/auth", userRoutes);


// errorhandler
app.use(ErrorHandler);

app.listen(process.env.PORT || 500, () => {
  console.log("server is running");
});
