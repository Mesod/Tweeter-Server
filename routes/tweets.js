var express = require('express');
var router = express.Router();
const passportService = require('../config/passport'),
    passport = require('passport'),
    tdb = require('../db/tweetsdb');

const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/new', requireAuth, function(req, res, next) {
    var tText = req.body.text;
    var tweet = {
        text: tText,
        authorUsername: req.user.userName
    };
    tdb.newTweet(tweet,function(err,t) {
        if(err) {
            res.json({status:"error"})
        } else {
            res.json({status:"success"});
        }
        res.end();
    });
});

router.get('/getUsersOwnPosts',requireAuth, function(req,res) {
    tdb.getUsersTweet(req.user.userName,function(err, tweets){
        if(err) {
            res.json({"status":"error"});
        } else {
            res.json(tweets);
        }
        res.end();
    });
});

router.get('/likeAPost', requireAuth, function(req,res) {

});

module.exports = router;
