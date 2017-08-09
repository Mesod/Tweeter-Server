var express = require('express');
var udb = require('../db/usersdb');
var router = express.Router();
const passportService = require('../config/passport'),
    passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

/* GET home page. */
router.get('/follow/:username', requireAuth, function(req, res, next) {
    var followedUsername = req.params.username;
    var username = req.user.userName;
    if(username == followedUsername) {
        res.json({status:'error',detail:'one does not follow itself!'});
        res.end();
        return;
    }
    udb.followUser(username,followedUsername,function(err) {
        if(err) {
            res.json({status:'error',detail:err});
        } else {
            res.json({status: 'success'});
        }
        res.end();
    });
});

router.get('unfollow/:username', requireAuth, (req,res)=> {
    var u1 = req.user.userName;
    var u2 = req.params.username;
    if(u1==u2) {
        res.json({status:'error',detail:'one does not unfollow itself'});
        res.end();
        return;
    }
    udb.unfollowUser(username,followedUsername,function(err) {
        if (err) {
            res.json({status: 'error', detail: err});
        } else {
            res.json({status: 'success'});
        }
        res.end();
    });
});

module.exports = router;
