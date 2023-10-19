const express = require("express");
const app = express();
require("dotenv").config();

// Database
require("./config/MongoDb");

app.listen(process.env.PORT || 500, () => {
  console.log("server is running");
});
