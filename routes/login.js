var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    User = require('../db/usersdb'),
    config = require('../config/main'),
    passportService = require('../config/passport'),
    passport = require('passport');

// const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

function generateToken(user) {
    return jwt.sign(user,config.secret, {
        expiresIn: 10080
    });
}

function setUserInfo(request) {
    return {
        _id: request._id,
        username: request.userName
    };
}

router.post('/', requireLogin, function(req, res, next) {
    var userInfo = setUserInfo(req.user);
    res.status(200).json( {
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    })
});

module.exports = router;
