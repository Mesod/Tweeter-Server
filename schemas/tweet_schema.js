/**
 * Created by masood on 7/30/17.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('Tweet', {
    text: String,
    authorUsername: String,
    submitDate: {
        type: Date,
        default: Date.now
    },
    likesCount: {
        type: Number,
        default: 0
    },
    dislikesCount: {
        type: Number,
        default: 0
    },
    info: {
        likesList: [String],
        dislikesList: [String]
    }
});