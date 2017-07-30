/**
 * Created by masood on 7/26/17.
 */
const   passport        = require('passport'),
        User            = require('../db/usersdb'),
        config          = require('./main'),
        JwtStrategy     = require('passport-jwt').Strategy,
        ExtractJwt      = require('passport-jwt').ExtractJwt,
        LocalStrategy   = require('passport-local');

//PASSPORT SETUP

const localOptions = { usernamenlField: 'userName' };

const localLogin = new LocalStrategy(localOptions, function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
        if(err) { return done(err); }
        if(!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

        User.comparePassword(password, user.password, function(err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }

            return done(null, user);
        });
    });
});

//JWT SETUP

const jwtOptions = {
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    // Telling Passport where to find the secret
    secretOrKey: config.secret
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    User.getUserById(payload._id, function(err, user) {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

passport.use(jwtLogin);
passport.use(localLogin);