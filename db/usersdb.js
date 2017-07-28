/**
 * Created by masood on 7/26/17.
 */
var userSchema = require('../schemas/user_schema');
var bcrypt = require('bcrypt');

var uniqueUserName = function(username,callback) {
    userSchema.count({userName: username}, function(err, count) {
        if(count>0) {
            callback(false);
        } else {
            callback(true);
        }
    })
}

//we could define this module for user schema too, one of the good things of schemas are this ability of defining methods
module.exports.newUser = function(userInfo, callback) {
    uniqueUserName(userInfo.userName,function(bool) {
        if(bool) {
            console.log('runs here');
            var tempUser = new userSchema(userInfo);
            bcrypt.genSalt(10,function(err,salt) {
                bcrypt.hash(tempUser.password,salt,function(err,hash) {
                    tempUser.password = hash;
                    tempUser.save(callback);
                })
            })
        } else {
            console.log('runs 2');
            callback("invalid username!");
        }
    })

}

//TODO: 1- getUserByUsername    2- comparePassword

module.exports.getUserByUsername = function(username, callback) {
    var query = {userName: username};
    User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        callback(null, isMatch);
    });
}

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}
