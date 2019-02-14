const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('./config/sequelize');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const router = require('./src/routes');

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', router);

//Restrict use of cors
app.use(cors({
    origin: 'http://localhost:5000'
}));

//To log info about requests for development use
app.use(morgan('dev'));

//To allow access to cookies stored in the browser
app.use(cookieParser());

//To track logged in users across sessions
app.use(session({
    key: 'user_id',
    secret: '123',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

//Checks whether the user cookie is still saved while the user is not set
//If so logs out the user.
app.use((req, res, next) => {
    if(req.cookies.user_id && !req.session.user) {
        res.clearCookie('user_id');
    }
    next();
});

//Middleware function to check logged in users
let sessionChecker = (req, res, next) => {
    if(req.session.user && req.cookies.user_id) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};

app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
    console.log('Redirected to login');
});

//Test DB
db.authenticate()
    .then(() => {
    console.log("Connected to the database successfully!");
    })
    .catch(err => {
        console.error("Unable to connect to the database: ", err);
    });

app.listen(port, console.log('Simple POS server started on ' + port));