const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./src/routes");
const mongoose = require("mongoose");

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", router);

//Restrict use of cors
app.use(
  cors({
    origin: "http://localhost:3001"
  })
);

//DB config
const db = require("./config/keys").mongoURI;

//Connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));