const express = require("express");
const app = express();
const morgan = require("morgan");
const ErrorHandler = require("./middleware/ErrorHandler");

require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");

// Database
require("./config/MongoDb");

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/job", jobRoutes);

// errorhandler
app.use(ErrorHandler);

app.listen(process.env.PORT || 500, () => {
  console.log("server is running");
});
