var express = require('express');
var router = express.Router();
var udb = require('../db/usersdb');

router.post('/', function(req, res, next) {
    var user = {
        userName: req.body.username,
        password: req.body.password,
        screenName: req.body.screnname,
        emailAddress: req.body.emailaddress
    }
    udb.newUser(user,function(err) {
        if(err) {
            res.json({error:err});
            res.end();
        } else {
            res.json({status:"okay"});
            res.end();
        }
    })
});

module.exports = router;
