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

