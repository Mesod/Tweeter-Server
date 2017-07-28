/**
 * Created by masood on 7/26/17.
 */
var mongoose = require('mongoose');
var config = require('../config/main');
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

module.exports = mongoose.connection;