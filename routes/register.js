var express = require('express');
var router = express.Router();
var udb = require('../db/usersdb');

router.post('/', function(req, res, next) {
    var user = {
        userName: req.body.username,
        password: req.body.password,
        // screenName: req.body.screnname,
        emailAddress: req.body.emailaddress,
        biography: req.body.biography
    }

    var password2 = req.body.password2;
    req.checkBody('username','Username field is required!').notEmpty();
    // req.checkBody('screenname','Screenname field is required').notEmpty();
    req.checkBody('emailaddress','Email field is required').notEmpty();
    req.checkBody('password','Password field is required').notEmpty();
    req.checkBody('emailaddress','Email is not valid').isEmail();
    req.checkBody('password2','Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors) {
        res.json(errors);
    } else {
        udb.newUser(user,function(err) {
            if(err) {
                res.json({status:"error",detail:err});
                res.end();
            } else {
                res.json({status:"registered"});
                res.end();
            }
        })
    }


});

module.exports = router;
