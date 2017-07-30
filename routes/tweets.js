var express = require('express');
var router = express.Router();
const passportService = require('../config/passport'),
    passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/new', requireAuth, function(req, res, next) {
    // console.log(req.user);
    res.json({status:"You are logged in!"});
    res.end();
});

module.exports = router;
