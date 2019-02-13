const User = require('../models/userModel');
const session = require('express-session');

exports.createUser = (req,res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname
    })
        .then(user => {
            req.session.user = user.dataValues;
            res.json(user);
            console.log('Successful! ', user);
        })
        .catch(error => {
            if (!error.statusCode)
                error.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
            res.status(error.statusCode).send(error.message)
        })
};