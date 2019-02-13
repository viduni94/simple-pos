const User = require('../models/userModel');

exports.validateUser = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({
        where: { username: username }
    }).then( (user)  => {
        if(!user) {
            res.redirect('/login');
            console.log('User not found');
        } else if (!user.validPassword(password)) {
            res.redirect('/login');
            console.log('Invalid password');
        } else {
            req.session.user = user.dataValues;
            res.redirect('/dashboard');
        }
    });
};