var express = require('express');
var udb = require('../db/usersdb');
var router = express.Router();
const passportService = require('../config/passport'),
    passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

/* GET home page. */
router.get('/followUser/:username', requireAuth, function(req, res, next) {
    console.log('here!');
    var followedUsername = req.params.username;
    var username = req.user.userName;
    udb.followUser(username,followedUsername,function(err) {
        if(err) {
            console.log(err);
        }
        res.json({status:'success'});
        res.end();
    });
});

module.exports = router;
