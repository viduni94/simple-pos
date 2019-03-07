const express = require("express"),
  app1 = express(),
  port = 6000;

const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./src/routes");
const mongoose = require("mongoose");
const passport = require("passport");

//Body Parser Middleware
app1.use(bodyParser.json());
app1.use(bodyParser.urlencoded({ extended: false }));

app1.use("/", router);

app1.use(express.static("public"));

//Restrict use of cors
app1.use(
  cors({
    origin: "http://localhost:3000"
  })
);

//DB config
const db = require("./config/keys").localMongoURI;

//Connect to mongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));

// Passport middleware
app1.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);
app1.listen(port, console.log("Simple POS server started on " + port));

module.exports = app1;
