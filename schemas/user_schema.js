/**
 * Created by masood on 7/26/17.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    userName: {
        type: String,
        unique: true
    },
    password: String,
    // screenName: String,
    emailAddress: String,
    info: {
        registerDate: {
            type: Date,
            default: Date.now
        },
        following: {
            count:{
                type: Number,
                default: 0
            },
            list: [String]
        },
        followers: {
            count:{
                type: Number,
                default: 0
            },
            list: [String]
        },
        postsCount: {
            type: Number,
            default: 0
        },
        biography: String
    }
});