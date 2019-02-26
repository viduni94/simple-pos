const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000;

const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./src/routes");
const mongoose = require("mongoose");
const passport = require("passport");

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", router);

app.use(express.static("public"));

//Restrict use of cors
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

//DB config
const db = require("./config/keys").mongoURI;

//Connect to mongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

app.listen(port, console.log("Simple POS server started on " + port));
