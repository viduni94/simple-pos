let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

let bodyParser = require('body-parser');
let path = require('path');
let cors = require('cors');
let db = require('./config/sequelize');

//Body Parser Middleware
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: false}));

app.listen(port);

console.log('Simple POS RESTful API server started on ' + port);

