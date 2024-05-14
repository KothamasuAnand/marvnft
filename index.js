// configuring the dotenv
require("dotenv").config();

const express = require("express");
const middlewares = require("./src/middlewares");
const models = require("./src/models");
const path = require("path");

const PORT = process.env.PORT || 4000;

const app = express();

// setting static folder
app.use(express.static(path.join(__dirname, "./public")));

// adding middlewares
middlewares.config(app);

// configuring models
models.config();

// starting the server
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server listening on port " + PORT);
  }
});
