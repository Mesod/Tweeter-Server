/**
 * Created by masood on 7/26/17.
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tweeter');

module.exports = mongoose.connection;