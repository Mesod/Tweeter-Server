/**
 * Created by masood on 7/26/17.
 */
var userSchema = require('../schemas/user_schema');

var uniqueUserName = function(username) {
    userSchema.count({userName: username}, function(err, count) {
        if(count>0) {
            return false;
        } else {
            return true;
        }
    })
}

exports.newUser = function(userInfo, callback) {
    if(uniqueUserName(userInfo.userName)) {
        var tempUser = new userSchema(userInfo);
        tempUser.save(function(err) {
            if(err) callback("db error");
            else    callback(null);
        })
    } else {
        callback("invalid username");
    }
}

