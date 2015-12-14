var models  = require('../models');
var User    = models.User;
var uuid    = require('node-uuid');


exports.getUserByMail = function (email, callback) {
  User.findOne({email: email}, callback);
};

exports.register = function (email,pass,callback) {
  var user         = new User();
  user.pass        = pass;
  user.email       = email;
  user.accessToken = uuid.v4();
  user.save(callback);
};