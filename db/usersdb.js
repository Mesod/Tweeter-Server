/**
 * Created by masood on 7/26/17.
 */
var userSchema = require('../schemas/user_schema');
var bcrypt = require('bcrypt');
var co = require('co');

var uniqueUserName = function(username,callback) {
    userSchema.count({userName: username}, function(err, count) {
        if(count>0) {
            callback(false);
        } else {
            callback(true);
        }
    })
};

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

};

module.exports.followUser = function(username, followedUsername, callback) {
    var query = {userName:[username,followedUsername]};
    userSchema.find(query, function (err, user) {
        if(err) {
            return callback("db connection!");
        }
        // console.log(user.length);
        var u1, u2;
        if(user.length!=2) {
            return callback("user(s) not found!")
        } else {
            if(user[0].userName==username) {
                u1 = 0;
                u2 = 1;
                if(user[0].info.following.list.indexOf(followedUsername) == -1) {
                    user[0].info.following.count++;
                    user[0].info.following.list.push(followedUsername);
                    user[1].info.followers.count++;
                    user[1].info.followers.list.push(username);
                }
                else {
                    return callback("already followed");
                }
            } else {
                u1 = 1;
                u2 = 0;
                if(user[1].info.following.list.indexOf(followedUsername) == -1) {
                    user[1].info.following.count++;
                    user[1].info.following.list.push(followedUsername);
                    user[0].info.followers.count++;
                    user[0].info.followers.list.push(username);
                }
                else {
                    return callback("already followed");
                }
            }
            co(function* () {
                var p1 = yield user[0].save();
                var p2 = yield user[1].save();
                return callback(null);
            }).catch(
                (err)=> {
                    if(user[u1].info.following.list.indexOf(followedUsername) != -1) {
                        user[u1].info.following.list.remove[followedUsername];
                        user[u1].info.following.count--;
                    }
                    if(user[u2].info.followers.list.indexOf(username) != -1) {
                        user[u2].info.followers.list.remove(username);
                        user[u2].info.followers.count--;
                    }
                    return callback("saving error");
                }
            );
        }

    });
};

module.exports.unfollowUser = function(username, followedUsername, callback) {
    var query = {userName:[username,followedUsername]};
    userSchema.find(query, function (err, user) {
        if(err) {
            return callback("db connection!");
        }
        // console.log(user.length);
        var u1, u2;
        if(user.length!=2) {
            return callback("user(s) not found!")
        } else {
            if(user[0].userName==username) {
                u1 = 0;
                u2 = 1;
                if(user[0].info.following.list.indexOf(followedUsername) != -1) {
                    user[0].info.following.count--;
                    user[0].info.following.list.remove(followedUsername);
                    user[1].info.followers.count--;
                    user[1].info.followers.list.remove(username);
                }
                else {
                    return callback("not followed");
                }
            } else {
                u1 = 1;
                u2 = 0;
                if(user[1].info.following.list.indexOf(followedUsername) != -1) {
                    user[1].info.following.count--;
                    user[1].info.following.list.remove(followedUsername);
                    user[0].info.followers.count--;
                    user[0].info.followers.list.remove(username);
                }
                else {
                    return callback("not followed");
                }
            }
            co(function* () {
                var p1 = yield user[0].save();
                var p2 = yield user[1].save();
                return callback(null);
            }).catch(
                (err)=> {
                    if(user[u1].info.following.list.indexOf(followedUsername) == -1) {
                        user[u1].info.following.list.push[followedUsername];
                        user[u1].info.following.count++;
                    }
                    if(user[u2].info.followers.list.indexOf(username) == -1) {
                        user[u2].info.followers.list.push(username);
                        user[u2].info.followers.count++;
                    }
                    return callback("saving error");
                }
            );
        }

    });
};



module.exports.getUserByUsername = function(username, callback) {
    var query = {userName: username};
    userSchema.findOne(query, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        callback(null, isMatch);
    });
};

module.exports.getUserById = function(id, callback) {
    userSchema.findById(id, callback);
};
