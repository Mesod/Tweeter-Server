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
    
};