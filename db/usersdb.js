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

module.exports.user = userSchema;

//we could define this module for user schema too, one of the good things of schemas are this ability of defining methods
module.exports.newUser = function(userInfo, callback) {
    uniqueUserName(userInfo.userName,function(bool) {
        if(bool) {
            // console.log('runs here');
            var tempUser = new userSchema(userInfo);
            bcrypt.genSalt(10,function(err,salt) {
                bcrypt.hash(tempUser.password,salt,function(err,hash) {
                    tempUser.password = hash;
                    tempUser.save(callback);
                })
            })
        } else {
            // console.log('runs 2');
            callback("invalid username!");
        }
    })

}

module.exports.followUser = function(username, followedUsername, callback) {
    var query = {userName:[username,followedUsername]};
    userSchema.find(query, function (err, user) {
        if(err) {
            callback("error in db!");
        }
        console.log(user.length);
        if(user.length!=2) {
            callback("error");
        }
        if(user[0].userName==username) {
            user[0].info.following.count++;
            user[0].info.following.list.push(followedUsername);
            user[1].info.followers.count++;
            user[1].info.followers.list.push(username);
        } else {
            user[1].info.following.count++;
            user[1].info.following.list.push(followedUsername);
            user[0].info.followers.count++;
            user[0].info.followers.list.push(username);
        }
        user[1].save();
        user[0].save();
    });
}

module.exports.getUserByUsername = function(username, callback) {
    var query = {userName: username};
    userSchema.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        callback(null, isMatch);
    });
}

module.exports.getUserById = function(id, callback) {
    userSchema.findById(id, callback);
}
