/**
 * Created by masood on 7/26/17.
 */
var Tweet = require('../schemas/tweet_schema');
module.exports.tweet = Tweet;
module.exports.newTweet = function(newTweet,cb) {
    var nt = new Tweet(newTweet);
    nt.save(cb);
};

module.exports.getUsersTweet = function (username, cb) {
    Tweet.find({authorUsername:username},{info:0}).exec(cb);

};

module.exports.likeTweet = function(username, tweetId, cb) {
    Tweet.findById(tweetId, function(err,t) {
        if(err) {
            cb(err);
        }
        var bool = true;
        for(u of t.info.likesList) {
            if(username === u) {
                bool = false;
            }
        }
        if(bool) {
            t.likesCount++;
            t.info.likesList.push(username);
            t.save(cb);
        } else {
            cb("invalid!");
        }
    })
};