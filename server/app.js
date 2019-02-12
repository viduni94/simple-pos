const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const sequelize = require('./config/sequelize');

//Test DB
sequelize.authenticate()
    .then(() => {
    console.log("Connected to the database successfully!");
    })
    .catch(err => {
        console.error("Unable to connect to the database: ", err);
    });

//Body Parser Middleware
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: false}));

app.listen(port, console.log('Simple POS server started on ' + port));

