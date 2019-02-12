const express = require('express');
const router = express.Router();
const sessionChecker = require('../app');

//Main page route
router.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
});

module.exports = router;