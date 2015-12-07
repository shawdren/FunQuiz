var models  = require('../models');
var User    = models.User;
var uuid    = require('node-uuid');


exports.getUsers = function(callback){
  User.find(callback);
};


exports.newAndSave = function (name, loginname, pass, email,callback) {
  var user         = new User();
  user.name        = loginname;
  user.loginname   = loginname;
  user.pass        = pass;
  user.email       = email;
  user.accessToken = uuid.v4();

  user.save(callback);
};